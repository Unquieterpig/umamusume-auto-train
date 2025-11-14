import threading

import easyocr
from PIL import Image
import numpy as np
import re
from typing import List, Optional, Tuple

from utils.log import debug, warning
from utils.screenshot import enhance_image_for_ocr_2, enhance_image_for_ocr

__all__ = [
  "warm_reader_async",
  "extract_text",
  "extract_number",
  "extract_text_improved",
]


OcrResult = Tuple[List[List[float]], str, float]

_reader_lock = threading.Lock()
_reader: Optional[easyocr.Reader] = None
_warm_thread: Optional[threading.Thread] = None


def _get_reader() -> easyocr.Reader:
  """
  Instantiate and cache the EasyOCR reader.
  """
  global _reader
  if _reader is None:
    with _reader_lock:
      if _reader is None:
        _reader = easyocr.Reader(["en"], gpu=False)
  return _reader


def _warm_reader() -> None:
  """
  Load the EasyOCR model weights in the background to avoid
  the first-call penalty during gameplay.
  """
  try:
    reader = _get_reader()
    reader.readtext(np.zeros((24, 24), dtype=np.uint8))
    debug("OCR reader warmed in background.")
  except Exception as exc:
    warning(f"OCR warm-up failed: {exc}")


def warm_reader_async() -> None:
  """
  Kick off a daemon thread that primes the EasyOCR reader.
  Safe to call multiple times; subsequent calls are no-ops
  while a warm-up is already running or completed.
  """
  global _warm_thread
  if _warm_thread and _warm_thread.is_alive():
    return
  _warm_thread = threading.Thread(target=_warm_reader, daemon=True)
  _warm_thread.start()


def extract_text(pil_img: Image.Image) -> str:
  img_np = np.array(pil_img)
  reader = _get_reader()
  result = reader.readtext(img_np)
  texts = [text[1] for text in result]
  return " ".join(texts)


def extract_number(pil_img: Image.Image) -> int:
  img_np = np.array(pil_img)
  reader = _get_reader()
  result = reader.readtext(img_np, allowlist="0123456789")
  texts = [text[1] for text in result]
  joined_text = "".join(texts)

  digits = re.sub(r"[^\d]", "", joined_text)

  if digits:
    return int(digits)

  return -1


def get_text_results(processed_img: Image.Image) -> List[OcrResult]:
  img_np = np.array(processed_img)
  reader = _get_reader()
  results = reader.readtext(img_np)
  # Fallback to recognize if readtext returns nothing
  if not results:
    try:
      raw_results = reader.recognize(img_np)
      # Normalize to (bbox, text, confidence)
      return [(r[0], r[1], float(r[2])) for r in raw_results]
    except AttributeError:
      return []
  return results


def extract_text_improved(pil_img: Image.Image) -> str:
  """
    Heavier than other extract text but more accurate
  """
  scale_try = [1.0, 2.0, 3.0]
  all_results: List[List[OcrResult]] = []

  # try raw image first
  results = get_text_results(pil_img)
  if results:
      all_results.append(results)
  
  for scale in scale_try:
    proc_img = enhance_image_for_ocr(pil_img, scale)
    results = get_text_results(proc_img)
    if results:
      all_results.append(results)

    # user different enhancer
    proc_img = enhance_image_for_ocr_2(pil_img, scale)
    results = get_text_results(proc_img)
    if results:
      all_results.append(results)

  # Pick the result array with the highest total confidence
  if all_results:
    best_result_array = max(all_results, key=lambda arr: sum(r[2] for r in arr))
    final_text = " ".join(r[1] for r in best_result_array)

    # Normalize spaces and strip extra whitespace
    final_text = " ".join(final_text.split())
    return final_text

  return ""
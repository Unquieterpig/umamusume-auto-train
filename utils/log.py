# logging tools
import logging
import os
from logging.handlers import RotatingFileHandler

from colorama import Fore, Style, init as colorama_init


class _ColorFormatter(logging.Formatter):
    LEVEL_STYLES = {
        logging.DEBUG: (Fore.CYAN, "DEBUG "),
        logging.INFO: (Fore.GREEN, "INFO  "),
        logging.WARNING: (Fore.YELLOW, "WARN  "),
        logging.ERROR: (Fore.RED, "ERROR "),
        logging.CRITICAL: (Fore.MAGENTA, "CRIT! "),
    }

    def format(self, record: logging.LogRecord) -> str:
        color, label = self.LEVEL_STYLES.get(
            record.levelno, (Fore.WHITE, f"{record.levelname:<5}")
        )
        record.__dict__["level_tag"] = f"{color}[{label}]{Style.RESET_ALL}"
        try:
            return super().format(record)
        finally:
            record.__dict__.pop("level_tag", None)


colorama_init(autoreset=True)

root_logger = logging.getLogger()
root_logger.setLevel(logging.DEBUG)
root_logger.handlers.clear()

console_handler = logging.StreamHandler()
console_handler.setLevel(logging.DEBUG)
console_handler.setFormatter(_ColorFormatter("%(level_tag)s %(message)s"))
root_logger.addHandler(console_handler)

log_dir = os.path.join(os.getcwd(), "logs")
os.makedirs(log_dir, exist_ok=True)

file_handler = RotatingFileHandler(
    os.path.join(log_dir, "log.txt"),
    maxBytes=1_000_000,
    backupCount=10,
    encoding="utf-8",
)
file_handler.setLevel(logging.DEBUG)
file_handler.setFormatter(logging.Formatter("[%(levelname)s] %(message)s"))
root_logger.addHandler(file_handler)

info = logging.info
warning = logging.warning
error = logging.error
debug = logging.debug

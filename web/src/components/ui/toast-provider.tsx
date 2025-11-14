import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastVariant = "default" | "success" | "error";

type ToastOptions = {
  id?: string;
  title?: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
};

type ToastRecord = ToastOptions & {
  id: string;
};

type ToastContextValue = {
  toast: (options: ToastOptions) => string;
  dismiss: (id: string) => void;
  success: (options: ToastOptions) => string;
  error: (options: ToastOptions) => string;
};

const ToastContext = createContext<ToastContextValue | null>(null);
const DEFAULT_DURATION = 3500;

const createId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2, 9);
};

const variantStyles: Record<ToastVariant, string> = {
  default: "border-border/70 bg-card/95 text-foreground",
  success: "border-emerald-400/40 bg-emerald-500/10 text-emerald-900 dark:text-emerald-100",
  error: "border-red-400/40 bg-red-500/10 text-red-900 dark:text-red-100",
};

const variantAccent: Record<ToastVariant, string> = {
  default: "from-primary/60 to-primary/40",
  success: "from-emerald-400/80 to-emerald-500/80",
  error: "from-red-400/80 to-red-500/80",
};

function ToastMessage({
  toast,
  onDismiss,
}: {
  toast: ToastRecord;
  onDismiss: (id: string) => void;
}) {
  const { id, title, description, duration = DEFAULT_DURATION } = toast;
  const variant = toast.variant ?? "default";

  useEffect(() => {
    if (duration === Infinity) return;
    const timer = window.setTimeout(() => onDismiss(id), duration);
    return () => window.clearTimeout(timer);
  }, [duration, id, onDismiss]);

  return (
    <div
      role="status"
      className={cn(
        "relative flex w-full max-w-sm items-start gap-3 overflow-hidden rounded-2xl border px-5 py-4 shadow-xl shadow-primary/15 backdrop-blur-sm transition-all",
        variantStyles[variant]
      )}
    >
      <span
        className={cn(
          "absolute left-0 top-0 h-full w-1 bg-gradient-to-b",
          variantAccent[variant]
        )}
        aria-hidden="true"
      />
      <div className="flex flex-1 flex-col gap-2">
        {title ? (
          <p className="text-base font-semibold leading-none tracking-tight">
            {title}
          </p>
        ) : null}
        {description ? (
          <p className="text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      <button
        type="button"
        onClick={() => onDismiss(id)}
        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition hover:bg-foreground/10 hover:text-foreground"
        aria-label="Dismiss notification"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastRecord[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const push = useCallback((options: ToastOptions) => {
    const id = options.id ?? createId();
    setToasts((prev) => {
      const next = prev.filter((toast) => toast.id !== id);
      return [...next, { ...options, id }];
    });
    return id;
  }, []);

  const success = useCallback(
    (options: ToastOptions) => push({ ...options, variant: "success" }),
    [push]
  );

  const error = useCallback(
    (options: ToastOptions) => push({ ...options, variant: "error" }),
    [push]
  );

  const value = useMemo(
    () => ({
      toast: push,
      dismiss,
      success,
      error,
    }),
    [dismiss, error, push, success]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex items-end justify-center px-4 sm:justify-end sm:px-6">
        <div className="flex w-full max-w-sm flex-col gap-3">
          {toasts.map((toast) => (
            <div key={toast.id} className="pointer-events-auto">
              <ToastMessage toast={toast} onDismiss={dismiss} />
            </div>
          ))}
        </div>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}


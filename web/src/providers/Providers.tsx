import { ToastProvider } from "@/components/ui/toast-provider";
import { QueryProvider } from "./QueryProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <QueryProvider>{children}</QueryProvider>
    </ToastProvider>
  );
}

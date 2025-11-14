import type { LucideIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type SectionContainerProps = {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
  description?: string;
  className?: string;
  contentClassName?: string;
};

export default function SectionContainer({
  title,
  icon: Icon,
  children,
  description,
  className,
  contentClassName,
}: SectionContainerProps) {
  return (
    <Card className={cn("border-border/60 shadow-sm", className)}>
      <CardHeader className="flex flex-row items-start gap-3 px-5 py-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </span>
        <div className="space-y-1">
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
          {description ? (
            <CardDescription className="text-sm text-muted-foreground">
              {description}
            </CardDescription>
          ) : null}
        </div>
      </CardHeader>
      <CardContent
        className={cn("px-5 pb-5 pt-0", contentClassName ?? "space-y-4")}
      >
        {children}
      </CardContent>
    </Card>
  );
}


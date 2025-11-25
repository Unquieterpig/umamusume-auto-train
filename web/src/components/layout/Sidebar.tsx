import {
  Dumbbell,
  Settings,
  Flag,
  Zap,
  Calendar,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export type Section =
  | "training"
  | "general"
  | "race-style"
  | "skill"
  | "race-schedule"
  | "event";

interface SidebarProps {
  activeSection: Section;
  setActiveSection: (section: Section) => void;
}

export function Sidebar({ activeSection, setActiveSection }: SidebarProps) {
  const items = [
    { id: "training", label: "Training", icon: Dumbbell },
    { id: "general", label: "General", icon: Settings },
    { id: "race-style", label: "Race Style", icon: Flag },
    { id: "skill", label: "Skills", icon: Zap },
    { id: "race-schedule", label: "Race Schedule", icon: Calendar },
    { id: "event", label: "Events", icon: MessageSquare },
  ] as const;

  return (
    <div className="flex w-full flex-col gap-2 border-r border-border/60 bg-card/50 p-4 lg:h-[calc(100vh-4rem)] lg:w-64">
      <div className="mb-4 px-2 text-lg font-semibold tracking-tight">
        Menu
      </div>
      <div className="flex flex-row gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <Button
              key={item.id}
              variant={isActive ? "secondary" : "ghost"}
              className={cn(
                "justify-start gap-3",
                isActive && "bg-secondary font-medium"
              )}
              onClick={() => setActiveSection(item.id)}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden lg:inline">{item.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}

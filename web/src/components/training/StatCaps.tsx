import type { Stat } from "@/types";
import { Input } from "../ui/input";
import { fieldCardClass, fieldLabelClass, fieldHintClass } from "@/components/layout/styles";
import { cn } from "@/lib/utils";

type Props = {
  statCaps: Stat;
  setStatCaps: (keys: string, value: number) => void;
};

export default function StatCaps({ statCaps, setStatCaps }: Props) {
  return (
    <div className={cn(fieldCardClass, "w-full")}>
      <div>
        <p className={fieldLabelClass}>Stat Caps</p>
        <p className={fieldHintClass}>
          Define the upper limits for each stat before the bot shifts focus.
        </p>
      </div>
      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        {Object.entries(statCaps).map(([stat, val]) => (
          <label
            key={stat}
            className="flex items-center justify-between gap-3 rounded-md border border-border/60 bg-card px-3 py-2"
          >
            <span className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              {stat}
            </span>
            <Input
              type="number"
              value={val}
              min={0}
              onChange={(e) => setStatCaps(stat, e.target.valueAsNumber)}
              className="h-10 w-20 rounded-md border-border/60 bg-background"
            />
          </label>
        ))}
      </div>
    </div>
  );
}

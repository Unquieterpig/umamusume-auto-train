import { Input } from "../ui/input";
import { fieldCardClass, fieldLabelClass, fieldHintClass } from "@/components/layout/styles";
import { cn } from "@/lib/utils";

type Props = {
  priorityWeights: number[];
  setPriorityWeights: (weight: number, index: number) => void;
};

export default function PriorityWeights({
  priorityWeights,
  setPriorityWeights,
}: Props) {
  return (
    <div className={cn(fieldCardClass, "w-full")}>
      <div>
        <p className={fieldLabelClass}>Priority Weight Multiplier</p>
        <p className={fieldHintClass}>
          Fine-tune training emphasis for each stat bucket.
        </p>
      </div>
      <div className="mt-2 space-y-2">
        {Array.from({ length: 5 }, (_, i) => (
          <Input
            key={i}
            type="number"
            step={0.05}
            value={priorityWeights[i]}
            onChange={(e) => setPriorityWeights(e.target.valueAsNumber, i)}
            className="h-10 w-full rounded-md border-border/50 bg-card"
          />
        ))}
      </div>
    </div>
  );
}

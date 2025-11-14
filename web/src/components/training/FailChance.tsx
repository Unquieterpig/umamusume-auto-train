import { Input } from "@/components/ui/input";
import { fieldCardClass, fieldLabelClass, fieldHintClass } from "@/components/layout/styles";

type Props = {
  maximumFailure: number;
  setFail: (newFail: number) => void;
};

export default function FailChance({ maximumFailure, setFail }: Props) {
  return (
    <label htmlFor="fail" className={fieldCardClass}>
      <div className="space-y-1">
        <span className={fieldLabelClass}>Max Failure Chance</span>
        <p className={fieldHintClass}>
          Set the failure percentage cap before skipping risky drills.
        </p>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <Input
          className="h-10 w-24 rounded-md border-border/60 bg-card"
          type="number"
          name="fail"
          id="fail"
          min={0}
          value={maximumFailure}
          onChange={(e) => setFail(e.target.valueAsNumber)}
        />
        <span className="text-muted-foreground">%</span>
      </div>
    </label>
  );
}

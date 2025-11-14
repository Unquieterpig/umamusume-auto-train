import { PRIORITY_WEIGHT } from "../../constants";
import Tooltips from "../_c/Tooltips";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { fieldCardClass, fieldLabelClass, fieldHintClass } from "@/components/layout/styles";

type Props = {
  priorityWeight: string;
  setPriorityWeight: (newWeight: string) => void;
};

export default function PriorityWeight({
  priorityWeight,
  setPriorityWeight,
}: Props) {
  return (
    <div className={fieldCardClass}>
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className={fieldLabelClass}>Priority Weight Level</p>
          <p className={fieldHintClass}>
            Choose how aggressively the bot favours higher priority stats.
          </p>
        </div>
        <Tooltips>
          Pick a weighting profile to quickly adjust how heavily the bot
          emphasises early stats versus balanced growth.
        </Tooltips>
      </div>
      <RadioGroup
        className="mt-2 space-y-2"
        value={priorityWeight}
        onValueChange={(val) => setPriorityWeight(val)}
      >
        {Object.entries(PRIORITY_WEIGHT).map(([weight, description]) => (
          <div
            key={weight}
            className="flex items-center gap-2 rounded-md border border-border/60 bg-card px-3 py-2"
          >
            <RadioGroupItem value={weight} id={weight} />
            <label htmlFor={weight} className="text-sm font-medium">
              {weight}
            </label>
            <Tooltips>{description}</Tooltips>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}

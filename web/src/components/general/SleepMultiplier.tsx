import { fieldCardClass, fieldLabelClass, fieldHintClass } from "@/components/layout/styles";
import { Input } from "@/components/ui/input";

type Props = {
  sleepMultiplier: number;
  setSleepMultiplier: (newVal: number) => void;
};

export default function SleepMultiplier({
  sleepMultiplier,
  setSleepMultiplier,
}: Props) {
  return (
    <label htmlFor="sleep-multiplier" className={fieldCardClass}>
      <div className="space-y-1">
        <span className={fieldLabelClass}>Sleep Time Multiplier</span>
        <p className={fieldHintClass}>
          Increase to let the bot rest longer before resuming training.
        </p>
      </div>
      <Input
        id="sleep-multiplier"
        className="mt-2 w-24"
        step={0.1}
        type="number"
        value={sleepMultiplier}
        onChange={(e) => setSleepMultiplier(e.target.valueAsNumber)}
      />
    </label>
  );
}

import { fieldCardClass, fieldLabelClass, fieldHintClass } from "@/components/layout/styles";
import { Input } from "../ui/input";

type Props = {
  name: string;
  value: number;
  setValue: (value: number) => void;
  children: React.ReactNode;
  description?: string;
};

export default function EnergyInput({
  name,
  value,
  setValue,
  children,
  description,
}: Props) {
  return (
    <label htmlFor={name} className={fieldCardClass}>
      <div className="space-y-1">
        <span className={fieldLabelClass}>{children}</span>
        <p className={fieldHintClass}>
          {description ??
            "Adjust the energy threshold to keep your trainee in top shape."}
        </p>
      </div>
      <Input
        className="mt-2 w-24"
        type="number"
        name={name}
        id={name}
        min={0}
        value={value}
        onChange={(e) => setValue(Number(e.target.valueAsNumber))}
      />
    </label>
  );
}

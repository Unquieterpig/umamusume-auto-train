import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MOOD } from "@/constants";
import { fieldCardClass, fieldLabelClass } from "@/components/layout/styles";

type Props = {
  minimumMood: string;
  setMood: (newMood: string) => void;
  minimumMoodJunior: string;
  setMoodJunior: (newMood: string) => void;
};

export default function Mood({
  minimumMood,
  setMood,
  minimumMoodJunior,
  setMoodJunior,
}: Props) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <label className={fieldCardClass}>
        <span className={fieldLabelClass}>Min Mood (Junior)</span>
        <Select
          name="mood-junior"
          value={minimumMoodJunior}
          onValueChange={(val) => setMoodJunior(val)}
        >
          <SelectTrigger className="mt-2 w-full">
            <SelectValue placeholder="Mood" />
          </SelectTrigger>
          <SelectContent>
            {MOOD.map((m) => (
              <SelectItem key={m} value={m}>
                {m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </label>
      <label className={fieldCardClass}>
        <span className={fieldLabelClass}>Min Mood</span>
        <Select
          name="mood"
          value={minimumMood}
          onValueChange={(val) => setMood(val)}
        >
          <SelectTrigger className="mt-2 w-full">
            <SelectValue placeholder="Mood" />
          </SelectTrigger>
          <SelectContent>
            {MOOD.map((m) => (
              <SelectItem key={m} value={m}>
                {m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </label>
    </div>
  );
}

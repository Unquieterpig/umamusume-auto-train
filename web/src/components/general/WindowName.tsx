import Tooltips from "@/components/_c/Tooltips";
import { fieldCardClass, fieldHintClass, fieldLabelClass } from "@/components/layout/styles";
import { Input } from "@/components/ui/input";

type Props = {
  windowName: string;
  setWindowName: (newVal: string) => void;
};

export default function WindowName({ windowName, setWindowName }: Props) {
  return (
    <label htmlFor="window-name" className={fieldCardClass}>
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <span className={fieldLabelClass}>Window Name</span>
          <p className={fieldHintClass}>
            Match the title of your emulator or game window exactly.
          </p>
        </div>
        <Tooltips>
          If you're using an emulator, set this to your emulator's window name
          (case-sensitive).
        </Tooltips>
      </div>
      <Input
        id="window-name"
        className="mt-2 w-full"
        value={windowName}
        onChange={(e) => setWindowName(e.target.value)}
      />
    </label>
  );
}

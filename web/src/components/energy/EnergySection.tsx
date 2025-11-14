import type { Config, UpdateConfigType } from "@/types";
import EnergyInput from "./EnergyInput";

type Props = {
  config: Config;
  updateConfig: UpdateConfigType;
};

export default function EnergySection({ config, updateConfig }: Props) {
  const {
    skip_training_energy,
    never_rest_energy,
    skip_infirmary_unless_missing_energy,
  } = config;

  return (
    <div className="flex flex-col gap-6">
      <EnergyInput
        name="skip-training-energy"
        value={skip_training_energy}
        setValue={(val) => updateConfig("skip_training_energy", val)}
        description="Skip the training menu if current energy falls below this value."
      >
        Skip Training Energy
      </EnergyInput>
      <EnergyInput
        name="never-rest-energy"
        value={never_rest_energy}
        setValue={(val) => updateConfig("never_rest_energy", val)}
        description="Only allow resting once energy drops under this threshold."
      >
        Never Rest Energy
      </EnergyInput>
      <EnergyInput
        name="skip-infirmary-unless_missing-energy"
        value={skip_infirmary_unless_missing_energy}
        setValue={(val) =>
          updateConfig("skip_infirmary_unless_missing_energy", val)
        }
        description="Avoid visiting the infirmary unless energy is missing by at least this amount."
      >
        Skip Infirmary
      </EnergyInput>
    </div>
  );
}

import { Cog } from "lucide-react";
import SectionContainer from "../layout/SectionContainer";
import WindowName from "./WindowName";
import Mood from "./Mood";
import EnergySection from "../energy/EnergySection";
import SleepMultiplier from "./SleepMultiplier";
import type { Config, UpdateConfigType } from "@/types";

type Props = {
  config: Config;
  updateConfig: UpdateConfigType;
};

export default function GeneralSection({ config, updateConfig }: Props) {
  const {
    window_name,
    minimum_mood,
    minimum_mood_junior_year,
    sleep_time_multiplier,
  } = config;

  return (
    <SectionContainer
      icon={Cog}
      title="General"
      description="Fine-tune global preferences, energy thresholds, and rest behaviour."
      contentClassName="grid grid-cols-1 gap-8 md:grid-cols-2"
    >
      <WindowName
        windowName={window_name}
        setWindowName={(val) => updateConfig("window_name", val)}
      />
      <Mood
        minimumMood={minimum_mood}
        setMood={(val) => updateConfig("minimum_mood", val)}
        minimumMoodJunior={minimum_mood_junior_year}
        setMoodJunior={(val) => updateConfig("minimum_mood_junior_year", val)}
      />
      <EnergySection config={config} updateConfig={updateConfig} />
      <SleepMultiplier
        sleepMultiplier={sleep_time_multiplier}
        setSleepMultiplier={(val) => updateConfig("sleep_time_multiplier", val)}
      />
    </SectionContainer>
  );
}

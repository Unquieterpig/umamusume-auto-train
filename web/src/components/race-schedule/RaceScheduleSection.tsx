import { ChevronsRight } from "lucide-react";
import SectionContainer from "../layout/SectionContainer";
import PrioritizeG1 from "./PrioritizeG1";
import CancelConsecutive from "./CancelConsecutive";
import RaceSchedule from "./RaceSchedule";
import type { Config, UpdateConfigType } from "@/types";

type Props = {
  config: Config;
  updateConfig: UpdateConfigType;
};

export default function RaceScheduleSection({ config, updateConfig }: Props) {
  const { prioritize_g1_race, cancel_consecutive_race, race_schedule } = config;

  return (
    <SectionContainer
      icon={ChevronsRight}
      title="Race Schedule"
      description="Plan key race entries and prioritise major events for your trainee."
      contentClassName="flex flex-col gap-6"
    >
      <PrioritizeG1
        prioritizeG1Race={prioritize_g1_race}
        setPrioritizeG1={(val) => updateConfig("prioritize_g1_race", val)}
      />
      <CancelConsecutive
        cancelConsecutive={cancel_consecutive_race}
        setCancelConsecutive={(val) =>
          updateConfig("cancel_consecutive_race", val)
        }
      />
      <RaceSchedule
        raceSchedule={race_schedule}
        addRaceSchedule={(val) => {
          const updated = (() => {
            const exists = race_schedule.some(
              (r) => r.year === val.year && r.date === val.date
            );

            if (exists) {
              return race_schedule.map((r) =>
                r.year === val.year && r.date === val.date ? val : r
              );
            }

            return [...race_schedule, val];
          })();

          updateConfig("race_schedule", updated);
        }}
        deleteRaceSchedule={(name, year) =>
          updateConfig(
            "race_schedule",
            race_schedule.filter(
              (race) => race.name !== name || race.year !== year
            )
          )
        }
        clearRaceSchedule={() => updateConfig("race_schedule", [])}
      />
    </SectionContainer>
  );
}

import { Trophy } from "lucide-react";
import SectionContainer from "../layout/SectionContainer";
import IsPositionSelectionEnabled from "./IsPositionSelectionEnabled";
import PreferredPosition from "./PreferredPosition";
import IsPositionByRace from "./IsPositionByRace";
import PositionByRace from "./PositionByRace";
import type { Config, UpdateConfigType } from "@/types";

type Props = {
  config: Config;
  updateConfig: UpdateConfigType;
};

export default function RaceStyleSection({ config, updateConfig }: Props) {
  const {
    position_selection_enabled,
    preferred_position,
    enable_positions_by_race,
    positions_by_race,
  } = config;

  return (
    <SectionContainer
      icon={Trophy}
      title="Race Style"
      description="Choose preferred running styles and per-race strategies when position selection is enabled."
      contentClassName="grid grid-cols-1 gap-8 md:grid-cols-2"
    >
      <div className="flex flex-col gap-6">
        <IsPositionSelectionEnabled
          positionSelectionEnabled={position_selection_enabled}
          setPositionSelectionEnabled={(val) =>
            updateConfig("position_selection_enabled", val)
          }
        />
        <PreferredPosition
          preferredPosition={preferred_position}
          setPreferredPosition={(val) =>
            updateConfig("preferred_position", val)
          }
          enablePositionsByRace={enable_positions_by_race}
          positionSelectionEnabled={position_selection_enabled}
        />
      </div>
      <div className="flex flex-col gap-6">
        <IsPositionByRace
          enablePositionsByRace={enable_positions_by_race}
          setPositionByRace={(val) =>
            updateConfig("enable_positions_by_race", val)
          }
          positionSelectionEnabled={position_selection_enabled}
        />
        <PositionByRace
          positionByRace={positions_by_race}
          setPositionByRace={(key, val) =>
            updateConfig("positions_by_race", {
              ...positions_by_race,
              [key]: val,
            })
          }
          enablePositionsByRace={enable_positions_by_race}
          positionSelectionEnabled={position_selection_enabled}
        />
      </div>
    </SectionContainer>
  );
}

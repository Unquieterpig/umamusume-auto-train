import { BrainCircuit } from "lucide-react";
import SectionContainer from "../layout/SectionContainer";
import IsAutoBuy from "./IsAutoBuy";
import SkillPtsCheck from "./SkillPtsCheck";
import SkillList from "./SkillList";
import type { Config, UpdateConfigType } from "@/types";

type Props = {
  config: Config;
  updateConfig: UpdateConfigType;
};

export default function SkillSection({ config, updateConfig }: Props) {
  const { skill } = config;

  return (
    <SectionContainer
      icon={BrainCircuit}
      title="Skill"
      description="Control how skills are purchased and prioritised across training runs."
      contentClassName="flex flex-col gap-6"
    >
      <IsAutoBuy
        isAutoBuySkill={skill.is_auto_buy_skill}
        setAutoBuySkill={(val) =>
          updateConfig("skill", { ...skill, is_auto_buy_skill: val })
        }
      />
      <SkillPtsCheck
        skillPtsCheck={skill.skill_pts_check}
        setSkillPtsCheck={(val) =>
          updateConfig("skill", { ...skill, skill_pts_check: val })
        }
      />
      <SkillList
        list={skill.skill_list}
        addSkillList={(val) =>
          updateConfig("skill", {
            ...skill,
            skill_list: [val, ...skill.skill_list],
          })
        }
        deleteSkillList={(val) =>
          updateConfig("skill", {
            ...skill,
            skill_list: skill.skill_list.filter((s) => s !== val),
          })
        }
      />
    </SectionContainer>
  );
}

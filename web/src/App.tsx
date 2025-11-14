import { useEffect } from "react";

import rawConfig from "../../config.json";
import { useConfigPreset } from "./hooks/useConfigPreset";
import { useConfig } from "./hooks/useConfig";
import { useImportConfig } from "./hooks/useImportConfig";

import type { Config } from "./types";

import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { cn } from "./lib/utils";

import EventSection from "./components/event/EventSection";
import RaceScheduleSection from "./components/race-schedule/RaceScheduleSection";
import SkillSection from "./components/skill/SkillSection";
import RaceStyleSection from "./components/race-style/RaceStyleSection";
import TrainingSection from "./components/training/TrainingSection";
import GeneralSection from "./components/general/GeneralSection";

function App() {
  const defaultConfig = rawConfig as Config;
  const {
    activeIndex,
    activeConfig,
    presets,
    setActiveIndex,
    savePreset,
    updatePreset,
  } = useConfigPreset();
  const { config, setConfig, saveConfig } = useConfig(
    activeConfig ?? defaultConfig
  );
  const { fileInputRef, openFileDialog, handleImport } = useImportConfig({
    activeIndex,
    updatePreset,
    savePreset,
  });

  useEffect(() => {
    if (presets[activeIndex]) {
      setConfig(presets[activeIndex].config ?? defaultConfig);
    } else {
      setConfig(defaultConfig);
    }
  }, [activeIndex, presets, setConfig]);

  const { config_name } = config;

  const updateConfig = <K extends keyof typeof config>(
    key: K,
    value: (typeof config)[K]
  ) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <Card className="border-border/60">
          <CardHeader>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle className="text-2xl font-semibold">
                Uma Auto Train
              </CardTitle>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <div>
                  <Button variant="outline" onClick={openFileDialog}>
                    Import Config
                  </Button>
                  <input
                    type="file"
                    accept=".json,application/json"
                    ref={fileInputRef}
                    onChange={handleImport}
                    className="hidden"
                  />
                </div>
                <Button
                  onClick={() => {
                    savePreset(config);
                    saveConfig();
                  }}
                >
                  Save Configuration
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {presets.map((preset, i) => {
                const isActive = i === activeIndex;
                return (
                  <Button
                    key={preset.name + i}
                    variant={isActive ? "default" : "outline"}
                    size="sm"
                    className={cn(
                      "rounded-full text-xs font-medium",
                      !isActive && "border-border/60"
                    )}
                    onClick={() => setActiveIndex(i)}
                  >
                    Preset {i + 1}
                  </Button>
                );
              })}
            </div>
            <Input
              value={config_name}
              onChange={(e) => updateConfig("config_name", e.target.value)}
              placeholder="Preset name"
            />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="flex flex-col gap-6 lg:col-span-2">
            <TrainingSection config={config} updateConfig={updateConfig} />
            <GeneralSection config={config} updateConfig={updateConfig} />
            <RaceStyleSection config={config} updateConfig={updateConfig} />
          </div>
          <div className="flex flex-col gap-6">
            <SkillSection config={config} updateConfig={updateConfig} />
            <RaceScheduleSection config={config} updateConfig={updateConfig} />
            <EventSection config={config} updateConfig={updateConfig} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

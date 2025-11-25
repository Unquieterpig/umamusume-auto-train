import { useEffect, useState } from "react";

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
import { Sidebar, type Section } from "./components/layout/Sidebar";

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

  const [activeSection, setActiveSection] = useState<Section>("training");

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

  const renderSection = () => {
    switch (activeSection) {
      case "training":
        return <TrainingSection config={config} updateConfig={updateConfig} />;
      case "general":
        return <GeneralSection config={config} updateConfig={updateConfig} />;
      case "race-style":
        return <RaceStyleSection config={config} updateConfig={updateConfig} />;
      case "skill":
        return <SkillSection config={config} updateConfig={updateConfig} />;
      case "race-schedule":
        return <RaceScheduleSection config={config} updateConfig={updateConfig} />;
      case "event":
        return <EventSection config={config} updateConfig={updateConfig} />;
      default:
        return <TrainingSection config={config} updateConfig={updateConfig} />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <Sidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:h-screen lg:p-8">
          <div className="mx-auto max-w-5xl space-y-6">
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

            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              {renderSection()}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;

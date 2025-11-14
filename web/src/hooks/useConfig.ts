import { useEffect, useState } from "react";
import { URL } from "../constants";
import type { Config } from "../types";
import { useToast } from "../components/ui/toast-provider";

export function useConfig(defaultConfig: Config) {
  const [config, setConfig] = useState<Config>(defaultConfig);
  const { success: toastSuccess, error: toastError } = useToast();

  useEffect(() => {
    const getConfig = async () => {
      try {
        const res = await fetch(`${URL}/config`);
        const data = await res.json();
        setConfig(data);
      } catch (error) {
        console.log(error);
      }
    };
    getConfig();
  }, []);

  const saveConfig = async () => {
    try {
      const res = await fetch(`${URL}/config`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();
      console.log("Saved config:", data);
      toastSuccess({
        title: "Configuration saved",
        description: "Your preset has been stored successfully.",
      });
    } catch (error) {
      console.log(error);
      toastError({
        title: "Failed to save configuration",
        description:
          error instanceof Error ? error.message : "Something went wrong.",
      });
    }
  };

  return { config, setConfig, saveConfig };
}

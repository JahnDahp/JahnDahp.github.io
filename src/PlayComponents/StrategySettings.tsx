import "../PlayStyles/SettingsBody.css";
import { Setting, StrategySettingsObject } from "../SettingsObjects";
import Dropdown from "./Dropdown";
import StrategyTable from "./StrategyTable";

interface Props {
  strategySettings: Setting[];
  buttonTypes: string[];
  strategySettingValues?: StrategySettingsObject;
  strategyUpdateSetting?: (updates: Partial<StrategySettingsObject>) => void;
}

const StrategySettings = ({
  strategySettings,
  buttonTypes,
  strategySettingValues,
  strategyUpdateSetting,
}: Props) => {
  return (
    <div className="settings-body">
      {strategySettings.map(({ label, options }, index) => {
        const buttonType = buttonTypes[index];

        switch (buttonType) {
          case "table":
            return (
              <div className="settings-body-title" key={index}>
                <div className="settings-body-table">
                  <StrategyTable
                    hardMatrix={strategySettingValues?.hardMatrix || []}
                    softMatrix={strategySettingValues?.softMatrix || []}
                    splitMatrix={strategySettingValues?.splitMatrix || []}
                    surrenderMatrix={
                      strategySettingValues?.surrenderMatrix || []
                    }
                    onChange={(updates) => strategyUpdateSetting?.(updates)}
                  />
                </div>
              </div>
            );

          case "dropdown":
            const initialValue = strategySettingValues?.showErrors;
            return (
              <div className="settings-body-title" key={index}>
                <span className="settings-body-label">{label}</span>
                <div className="settings-body-dropdown">
                  <Dropdown
                    list={options}
                    initial={initialValue ? "Yes" : "No"}
                    onSelect={(value) => {
                      strategyUpdateSetting?.({
                        showErrors: value === "Yes",
                      });
                    }}
                  />
                </div>
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
};

export default StrategySettings;

import "../PlayStyles/SettingsBody.css";
import "../PlayStyles/IRC.css";
import Dropdown from "./Dropdown";
import Tags from "./Tags";
import Textbox from "./Textbox";
import React from "react";
import CountingTable from "./CountingTable";
import { CountingSettingsObject, Setting } from "../SettingsObjects";

interface Props {
  countingSettings: Setting[];
  buttonTypes: string[];
  countingSettingValues: CountingSettingsObject;
  countingUpdateSetting: (updates: Partial<CountingSettingsObject>) => void;
}

const CountingSettings = ({
  countingSettings,
  buttonTypes,
  countingSettingValues,
  countingUpdateSetting,
}: Props) => {
  const getInitialValue = (index: number, options: string[]): string => {
    const label = countingSettings[index].label;
    if (label === "True count divisor") {
      return countingSettingValues.divisor;
    }
    if (label === "True count calculation") {
      return countingSettingValues.calculation;
    }
    if (label === "Count cards on table as in discard") {
      return countingSettingValues.countTableCards ? "Yes" : "No";
    }
    return options[0] || "";
  };

  const onCountingTagsChange = (index: number, value: number) => {
    if (!countingSettingValues || !countingUpdateSetting) return;
    const newTags = [...countingSettingValues.tags];
    newTags[index] = value;
    countingUpdateSetting({ tags: newTags });
  };

  const [ircInputs, setIrcInputs] = React.useState<string[]>(
    countingSettingValues.IRCs.map(String)
  );

  React.useEffect(() => {
    setIrcInputs(countingSettingValues.IRCs.map(String));
  }, [countingSettingValues.IRCs]);

  const onCountingIRCsChange = (index: number, val: string) => {
    const updatedInputs = [...ircInputs];
    updatedInputs[index] = val;
    setIrcInputs(updatedInputs);
  };

  const onCountingIRCsBlur = (index: number) => {
    const val = ircInputs[index];
    const newIRCs = [...countingSettingValues.IRCs];

    if (val === "" || val === "-") {
      newIRCs[index] = 0;
    } else {
      const num = parseInt(val);
      if (!isNaN(num)) {
        newIRCs[index] = num;
      }
    }

    countingUpdateSetting({ IRCs: newIRCs });
  };

  return (
    <div className="settings-body">
      {countingSettings.map(({ label, options }, index) => {
        const buttonType = buttonTypes[index];
        switch (buttonType) {
          case "tags":
            return (
              <div className="settings-body-title" key={index}>
                <span className="settings-body-label">{label}</span>
                <div className="settings-body-tags">
                  <Tags
                    values={countingSettingValues?.tags || []}
                    onChange={onCountingTagsChange}
                  />
                </div>
              </div>
            );
          case "IRC":
            return (
              <div className="settings-body-title" key={index}>
                <span className="settings-body-label">{label}</span>
                <div className="settings-body-irc">
                  <div className="irc">
                    {countingSettings[index].options.map((label, IRCindex) => {
                      const val = countingSettingValues.IRCs[IRCindex];
                      return (
                        <div key={IRCindex} className="irc-pair">
                          <h1 className="irc-pair-label">{label}</h1>
                          <div className="irc-pair-textbox">
                            <Textbox
                              value={ircInputs[IRCindex]}
                              onChange={(newVal) =>
                                onCountingIRCsChange(IRCindex, newVal)
                              }
                              onBlur={() => onCountingIRCsBlur(IRCindex)}
                              allowNegative={true}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          case "dropdown":
            const dropdownLabel = countingSettings[index].label;
            const onChange = (val: string) => {
              if (dropdownLabel === "True count divisor") {
                countingUpdateSetting({ divisor: val });
              } else if (dropdownLabel === "True count calculation") {
                countingUpdateSetting({ calculation: val });
              } else if (
                dropdownLabel === "Count cards on table as in discard"
              ) {
                countingUpdateSetting({ countTableCards: val === "Yes" });
              }
            };
            return (
              <div className="settings-body-title" key={index}>
                <span className="settings-body-label">{dropdownLabel}</span>
                <div className="settings-body-dropdown">
                  <Dropdown
                    list={options}
                    initial={getInitialValue(index, options)}
                    onSelect={onChange}
                  />
                </div>
              </div>
            );
          case "ctable":
            return (
              <div className="settings-body-title" key={index}>
                <div className="settings-body-table">
                  <CountingTable
                    hitStandMatrix={countingSettingValues?.hitStandMatrix || []}
                    doubleMatrix={countingSettingValues?.doubleMatrix || []}
                    splitMatrix={countingSettingValues?.splitMatrix || []}
                    surrenderMatrix={
                      countingSettingValues?.surrenderMatrix || []
                    }
                    onChange={(updates) => countingUpdateSetting?.(updates)}
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

export default CountingSettings;

import "../PlayStyles/SettingsBody.css";
import { BankrollSettingsObject, Setting } from "../SettingsObjects";
import Textbox from "./Textbox";

interface Props {
  bankrollSettings: Setting[];
  bankrollSettingValues: BankrollSettingsObject;
  bankrollUpdateSetting: (updates: Partial<BankrollSettingsObject>) => void;
}

const BankrollSettings = ({
  bankrollSettings,
  bankrollSettingValues,
  bankrollUpdateSetting,
}: Props) => {
  const onBankrollChange = (
    field: keyof BankrollSettingsObject,
    val: string
  ) => {
    if (val === "") {
      bankrollUpdateSetting({ [field]: 0 });
      return;
    }
    const num = parseInt(val);
    if (!isNaN(num)) {
      bankrollUpdateSetting({ [field]: num });
    }
  };

  const labelToKey = (label: string): keyof BankrollSettingsObject => {
    switch (label) {
      case "Bankroll":
        return "bankroll";
      case "Table minimum":
        return "tableMin";
      case "Table maximum":
        return "tableMax";
      default:
        throw new Error(`Unknown label: ${label}`);
    }
  };

  return (
    <div className="settings-body">
      {bankrollSettings.map(({ label, options }, index) => {
        const field = labelToKey(label);
        const onBlur =
          field === "bankroll"
            ? () => {
                let bankroll = bankrollSettingValues.bankroll;
                bankroll -= bankroll % 5;
                const clamped = Math.min(1000000, Math.max(bankroll, 5));
                bankrollUpdateSetting({ bankroll: clamped });
              }
            : field === "tableMin"
            ? () => {
                let tableMin = bankrollSettingValues.tableMin;
                let tableMax = bankrollSettingValues.tableMax;
                tableMin -= tableMin % 5;
                tableMax -= tableMax % 5;
                let clamped = Math.min(tableMax, Math.max(tableMin, 5));
                bankrollUpdateSetting({ tableMin: clamped });
              }
            : field === "tableMax"
            ? () => {
                let tableMax = bankrollSettingValues.tableMax;
                let tableMin = bankrollSettingValues.tableMin;
                tableMin -= tableMin % 5;
                tableMax -= tableMax % 5;
                let clamped = Math.min(1000000, Math.max(tableMax, tableMin));
                bankrollUpdateSetting({ tableMax: clamped });
              }
            : undefined;
        return (
          <div className="settings-body-title" key={index}>
            <span className="settings-body-label">{label}</span>
            <div className="settings-body-textbox">
              <Textbox
                placeholder={options[0] || "Enter value"}
                value={String(bankrollSettingValues[field])}
                onChange={(val) => onBankrollChange(field, val)}
                onBlur={onBlur}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BankrollSettings;

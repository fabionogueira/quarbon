/** @format */

type TFunctionSetValue = (field: string, value: any, rules?: any) => void;
type TFunctionSetData = (data: Record<string, any>) => void;
type TFunctionSetRules = (rules: Record<string, any>) => void;

export type TQFormSchema = {
  setValue: TFunctionSetValue;
  setData: TFunctionSetData;
  setRules: TFunctionSetRules;
  getData: Function;
  reset: Function;
  data: any;
  validate: boolean;
};

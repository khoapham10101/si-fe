import { SelectOption } from "@/components/Base/Select/Select";
import { GenderEnum } from "@/enums/common";

export const BLANK_LAYOUT = "BlankLayout";
export const DEFAULT_LAYOUT = "DefaultLayout";
export const DASHBOARD_LAYOUT = "DashboardLayout";

export const GENDER_OPTIONS: SelectOption[] = [
  {
    label: "Male",
    value: GenderEnum.MALE.toString(),
  },
  {
    label: "Female",
    value: GenderEnum.FEMALE.toString(),
  },
  {
    label: "Other",
    value: GenderEnum.OTHER.toString(),
  },
];

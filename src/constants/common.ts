import { SelectOption } from "@/components/Base/Select/Select";
import { GenderEnum } from "@/enums/common";
import moment from "moment";

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

export const DEFAULT_BIRTHDAY = moment(
  new Date().setFullYear(new Date().getFullYear() - 12)
).format("YYYY-MM-DD");

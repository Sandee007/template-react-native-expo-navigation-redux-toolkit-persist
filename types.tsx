import { Ionicons } from "@expo/vector-icons";

export type T_Expense = {
  id: string;
  amount: number;
  description: string;
  date: string;
};

export interface I_Flatlist_renderItem<itemType> {
  item: itemType;
  index: number;
}

export interface I_IoniconName {
  name: keyof typeof Ionicons.glyphMap;
}

export enum E_ManageExpenseScreenModes {
  "Add Expense",
  "Edit Expense",
}

export interface I_HasChildren {
  children: React.ReactNode;
}

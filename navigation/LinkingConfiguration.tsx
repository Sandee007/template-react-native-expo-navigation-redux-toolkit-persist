import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";

import { NavigatorScreenParams } from "@react-navigation/native";
import { T_Expense, E_ManageExpenseScreenModes } from "../types";

export type RootBottomTabs = {
  Screen_RecentExpenses: undefined;
  Screen_AllExpenses: undefined;
};

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootBottomTabs>;
  Screen_ManageExpense: {
    mode: E_ManageExpenseScreenModes,
    expense?:T_Expense
  };
};

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL("/")],
  config: {
    screens: {
      Root: {
        screens: {
          Screen_RecentExpenses: "Screen_RecentExpenses",
          Screen_AllExpenses: "Screen_AllExpenses",
        },
      },
      Screen_ManageExpense: "Screen_ManageExpenses",
    },
  },
};

export default linking;

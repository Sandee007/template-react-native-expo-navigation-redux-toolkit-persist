import { FlatList, Text } from "react-native";
import { I_Flatlist_renderItem, T_Expense } from "../../types";
import ExpenseItem from "./ExpenseItem";

interface Props {
  expenses: Array<T_Expense>;
}

function renderExpenseItem({ item, index }: I_Flatlist_renderItem<T_Expense>) {
  return <ExpenseItem key={index} expense={item} />
}

export default function ExpensesList({ expenses }: Props) {
  return <FlatList data={expenses} renderItem={renderExpenseItem} keyExtractor={(item: T_Expense) => item.id} />;
}

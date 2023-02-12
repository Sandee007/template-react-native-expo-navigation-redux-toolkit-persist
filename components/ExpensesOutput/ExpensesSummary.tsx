import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { T_Expense } from "../../types";

interface Props {
  expenses: Array<T_Expense>;
  expensePeriod: string;
}

export default function ExpensesSummary({ expensePeriod, expenses }: Props) {
  const expensesSum = expenses.reduce((sum: T_Expense["amount"], expense: T_Expense) => {
    return sum + expense.amount;
  }, 0);

  return (
    <View style={styles?.container}>
      <Text style={styles?.period} > {expensePeriod} </Text>
      <Text style={styles?.sum} >${expensesSum?.toFixed(2)} </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  period: {
    fontSize: 12,
    color: GlobalStyles.colors.primary400,
  },
  sum: {
    fontSize: 16,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary500,
  },
});
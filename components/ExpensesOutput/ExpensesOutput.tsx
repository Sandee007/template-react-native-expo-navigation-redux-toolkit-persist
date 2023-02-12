import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { T_Expense } from "../../types";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";

interface Props {
  expensePeriod: string;
  expenses: Array<T_Expense>;
  fallbackText: string;
}

export default function ExpensesOutput({ expensePeriod, expenses, fallbackText }: Props) {
  return (
    <View style={styles?.container}>
      <ExpensesSummary expenses={expenses} expensePeriod={expensePeriod} />
      {expenses?.length > 0 ? (
        <ExpensesList expenses={expenses} />
      ) : (
        <Text style={styles.fallbackText}>{fallbackText}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  fallbackText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});

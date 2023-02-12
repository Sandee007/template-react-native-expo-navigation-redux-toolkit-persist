import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../components/UI/Button";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { useAppDispatch } from "../store/hooks";
import { RootStackParamList } from "../navigation/LinkingConfiguration";
import { E_ManageExpenseScreenModes, T_Expense } from "../types";
import { addExpense, deleteExpense, updateExpense } from "../store/slices/sliceExpenses";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";

export default function Screen_ManageExpense({
  navigation,
  route: {
    params: { mode, expense },
  },
}: NativeStackScreenProps<RootStackParamList, "Screen_ManageExpense">) {
  const dispatch = useAppDispatch();

  function deleteExpenseHandler() {
    dispatch(deleteExpense({ expense: expense! }));
    navigation.goBack();
  }

  function cancelExpenseHandler() {
    navigation.goBack();
  }

  function confirmExpenseHandler({ formInputs }: { formInputs: T_Expense }) {
    mode == E_ManageExpenseScreenModes["Edit Expense"]
      ? dispatch(
          updateExpense({
            expense: {
              ...formInputs,
              id: expense!.id!,
            },
          })
        )
      : dispatch(
          addExpense({
            expense: formInputs,
          })
        );
    navigation.goBack();
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: E_ManageExpenseScreenModes[mode],
    });
  }, []);

  return (
    <View style={styles.container}>
      <ExpenseForm onCancel={cancelExpenseHandler} onSubmit={confirmExpenseHandler} mode={mode} editExpense={expense} />
      {mode == E_ManageExpenseScreenModes["Edit Expense"] && (
        <View style={styles.deleteContainer}>
          <IconButton name="trash" color={GlobalStyles.colors.error500} size={36} onPress={deleteExpenseHandler} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});

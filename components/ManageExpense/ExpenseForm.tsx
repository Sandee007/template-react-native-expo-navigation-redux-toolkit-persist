import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { E_ManageExpenseScreenModes, T_Expense } from "../../types";
import Button from "../UI/Button";
import Input from "./Input";

type T_Form = {
  amount: { value: string; isValid: boolean };
  date: { value: string; isValid: boolean };
  description: { value: string; isValid: boolean };
};

interface Props {
  onSubmit: ({ formInputs }: { formInputs: T_Expense }) => void;
  onCancel: () => void;
  mode: E_ManageExpenseScreenModes;
  editExpense?: T_Expense;
}

export default function ExpenseForm({ onSubmit, onCancel, mode, editExpense }: Props) {
  const [isInvalidForm, setIsInvalidForm] = useState(false);
  const [formData, setFormData] = useState<T_Form>({
    amount: { value: editExpense?.amount.toString() || "", isValid: !!editExpense?.amount },
    date: { value: editExpense?.date || "", isValid: !!editExpense?.date },
    description: { value: editExpense?.description || "", isValid: !!editExpense?.description },
  });

  function inputChangedHandler(inputKey: keyof T_Form, input: string /** NOTE 'input' is provided automatically */) {
    setFormData((prev) => ({
      ...prev,
      [inputKey]: { value: input, isValid: true },
    }));
  }

  function submitHandler() {
    const isValid = {
      amount: Number(formData?.amount?.value) > 0,
      date: new Date(formData?.date?.value).toString() !== "Invalid Date",
      description: formData?.description?.value?.trim()?.length > 0,
    };

    if (!isValid.amount || !isValid.date || !isValid.description) {
      setFormData((prev) => ({
        amount: { value: prev?.amount?.value, isValid: isValid.amount },
        date: { value: prev?.date?.value, isValid: isValid.date },
        description: { value: prev?.description?.value, isValid: isValid.description },
      }));
      return setIsInvalidForm(true);
    }

    onSubmit({
      formInputs: {
        id: "",
        amount: +formData?.amount?.value, // ! + mark converts string to a number
        date: formData?.date?.value,
        description: formData?.description?.value,
      },
    });
  }

  return (
    <View style={styles.form}>
      <Text style={styles.title}> Your Expense </Text>
      <View style={styles.inputsRow}>
        <Input
          label="Amount"
          style={styles.rowInput}
          invalid={!formData?.amount?.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangedHandler.bind(self, "amount"),
            value: formData?.amount?.value,
          }}
        />
        <Input
          label="Date"
          style={styles.rowInput}
          invalid={!formData?.date?.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(self, "date"),
            value: formData?.date?.value,
          }}
        />
      </View>
      <Input
        label="Description"
        invalid={!formData?.description?.isValid}
        textInputConfig={{
          multiline: true,
          autoCapitalize: "words",
          onChangeText: inputChangedHandler.bind(self, "description"),
          value: formData?.description?.value,
        }}
      />
      {isInvalidForm && <Text style={styles?.errorText}>Invalid Input. Try Again. </Text>}
      <View style={styles.buttonContainer}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {E_ManageExpenseScreenModes[mode]}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    // marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginVertical: 24,
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error50,
    margin: 8,
    marginBottom: 32,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});

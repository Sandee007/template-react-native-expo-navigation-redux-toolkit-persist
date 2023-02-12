import { useAppSelector } from "../hooks";
import { DUMMY_EXPENSES, I_sliceExpenses } from "../slices/sliceExpenses";

export default function useExpensesSelector() {
  return {
    expenses: useAppSelector((state) => state?.sliceExpenses?.expenses),
    // expenses: DUMMY_EXPENSES,
  };
}

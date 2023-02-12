import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { T_Expense } from "../../types";

export const DUMMY_EXPENSES: Array<T_Expense> = [
  {
    id: "e1",
    description: "Shoes",
    amount: 59.99,
    // date: new Date("2021-12-19"),
    date: "2021-12-19",
  },
  {
    id: "e2",
    description: "Pants",
    amount: 89.29,
    // date: new Date("2022-01-05"),
    date: "2022-01-05",
  },
  {
    id: "e3",
    description: "Bananas",
    amount: 5.99,
    // date: new Date("2023-02-01"),
    date: "2023-02-01",
  },
  {
    id: "e4",
    description: "Book",
    amount: 14.99,
    // date: new Date("2023-02-01"),
    date: "2023-02-01",
  },
  {
    id: "e5",
    description: "Book 2",
    amount: 18.59,
    // date: new Date("2023-02-01"),
    date: "2023-02-01",
  },
];

export interface I_sliceExpenses {
  expenses: Array<T_Expense>;
}

const initialState: I_sliceExpenses = {
  expenses: [],
};

const sliceExpenses = createSlice({
  name: "sliceExpenses",
  initialState,
  reducers: {
    setExpenses: (state) => {
      state.expenses = DUMMY_EXPENSES;
    },
    addExpense: (state, { payload: { expense } }: PayloadAction<{ expense: T_Expense }>) => {
      state.expenses?.push({ ...expense, id: new Date().toString() + Math.random().toString() });
    },
    deleteExpense: (state, { payload: { expense } }: PayloadAction<{ expense: T_Expense }>) => {
      state.expenses = state?.expenses?.filter((i) => i?.id !== expense?.id);
    },
    updateExpense: (state, { payload: { expense } }: PayloadAction<{ expense: T_Expense }>) => {
      const index = state?.expenses?.findIndex((i) => i?.id === expense?.id);
      state.expenses[index] = expense;
    },
  },
});

export const { addExpense, deleteExpense, updateExpense, setExpenses } = sliceExpenses.actions;
export default sliceExpenses.reducer;

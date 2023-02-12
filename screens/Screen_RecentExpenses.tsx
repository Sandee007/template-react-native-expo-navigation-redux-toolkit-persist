import { useLayoutEffect } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useAppDispatch } from "../store/hooks";
import useExpensesSelector from "../store/selectors/useExpensesSelector";
import { DUMMY_EXPENSES, setExpenses } from "../store/slices/sliceExpenses";
import { getDateMinusDays } from "../util/date";

const Screen_RecentExpenses: React.FC = () => {
  const { expenses } = useExpensesSelector();
  // const dispatch = useAppDispatch();

  // useLayoutEffect(() => {
  //   dispatch(setExpenses())
  // }, []);

  const recentExpenses = expenses?.filter?.((i) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays({
      date: today,
      days: 7,
    });
    return new Date(i?.date) >= date7DaysAgo && new Date(i?.date) <= today;
  });

  return <ExpensesOutput expensePeriod={"Last 7 Days"} expenses={recentExpenses} fallbackText="No Expenses Registered for the last 7 days." />;
};
export default Screen_RecentExpenses;

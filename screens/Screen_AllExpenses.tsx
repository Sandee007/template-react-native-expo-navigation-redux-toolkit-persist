import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import useExpensesSelector from '../store/selectors/useExpensesSelector';

const Screen_AllExpenses = () => {
  const {expenses} = useExpensesSelector()

  return <ExpensesOutput expensePeriod={'Total'} expenses={expenses}  fallbackText="No Expenses Registered." />
};
export default Screen_AllExpenses;

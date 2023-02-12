export function getFormattedDate({ date }: { date: string }) {
//   return `${date?.getFullYear()}-${(date?.getMonth()+1)}-${date?.getDate()}`
  // return new Date(date).toLocaleDateString();
  return new Date(date).toISOString().slice(0,10)
}

export function getDateMinusDays({ date, days }: { date: Date; days: number }) {
  return new Date(date?.getFullYear(), date?.getMonth(), date?.getDate() - days);
}

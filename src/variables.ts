export const defaultMonths = {
  january: 31,
  february: 28,
  march: 31,
  april: 30,
  may: 31,
  june: 30,
  july: 31,
  august: 31,
  september: 30,
  october: 31,
  november: 30,
  december: 31,
};

export const _year: { [key in InameMonth]: Imonth } = {
  january: {
    id: "1",
    days: 31,
    workedDays: 0,
    name: "january",
    salary: { off: 0, unoff: 0 },
    transactions: [{ id: "1", amount: 200, date: "111", type: "bounty" }],
  },
  february: {
    id: "2",
    days: 28,
    workedDays: 0,
    name: "february",
    salary: { off: 0, unoff: 0 },
    transactions: [],
  },
  march: {
    id: "3",
    days: 31,
    workedDays: 0,
    name: "march",
    salary: { off: 0, unoff: 0 },
    transactions: [],
  },
  april: {
    id: "4",
    days: 30,
    workedDays: 0,
    name: "april",
    salary: { off: 0, unoff: 0 },
    transactions: [],
  },
  may: {
    id: "5",
    days: 31,
    workedDays: 0,
    name: "may",
    salary: { off: 0, unoff: 0 },
    transactions: [],
  },
  june: {
    id: "6",
    days: 30,
    workedDays: 0,
    name: "june",
    salary: { off: 0, unoff: 0 },
    transactions: [],
  },
  july: {
    id: "7",
    days: 31,
    workedDays: 0,
    name: "july",
    salary: { off: 0, unoff: 0 },
    transactions: [],
  },
  august: {
    id: "8",
    days: 31,
    workedDays: 0,
    name: "august",
    salary: { off: 0, unoff: 0 },
    transactions: [],
  },
  september: {
    id: "9",
    days: 30,
    workedDays: 0,
    name: "september",
    salary: { off: 0, unoff: 0 },
    transactions: [],
  },
  october: {
    id: "10",
    days: 31,
    workedDays: 0,
    name: "october",
    salary: { off: 0, unoff: 0 },
    transactions: [],
  },
  november: {
    id: "11",
    days: 30,
    workedDays: 0,
    name: "november",
    salary: { off: 0, unoff: 0 },
    transactions: [],
  },
  december: {
    id: "12",
    days: 31,
    workedDays: 0,
    name: "december",
    salary: { off: 0, unoff: 0 },
    transactions: [],
  },
};

type InameMonth =
  | "january"
  | "february"
  | "march"
  | "april"
  | "may"
  | "june"
  | "july"
  | "august"
  | "september"
  | "october"
  | "november"
  | "december";

type idayMonth = 28 | 29 | 30 | 31;

export type Imonth = {
  id: string;
  days: idayMonth;
  workedDays: number;
  name: InameMonth;
  salary: {
    off: number;
    unoff: number;
  };
  transactions: Itransaction[];
};

export type ItypeTransaction = "salary" | "bounty" | "vacation" | "sickness";

export type Itransaction = {
  id: string;
  date: string;
  amount: number;
  type: ItypeTransaction;
};

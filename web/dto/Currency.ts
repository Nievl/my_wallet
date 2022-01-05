export interface ICurrency {
  id: number;
  name: string;
  description: string | null;
}
export type CurrencyRequest = Omit<ICurrency, 'id'>;

export interface ICategory {
  id: number;
  name: string;
  description: string | null;
}

export type CategoryRequest = Omit<ICategory, 'id'>;

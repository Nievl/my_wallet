import { Salary } from '../../src/models/entity/Salary';

export type ISalary = Salary;
export type SalaryRequest = Omit<Salary, 'id'>;

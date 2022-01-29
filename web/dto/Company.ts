import { Company } from '../../src/models/entity/Company';

export type ICompany = Company;
export type CompanyRequest = Omit<Company, 'id'>;

import { IFilter } from './filter.interface';

export interface ISearch {
  id: number;
  name: string;
  description: string;
  isDefault: boolean;
  isPublic: boolean;
  filters: IFilter[];
}

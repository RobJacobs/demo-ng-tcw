export interface IPerson {
  id: number;
  firstName: string;
  lastName: string;
  gender: 'male' | 'female';
  occupation?: string;
  quote?: string;
  url?: string;
}

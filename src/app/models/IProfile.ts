import { IPerson } from './IPerson';

export interface IProfile extends IPerson {
  email: string;
  phone: string;
  dateOfBirth: Date;
  address: {
    name: string;
    street: string;
    city: string;
    state: string;
    zip: string;
  };
}

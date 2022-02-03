export default interface User {
  _id?: string;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  isActive: boolean;
  // playRecord: any[];
  registerDate: Date;
}

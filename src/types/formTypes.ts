export interface Register{
  name: string
  email: string
  password: string
  salary: Number
}

export interface Login{
  email: string
  password: string
}

export interface Expenditure{
    id: string;
    price: number;
    descript: string;
    category: string;
    userId: string;
    created_at: Date;
    updated_at: Date;
}

export interface Balance{
  id: string;
  price: number;
  descript: string;
  userId: string;
  created_at: Date;
  updated_at: Date;
}
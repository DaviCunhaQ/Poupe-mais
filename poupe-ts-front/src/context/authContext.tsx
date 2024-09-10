import { createContext } from "react"
import { userType } from "../types/userTypes"
import { Balance, Expenditure, Login, Register } from "../types/formTypes"

interface contentState {
  isLogado: boolean,
  login: (formData: Login)=>Promise<void>,
  SignUp: (formData: Register)=>Promise<void>,
  logout: ()=>void,
  user : null | userType,
  showUser: () => Promise<void>
  exp: Expenditure[] | null
  expDate: Expenditure[] | null
  bal: Balance[] | null
  totalExp: number
  totalBal: number
  getBalances: () => Promise<void>
  getExpenditures: ()=> Promise<void>
  setTotalExp: React.Dispatch<React.SetStateAction<number>>
  setTotalBal: React.Dispatch<React.SetStateAction<number>>
  total: number
  showTotal: () => Promise<void>
}
export const AuthContext = createContext<contentState>({
  isLogado: false,
  logout: () => {},
  login: async () => {},
  SignUp: async () => {},
  user: null,
  showUser: async () => {},
  exp: [],
  expDate: [],
  bal: [],
  totalExp: 0,
  totalBal: 0,
  getBalances: async() =>{},
  getExpenditures: async ()=> {},
  setTotalExp: ()=>{},
  setTotalBal: ()=>{},
  total: 0,
  showTotal: async () => {}
})


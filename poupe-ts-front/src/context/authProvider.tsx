import { useCallback, useEffect, useState } from "react";
import { AuthContext } from "./authContext";
import axios, { AxiosError } from "axios";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";
import { Balance, Expenditure, Login, Register } from "../types/formTypes";
import toast, { Toaster } from 'react-hot-toast'
import { sumTotal } from "../utils/sumTotal";

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({children}:AuthProviderProps){

  const userId = localStorage.getItem("id")

  const [isLogado, SetIsLogado] = useState(false)
  const [user, setUser] = useState(null)
  const [exp , setExp] = useState<Expenditure[] | null>(null)
  const [expDate, setExpDate] = useState<Expenditure[] | null>(null)
  const [bal , setBal] = useState<Balance[] | null>(null)
  const [totalExp, setTotalExp] = useState(0)
  const [totalBal, setTotalBal] = useState(0)
  const [total, setTotal] = useState(0)
  const navigate = useNavigate()
   
  function handleError(error: unknown){
    if (error instanceof axios.AxiosError) {
      console.log(error);
      toast.error(error.response?.data.message)
    } else{
      console.log(error);
    }
  };

  const showUser = useCallback(async ()=>{
      const userId = localStorage.getItem("id")
      
      try {
        const userResponse = await api.get(`/users/show/${userId}`)
        const dataUser = userResponse.data
        setUser(dataUser)
      } catch (error) {
        throw new Error("erraro")
      }

      
  }, [bal, exp])

  
  async function login(formData: Login){
    try{
      const {data} = await api.post('/sessions', formData)
      SetIsLogado(true)
      localStorage.setItem("token", data.token)
      localStorage.setItem("id", data.id)
      showUser()
      window.location.href = "/app"
    }catch(error){
      handleError(error)
    }
  }

  
  async function SignUp (formData: Register) {
    try{
      await api.post('/users/create', formData)
      navigate("/login")
      toast.success("Cadastrado com sucesso")
      
    }catch(error){
      handleError(error)
    }
  }

  function logout (){
    localStorage.removeItem("token")
    SetIsLogado(false)
    navigate("/")
  }
  async function getExpenditures(){
    const expResponse = await api.get(`/expenditures/list/${userId}`)
    const expResponseDate = await api.get(`/expenditures/listByDate/${userId}`)

    const expByDate = expResponseDate.data as Expenditure[]

    const expData = expResponse.data.expenditures as Expenditure[]

    const sumTotalExp = expResponse.data.totalExp as number
    
    setExp(expData)
    setTotalExp(sumTotalExp)
    setExpDate(expByDate)
  }
 
  async function getBalances() {
    const balResponse = await api.get(`/balances/list/${userId}`)
    

    const balData = balResponse.data.balances as Balance[]

    const sumTotalBal = balResponse.data.totalBal as number

    setBal(balData)
    setTotalBal(sumTotalBal)
  }

  const showTotal = useCallback(async ()=>{
    const balResponse = await api.get(`/balances/list/${userId}`)
    const sumTotalBal = balResponse.data.totalBal as number
    const expResponse = await api.get(`/expenditures/list/${userId}`)
    const sumTotalExp = expResponse.data.totalExp as number
    const soma = await sumTotal(userId,sumTotalBal, sumTotalExp)
    setTotal(soma)
  },[user])

  useEffect(()=>{ 
    const token = localStorage.getItem("token")
    if (!token){
      navigate("/", {replace:true})
    }else{
      SetIsLogado(true)
    }
    
    
    showUser()
    
  },[])
  return(
  <AuthContext.Provider value={{login,logout,SignUp, isLogado, user, showUser, bal, exp,expDate, totalBal, totalExp ,getBalances,getExpenditures,setTotalBal,setTotalExp, showTotal, total}}>
    <Toaster/>
    {children}
  </AuthContext.Provider>
  )
    
}


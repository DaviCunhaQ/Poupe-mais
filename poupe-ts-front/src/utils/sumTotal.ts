import { api } from "../services/api";

export async function sumTotal (userId: string | null,totalBal: number, totalExp: number){
  const user = await api.get(`users/show/${userId}`)
  const userData =  user.data
  if(totalBal && totalExp){
    return userData.salary + totalBal - totalExp
  }else if(totalBal && !totalExp){
    return userData.salary + totalBal
  }else if(!totalBal && totalExp){
    return userData.salary - totalExp
  }else{
    return userData.salary
  }

}
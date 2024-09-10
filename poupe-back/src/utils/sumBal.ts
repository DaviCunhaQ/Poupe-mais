import { Balance } from "../@types/formTypes"

export function sumBalances(bal: Balance[]){
    const initialValue = 0
    const sum = bal?.reduce(
      (acc: number, curr: Balance) => acc + curr.price,
      initialValue
    )
    return sum
}
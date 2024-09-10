import { Expenditure } from "../@types/formTypes"

export function sumExpenditures(exp: Expenditure[]){
    const initialValue = 0
    const sum = exp?.reduce(
      (acc: number, curr: Expenditure) => acc + curr.price,
      initialValue
    )
    return sum
}
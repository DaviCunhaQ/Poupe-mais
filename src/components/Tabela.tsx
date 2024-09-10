
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import { api } from "../services/api";

export function TableExp() {
  const {getBalances, getExpenditures, bal, expDate } = useContext(AuthContext)

  async function deleteExpenditures(id: string){
    await api.delete(`/expenditures/delete/${id}`)
    window.location.href = '/app'
  }
  async function deleteBalances(id: string){
    await api.delete(`/balances/delete/${id}`)
    window.location.href = '/app'
  }

  useEffect(()=>{
    getBalances()
    getExpenditures()
  },[])
  return (
    <div className="overflow-x-auto">
      <Table hoverable>
        <TableHead>
          <TableHeadCell className="bg-verde-secundario text-branco">Nome</TableHeadCell>
          <TableHeadCell className="bg-verde-secundario text-branco">Tipo</TableHeadCell>
          <TableHeadCell className="bg-verde-secundario text-branco">Categoria</TableHeadCell>
          <TableHeadCell className="bg-verde-secundario text-branco">Preço</TableHeadCell>
          <TableHeadCell className="bg-verde-secundario">
            <span className="sr-only">Edit</span>
          </TableHeadCell>
        </TableHead>
        <TableBody className="divide-y">
          {
            bal && bal.map((element, index)=>{
              return (
                <TableRow key={index} className="bg-menta border-verde-saldo dark:border-gray-700 dark:bg-gray-600 hover:#5BBA6F1A hover:transition">
                  <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {element.descript}
                  </TableCell>
                  <TableCell>Saldo</TableCell>
                  <TableCell> - x - </TableCell>
                  <TableCell>R$ {element.price}</TableCell>
                  <TableCell>
                    <a onClick={()=>{deleteBalances(element.id)}}  className="cursor-pointer font-medium text-vermelho-despesas hover:underline dark:text-vermelho-despesas">
                      Deletar
                    </a>
                  </TableCell>
                </TableRow>
              )
            })
          }
          {
            expDate && expDate.map((element, index)=>{
              return (
                <TableRow key={index} className="bg-menta border-verde-saldo dark:border-gray-700 dark:bg-gray-600 hover:#5BBA6F1A hover:transition">
                  <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {element.descript}
                  </TableCell>
                  <TableCell>Despesa</TableCell>
                  <TableCell> {element.category} </TableCell>
                  <TableCell>R$ {element.price}</TableCell>
                  <TableCell>
                    <a onClick={()=>{deleteExpenditures(element.id)}} className="cursor-pointer font-medium text-vermelho-despesas hover:underline dark:text-vermelho-despesas">
                      Deletar
                    </a>
                  </TableCell>
                </TableRow>
              )
            })
          }
          
        </TableBody>
      </Table>
    </div>
  );
}

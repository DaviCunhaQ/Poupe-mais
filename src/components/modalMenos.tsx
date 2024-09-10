import Modal from 'react-modal'
import Icone from '../assets/iconemenos.svg'
import Send from '../assets/send.svg'
import CurrencyInput from 'react-currency-input-field'
import { api } from '../services/api'
import { FormEvent, useState } from 'react'
import { userType } from '../types/userTypes'

interface ModalPlusProps{
  isOpen: boolean,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>> 
  user : userType | null
}

export const ModalNegative = ({isOpen, setIsOpen, user}: ModalPlusProps)=>{
  const [descript, setDescript] = useState('')
  const [price, setPrice] = useState(0)
  const [category, setCategory] = useState('')
  const userId = user?.id

  async function sendExpenditure (e: FormEvent){
    e.preventDefault()
    try {
      await api.post(`expenditures/create/${userId}`, {
        descript: descript,
        category: category,
        price: price
      })
      setDescript('')
      setCategory('')
      setPrice(0)
      setIsOpen(false)
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={()=>setIsOpen(false)} className='relative w-[382px] h-auto bg-menta rounded-[15px] flex flex-col items-center mx-auto mt-[25vh] border border-verde-contorno'>
      <img src={Icone} alt="" className='absolute bottom-[420px]' />
      <form onSubmit={sendExpenditure} className='w-[232px] h-auto mt-[58px] flex flex-col gap-[21px] items-center'>
          <p className='font-[poppins] text-[16px] font-normal text-normal leading-normal text-cinza-texto '>Adicione uma despesa</p>
          <CurrencyInput
                id="input-example"
                name="input-name"
                placeholder="R$"
                decimalsLimit={2}
                prefix='R$ '
                onValueChange={(_value, _name, values) => setPrice(values?.float!)}
                className="focus:outline-none border border-verde-contorno w-full rounded-md p-4 text-[16px] text-normal leading-normal font-normal text-verde-fundo font-[poppins]"
          />
          <input value={category} onChange={(e)=>{setCategory(e.target.value)}} type="text" placeholder='Categoria' className='focus:outline-none border border-verde-contorno w-full rounded-md p-4 text-[16px] text-normal leading-normal font-normal text-verde-fundo font-[poppins]'/>
          <input value={descript} onChange={(e)=>{setDescript(e.target.value)}} type="text" placeholder='Descrição' className='focus:outline-none border border-verde-contorno w-full rounded-md p-4 text-[16px] text-normal leading-normal font-normal text-verde-fundo font-[poppins]'/>
          <button className='mb-[52px] flex cursor-pointer bg-verde-principal justify-evenly w-[160px] pt-4 pb-4 rounded-2xl'>
            <p className='cursor-pointer font-[poppins] text-[16px] font-normal text-normal leading-normal text-branco'>Confirmar</p>
            <img src={Send} alt="" />
            
          </button>
      </form>
    </Modal>
  )
}
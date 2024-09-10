import Modal from 'react-modal'
import Icone from '../assets/iconemais.svg'
import Send from '../assets/send.svg'
import CurrencyInput from 'react-currency-input-field'
import { userType } from '../types/userTypes'
import { ChangeEvent, FormEvent, useState } from 'react'
import { api } from '../services/api'

interface ModalPlusProps{
  isOpen: boolean,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  user: userType | null
}

export const ModalPlus = ({isOpen, setIsOpen, user}: ModalPlusProps)=>{
  const [descript, setDescript] = useState('')
  const [price, setPrice] = useState(0)
  const userId = user?.id

  async function sendBalance (e: FormEvent){
    e.preventDefault()
    try {
      await api.post(`balances/create/${userId}`, {
        descript: descript,
        price: price
      })
      setDescript('')
      setPrice(0)
      setIsOpen(false)
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={()=>setIsOpen(false)} className='relative w-[382px] h-auto bg-menta rounded-[15px] flex flex-col items-center mx-auto mt-[30vh] border border-verde-contorno'>
      <img src={Icone} alt="" className='absolute bottom-[295px]' />
      <form onSubmit={sendBalance} className='w-[232px] h-auto mt-[58px] flex flex-col gap-[21px] items-center'>
          <p className='font-[poppins] text-[16px] font-normal text-normal leading-normal text-cinza-texto '>Adicione um saldo</p>
          <CurrencyInput
                id="input-example"
                name="input-name"
                placeholder="R$"
                decimalsLimit={2}
                prefix='R$ '
                onValueChange={(value, name, values) => setPrice(values?.float!)}
                className="focus:outline-none border border-verde-contorno w-full rounded-md p-4 text-[16px] text-normal leading-normal font-normal text-verde-fundo font-[poppins]"
          />
          <input value={descript} onChange={(e)=>{setDescript(e.target.value)}} type="text" placeholder='Descrição' className='focus:outline-none border border-verde-contorno w-full rounded-md p-4 text-[16px] text-normal leading-normal font-normal text-verde-fundo font-[poppins]'/>
          <button className='mb-[26px] flex cursor-pointer bg-verde-principal justify-evenly w-[160px] pt-4 pb-4 rounded-2xl'>
            <p className='cursor-pointer font-[poppins] text-[16px] font-normal text-normal leading-normal text-branco'>Confirmar</p>
            <img src={Send} alt="" />
          </button>
      </form>
    </Modal>
  )
}
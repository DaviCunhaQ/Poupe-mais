import Modal from 'react-modal'
import Icone from '../assets/iconefiltro.svg'
import Send from '../assets/send.svg'
import CurrencyInput from 'react-currency-input-field'
import { userType } from '../types/userTypes'
import { FormEvent, useState } from 'react'
import { api } from '../services/api'

interface ModalPlusProps{
  isOpen: boolean,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>> 
  user: userType | null
}

export const ModalChange = ({isOpen, setIsOpen, user}: ModalPlusProps)=>{
  
  const [name, setName] = useState('')
  const [salary, setSalary] = useState(0)
  const userId = user?.id
  async function updateAccount(e: FormEvent){
    e.preventDefault()
    try {
      await api.put(`users/update/${userId}`,{
        name: name,
        salary: salary
      })
      setIsOpen(false)
      setName('')
      setSalary(0)
    } catch (error) {
      console.log(error);
    }
  }

  const redefineAccount = async ()=>{
    try {
      await api.put(`users/redefine/${userId}`)
      setIsOpen(false)
      setName('')
      setSalary(0)
      
    } catch (error) {
      console.log(error);
    }
  }

  const deleteAccount = async ()=>{
    try {
      await api.delete(`users/delete/${userId}`)
      localStorage.removeItem("token")
      window.location.href = "/"
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={()=>setIsOpen(false)} className='relative w-[382px] h-auto bg-menta rounded-[15px] flex flex-col items-center mx-auto mt-[20vh] border border-verde-contorno'>
      <img src={Icone} alt="" className='absolute bottom-[450px]' />
      <p className='mt-[71px] font-[poppins] text-[16px] font-normal text-normal leading-normal text-cinza-texto '>Configure sua conta</p>
        <div className='w-[232px] h-[367px] mt-[24px] flex flex-col justify-between items-center'>
          <form onSubmit={updateAccount} className='flex flex-col justify-between items-center'>
            <div className='h-auto flex flex-col items-start'>
              <p className='font-[poppins] text-[16px] font-normal text-normal leading-normal text-cinza-texto '>Nome</p>
              <input value={name} onChange={(e)=>{setName(e.target.value)}} type="text" placeholder='Nome' name='nome' className='focus:outline-none border border-verde-contorno w-full rounded-md p-4 text-[24px] text-normal leading-normal font-normal text-verde-fundo font-[poppins]'/>  
            </div>
            <div className='h-auto flex flex-col items-start'>
              <p className='font-[poppins] text-[16px] font-normal text-normal leading-normal text-cinza-texto '>Renda mensal</p>
              <CurrencyInput
                  id="input-example"
                  name="input-name"
                  placeholder="R$"
                  decimalsLimit={2}
                  prefix='R$ '
                  onValueChange={(_value, _name, values) => setSalary(values?.float!)}
                  className="focus:outline-none border border-verde-contorno w-full rounded-md p-4 text-[24px] text-normal leading-normal font-normal text-verde-fundo font-[poppins] mb-[26px]"
              />
            </div>
            <button type="submit" className='flex cursor-pointer bg-verde-principal justify-evenly w-[160px] pt-4 pb-4 rounded-2xl'>
              <p className='cursor-pointer font-[poppins] text-[16px] font-normal text-normal leading-normal text-branco'>Confirmar</p>
              <img src={Send} alt="" />
            </button>
          </form>
          <div id='actions' className='mb-[26px] flex flex-col items-center'>
            <button type='button' onClick={deleteAccount} className='hover:text-[#9f5151] decoration-[none] text-vermelho-despesas font-[poppins] text-[16px] text-normal font-normal leading-normal'>Apagar conta</button>
            <button type='button' onClick={redefineAccount} className='hover:text-[#4f8dc7] decoration-[none] text-azul-options font-[poppins] text-[16px] text-normal font-normal leading-normal'>Redefinir conta</button>
          </div>
        </div>
    </Modal>
  )
}
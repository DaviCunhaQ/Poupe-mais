import Modal from 'react-modal'
import Icone from '../assets/iconegrafico.svg'
import ElipseVerde from '../assets/Ellipse verde.svg'
import ElipseVermelha from '../assets/elipseVermelha.svg'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../context/authContext'

interface ModalPlusProps{
  isOpen: boolean,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>> 
}



export const ModalGraphic = ({isOpen, setIsOpen}: ModalPlusProps)=>{
  const {getBalances, getExpenditures, bal, expDate} = useContext(AuthContext)

  useEffect(()=>{
    getBalances()
    getExpenditures()
  },[])
  return (
    <Modal isOpen={isOpen} onRequestClose={()=>setIsOpen(false)} className='relative w-[382px] h-auto bg-menta rounded-[15px] flex flex-col items-center mx-auto mt-[30vh] border border-verde-contorno'>
      <img src={Icone} alt="" className='height-custom' />
      <p className='mt-[68px] text-[24px] text-normal leading-normal font-normal text-verde-fundo font-[poppins]'>Extrato da conta</p>
      <table className='w-[328px] h-auto mb-[33px] mt-[26px] flex flex-col gap-[12px] items-start'>
          <tbody>
            {bal && bal.map((element, index)=>{
              return (
                <div key={index} className='flex justify-between items-center h-auto w-full'>
                  <img src={ElipseVerde} alt="" className='h-[10px] w-[10px] mr-2'/>
                  <p className='font-[poppins] text-[16px] font-normal text-normal leading-normal text-cinza-texto text-start w-[240px]'>{element.descript}</p>
                  <div className="flex">
                    <p className='font-[poppins] text-[16px] font-normal text-normal leading-normal text-cinza-texto'>R$</p>
                    <p className='font-[poppins] text-[16px] font-normal text-normal leading-normal text-cinza-texto mr-3'>{element.price}</p>
                  </div>
                </div>
              )
            })
            }
            {expDate && expDate.map((element, index)=>{
              return (
                <div key={index} className='flex justify-between items-center h-auto w-full'>
                  <img src={ElipseVermelha} alt="" className='h-[10px] w-[10px] mr-2'/>
                  <p className='font-[poppins] text-[16px] font-normal text-normal leading-normal text-cinza-texto text-start w-[240px]'>{element.descript}</p>
                  <div className="flex">
                    <p className='font-[poppins] text-[16px] font-normal text-normal leading-normal text-cinza-texto'>R$</p>
                    <p className='font-[poppins] text-[16px] font-normal text-normal leading-normal text-cinza-texto mr-3'>{element.price}</p>
                  </div>
                </div>
              )
            })
            }
          </tbody>
      </table>
    </Modal>
  )
}
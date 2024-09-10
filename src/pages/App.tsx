import { useContext, useEffect, useState } from 'react'
import logo from '../assets/logo.svg'
import logoPoupeBranca from '../assets/logoPoupeBranca.svg'
import sair from '../assets/sair.svg'
import elipse from '../assets/Ellipse.svg'
import elipseMais from '../assets/elipse-mais.svg'
import elipseMenos from '../assets/elipse-menos.svg'
import elipseFiltro from '../assets/elipse-filtro.svg'
import elipseEstatistica from '../assets/elipse-estatística.svg'
import elipseAzul from '../assets/Ellipse azul.svg'
import { ModalPlus } from '../components/modalMais'
import { ModalNegative } from '../components/modalMenos'
import { ModalGraphic } from '../components/modalGrafico'
import { ModalChange } from '../components/modalMudar'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import { TableExp } from '../components/Tabela'


function App() {
  const {logout, user, showUser,exp,getBalances,getExpenditures,totalBal,totalExp, showTotal, total} = useContext(AuthContext)
  const userId = localStorage.getItem("id")
  const navigate = useNavigate()
  const [isOpenBalances, setIsOpenBalances] = useState(false)
  const [isOpenExpenditures, setIsOpenExpenditures] = useState(false)
  const [isOpenChange, setIsOpenChange] = useState(false)
  const [isOpenGraphic, setIsOpenGraphic] = useState(false)

  useEffect(()=>{
    showTotal()
  },[user, isOpenChange, isOpenExpenditures, isOpenBalances])

  useEffect(() => {
    const executeFunctions = async () => {
      try {
        await showUser();  // Propaga qualquer erro aqui
        await getExpenditures();
        await getBalances();
      } catch (error) {
        console.error("Erro capturado no useEffect:", error);  // Captura e lida com o erro
        localStorage.clear();
        navigate("/");
      }
    };
  
    executeFunctions();  // Função assíncrona chamada
  }, [userId, isOpenChange, isOpenExpenditures, isOpenBalances]);
  


  
  return (
    <>
      <div className="min-h-[100vh] flex flex-col justify-between bg-menta max-w-[1920px]">
          <header className='max-xl:p-0 max-xl:justify-around flex bg-verde-secundario justify-between pl-[103px] pr-[103px] pt-[16px] pb-[16px] w-full h-[80px] items-center shadow-custom-light'>
            <Link target="_blank" to="https://www.uxsoftware.com.br/"><img src={logo} className="h-[47px]" alt="logo" /></Link>
            <img src={logoPoupeBranca} className="h-[32px]" alt="logoPoupe" />
            <button><img src={sair} className="h-[46px]" alt="sair" onClick={logout}/></button>
          </header>
          <main className="max-xl:p-[24px] flex flex-col items-center bg-menta pt-[33px]">
          <div id="TOPO" className='max-sm:justify max-xl:gap-x-[10px] max-xl:max-w-full max-xl:items-start max-xl:pt-[13px] max-xl:pb-[13px] max-xl:pl-[17px] max-xl:pr-[17px] max-xl:flex-wrap max-xl:gap-6 max-xl:w-full shadow-custom-light border border-solid border-verde-contorno w-[70%] max-w-[70%] h-auto bg-menta rounded-[15px] flex justify-between items-center pl-[75px] pr-[75px] pt-[30px] pb-[30px] mb-[32px]'>
                <div id="HOMI" className=' w-auto flex max-sm:w-[30%] max-xl:w-[45%]'>
                    <img src={elipse} className='max-sm:w-[67px] mr-[19px]' alt="" />
                    <div id="OI" className='flex flex-col'>
                      <p className='w-32 font-[poppins] text-[16px] text-cinza-texto leading-normal'>Boa tarde</p>
                      <h1 className='max-sm:text-[24px] font-[poppins] text-[32px] leading-normal text-verde-fundo font-semibold'>{user?.name}!</h1>
                    </div>
                  </div>
                  <div id="DIN" className='max-xl:w-[45%] max-xl:order-none order-last flex flex-col items-end'>
                    <p className='text-end w-32 font-[poppins] text-[16px] text-cinza-texto leading-normal'>Saldo geral</p>
                    <div className="flex items-center">
                      <h1 className='max-sm:text-[24px] font-[poppins] text-[32px] font-extralight leading-normal text-verde-secundario'>R$</h1>
                      <h1 className='max-sm:max-w-[90px] max-sm:text-[24px] font-[poppins] text-[32px] font-semibold text-verde-secundario leading-normal ml-2 text-pretty'>{total}</h1>
                    </div>
                  </div>
                <div id="CASH" className="max-xl:w-full max-xl:justify-around flex ">
                  <div className='RECEITA mr-[54px]'>
                    <p className='font-[poppins] text-[16px] text-cinza-texto leading-normal'>Receita mensal</p>
                    <div className="flex">
                        <h2 className=' font-[poppins] text-[16px] font-semibold justify-center text-verde-principal'>+</h2>
                        <h2 className=' font-[poppins] text-[16px] font-light justify-center text-verde-principal mr-1'>R$</h2>
                        <h2 className=' font-[poppins] text-[16px] font-semibold justify-center text-verde-principal'>{totalBal}</h2>
                    </div>
                  </div>
                  <div className='DESPESA'>
                    <p className='font-[poppins] text-[16px] text-cinza-texto leading-normal'>Despesa mensal</p>
                    <div className="flex">
                        <h2 className=' font-[poppins] text-[16px] font-semibold justify-center text-vermelho-despesas'>-</h2>
                        <h2 className=' font-[poppins] text-[16px] font-light justify-center text-vermelho-despesas mr-1'>R$</h2>
                        <h2 className=' font-[poppins] text-[16px] font-semibold justify-center text-vermelho-despesas'>{totalExp}</h2>
                    </div>
                  </div>
                </div>
              
            </div>

            <div id="meio"className='max-xl:max-w-full max-xl:w-full max-xl:flex-col flex justify-between w-[70%] max-w-[70%] mb-[32px] h-[auto]'>
              <div id="direita"className='max-xl:max-w-full max-xl:w-full flex flex-col w-[38%]'>
                <div id="DIREITA-TOPO" className=' max-xl:max-w-full max-xl:items-start max-xl:gap-[1rem] mb-[32px] p-[24px] shadow-custom-light border border-solid border-verde-contorno w-full h-auto flex flex-col gap-4 rounded-[15px] justify-between'>
                  <p className='font-[poppins] text-[16px] text-cinza-texto leading-normal'>Acesso rápido</p>
                  <div className="max-w-full max-xl: flex justify-between w-full ">
                      <button onClick={()=>setIsOpenBalances(true)}><img src={elipseMais} alt="" /></button>
                      <button onClick={()=>setIsOpenExpenditures(true)}><img src={elipseMenos} alt="" /></button>
                      <button onClick={()=>setIsOpenChange(true)}><img src={elipseFiltro} alt="" /></button>
                      <button onClick={()=>setIsOpenGraphic(true)}><img src={elipseEstatistica} alt="" /></button>
                  </div>
                </div>
                <div id="DIREITA-BAIXO" className=' h-auto shadow-custom-light p-[24px] border border-solid border-verde-contorno w-full rounded-[15px] mb-8'>
                  <table className='flex flex-col gap-[10px]'>
                    <thead><h2 className='h-auto font-[poppins] text-[16px] font-normal leading-normal text-cinza-texto'>Maiores gastos do mês</h2></thead>
                    <tbody className='flex flex-col gap-[10px]'>
                      {exp && exp.map((element,index)=>{
                        return (
                          <div key={index} className='flex h-auto justify-between'>
                            <div className='flex items-center gap-[16px]'>
                              <img src={elipseAzul} className="h-[9.5px] ml-" alt="" />
                              <p className='font-[poppins] text-[16px] font-normal leading-normal text-cinza-texto'>{element.descript}</p>
                            </div>
                            <p className='font-[poppins] text-[16px] font-normal leading-normal text-cinza-texto'>R$ {element.price}</p>
                          </div>
                        )
                      })}
                      
                    </tbody>
                  </table>
                </div>
              </div>
              <section id="esquerda" className=' max-xl:w-full w-[59%] max-xl:h-auto shadow-custom-light border border-solid border-verde-contorno rounded-[15px] p-6 h-max'>
                
                <TableExp/>
              </section>
            </div>
          </main>
          <footer className='h-[16px] bg-verde-fundo m-0 flex justify-center items-center'>
            <p className="font-[poppins] h-[14px] text-[9px] font-normal leading-normal text-branco">UX DESIGN • SECS 2024</p>
          </footer>
      </div>
      <ModalPlus isOpen={isOpenBalances} user={user} setIsOpen={setIsOpenBalances}/>
      <ModalNegative isOpen={isOpenExpenditures} user={user} setIsOpen={setIsOpenExpenditures}/>
      <ModalChange isOpen={isOpenChange} user={user} setIsOpen={setIsOpenChange}/>
      <ModalGraphic isOpen={isOpenGraphic} setIsOpen={setIsOpenGraphic}/>
    </>
  )
}

export default App

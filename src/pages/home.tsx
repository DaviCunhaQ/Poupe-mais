import logoPoupe from '../assets/logoPoupe.svg'
import { Link } from 'react-router-dom'

function Home(){
  return (
    <>
      <main className='bg-verde-principal bg-[url("./assets/ilustracao.svg")] w-screen h-screen flex justify-center items-center'>
        <div id="card" className="flex flex-col items-center bg-menta h-auto w-auto rounded-[15px] shadow-custom-light pt-8 pb-8 pr-10 pl-10">
          <div id="title" className="max-sm:justify-center max-sm:flex-col flex items-center mb-4">
            <h1 className='max-sm:mr-0 text-[#858585] text-[32px] font-semibold font-[poppins] mr-3'>Conheça o</h1>
            <img src={logoPoupe} alt="" className='max-sm:mr-0 mr-2'/>
            <h1 className='max-sm:hidden text-[#858585] text-[32px] font-semibold font-[poppins]'> !</h1>
          </div>
          <p className='font-[poppins] text-[18px] text-verde-fundo font-normal leading-normal mb-2'>Já Tenho Conta!</p>
          <Link to="/login">
            <button className='mb-4 flex w-[178px] pt-[10px] pb-[10px] pl-[32px] pr-[32px] rounded-[10px] bg-verde-secundario h-[44px] text-branco items-center justify-around'>  
            <p className="text-[16px] font-semibold font-[poppins]">Login</p>
            </button>
          </Link>
          <p className='font-[poppins] text-[18px] text-verde-fundo font-normal leading-normal mb-2'>Ainda não tenho conta</p>
          <Link to="/signup">
            <button className='flex w-[178px] pt-[10px] pb-[10px] pl-[32px] pr-[32px] rounded-[10px] bg-verde-secundario h-[44px] text-branco items-center justify-around'>
            <p className="text-[16px] font-semibold font-[poppins]">Sign Up</p>
            </button>
          </Link>
        </div>
      </main>
    </>
  )
}

export default Home

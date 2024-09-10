import { FormEvent, useContext, useState } from 'react'
import logo from '../assets/logo.svg'
import logoPoupe from '../assets/logoPoupe.svg'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import { Register } from '../types/formTypes'
import CurrencyInput from 'react-currency-input-field';


function Signup(){


  const {SignUp} = useContext(AuthContext)
  const [email , setEmail] = useState('')
  const [name , setName] = useState('')
  const [password , setPassword] = useState('')
  const [ salary , setSalary] = useState(0)

  const formData: Register = {
    email,
    name,
    password,
    salary
  }

  async function handleSubmit(e: FormEvent){
    e.preventDefault()
    await SignUp(formData)
  }



  return (
    <>
    <div id="main" className="max-md:h-screen max-md:flex-col flex bg-verde-principal w-full h-auto">
      <div id="left" className="max-md:h-screen max-md:mb-10 max-md:items-start max-md:w-[100vw] max-lg:mr-0 max-lg:w-1/2 bg-verde-principal flex w-2/5 h-screen items-center mr-40 ">
        <div className=" max-md:mt-8 max-md:justify-center h-auto flex w-full justify-end ">
          <form onSubmit={handleSubmit} className="max-sm:w-[320px] bg-branco rounded-[20px] flex flex-col items-center h-auto w-[368px]">
            <img className='mt-[48px] mb-[22px]' src={logoPoupe} alt="" />
            <h1 className="mb-[22px] text-[#858585] text-[32px] font-semibold font-[poppins]">Cadastre-se</h1>
            <div className=" flex flex-col items-center">
              <input value={name} onChange={(e)=>{setName(e.target.value)}} type="text" placeholder="Nome" className="mb-[22px] rounded-[4px] h-[32px] w-[242px] font-[poppins] bg-menta p-[4px] outline-0"/>
              <CurrencyInput
                id="input-example"
                name="input-name"
                placeholder="Salário"
                decimalsLimit={2}
                prefix='R$ '
                onValueChange={(_value, _name, values) => setSalary(values?.float!)}
                className="mb-[22px] rounded-[4px] h-[32px] w-[242px] font-[poppins] bg-menta p-[4px] outline-0"
              />
              <input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="text" placeholder="Email" className="mb-[22px] rounded-[4px] h-[32px] w-[242px] font-[poppins] bg-menta p-[4px] outline-0"/>
              <input value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder="Senha" className="mb-[22px] rounded-[4px] h-[32px] w-[242px] font-[poppins] bg-menta p-[4px] outline-0"/>
              <button value="submit" type='submit' className="mb-5 flex w-[178px] pt-[10px] pb-[10px] pl-[32px] pr-[32px] rounded-[10px] bg-verde-secundario h-[44px] text-branco items-center justify-around">
                <p className="text-[16px] pr-1 font-semibold font-[poppins]">CADASTRAR</p>
                <svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.5916 16.21C11.6065 16.225 12.0646 16.3398 12.6095 16.465C13.1544 16.5903 13.6061 16.6736 13.6134 16.6503C13.6206 16.627 13.677 16.2488 13.7386 15.8099C13.8625 14.9284 14.1623 13.8992 14.4827 13.2555C15.4814 11.2495 17.2733 9.92122 19.4466 9.57599L20 9.48805V8.60189V7.71566L19.4984 7.6315C16.2121 7.08016 14.0696 4.62296 13.6688 0.945747C13.6426 0.705628 13.6114 0.509232 13.5993 0.509232C13.4885 0.509232 11.652 0.951822 11.6173 0.986883C11.5922 1.01224 11.6108 1.23734 11.6588 1.48703C12.1903 4.25188 13.7119 6.50172 15.6865 7.44243L16.1601 7.6681L6.42002 7.68577L0.260986 7.69698V9.49044L6.43586 9.50167L16.153 9.51941L15.555 9.82239C14.0037 10.6083 12.7755 12.15 12.0522 14.2194C11.8461 14.8089 11.5351 16.153 11.5916 16.21Z" fill="white"/>
                </svg>
              </button>
              <Link to="/">
                <p className='mb-8 font-[poppins] text-[16px] text-verde-fundo leading-normal'>voltar</p>
              </Link>
            </div>
          </form>
        </div>
      </div>
      <div id="right" className="max-md:hidden max-lg:w-1/2 flex w-[871px] min-h-[100vh] h-[100vh]">
        <div className="max-md:w-[100vw] max-md:items-center max-md:bg-none h-full justify-end items-end flex bg-[url('./assets/ilustration.svg')] w-full bg-no-repeat">
          <Link target="_blank" to="https://www.uxsoftware.com.br/">
              <img src={logo} className="w-[125px] h-[104px] mr-[52px] mb-[56px]" alt="" />
          </Link>
        </div>
      </div>
    </div>
    </>
  )
}

export default Signup
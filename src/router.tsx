import {BrowserRouter , Route, Routes} from 'react-router-dom'
import LoginPage from './pages/login'
import App from './pages/App'
import Signup from './pages/signup'
import Home from './pages/home'
import { AuthProvider } from './context/authProvider'



export function RoutePages (){
  return(
    <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/signUp" element={<Signup/>}/>
            <Route path="/app" element={<App/>}/>
          </Routes>
        </AuthProvider>
    </BrowserRouter>
  )
}
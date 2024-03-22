import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import Home from "./pages/Home"
 import LoginScreen from "./pages/Login/"
 import PlanejamentoFinc from "./pages/planejamento/index.tsx"

 import { useAuthContext } from "./context/auth/AuthContext.ts"

import Spinner from "./components/Spinner/"
 import PrivateRoutes from "./routes/private.tsx"
import Cadastro from "./pages/cadastro/index.tsx"



export function AppRoutes() {
  const { loading, user } = useAuthContext()
  return (
    <BrowserRouter>
       {!loading && ( 
        <Routes>
             <Route path="/" element={!user ? <LoginScreen /> : <Navigate to="/home" />} />
             <Route path="/cadastro" element={!user ? <Cadastro /> : <Navigate to="/home" />} />
          <Route path="/home" element={
            <PrivateRoutes>
                <Home />
            </PrivateRoutes>
          } />
          <Route path="/etiqueta" element={
            <PrivateRoutes>
               <PlanejamentoFinc />
            </PrivateRoutes>
          } />
        </Routes>
      )} 
     {loading && <Spinner />} 
    </BrowserRouter>
  )
}

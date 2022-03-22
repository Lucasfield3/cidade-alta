import { ReactNode, useContext } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'
import { AuthContext, AuthProvider, DEFAULT_CONTEXT_DATA } from './context/Auth'
import { CodesProvider } from './context/Codes'
import { CreatePenalCode } from './pages/CreatePenalCode'
import { Login, User } from './pages/Login'
import { PenalCode } from './pages/PenalCode'
import { ViewPenalCode } from './pages/ViewPenalCode'
import { api } from './services/api'

function App() {
  interface PrivateProps{
    children:JSX.Element;
  }

  const Private = ({children}:PrivateProps)=>{
    const { authenticated, currentUser, loading } = useContext(AuthContext)
    

    console.log(authenticated)

      if(loading){
        return <h1>Loading...</h1>
      }

      if(authenticated){
        return children
      }


      if(!authenticated){
        return <Navigate to='/'/>
      }
  
  }




  return (
    <Router>
      <AuthProvider>
        <CodesProvider>
          <Routes>
            <Route element={<Login/>}  path=''></Route>
            <Route element={<Private><PenalCode/></Private>}  path='/penal-code'></Route>
            <Route element={<ViewPenalCode/>} path='/penal-code/:id'></Route>
            <Route element={<CreatePenalCode/>} path='/penal-code/new-code'></Route>
          </Routes>
        </CodesProvider>
      </AuthProvider>
    </Router>
  )
}

export default App

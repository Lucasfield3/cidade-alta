import { ReactNode, useContext } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'
import { AuthContext, AuthProvider, DEFAULT_CONTEXT_DATA } from './context/Auth'
import { Login } from './pages/Login'
import { PenalCode } from './pages/PenalCode'

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

      if(currentUser !== DEFAULT_CONTEXT_DATA){
        return children
      }


      if(currentUser === DEFAULT_CONTEXT_DATA){
        return <Navigate to='/'/>
      }
  
  }




  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route element={<Login/>}  path=''></Route>
          <Route element={<Private><PenalCode/></Private>}  path='/penal-code/id=:id'></Route>
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App

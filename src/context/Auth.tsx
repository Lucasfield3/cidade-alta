import { createContext, useContext, ReactNode, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { User } from '../pages/Login'
import { api } from '../services/api'
import { hash } from 'bcryptjs'
import { sign } from 'jsonwebtoken';

export let DEFAULT_CONTEXT_DATA = {
    id:0,
    nome:'',
    senha:''
} 

type inputs = {
    nome:string;
    senha:string;
}


type AuthContextData = {    
    currentUser:User;
    login:(data:inputs)=>Promise<User | any>;
    authenticated:boolean;
    logOut:()=>void;
    getUsers:()=> void;
    users:User[];
    loading:boolean
}

type AuthProviderProps = {
     children: ReactNode
}

let url = window.location.href

let [, id] = url.split('=')



let recoveredUser = DEFAULT_CONTEXT_DATA

    await api.get<User[]>('/usuarios')
    .then((response)=>{
        
        if(response.data){
            const users = response.data
                users.map((user)=>{
                        if(localStorage.getItem('token') === id){
                            if(user.id === Number(localStorage.getItem('token')[0])){
                                recoveredUser = user
                                console.log(recoveredUser)
                            }
                        }
                    
                })
        }
    
    })




export const AuthContext = createContext({} as AuthContextData)

export const AuthProvider = ({children}: AuthProviderProps) =>{

    const [ currentUser, setCurrentUser ] = useState<User>(recoveredUser)
    const [ users, setUsers ] =  useState([])
    const [ loading, setLoading ] = useState(false)
    const navigate = useNavigate()

    const getUsers = async ():Promise<User [] | any> => {
        const users =  await api.get<User[]>('/usuarios')

        if(users){
            setUsers(users.data)
        }
    }

    console.log(currentUser)
    //onst [ authenticated, setAuthenticated] = useState(false)

    const login = async(data:inputs):Promise<User | any>=>{
        const users =  await api.get<User[]>('/usuarios')

        setLoading(true)
        if(users.data){
            users.data.map(async (user)=>{
                if(user.nome === data.nome && user.senha === data.senha){
                    const token = {
                        id:user.id,
                        token:`${user.id}jsakhdasdbkasdjbakd`
                    }

                    setCurrentUser(user)
                    localStorage.setItem('token', token.token)
                    navigate(`/penal-code/id=${token.token}`)
                    setLoading(false)
                    return currentUser
                }
                setLoading(false)
            })
        }
        

    }
    

    const logOut = ()=>{
        localStorage.removeItem('user_id')
        setCurrentUser(DEFAULT_CONTEXT_DATA)
        navigate('/')
    }


     return (
         <AuthContext.Provider value={{loading, getUsers, users ,currentUser, login, logOut, authenticated: currentUser === DEFAULT_CONTEXT_DATA ? false : true }}>
             {children}
         </AuthContext.Provider>
     )

}

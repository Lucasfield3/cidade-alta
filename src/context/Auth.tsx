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
    users:User[];
    loading:boolean
}

type AuthProviderProps = {
     children: ReactNode
}

export const URL = 'https://my-json-server.typicode.com/cidadealta/exercise'

let recoveredUser = DEFAULT_CONTEXT_DATA

    await fetch(`${URL}/usuarios`)
    .then((res)=>{
        if(!res.ok) throw Error('data missing')
        return res.json()
    })
    .then((data:User[])=>{

        data.map((user:User)=>{
            if(user.id === Number(localStorage.getItem('id'))){
                recoveredUser = user
                console.log(recoveredUser)
            }
        }) 
    
    }).catch((err)=> console.error(err))
    

export const AuthContext = createContext({} as AuthContextData)

export const AuthProvider = ({children}: AuthProviderProps) =>{

    const [ currentUser, setCurrentUser ] = useState<User>(recoveredUser)
    const [ users, setUsers ] =  useState([])
    const [ loading, setLoading ] = useState(false)
    const navigate = useNavigate()

    console.log(users)
    //onst [ authenticated, setAuthenticated] = useState(false)

    const login = async(data:inputs):Promise<User | any>=>{
        setLoading(true)
       await fetch(`${URL}/usuarios`)
        .then((res)=>{
            if(!res.ok) throw Error('data missing')
            return res.json()
        })
        .then((usersSend:User[])=>{
            
            usersSend.map((user:User)=>{
                if(user.nome === data.nome && user.senha === data.senha){
                    setCurrentUser(user)
                    localStorage.setItem('id', String(user.id))
                    navigate(`/penal-code`)
                    setLoading(false)
                    return currentUser
                }
                setLoading(false)
            })
            console.log(usersSend);
            
            
        }).catch((err)=> console.error(err))        

    }
    

    const logOut = ()=>{
        localStorage.removeItem('id')
        setCurrentUser(DEFAULT_CONTEXT_DATA)
        navigate('/')
    }


     return (
         <AuthContext.Provider value={{loading, users ,currentUser, login, logOut, authenticated: currentUser === DEFAULT_CONTEXT_DATA ? false : true }}>
             {children}
         </AuthContext.Provider>
     )

}

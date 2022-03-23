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

export const URL = 'http://localhost:3004'



let recoveredUser = DEFAULT_CONTEXT_DATA

if(localStorage.getItem('user_name')){
    
    let userLocal = localStorage.getItem('user_name')
    console.log(userLocal);
    
    await fetch(`${URL}/usuarios?nome=${userLocal}`)
    .then((res)=>{
        if(!res.ok) throw Error(res.statusText)
        return res.json()
    })
    .then((data:User)=>{
        recoveredUser = data
        console.log(data);
        
    }).catch((err)=> console.error(err))
        
}

let userLocal = await JSON.parse(localStorage.getItem('user')) as User

export const AuthContext = createContext({} as AuthContextData)

export const AuthProvider = ({children}: AuthProviderProps) =>{

    const [ currentUser, setCurrentUser ] = useState<User>(recoveredUser)
    const [ users, setUsers ] =  useState([])
    const [ loading, setLoading ] = useState(false)
    const navigate = useNavigate()

    //onst [ authenticated, setAuthenticated] = useState(false)

    const login = async(data:inputs):Promise<User | any>=>{
        setLoading(true)
       await fetch(`${URL}/usuarios?senha=${data.senha}&nome=${data.nome}`)
        .then((res)=>{
            if(!res.ok) throw Error(res.statusText)
            return res.json()
        })
        .then((userSend:User)=>{
            localStorage.setItem('user_name', data.nome)
            setTimeout(()=>navigate(`/user/codigos-penais`), 200)
            setLoading(false)
            console.log(userSend);
            setCurrentUser(userSend)
            return currentUser
            
        }).catch((err)=> console.error(err))        

    }
    

    const logOut = ()=>{
        localStorage.removeItem('user')
        setCurrentUser(DEFAULT_CONTEXT_DATA)
        navigate('/')
    }

    // useEffect(()=>{
    //     const recoverUser = async()=>{
    //         if(localStorage.getItem('user')){
        
    //             let userLocal = await JSON.parse(localStorage.getItem('user')) as User
    //             console.log(typeof(userLocal));
    //             if(userLocal){
    //                 setCurrentUser(currentUser => currentUser = userLocal)
    //             }
                    
    //         }
    //         console.log(currentUser);
            
    //     }
    //     recoverUser()
    // }, [])


     return (
         <AuthContext.Provider value={{loading, users ,currentUser, login, logOut, authenticated: currentUser === DEFAULT_CONTEXT_DATA ? false : true }}>
             {children}
         </AuthContext.Provider>
     )

}

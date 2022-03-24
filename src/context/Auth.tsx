import { createContext, ReactNode, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { User } from '../pages/Login'

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

let recoveredUser:null | User

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


export const AuthContext = createContext({} as AuthContextData)

export const AuthProvider = ({children}: AuthProviderProps) =>{

    const [ currentUser, setCurrentUser ] = useState<User>(recoveredUser)
    const [ users, setUsers ] =  useState([])
    const [ loading, setLoading ] = useState(false)

    const navigate = useNavigate()

    const getUsers = async():Promise<User | any>=>{
       await fetch(`${URL}/usuarios`)
        .then((res)=>{
            if(!res.ok) throw Error(res.statusText)
            return res.json()
        })
        .then((usersSend:User[])=>{
            setUsers(usersSend)
        }).catch((err)=> console.error(err))        

    }
    

    const login = async(data:inputs):Promise<User | any>=>{
       
        setLoading(true)
         await fetch(`${URL}/usuarios?senha=${data.senha}&nome=${data.nome}`)
         .then((res)=>{
             if(!res.ok) throw Error(res.statusText)
             return res.json()
         })
         .then((usersSend:User[])=>{
            setCurrentUser(usersSend[0] ? usersSend[0]  : DEFAULT_CONTEXT_DATA)
             localStorage.setItem('user_name', data.nome)
             console.log(usersSend[0]); 
             setLoading(false)
             if(usersSend[0]){
                setTimeout(()=>navigate('/user/codigos-penais'), 200)
             }
             return usersSend[0]  
         
         }).catch((err)=> console.error(err))
        

    }
    

    const logOut = ()=>{
        localStorage.removeItem('user_name')
        setCurrentUser(DEFAULT_CONTEXT_DATA)
        navigate('/')
    }

    useEffect(()=>{
        getUsers()
    }, [])

     return (
         <AuthContext.Provider value={{
             loading, 
             users,
             currentUser, 
             login, 
             logOut, 
             authenticated:(currentUser !== DEFAULT_CONTEXT_DATA ) ? true : false}}>
             {children}
         </AuthContext.Provider>
     )

}

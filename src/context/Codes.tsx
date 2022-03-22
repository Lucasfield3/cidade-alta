import { createContext, useContext, ReactNode, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../services/api'

export interface PenalCode {
    id:number;
    nome:string;
    descricao:string;
    dataCriacao:Date;
    multa:number;
    tempoPrisao:number;
    status:number;
}


type CodesContextData = {
    codes:PenalCode[],
    selectedCode:PenalCode;
    getOnePenalCode:(id:number)=>void;
    createPenalCode:(data:PenalCode)=>Promise<PenalCode | any>;
    getCodes:()=>Promise<PenalCode[] | any>;
    deletePenalCode:(id:number)=>Promise<PenalCode | any>
}

type CodesProviderProps = {
     children: ReactNode
}

export const CodesContext = createContext({} as CodesContextData)

export const CodesProvider = ({children}: CodesProviderProps) =>{

    const [ codes, setCodes ] = useState<PenalCode[]>([])

    const [ selectedCode, setSelectedCode ] = useState<PenalCode>()

    const navigate = useNavigate()
    

    const getCodes = async()=>{
         await fetch(`https://my-json-server.typicode.com/cidadealta/exercise/codigopenal`)
        .then((res)=>{
          //  if(!res.ok) throw Error('data missing')
           return res.json()
        })
        .then((data:PenalCode[])=>{
               console.log(data)
               setCodes(data)
        }).catch((err)=> console.error(err))
    }

    const getOnePenalCode = async (id:number)=> {
          // let filteredCode:null | PenalCode
          // await fetch(`https://my-json-server.typicode.com/cidadealta/exercise/codigopenal`)
          // .then((res)=>{
          // if(!res.ok) throw Error('data missing')
          // return res.json()
          // })
          // .then((data:PenalCode[])=>{
          //      data.filter((code)=>{
          //           if(code.id === id){
          //                filteredCode = code
          //           }
          //      })
          //      setSelectedCode(filteredCode)
          //      navigate(`/penal-code/${id}`)
          // }).catch((err)=> console.error(err))
          let filteredCode:null | PenalCode
          codes.filter((code)=>{
               if(code.id === id){
                    filteredCode = code
               }
               setSelectedCode(filteredCode)
               navigate(`/penal-code/${id}`)
          })
     }

     const createPenalCode = async(data:PenalCode)=>{
          await fetch(`https://my-json-server.typicode.com/cidadealta/exercise/codigopenal`, {
               method:'POST',
               headers: { 
                    'Content-Type': 'application/json' ,
                    'Accept': 'application/json',
               },
               body:JSON.stringify({
                   nome:data.nome,
                   descricao:data.descricao,
                   dataCriacao:new Date,
                   multa:data.multa,
                   tempoPrisao:data.tempoPrisao,
                   status:data.status,
               })
          }).then((res)=>{
               if(!res.ok) throw Error('data missing')
               return res.json()
          })
          .then((data)=>{
               console.log()
               setCodes([...codes, data])
               
          }).catch((err)=> console.error(err))
     }

     const deletePenalCode = async(id:number) =>{

          await fetch(`https://my-json-server.typicode.com/cidadealta/exercise/codigopenal`, {
               method:'DELETE',
               headers: { 'Content-Type': 'application/json' },
               body:JSON.stringify({
                   id
               })
          }).then((res)=>{
               if(!res.ok) throw Error('data missing')
               return res.json()
          })
          .then(async (data:PenalCode)=>{
               console.log(data);
               const deletedArray = codes.filter((code) => code.id !== data.id)
               setCodes(deletedArray)
          })
     }

    useEffect(()=>{
          getCodes()
     },[])
      

     return(
          <CodesContext.Provider value={{codes, getOnePenalCode, selectedCode, createPenalCode, getCodes, deletePenalCode}}>
               {children}
          </CodesContext.Provider>
     )

}
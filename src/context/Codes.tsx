import { createContext, ReactNode, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';


export interface PenalCode {
    id:number;
    nome:string;
    descricao:string;
    dataCriacao:Date;
    multa:number;
    tempoPrisao:number;
    status:'Ativo'| 'Inativo';
}


type CodesContextData = {
    codes:PenalCode[],
    selectedCode:PenalCode;
    getOnePenalCode:(id:number)=>Promise<PenalCode | any>;
    createPenalCode:(data:PenalCode)=>Promise<PenalCode | any>;
    getCodes:()=>Promise<PenalCode[] | any>;
    deletePenalCode:(id:number)=>Promise<PenalCode | any>;
    editPenalCode:(data:PenalCode, id:number)=>Promise<PenalCode | any>
}

type CodesProviderProps = {
     children: ReactNode
}

export const CodesContext = createContext({} as CodesContextData)

export const CodesProvider = ({children}: CodesProviderProps) =>{

    const [ codes, setCodes ] = useState<PenalCode[]>([])

    const [ selectedCode, setSelectedCode ] = useState<PenalCode>()

    const getCodes = async()=>{
         await fetch(`http://localhost:3004/codigopenal`)
        .then((res)=>{
          if(!res.ok) throw Error(res.statusText)
           return res.json()
        })
        .then((data:PenalCode[])=>{
               console.log(data)
               setCodes(data)
        }).catch((err)=> console.error(err))
    }

    const getOnePenalCode = async (id:number)=> {
          await fetch(`http://localhost:3004/codigopenal/${id}`)
          .then((res)=>{
          if(!res.ok) throw Error(res.statusText)
          return res.json()
          })
          .then((data:PenalCode)=>{
               console.log(data);
               
               setSelectedCode(prevState => {return {...prevState, ...data}})
          }).catch((err)=> console.error(err))
     }

     const createPenalCode = async(data:PenalCode)=>{
          await fetch(`http://localhost:3004/codigopenal`, {
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
               if(!res.ok) throw Error(res.statusText)
               console.log(res.body);
               
               return res.json()
          })
          .then(async ()=>{
               await getCodes()
          }).catch((err)=> console.error(err))
     }

     const deletePenalCode = async(id:number) =>{

          await fetch(`http://localhost:3004/codigopenal/${id}`, {
               method:'DELETE',
               headers: { 'Content-Type': 'application/json' },
          }).then((res)=>{
               if(!res.ok) throw Error(res.statusText)
               return res.json()
          })
          .then(async ()=>{
               await getCodes()
          })
     }

     const editPenalCode = async(data:PenalCode, id:number)=>{
          await fetch(`http://localhost:3004/codigopenal/${id}`, {
               method:'PUT',
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
               if(!res.ok) throw Error(res.statusText)
               return res.json()
          })
          .then(async (data)=>{
               console.log(data);
               
               await getCodes()
               
          }).catch((err)=> console.error(err))
     }

    useEffect(()=>{
          getCodes()
     },[])
      

     return(
          <CodesContext.Provider value={{editPenalCode ,codes, getOnePenalCode, selectedCode, createPenalCode, getCodes, deletePenalCode}}>
               {children}
          </CodesContext.Provider>
     )

}
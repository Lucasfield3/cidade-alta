import { createContext, useContext, ReactNode, useState, useEffect } from 'react'
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
    getCodes:()=> Promise<PenalCode[] | any>;
}

type CodesProviderProps = {
     children: ReactNode
}

export const CodesContext = createContext({} as CodesContextData)

export const CodesProvider = ({children}: CodesProviderProps) =>{

    const [ codes, setCodes ] = useState<PenalCode[]>([])

    const getCodes = async ():Promise<PenalCode[] | any>=>{
      const codesResponse = await api.get<PenalCode[]>('/codigopenal')
  
      if(codesResponse.data){
        setCodes(codesResponse.data)
      }
  
    }

    useEffect(()=>{
        getCodes()
        console.log(codes);
        
      },[])
      

     return(
          <CodesContext.Provider value={{codes, getCodes}}>
               {children}
          </CodesContext.Provider>
     )

}
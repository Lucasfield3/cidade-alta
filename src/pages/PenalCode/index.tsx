import { useState, useEffect, useContext } from "react";
import { AuthContext, DEFAULT_CONTEXT_DATA } from "../../context/Auth";
import { api } from "../../services/api";
import { User } from "../Login";

interface PenalCode {
    id:number;
    nome:string;
    descricao:string;
    dataCriacao:Date;
    multa:number;
    tempoPrisao:number;
    status:number;
}

export const PenalCode = () => {

    const { logOut, currentUser } = useContext(AuthContext)

    const [ codes, setCodes ] = useState<PenalCode[]>([])

    const getCodes = async ()=>{
      const codesResponse = await api.get<PenalCode[]>('/codigopenal')
  
      if(codesResponse.data){
        setCodes(codesResponse.data)
      }
  
    }
  
    useEffect(()=>{
      console.log(currentUser)
      getCodes()
    },[])
    

    return (
      <>
       {codes && <div>
            <h1>Penal code</h1>
            {codes.map((code)=> {
                return (
                    <ul>
                    <li>{code.id}</li>
                    <li>{code.nome}</li>
                    <li>{code.descricao}</li>
                    <li>{code.dataCriacao}</li>
                    <li>{code.multa}</li>
                    <li>{code.tempoPrisao}</li>
                    <li>{code.status}</li>
                    </ul>
                )
                })}
                <button onClick={logOut}>Sair</button>
        </div>}
      </>
    );
};
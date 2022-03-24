import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CodesContext } from "../../context/Codes";
import { BackButton } from "../../style/global";
import { ContainerView } from "./style";
import arrow from '../../images/arrow.svg'


export const ViewPenalCode = () => {
    const { selectedCode, getOnePenalCode } = useContext(CodesContext)
    const { id } = useParams()
    const navigate = useNavigate()
 
    useEffect(()=>{
        getOnePenalCode(Number(id))
    }, [])

    const formatDate = (value:Date)=>{
       
        let date = new Date(value),
         day = date.getDate().toString().padStart(2, '0'),
         month = (date.getMonth()+1).toString().padStart(2, '0'),
         year  = date.getFullYear()
        
        return day+"/"+month+"/"+year
        
     }
     
     
    return (
        <ContainerView>
                <BackButton  onClick={()=> navigate('/user/codigos-penais')}><img src={arrow} alt="voltar" /></BackButton>
                <header>
                    <h1>Código Penal</h1>
                </header>
               {selectedCode ? 
               <main>
                    <div>
                        <p><strong>Nome: </strong>{selectedCode.nome}</p>
                        <p><strong>Data: </strong>{formatDate(selectedCode.dataCriacao)}</p>
                    </div>
                    <p><strong>Descrição: </strong>{selectedCode.descricao}</p>
                    <p><strong>Multa: </strong>{`R$${parseFloat(selectedCode.multa.toString()).toFixed(2)}`}</p>
                    <p><strong>Tempo de prisão: </strong>{selectedCode.tempoPrisao}</p>
                    <p><strong>Status: </strong>{selectedCode.status}</p>
                </main> : <h1>Loading...</h1>}
        </ContainerView>
    );
};
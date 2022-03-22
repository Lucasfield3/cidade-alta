import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CodesContext } from "../../context/Codes";
import { PageDefault } from "../../style/global";
import { ContainerView } from "./style";
import arrow from '../../images/arrow.svg'


type Props = {
    
};
export const ViewPenalCode = (props: Props) => {
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
                <header>
                    <button onClick={()=> navigate('/penal-code')}><img src={arrow} alt="voltar" /></button>
                    <h1>Código Penal</h1>
                    <span></span>
                </header>
               {selectedCode ? 
               <main>
                    <div>
                        <p><strong>Nome: </strong>{selectedCode.nome}</p>
                        <p><strong>Data: </strong>{formatDate(selectedCode.dataCriacao)}</p>
                    </div>
                    <p><strong>Descrição: </strong>{selectedCode.descricao}</p>
                    <p><strong>Multa: </strong>{`R$${selectedCode.multa.toFixed(2)}`}</p>
                    <p><strong>Tempo de prisão: </strong>{selectedCode.tempoPrisao}</p>
                    <p><strong>Status: </strong>{selectedCode.status === 1 ? 'Ativo' : 'Inativo'}</p>
                </main> : <h1>Loading...</h1>}
        </ContainerView>
    );
};
import { useState, useEffect, useContext } from "react";
import { FilterArea } from "../../components/FilterArea";
import { ScrollAreaDefault } from "../../components/ScrollArea";
import { AuthContext } from "../../context/Auth";
import { CodesContext } from "../../context/Codes";
import { Button, PageDefault } from "../../style/global";
import { AddButton, AreaAddButton, Header, Title } from "./style";
import  plus from '../../images/plus.svg'
import { useNavigate } from "react-router-dom";
import { FilterContext } from "../../context/Filter";


export const PenalCode = () => {

    const { logOut, loading } = useContext(AuthContext)
    const { getCodes,  getAllCodes} = useContext(CodesContext)
    const { handleApply, apply } = useContext(FilterContext)

    const navigate = useNavigate()
  
    const [ toggle, setToggle ] = useState(false)

    useEffect(()=>{
      getCodes()
      getAllCodes()
    }, [])

    return (
      <>
      {loading ? <h1>Loading...</h1> :
       <PageDefault>
         <Header>
           <span></span>
            <h1 style={{justifySelf:'center'}}>Códigos Penais</h1>
            <Button height='3rem' width='5rem' borderRadius='17px' style={{justifySelf:'flex-end', marginRight:'2.5rem'}} onClick={logOut}>Sair</Button>
         </Header>
            <FilterArea onClickAll={()=>{
                handleApply(false)
              }} onClickApply={()=> handleApply(true)}/>
            <ScrollAreaDefault toggle={apply}/>
            <AreaAddButton>
              <Title style={{transition:'all .2s ease-in-out'}} itsHovering={toggle}>Adicionar código penal</Title>
              <AddButton onClick={()=> navigate('/novo-codigo')} onMouseLeave={()=> setToggle(false)} onMouseEnter={()=> setToggle(true)}>
                <img src={plus} alt="adicionar código penal" />
              </AddButton>
            </AreaAddButton>
        </PageDefault>}
      </>
    );
};
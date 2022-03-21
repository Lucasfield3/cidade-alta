import { useState, useEffect, useContext } from "react";
import { FilterArea } from "../../components/FilterArea";
import { ScrollAreaDefault } from "../../components/ScrollArea";
import { AuthContext, DEFAULT_CONTEXT_DATA } from "../../context/Auth";
import { CodesContext } from "../../context/Codes";
import { api } from "../../services/api";
import { Button, PageDefault } from "../../style/global";
import { User } from "../Login";
import { AddButton, AreaAddButton, Title } from "./style";
import  plus from '../../images/plus.svg'


export const PenalCode = () => {

    const { logOut, currentUser } = useContext(AuthContext)
    const { getCodes, codes } = useContext(CodesContext)
  
    const [ toggle, setToggle ] = useState(false)

    return (
      <>
       <PageDefault>
         <header>
           <span></span>
            <h1 style={{justifySelf:'center'}}>Codigos Penais</h1>
            <Button height='3rem' width='5rem' borderRadius='17px' style={{justifySelf:'flex-end', marginRight:'2.5rem'}} onClick={logOut}>Sair</Button>
         </header>
            <FilterArea/>
            {codes.length > 0 ? <ScrollAreaDefault/> : <h1>Loading...</h1>}
            <AreaAddButton>
              <Title style={{transition:'all .2s ease-in-out'}} itsHovering={toggle}>Adicionar codigo penal</Title>
              <AddButton onMouseLeave={()=> setToggle(false)} onMouseEnter={()=> setToggle(true)}>
                <img src={plus} alt="adicionar codigo penal" />
              </AddButton>
            </AreaAddButton>
        </PageDefault>
      </>
    );
};
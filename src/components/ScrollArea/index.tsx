import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { CodesContext, PenalCode } from "../../context/Codes"

import { api } from "../../services/api"
import { Button } from "../../style/global"
import { ListCodes, ScrollArea } from "./style"

import trash from '../../images/trash.svg'
import { CustomSvg } from "../CustomSvg"
import { COLORS } from "../../theme"
import { ModalConfirmation } from "../ModalConfirmation"
import { ModalConfirmationContext } from "../../context/ModalConfirmation"

type ScrollAreaProps = {
    toggle?:boolean
}

export const ScrollAreaDefault = ({toggle}: ScrollAreaProps) => {

    const {  codes, getOnePenalCode, deletePenalCode } = useContext(CodesContext)
    const { codeToBeDeleted, handleDeletePenalCode, handleShowModal, isShown } = useContext(ModalConfirmationContext)
    const navigate = useNavigate()
  
    const [searchedText, setSearchedText ] = useState('')

    const arrayFiltered = codes.filter((code)=> {
        return code.nome.toLowerCase().indexOf(searchedText.toLowerCase()) !== -1
    })


  return (
      <>
       <ModalConfirmation 
            isShown={isShown}
            onClickYes={()=> {
                deletePenalCode(codeToBeDeleted)
                handleShowModal()
            }}
            onDisMiss={()=> handleShowModal()}
            />
        <ScrollArea>
        
            <input placeholder="pesquise aqui" onChange={(e)=> setSearchedText(e.target.value)} value={searchedText} type="text" />
            <ListCodes>
                {codes.length > 0 ? arrayFiltered.map((code, index) => {
                    return (
                        <>
                        <div style={{display:"flex", justifyContent:'space-between'}} key={index + 1}>
                            <p onClick={()=> {
                                getOnePenalCode(code.id)
                                navigate(`/visualizacao-codigo/${code.id}`)
                                }} key={index} >
                                {code.nome}
                            </p>
                            <div>
                                <p onClick={()=>navigate(`/edicao-codigo/${code.id}`)}>editar</p>
                                <button title="deletar" onClick={()=>handleDeletePenalCode(code.id)}><CustomSvg color={COLORS.STRONG_PURPLE}/></button>
                            </div>
                        </div>
                        
                        </>
                    )
                }) : <h1>Loading...</h1>}
            </ListCodes>
            </ScrollArea>
          
      </>
  )
}

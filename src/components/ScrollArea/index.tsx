import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { CodesContext, PenalCode } from "../../context/Codes"
import { ListCodes, ScrollArea } from "./style"
import { CustomSvg } from "../CustomSvg"
import { ModalConfirmation } from "../ModalConfirmation"
import { ModalConfirmationContext } from "../../context/ModalConfirmation"
import { FilterContext } from "../../context/Filter"

type ScrollAreaProps = {
    toggle?:boolean
}

export const ScrollAreaDefault = ({toggle}: ScrollAreaProps) => {

    const {  codes, getOnePenalCode, deletePenalCode } = useContext(CodesContext)
    const { filter, setFilters, field } = useContext(FilterContext)
    const { codeToBeDeleted, handleDeletePenalCode, handleShowModal, isShown } = useContext(ModalConfirmationContext)
    const navigate = useNavigate()

    const formatDate = (value:Date)=>{
       
        let date = new Date(value),
         day = date.getDate().toString().padStart(2, '0'),
         month = (date.getMonth()+1).toString().padStart(2, '0'),
         year  = date.getFullYear()
        
        return year+"-"+month+"-"+day
        
     }

     let arrayFiltered = [] as PenalCode[]

     if(codes.length > 0){
         arrayFiltered = codes.filter((code)=> {
             
             if(field === 'Nome'){
                console.log(code)
                return (codes.length > 0) && code.nome.toLowerCase().indexOf(filter.nome.toLowerCase()) !== -1
             }

             if(field === 'Status'){
                console.log(code)
                return (codes.length > 0) && code.status.toLowerCase().indexOf(filter.status.toLowerCase()) !== -1
             }

            if(field === 'Multa'){
                console.log(code)
                return (codes.length > 0) && String(code.multa).toLowerCase().indexOf(String(filter.multa).toLowerCase()) !== -1
            }
             
            if(field === 'Data'){
                console.log(code)
                return (codes.length > 0) && formatDate(code.dataCriacao).toLowerCase().indexOf(filter.dataCriacao.toLowerCase()) !== -1
            }


         })
     }

     console.log(arrayFiltered);
     

     useEffect(()=>{
        setFilters()
     },[])
        


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
        
            <ListCodes>
                {toggle ? arrayFiltered.map((code, index) => {
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
                                <button title="deletar" onClick={()=>handleDeletePenalCode(code.id)}><CustomSvg/></button>
                            </div>
                        </div>
                        
                        </>
                    )
                }) : 
                codes.map((code, index) => {
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
                                <button title="deletar" onClick={()=>handleDeletePenalCode(code.id)}><CustomSvg/></button>
                            </div>
                        </div>
                        
                        </>
                    )
                })
                }
                {codes.length === 0 && <h1>vazio</h1>}
            </ListCodes>
            </ScrollArea>
          
      </>
  )
}

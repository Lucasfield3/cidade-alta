import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { CodesContext, PenalCode } from "../../context/Codes"
import { ListCodes, Pagination, ScrollArea } from "./style"
import { CustomSvg } from "../CustomSvg"
import { ModalConfirmation } from "../ModalConfirmation"
import { ModalConfirmationContext } from "../../context/ModalConfirmation"
import { FilterContext } from "../../context/Filter"

type ScrollAreaProps = {
    toggle?:boolean
}

export const ScrollAreaDefault = ({toggle}: ScrollAreaProps) => {

    const {  codes, getOnePenalCode, deletePenalCode, getCodesPage, allCodes, getAllCodes } = useContext(CodesContext)
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
         arrayFiltered = allCodes.filter((allCode)=> {
             
             if(field === 'Nome'){

                return (allCodes.length > 0) && allCode.nome.toLowerCase().indexOf(filter.nome.toLowerCase()) !== -1
             }

             if(field === 'Status'){
                return (allCodes.length > 0) && String(allCode.status).toLowerCase().indexOf(filter.status.toLowerCase()) !== -1
             }

            if(field === 'Multa'){
                return (allCodes.length > 0) && String(allCode.multa).toLowerCase().indexOf(String(filter.multa).toLowerCase()) !== -1
            }
             
            if(field === 'Data'){
                return (allCodes.length > 0) && formatDate(allCode.dataCriacao).toLowerCase().indexOf(filter.dataCriacao.toLowerCase()) !== -1
            }


         })
     }


    const handleGtePages = ()=>{
        let getPages = [0]
        
        for(const [i, value] of allCodes.entries()){
           let pages = (allCodes.length/5)
           if(pages % 1 !==0){
               pages = Math.trunc(pages) + 1
          }
           
           if(i <= pages -1 ){
            getPages.push(value.id)
            }

       }    

      return getPages.map((key, index)=>{
       if(index > 0 ){
           return (
               <p onClick={()=>getCodesPage(index)}>{index}</p>
           )

          }
            
       })
       
    }

     useEffect(()=>{
        setFilters()
        getAllCodes()
        if(allCodes.length > 0){
            handleGtePages()
        }
     },[])

     useEffect(()=>{
        getAllCodes()
        if(allCodes.length > 0){
            handleGtePages()
        }
     }, [codes])
        

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
                {toggle ? arrayFiltered.map((allCode, index) => {
                    return (
                        <>
                        <div style={{display:"flex", justifyContent:'space-between'}} key={index + 1}>
                            <p onClick={()=> {
                                getOnePenalCode(allCode.id)
                                navigate(`/visualizacao-codigo/${allCode.id}`)
                                }} key={index} >
                                {allCode.nome}
                            </p>
                            <div>
                                <p onClick={()=>navigate(`/edicao-codigo/${allCode.id}`)}>editar</p>
                                <button title="deletar" onClick={()=>handleDeletePenalCode(allCode.id)}><CustomSvg/></button>
                            </div>
                        </div>
                        
                        </>
                    )
                }) : 
                codes.map((allCode, index) => {
                    return (
                        <>
                        <div style={{display:"flex", justifyContent:'space-between'}} key={index + 1}>
                            <p onClick={()=> {
                                getOnePenalCode(allCode.id)
                                navigate(`/visualizacao-codigo/${allCode.id}`)
                                }} key={index} >
                                {allCode.nome}
                            </p>
                            <div>
                                <p onClick={()=>navigate(`/edicao-codigo/${allCode.id}`)}>editar</p>
                                <button title="deletar" onClick={()=>handleDeletePenalCode(allCode.id)}><CustomSvg/></button>
                            </div>
                        </div>
                        
                        </>
                    )
                })
                }
                {allCodes.length === 0 && <h1>vazio</h1>}
            </ListCodes>
        </ScrollArea>
        <Pagination>
            {codes.length > 0 ? handleGtePages() : <h1>Loading...</h1>}
        </Pagination>
      </>
  )
}

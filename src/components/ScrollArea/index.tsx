import { useContext, useEffect, useState } from "react"
import { CodesContext, PenalCode } from "../../context/Codes"

import { api } from "../../services/api"
import { Button } from "../../style/global"
import { ScrollArea } from "./style"

type ScrollAreaProps = {
    toggle?:boolean
}

export const ScrollAreaDefault = ({toggle}: ScrollAreaProps) => {

    const { getCodes, codes } = useContext(CodesContext)
   
    const arrayFilteredStatus = codes.filter((codes)=> codes.status === 1)
    
    const [searchedText, setSearchedText ] = useState('')

    const arrayFiltered = codes.filter((code)=> {
        return code.nome.toLowerCase().indexOf(searchedText.toLowerCase()) !== -1
    })
    

  return (
      <>
        <ScrollArea>
        
            <input placeholder="pesquise aqui" onChange={(e)=> setSearchedText(e.target.value)} value={searchedText} type="text" />
            {codes.length > 0 && arrayFiltered.map((codes, index) => {
                return (
                    <>
                    <div>
                        <p title={codes.nome} key={index} >
                            {codes.nome}
                        </p>
                    </div>
                    </>
                )
            })}
            </ScrollArea>
          
      </>
  )
}

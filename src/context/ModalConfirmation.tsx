import { createContext, ReactNode, useState } from 'react'

type ModalConfirmationContextData = {
    isShown:boolean;
    handleDeletePenalCode:(id:number)=>void;
    handleShowModal:()=>void;
    codeToBeDeleted:number;
}

type ModalConfirmationProviderProps = {
     children: ReactNode
}

export const ModalConfirmationContext = createContext({} as ModalConfirmationContextData)

export const ModalConfirmationProvider = ({children}: ModalConfirmationProviderProps) =>{

    const [ isShown, setIsShown] = useState(false)

    const [ codeToBeDeleted, setCodeToBeDeleted ] = useState(0)

    const handleShowModal = ()=>{
        setIsShown(!isShown)
    }
   
    const handleDeletePenalCode = (id:number)=>{
       
        setCodeToBeDeleted(id)
        setIsShown(!isShown)
            
    }

 
     return(
          <ModalConfirmationContext.Provider value={{handleShowModal, codeToBeDeleted, handleDeletePenalCode ,isShown}}>
               {children}
          </ModalConfirmationContext.Provider>
     )

}
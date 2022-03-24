import { createContext, ReactNode, useState } from 'react'

type FilterContextData = {
    filter:FilterItems;
    setFilters:()=>void;
    field:string;
    handleFieldValue:(value:string)=>void;
    handleApply:(value:boolean)=>void;
    apply:boolean
}

type FilterProviderProps = {
     children: ReactNode
}

type FilterItems = {
    multa?:number;
    nome?:string;
    status?:string;
    dataCriacao?:string;
}
    
    


export const FilterContext = createContext({} as FilterContextData)

export const FilterProvider = ({children}: FilterProviderProps) =>{

    const [ filter, setFilter ] = useState<FilterItems>()

    const [ field, setField ] = useState('')

    const [ apply, setApply ] = useState(false)


    const setFilters = ()=>{
        const nome = document.getElementById('nome') as HTMLInputElement
        const multa =  document.getElementById('multa') as HTMLInputElement
        const data =  document.getElementById('datacriacao') as HTMLInputElement
        const status = document.getElementById('status') as HTMLSelectElement

        setFilter({
            nome:nome.value,
            multa:Number(multa.value),
            dataCriacao:data.value,
            status:status.value,
        })

        console.log(filter)
    }  

    const handleFieldValue = (value:string)=>{
        setField(value)
    }

    const handleApply = (value:boolean)=>{
        setApply(value)
    }


     return(
          <FilterContext.Provider value={{apply ,handleFieldValue ,field, filter, setFilters, handleApply}}>
               {children}
          </FilterContext.Provider>
     )

}
import { useContext } from "react";
import { FilterContext } from "../../context/Filter";
import { Button } from "../../style/global";
import { Fields, FilterContainer } from "./styles";

type FilterAreaProps = {
    onClickApply:()=>void;
    onClickAll:()=>void;
};
export const FilterArea = ({onClickApply, onClickAll}: FilterAreaProps) => {

    const { setFilters, handleFieldValue, field } = useContext(FilterContext)

    return (
        <>
            <FilterContainer>
                <span>
                    <p>Filtrar</p>
                    <select onChange={(e)=>handleFieldValue(e.target.value)}>
                        <option value="">Filtros</option>
                        <option value="Nome">Nome</option>
                        <option value="Multa">Multa</option>
                        <option value="Data">Data</option>
                        <option value="Status">Status</option>
                    </select>
                </span>
                
                    <Fields style={{opacity:field === 'Nome' ? '1' : '0', transition:'opacity .1s linear', zIndex:field === 'Nome' ? '1' : '-1', position:'absolute'}}>
                        <p>Nome</p>
                        <input id='nome' onChange={setFilters} placeholder='insira o nome' type="text" />   
                    </Fields>
                    <Fields style={{opacity:field === 'Multa' ? '1' : '0', transition:'opacity .1s linear', zIndex:field === 'Multa' ? '1' : '-1', position:'absolute'}}>
                        <p>Multa</p>
                        <input id='multa' onChange={setFilters}  placeholder='insira a multa' type="text" />   
                    </Fields>
                    <Fields style={{opacity:field === 'Data' ? '1' : '0', transition:'opacity .1s linear', zIndex:field === 'Data' ? '1' : '-1', position:'absolute'}}>
                        <p>Data</p>
                        <input onChange={setFilters} id="datacriacao" type='date'placeholder="dd-mm-yyyy" min="1997-01-01" max="2030-12-31"   /> 
                    </Fields>
                    <Fields style={{opacity:field === 'Status' ? '1' : '0', transition:'opacity .1s linear', zIndex:field === 'Status' ? '1' : '-1', position:'absolute'}}>
                        <p>Status</p>
                        <select onChange={setFilters}  placeholder="status" id="status">
                        <option>Status</option>
                            <option value="1">Ativo</option>
                            <option value="2">Inativo</option>
                        </select>
                    </Fields>
            </FilterContainer>
            <div style={{margin:'0.5rem', display:'flex', gap:'10rem'}}>
                <Button onClick={onClickApply} height='2.6rem' width='9rem'>Aplicar</Button>
                <Button onClick={onClickAll}  height='2.6rem' width='9rem'>Voltar</Button>
            </div>
        </>
    );
};
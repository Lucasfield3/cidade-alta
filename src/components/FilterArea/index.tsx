import { Button } from "../../style/global";
import { FilterContainer } from "./styles";

type FilterAreaProps = {
    
};
export const FilterArea = ({}: FilterAreaProps) => {

    return (
        <>
            <FilterContainer>
                <div>
                    <p>Nome</p>
                    <input placeholder='insira o nome' type="text" />   
                </div>
                <div>
                    <p>Multa</p>
                    <input placeholder='insira a multa' type="text" />   
                </div>
                <div>
                    <p>Data</p>
                    <input placeholder="insira a data" type="text" />   
                </div>
                <div>
                    <p>Status</p>
                    <select placeholder="status" name="status" id="">
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </select>
                </div>
            </FilterContainer>
        <Button style={{margin:'0.5rem'}} height='2.6rem' width='9rem'>Aplicar</Button>
        </>
    );
};
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { CodesContext, PenalCode } from "../../context/Codes";
import { Container } from "./style";

type Props = {
    
};
export const CreatePenalCode = (props: Props) => {

    const { createPenalCode } = useContext(CodesContext)

    const { register, handleSubmit, formState:{errors} } = useForm()

    const onSubmit = async(data:PenalCode)=>{
        await createPenalCode()
        console.log(data);
        
    }

    return (
        <Container>
            <form onSubmit={handleSubmit(onSubmit)}>

                <input type="text" placeholder="nome" {...register('nome', {required:true})} />
                <input type="text" placeholder="descricao" {...register('descricao', {required:true})} />
                <input type="number" placeholder="multa" {...register('multa', {required:true})} />
                <input type="number" placeholder="tempoPrisao" {...register('tempoPrisao', {required:true})} />
                <input type="number" placeholder="status" {...register('status', {required:true})} />
                <button type='submit' onClick={()=> createPenalCode()}>Criar</button>

            </form>
        </Container>
    );
};
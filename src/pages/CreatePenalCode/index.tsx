import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CodesContext, PenalCode } from "../../context/Codes";

import { Container } from "./style";


export const CreatePenalCode = () => {

    const { createPenalCode } = useContext(CodesContext)

    const { register, handleSubmit, formState:{errors}, getValues } = useForm<PenalCode>()
    const navigate = useNavigate()

    const onSubmit:SubmitHandler<PenalCode> = async(data:PenalCode)=>{
        await createPenalCode(data)
        console.log(data);
        console.log(typeof(getValues('multa')));
        setTimeout(()=>navigate('/user/codigos-penais'), 200)
        
    }

    return (
        <Container>
            <form onSubmit={handleSubmit(onSubmit)}>

                <input type="text" placeholder="nome" {...register('nome', {required:true})} />
                <input type="text" placeholder="descricao" {...register('descricao', {required:true})} />
                <input type="number" placeholder="multa" {...register('multa', {required:true})} />
                <input type="number" placeholder="tempoPrisao" {...register('tempoPrisao', {required:true})} />
                {/* <input type="number" placeholder="status" {...register('status', {required:true})} /> */}
                <select {...register('status', {required:true})}>
                    <option value={1}>Ativo</option>
                    <option value={2}>Inativo</option>
                </select>
                <button type='submit'>Criar</button>

            </form>
        </Container>
    );
};
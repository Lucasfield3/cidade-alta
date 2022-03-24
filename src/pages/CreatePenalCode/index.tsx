import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CodesContext, PenalCode } from "../../context/Codes";
import { BackButton, Button, PageDefault } from "../../style/global";
import arrow from '../../images/arrow.svg'

import { ContainerInputs, Inputs } from "./style";


export const CreatePenalCode = () => {

    const { createPenalCode } = useContext(CodesContext)

    const { register, handleSubmit, formState:{errors}, getValues } = useForm<PenalCode>()
    const navigate = useNavigate()

    const onSubmit:SubmitHandler<PenalCode> = async(data:PenalCode)=>{
        await createPenalCode(data)
        setTimeout(()=>navigate('/user/codigos-penais'), 200)
        
    }

    return (
        <PageDefault>
            <BackButton onClick={()=> navigate('/user/codigos-penais')}><img src={arrow} alt="voltar" /></BackButton>
            <header>
                <h1>Tela de criação</h1>
            </header>
            <ContainerInputs>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Inputs>
                        <div>
                            <p>Nome</p>
                            <input type="text" placeholder="digite o nome do codigo penal" {...register('nome', )} />
                        </div>
                        <div>
                            <p>Multa</p>
                            <input type="number" step={'any'} placeholder="digite a multa" {...register('multa', )} />
                        </div>
                        <div>
                            <p>Tempo de prisão</p>
                            <input type="number"  placeholder="digite o tempo de prisão" {...register('tempoPrisao', )} />
                        </div>
                        <div>
                            <p>Status</p>
                            <select  {...register('status', {required:true})}>
                                <option>Status</option>
                                <option value={'Ativo'}>Ativo</option>
                                <option value={'Inativo'}>Inativo</option>
                            </select>
                        </div>
                    </Inputs>
                    <div>
                        <p>Descrição</p>
                        <textarea placeholder="digite a descrição do código penal" {...register('descricao', )} cols={30} rows={10}></textarea>
                    </div>
                    <Button height='3rem' width='6rem'type='submit'>Criar</Button> 
                </form>
            </ContainerInputs>
        </PageDefault>
    );
};
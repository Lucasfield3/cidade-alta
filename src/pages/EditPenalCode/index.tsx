import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { CodesContext, PenalCode } from "../../context/Codes";
import { BackButton, Button, PageDefault } from "../../style/global";
import { ContainerInputs, Inputs } from "../CreatePenalCode/style";
import arrow from '../../images/arrow.svg'



export const EditPenalCode = () => {

    const { editPenalCode } = useContext(CodesContext)

    const [ selectedCode, setSelectedCode ] = useState<PenalCode>()

    const { register, handleSubmit, formState:{errors}, reset } = useForm<PenalCode>({defaultValues:{
        nome:'',
        dataCriacao:new Date,
        descricao:'',
        multa:0,
        status:'Ativo',
        tempoPrisao:30,
    }})

    const navigate = useNavigate()

    const { id } = useParams()

    const onSubmit:SubmitHandler<PenalCode> = async(data:PenalCode)=>{
        await editPenalCode(data, selectedCode.id)
        .then(()=>{
            setTimeout(()=>navigate('/user/codigos-penais'), 200)
        })
      
    }

    

    useEffect(()=>{
        const getOnePenalCode = async ()=> {
            await fetch(`http://localhost:3004/codigopenal/${id}`)
            .then((res)=>{
            if(!res.ok) throw Error(res.statusText)
            return res.json()
            })
            .then((data:PenalCode)=>{
                 setSelectedCode(data)
                reset(data)
            }).catch((err)=> console.error(err))
       }
       getOnePenalCode()
    }, [reset])

    return (
        <PageDefault>
                <BackButton onClick={()=> navigate('/user/codigos-penais')}><img src={arrow} alt="voltar" /></BackButton>
            <header>
                <h1>Tela de edição</h1>
            </header>
            <ContainerInputs>

                <form onSubmit={handleSubmit(onSubmit)}>
                    {selectedCode ? 
                        <>
                        <Inputs>
                            <div>
                                <p>Nome</p>
                                <input type="text" placeholder="digite o nome do codigo penal" {...register('nome' )} />
                            </div>
                            <div>
                                <p>Multa</p>
                                <input type="number" placeholder="digite a multa" {...register('multa' )} />
                            </div>
                            <div>
                                <p>Tempo de prisão</p>
                                <input type="number"  placeholder="digite o tempo de prisão" {...register('tempoPrisao')} />
                            </div>
                            <div>
                                <p>Status</p>
                                <select  {...register('status')}>
                                    <option>Status</option>
                                    <option value={'Ativo'}>Ativo</option>
                                    <option value={'Inativo'}>Inativo</option>
                                </select>
                            </div>
                        </Inputs>
                        <div>
                            <p>Descrição</p>
                            <textarea placeholder="digite a descrição do código penal" {...register('descricao')}></textarea>
                        </div>
                        <Button height='3rem' width='6rem' type='submit'>Editar</Button> 
                        </>
                    : <h1>Loading...</h1>}
                </form>
            </ContainerInputs>
        </PageDefault>
    );
};
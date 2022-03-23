import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { CodesContext, PenalCode } from "../../context/Codes";
import { Container } from "../CreatePenalCode/style";




export const EditPenalCode = () => {

    const { editPenalCode } = useContext(CodesContext)

    const [ selectedCode, setSelectedCode ] = useState<PenalCode>()

    const { register, handleSubmit, formState:{errors}, getValues, reset } = useForm<PenalCode>({defaultValues:{
        nome:'',
        dataCriacao:new Date,
        descricao:'',
        multa:0,
        status:{id:1, descricao:'Ativo'},
        tempoPrisao:30,
    }})

    const navigate = useNavigate()

    const { id } = useParams()

    const onSubmit:SubmitHandler<PenalCode> = async(data:PenalCode)=>{
        await editPenalCode(data, id)
        console.log(data);
        console.log(typeof(getValues('multa')));
        setTimeout(()=>navigate('/user/codigos-penais'), 200)
        
    }

    console.log(selectedCode);
    

    useEffect(()=>{
        const getOnePenalCode = async ()=> {
            await fetch(`http://localhost:3004/codigopenal/${id}`)
            .then((res)=>{
            if(!res.ok) throw Error(res.statusText)
            return res.json()
            })
            .then((data:PenalCode)=>{
                 console.log(data);
                 setSelectedCode(prevState => {return {...prevState, ...data}})
                 reset(data)
            }).catch((err)=> console.error(err))
       }
       getOnePenalCode()
    }, [reset])

    return (
        <Container>
            <form onSubmit={handleSubmit(onSubmit)}>

                {selectedCode ? 
                    <>
                        <input type="text" placeholder="nome" {...register('nome', )} />
                        <input type="text" placeholder="descricao" {...register('descricao', )} />
                        <input type="number" placeholder="multa" {...register('multa', )} />
                        <input type="number"  placeholder="tempoPrisao" {...register('tempoPrisao', )} />
                        <select value={selectedCode.status.id} {...register('status', )}>
                            <option value={1}>Ativo</option>
                            <option value={2}>Inativo</option>
                        </select>
                        <button type='submit'>Editar</button> 
                    </>
                : <h1>Loading...</h1>}
            </form>
        </Container>
    );
};
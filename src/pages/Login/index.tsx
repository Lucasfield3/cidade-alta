import { sign } from 'jsonwebtoken';
import { useContext } from 'react';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/Auth';
import { CodesContext } from '../../context/Codes';
import { api } from '../../services/api';
import { Button, PageDefault } from '../../style/global';
import { Form } from './styled';

export interface User {
    id:number,
    nome:string,
    senha:string
  }

  type Inputs = {
      nome:string;
      senha:string
  }
  
export const Login = () => {

    const [errorMsg, setErrorMsg] = useState('')
    const { register, handleSubmit, formState:{errors} } = useForm()
    const { login, authenticated } = useContext(AuthContext)
    const { getCodes} = useContext(CodesContext)

    const errorMsgNome = errors.nome?.type === 'required' ? 'Nome inválido' : 'digite seu nome'
    const errorMsgPassword = errors.senha?.type === 'required' ? 'Senha inválida' : 'digite sua senha'

   

    const onSubmit = async (data:Inputs) => {

    
        const user = await login(data)
        console.log(user)
        if(user){
            setErrorMsg('')
        }else{
            setErrorMsg('Usuário não existe')
        }
       
    }

    
    return (
        <PageDefault>
            <h1>Login</h1>
            <Form colorSenha={errors.senha?.type === 'required' ? '#ce2424' : ''} colorName={errors.nome?.type === 'required' ? '#ce2424' : ''} onSubmit={handleSubmit(onSubmit)}>
                <input placeholder={errorMsgNome} {...register("nome", {required:true})} type="text" />
                <p style={{color:'#ce2424', fontSize:'1.6rem'}}>{errorMsg}</p>
                <input  placeholder={errorMsgPassword} {...register("senha", {required:true})} type="text" />
                <Button type='submit'>Entrar</Button>
            </Form>
        </PageDefault>
    );
};
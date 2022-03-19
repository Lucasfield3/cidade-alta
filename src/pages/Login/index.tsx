import { sign } from 'jsonwebtoken';
import { useContext } from 'react';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/Auth';
import { api } from '../../services/api';
import { Form, LoginPage } from './styled';

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
        <LoginPage>
            <h1>Login</h1>
            <Form colorSenha={errors.senha?.type === 'required' ? '#ec3838' : ''} colorName={errors.nome?.type === 'required' ? '#ec3838' : ''} onSubmit={handleSubmit(onSubmit)}>
                <input placeholder={errorMsgNome} {...register("nome", {required:true})} type="text" />
                <p style={{color:'#ec3838', fontSize:'1.6rem'}}>{errorMsg}</p>
                <input  placeholder={errorMsgPassword} {...register("senha", {required:true})} type="text" />
                <button type='submit'>Entrar</button>
            </Form>
        </LoginPage>
    );
};
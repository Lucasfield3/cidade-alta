import styled from 'styled-components'

export const LoginPage = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center; 
    height:100vh;
    margin: 0 auto;
`
interface Props {
    colorName:string;
    colorSenha:string
}

export const Form = styled.form<Props>`
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    font-size: 2rem;

    input{
        margin-bottom: 1rem;

    }

    &:first-child input{

        ::placeholder{
            color:${(props) => props.colorName}
        }
    }

    &:nth-child(2) input{
        ::placeholder{
            color:${props => props.colorSenha};
        }
    }

`

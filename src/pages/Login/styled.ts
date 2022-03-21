import styled from 'styled-components'

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
        height: 4.6rem;
        width: 26rem;
        border-radius: 5px;
        padding: 0 1rem;
        margin-bottom: 2.2rem;
        border: none;
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

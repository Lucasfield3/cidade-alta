import  styled, { createGlobalStyle } from 'styled-components'

import { COLORS } from '../theme/index'
export default createGlobalStyle`
        * {
            @import url('/global.css');
            font-family: Roboto !important;
            // CSS you want global. 
        }
`

// export const PageDefault = styled.div`
//     display:flex;

// `
interface ButtonProps{
    color?:string;
    background?:string;
    width?:string;
    height?:string;
    borderRadius?:string;
}

export const PageDefault = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content: center;
    height:100vh;

    header{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        width: 100%;

    }

    h1{
        color: ${COLORS.BLACK};
        margin-bottom: 5rem;
        font-weight: 500;
    }
`


export const Button = styled.button<ButtonProps>`
    cursor: pointer;
    border-radius:${props => !props.borderRadius ? '5px' : props.borderRadius} ;
    height:${props => !props.height ? '4.6rem' : props.height};
    width:${props => !props.width ? '26rem' : props.width};
    border: 3px solid #fff;
    color: ${props => !props.color ? 'white' : props.color};
    background:${props => !props.background ? `${COLORS.STRONG_PURPLE}` : props.background};
    transition: background .2s ease-in-out;
    
    &:hover{
        background:${COLORS.PURPLE};
    }
`
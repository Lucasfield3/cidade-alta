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
    margin: 0;
    padding: 0;
    min-height: 100vh !important;
    min-height: -webkit-fill-available;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;


    h1{
        color: ${COLORS.BLACK};
        margin-bottom: 5rem;
        font-weight: 500;
        justify-self: center;
    }

    textarea {
        &::-webkit-scrollbar{
            width:0.5rem;
        }
        &::-webkit-scrollbar-track{
            background: transparent;
        }

        &::-webkit-scrollbar-thumb{
            background-color: ${COLORS.PURPLE};

        }
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


export const BackButton = styled.button`
    position: fixed;
    top: 0;
    left: 0;
    width: 4rem;
    height: 4rem;
    background: white;
    border: none;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 1rem;
    cursor: pointer;
    box-shadow: 1px 2px 5px 1px rgb(0 0 0 / 25%);
    padding: 0.6rem;

    img{
        width: -webkit-fill-available;
    }

    &:active{
        width: 4.5rem;
        height: 4.5rem;
    }
`
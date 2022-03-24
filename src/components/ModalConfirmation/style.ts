import styled from "styled-components";
import { COLORS } from "../../theme";

interface OverlayProps{
    isShown:boolean;
}

export const Overlay = styled.div<OverlayProps>`
    position:absolute ;
    display:flex;
    align-items: center;
    justify-content: center;
    opacity:${props => props.isShown ? '0.4' : '0'};
    display:${props => props.isShown ? 'block' :'none'} ;
    background:#000 ;
    height:100vh;
    width:100vw ;
    cursor: pointer;

`

export const Modal = styled.div<OverlayProps>`
    position:absolute ;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;
    width: 30rem;
    height: 10rem;
    gap: 2rem;
    background:white ;
    border:1px solid ${COLORS.PURPLE};
    border-radius: 0.5rem;
    z-index:${props => props.isShown ? '999' :'-80'} ;
    opacity:${props => props.isShown ? '1' : '0'};
    

    div {
        display: flex;
        justify-content: center;
        gap:3rem;

        button{
            cursor: pointer;
        }
    }
    
`


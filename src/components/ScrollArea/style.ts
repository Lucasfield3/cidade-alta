import styled from 'styled-components'
import { COLORS } from '../../theme'

export const ScrollArea = styled.div`
    background: white;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0.5rem 1rem;
    height: 19.5rem;
    width: 53rem;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    border: 2px solid ${COLORS.STRONG_PURPLE};

    >input{
        border: none;
        border-bottom: 1px solid ${COLORS.SOFT_PURPLE};
        width:100%;
        margin-bottom:1rem;

        &::placeholder{
            text-align:center;
            color:${COLORS.SOFT_PURPLE};
        }
    
    }

    div{ 
        border-bottom: 1px solid ${COLORS.STRONG_PURPLE};
        width: 100%;
        cursor: pointer;
        transition: background .1s ease-in-out ;
       

        &:hover{
            background: ${COLORS.STRONG_PURPLE};
            color:white ;
        }

        p{
            margin: 0 0.5rem;
        }
    }
`
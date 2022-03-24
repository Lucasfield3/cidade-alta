import styled from 'styled-components'
import { COLORS } from '../../theme'

export const ScrollArea = styled.div`
    background: white;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem 1rem;
    height: 19.5rem;
    width: 53rem;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    border: 2px solid ${COLORS.STRONG_PURPLE};

    >div{
        overflow-y:auto;
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

    >input{
        border: none;
        border-bottom: 1px solid ${COLORS.SOFT_PURPLE};
        width:100%;
        margin: 0.5rem 0;

        &::placeholder{
            text-align:center;
            color:${COLORS.SOFT_PURPLE};
        }
    
    }

   
`

export const ListCodes = styled.div`

    overflow-y:auto ;
    width: 51rem;
    display: flex;
    flex-direction: column;


    div{ 
        display: flex;
        cursor: pointer;
        transition: background .1s ease-in-out;
        border-bottom: 1px solid ${COLORS.STRONG_PURPLE};
    

        &:hover{
            background: ${COLORS.STRONG_PURPLE};
            color:white ;
        }

        &:hover svg{
            stroke:white;
        }

        p{
            margin: 0 0.5rem;
            align-self:end ;
            width:100% ;
        }

        div{
            display: flex;
            cursor: pointer;
            border-bottom:none;
            align-items: end;
            padding:0 0.5rem;
            background:transparent ;

            p{
                width: fit-content;
                padding: 0.2rem;

                &:hover{
                    background: white;
                    border-radius: 0.5rem;
                    color: black;
                    
                }
            }

            button{
                border:none;
                cursor: pointer;
                background:transparent ;
                width:2.5rem;
                height:2.5rem;
                border-radius:50%;
                margin: 0.4rem 0 0 0;
                display: flex;
                align-items:center;
                justify-content: center;

                svg{
                    stroke:${COLORS.STRONG_PURPLE};
                    width: 1.5rem;
                    height:1.5rem;
                }

                &:hover, &:hover svg{
                    background:white ;
                    stroke:#FF206E;
                }
            }
        }

    }

`

import styled from "styled-components";
import { COLORS } from "../../theme";

export const ContainerView = styled.div`
    display: flex;
    flex-direction: column;
    align-items:center;
    justify-content: center;

    h1{
        margin: 5rem 0 5rem 0;
        justify-self:center ;
        font-weight: 500;
    }


    main{
        width: 53rem;
        background: white;
        height: auto;
        border: 1px solid;
        border-radius: 5px;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        border: 2px solid ${COLORS.STRONG_PURPLE};

        >div{
            margin-bottom:1rem;
        }

        & p:not(:last-child){
            margin-bottom:1rem;
        }

        &:nth-child(2){
            line-height: 2.4rem;
            text-align: justify;
        }
    }

`
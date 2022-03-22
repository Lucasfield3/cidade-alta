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

    header{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        width: 100%;

        button{
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
        }

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
import styled from "styled-components";



export const ContainerInputs = styled.div`
    display:flex;
    flex-direction: column;
    align-items:center;
    justify-content: center;

    form{
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    h1{
        justify-self:center;
    }

    input{
        height: 3.6rem;
        width: 26rem;
        border-radius: 5px;
        padding: 0 1rem;
        margin-bottom: 2.2rem;
        border: none;
    }

    p{
        font-weight: 500;
        margin-bottom:0.5rem ;
    }

    textarea{
        resize: none;
        overflow-y: auto;
        padding: 1rem 1rem;
        border-radius: 0.5rem;
        border: none;
        text-align: justify;
        width: 53rem;       
        height: 15rem;
        margin-bottom: 1rem;
    }

    button{

    }

    select{
        outline: none;
    border: none;
    background: white;
    border-radius: 0.5rem;
    }

`
export const Inputs = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 1rem;
    margin-top: 3rem;
`
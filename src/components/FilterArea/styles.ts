import styled from "styled-components";


export const FilterContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 1rem;
    margin-top: 3rem;

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
    }

    select{
        outline: none;
        background-color: transparent;
        border: none;
        background:white ;
    }

`
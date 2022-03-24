import styled from "styled-components";


export const FilterContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 1rem;
    margin-top: 3rem;
    width: 53rem;
    height: 12rem;

    p{
        font-weight:500;
    }

    span{
        margin-bottom: 4rem;
        position: absolute;
        transform: translate(0%, -55%);
    }

    select{
        outline: none;
        border: none;
        background:white ;
        border-radius:0.5rem;
    }
`
export const Fields = styled.div`

    position: absolute;
    transform: translate(0%, 34%);


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
        margin-bottom: 0.5rem;
    }

    :last-child{
        transform: translate(0px, 63%)!important;
    }


`
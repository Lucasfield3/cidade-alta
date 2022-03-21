import styled from 'styled-components'
import { COLORS } from '../../theme';

interface HoverProp{
    itsHovering:boolean;
}

export const AreaAddButton = styled.div`
    display:flex;
    gap:2rem;
    margin: 0rem 2.5rem 0 0rem;
    align-self: flex-end;
    align-items: center;

`


export const AddButton = styled.button`
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    background: ${COLORS.SOFT_PURPLE
    };
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: end;
    transition: background .2s ease-in-out;
    box-shadow: 1px 2px 5px 1px rgb(0 0 0 / 25%);
    cursor: pointer;

    &:hover{
        background:#9589b4;
    }

`

export const Title = styled.p<HoverProp>`

    text-align: center;
    background: white;
    color: ${COLORS.BLACK};
    opacity: ${props => props.itsHovering ? '1' : '0'};
    transition: opacity .2s ease-in-out;
    width: 18rem;
    height: 3rem;
    border: 3px solid ${COLORS.PURPLE};
    border-radius: 1.4rem;
    line-height: 2.4rem;
    font-weight: 500;

    
`
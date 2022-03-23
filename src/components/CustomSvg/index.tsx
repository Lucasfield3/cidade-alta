

// @flow 
import * as React from 'react';
type Props = {
    color:string;
};
export const CustomSvg = (props: Props) => {
    return (
        <>
            <svg width="21" height="25" viewBox="0 0 21 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="3" y1="7.5001" x2="18" y2="7.5001"  stroke-width="1.2"/>
                <line x1="3" y1="4.5001" x2="18" y2="4.5001"  stroke-width="1.2"/>
                <path d="M3.49286 7.5C1 7.5 0.999598 4.5 3.49305 4.5"  stroke-width="1.2"/>
                <path d="M17.6302 7.5C20.123 7.5 20.1234 4.5 17.63 4.5"  stroke-width="1.2"/>
                <line x1="3.6" y1="8" x2="3.6" y2="23"  stroke-width="1.2"/>
                <line x1="17.6" y1="8" x2="17.6" y2="23"  stroke-width="1.2"/>
                <path d="M3.61022 22.5C3.51047 23.4552 4.10903 24 5.60938 24M17.5988 22.5C17.6985 23.4552 17.1 24 15.5996 24"  stroke-width="1.2"/>
                <line x1="5" y1="24.0001" x2="16" y2="24.0001"  stroke-width="1.2"/>
                <line x1="7.6" y1="10.6" x2="7.6" y2="20.4"  stroke-width="1.2" stroke-linecap="round"/>
                <line x1="10.6" y1="10.6" x2="10.6" y2="20.4"  stroke-width="1.2" stroke-linecap="round"/>
                <line x1="13.6" y1="10.6" x2="13.6" y2="20.4"  stroke-width="1.2" stroke-linecap="round"/>
                <path d="M6.2002 4.5C6.2002 4.5 6.2002 3.76052 6.2002 2.76052C6.2002 1.76052 7.2002 1.5 7.2002 1.5H13.7002C13.7002 1.5 14.8548 1.5 14.8548 2.5C14.8548 3.5 14.8548 4.5 14.8548 4.5"  stroke-width="1.2"/>
            </svg>
        </>
    );
};
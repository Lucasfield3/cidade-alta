
import  { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
        * {
            @import url('/global.css');
            font-family: Roboto !important;
            // CSS you want global. 
        }
`
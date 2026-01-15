import { createGlobalStyle } from 'styled-components'

export const AutofillStyles = createGlobalStyle`
  @keyframes blend-autofill-start {
    from {}
    to {}
  }

  @keyframes blend-autofill-cancel {
    from {}
    to {}
  }

  input:-webkit-autofill {
    animation-name: blend-autofill-start;
    animation-duration: 0.01s;
  }

  input:not(:-webkit-autofill) {    
    animation-name: blend-autofill-cancel;
    animation-duration: 0.01s;
  }
`

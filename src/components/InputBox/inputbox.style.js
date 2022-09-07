import {Input , FormFeedback} from 'reactstrap'
import styled from 'styled-components'

 export const Inputboxstyled = styled(Input)`
 `

 export const Formfeedbackstyled = styled(FormFeedback)`
    color:red;
    display: ${props => props.error ? "none" :  "block"}
 `
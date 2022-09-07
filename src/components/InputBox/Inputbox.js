import React from 'react';
import { Formfeedbackstyled , Inputboxstyled } from './inputbox.style';

function Inputbox({children , error=false, errormessage='' , ...rest}) {
    return (
        <div>
            <Inputboxstyled {...rest}>
                {children}
            </Inputboxstyled>

            <Formfeedbackstyled erros={error}>
                 {errormessage}
            </Formfeedbackstyled>

        </div>
    );
}
export default Inputbox;
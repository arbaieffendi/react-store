import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data){
    let errors = {};

    if (Validator.isEmpty(data.email)){
        errors.email = 'Required';
    }

    if (Validator.isEmpty(data.password)){
        errors.password = 'Required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}
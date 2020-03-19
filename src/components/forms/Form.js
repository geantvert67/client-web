import React, { createContext, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Form as F } from 'react-bootstrap';

const FormContext = createContext();
export const useFormContext = () => useContext(FormContext);

function Form({ children, onSubmit }) {
    const { register, handleSubmit, errors } = useForm();

    return (
        <F onSubmit={handleSubmit(onSubmit)}>
            <FormContext.Provider value={{ register, errors }}>
                {children}
            </FormContext.Provider>
        </F>
    );
}

export default Form;

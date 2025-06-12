import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import './sign-up-form.styles.scss'
import FormInput from "../form-input/form-input.componet";
import Button from "../button/button.component";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {

    const [ formFields, setFormFields ] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;
    const [ errorMessage, setErrorMessage ] = useState('');

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
        setErrorMessage('');
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(password !== confirmPassword) {
            return setErrorMessage('Passwords don\'t match');
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            console.log(user);

            await createUserDocumentFromAuth(user, {displayName});
            resetFormFields();
        } catch(err) {
            if(err.code === 'auth/email-already-in-use') {
                return setErrorMessage('Email already registered. Please Log In');
            } else {

                console.log(err);
            }
        }
        
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        // Keep the object and only change the specifi key >> 
        // [name] will be either 'displayName', 'email', 'password', 'confirmPassword' depending on what is typed by the user
        setFormFields({...formFields, [name]: value})
    }

    return (
        <div className="sign-up-container">
        <hé>Don't have an account ?</hé>
            <span>Sign Up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Display Name' type='text' onChange={handleChange} name='displayName' value={displayName} required/>
                <FormInput label='Email' type='email' onChange={handleChange} name='email' value={email} required/>
                <FormInput label='Password' type='password' onChange={handleChange} name='password' value={password} required/>
                <FormInput label='Confirm Password' type='password' onChange={handleChange} name='confirmPassword' value={confirmPassword} required/>
                <Button type='submit'>Sign Up</Button>
            </form>
            <p className="error-message">{errorMessage}</p>
        </div>
    )
}

export default SignUpForm;
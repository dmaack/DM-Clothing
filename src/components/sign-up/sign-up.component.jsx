import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

import './sign-up.styles.scss';

class SignUp extends React.Component {
    constructor() {
        super();

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleChange

    handleSubmit = async e => {
        e.preventDefault();

        const {displayName, email, password, confirmPassword } = this.state;

        if(password !== confirmPassword) {
            alert("password's dont match");
            return
        }


        try {
            // auth method from library - creates new user accound with specific email and password
            const { user } = await auth.createUserWithEmailAndPassword(
                email, 
                password
            );


            // once we get the user back, we create the document of the user w/ displayName
            await createUserProfileDocument(user, {displayName});

            // once the user profile doc is created, then reset the state (clears out the form)
            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            })

        } catch(err) {
            console.error(err)
        }
    }

    handleChange = e => {
        const { name, value } = event.target;

        this.setState({[name]: value});
    }

    render() {
        const {displayName, email, password, confirmPassword } = this.state;
        return (
            <div className='sign-up'>
                <h2 className='title'>I do not have an account</h2>
                <span>Sign up with your email and password</span>

                <form className='sign-up-form' onSubmit={handleSubmit}>
                    <FormInput
                        type='text'
                        name='displayName'
                        value={displayName}
                        onChange={handleChange}
                        label='Display Name'
                        required
                    />
                    <FormInput
                        type='email'
                        name='email'
                        value={email}
                        onChange={handleChange}
                        label='Email'
                        required
                    />
                    <FormInput
                        type='password'
                        name='password'
                        value={password}
                        onChange={handleChange}
                        label='Password'
                        required
                    />
                    <FormInput
                        type='password'
                        name='password'
                        value={confirmPassword}
                        onChange={handleChange}
                        label='Confirm Password'
                        required
                    />
                    <CustomButton type='submit'>SIGN UP</CustomButton>
                </form>
            </div>
        )
    }
}

export default SignUp;
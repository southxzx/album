import React, { Component } from 'react';
import FormField from '../utils/Form/formfield';
import { update, generateData, isFormValid } from '../utils/Form/formActions';
import { connect } from 'react-redux';
import { loginUser } from '../../redux/actions/user_actions';



class Register extends Component {

    state = {
        formError: false,
        formSuccess: '',
        formdata: {
            name: {
                element: 'input',
                value: '',
                config: {
                    name: 'name_input',
                    type: 'text',
                    placeholder: 'Please enter your name'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            lastname: {
                element: 'input',
                value: '',
                config: {
                    name: 'lastname_input',
                    type: 'text',
                    placeholder: 'Please enter your last name'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            email: {
                element: 'input',
                value: '',
                config: {
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Please enter your email'
                },
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            password: {
                element: 'input',
                value: '',
                config: {
                    name: 'password_input',
                    type: 'password',
                    placeholder: 'Please enter your password'
                },
                validation: {
                    required: true,
                    password: true
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            confirmPassword: {
                element: 'input',
                value: '',
                config: {
                    name: 'confirmPassword_input',
                    type: 'password',
                    placeholder: 'Please confirm your password'
                },
                validation: {
                    required: true,
                    confirm: 'password'
                },
                valid: false,
                touched: false,
                validationMessage: ''
            }
        }
    }

    submitForm = (event) => {
        event.preventDefault();

        let dataToSubmit = generateData(this.state.formdata,'register');
        let formIsValid = isFormValid(this.state.formdata,'register');

        if (formIsValid){
            console.log(dataToSubmit);
        } else {
            this.setState({
                formError: true
            })
        }

    }

    updateForm = (element) => {
        // gọi Update từ FormAction => trả về formdata mới
        const newFormdata = update(element,this.state.formdata,'register');   

        this.setState({
            formError: false,
            formdata: newFormdata
        })
    }

    render() {
        return (
            <div className="page_wrapper">
                <div className="container">
                    <div className="register_login_container">
                        <div className="left">
                            <form onSubmit={(event) => this.submitForm(event)}>
                                <h2>Personal information</h2>
                                    <div className="form_block_two">
                                        <div className="block">
                                            <FormField
                                                id={'name'}
                                                formdata={this.state.formdata.name}
                                                change={(element) => this.updateForm(element)}
                                            />
                                        </div>
                                        <div className="block">
                                            <FormField
                                                id={'lastname'}
                                                formdata={this.state.formdata.lastname}
                                                change={(element) => this.updateForm(element)}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <FormField
                                            id={'email'}
                                            formdata={this.state.formdata.email}
                                            change={(element) => this.updateForm(element)}
                                        />
                                    </div>
                                <h2>Verify password</h2>
                                    <div className="form_block_two">
                                        <div className="block">
                                            <FormField
                                                id={'password'}
                                                formdata={this.state.formdata.password}
                                                change={(element) => this.updateForm(element)}
                                            />
                                        </div>
                                        <div className="block">
                                            <FormField
                                                id={'confirmPassword'}
                                                formdata={this.state.formdata.confirmPassword}
                                                change={(element) => this.updateForm(element)}
                                            />
                                        </div>
                                    </div>
                                <div>
                                    {/* Check xem form có lỗi không (dòng màu đỏ trên nút REGISTER) */}
                                    {this.state.formError ?
                                        <div className="error_label">
                                            Please check your data
                                        </div>
                                    : null}

                                    {/* Nút REGISTER */}
                                    <button onClick={(event) => this.submitForm(event)}>
                                        REGISTER
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect()(Register);
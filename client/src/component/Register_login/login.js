import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormField from '../utils/Form/formfield';
import { update, generateData, isFormValid } from '../utils/Form/formActions';
import { loginUser } from '../../redux/actions/user_actions';
import { withRouter } from 'react-router-dom';


class Login extends Component {

    state = {
        formError: false,
        formSuccess: '',
        formdata: {
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
            }
        }
    }

    submitForm = (event) => {
        event.preventDefault();

        let dataToSubmit = generateData(this.state.formdata,'login');
        let formIsValid = isFormValid(this.state.formdata,'login');

        if (formIsValid){
            // Dispatch (bên trong có action trả về type + payload)
            // Dispatch sẽ thực thi Reducer
            this.props.dispatch(loginUser(dataToSubmit)).then(response => {
                if (response.payload.loginSuccess){
                    console.log(response.payload);
                    this.props.history.push('user/dashboard')
                }else{
                    this.setState({
                        formError: true
                    })
                }
            });
        } else {
            this.setState({
                formError: true
            })
        }

    }

    updateForm = (element) => {
        const newFormdata = update(element,this.state.formdata,'login');   

        this.setState({
            formError: false,
            formdata: newFormdata
        })

    }

    render() {
        return (
            <div className="signin_wrapper">
                <form onSubmit={(event) => this.submitForm(event)}>

                    <FormField 
                        id = {'email'}
                        formdata = {this.state.formdata.email}
                        change = {(element) => this.updateForm(element)}
                        />
                    <FormField
                        id={'password'}
                        formdata={this.state.formdata.password}
                        change={(element) => this.updateForm(element)}
                    />

                    {/* Check xem form có lỗi không (dòng màu đỏ trên nút LOG IN) */}
                    {this.state.formError ?
                        <div className="error_label">
                            Please check your data
                        </div>
                    : null}

                    {/* Nút LOGIN */}
                    <button onClick={(event) => this.submitForm(event)}>
                        LOG IN
                    </button>
                </form>
            </div>
        );
    }
}

export default connect()(withRouter(Login));
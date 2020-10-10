import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
import { auth } from '../redux/actions/user_actions';

export default function(ComposedClass,reload,adminRoute = null){

    class AuthCheck extends Component {

        state = {
            loading: true,
        }

        componentDidMount(){
            this.props.dispatch(auth()).then(response => {
                let user = this.props.user.userData;
                console.log(user);


                if (!user.isAuth){
                    if (reload){
                        // Cần Auth mới vô được
                        this.props.history.push('/register_login');
                    }
                } else {
                    if (adminRoute && !user.isAdmin){
                        // Nếu ko phải admin thì kick ra dashboard
                        this.props.history.push('/user/dashboard');
                    } else {
                        if(reload === false){
                            // Đã auth rồi thì mấy component có reload false sẽ mặc định move to dashboard
                            this.props.history.push('/user/dashboard');
                        }
                    }

                }

                // Nếu được auth thì load ra component đó
                this.setState({loading: false});
            })
        }

        render() {

            // Hiện icon Loading....
            if (this.state.loading){
                return(
                    <div className="main_loader">
                        <CircularProgress styles={{color: '#2196F3'}} thickness={7}/>
                    </div>
                )
            }
            
            return (
                    <ComposedClass {...this.props} user={this.props.user}/>
            );
        }
    }
    function mapStateToProps(state) {
        return {
            user: state.user
        }
    }
    return connect(mapStateToProps)(AuthCheck);
}
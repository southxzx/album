import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import { logoutUser } from '../../../redux/actions/user_actions';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

class Header extends Component {

    state = {
        page: [
            {
                name: 'Home',
                linkTo: '/',
                public: true
            },
            {
                name: 'Albums',
                linkTo: '/shop',
                public: true
            }
        ],
        user: [
            {
                name: 'My Cart',
                linkTo: '/user/cart',
                public: false
            },
            {
                name: 'My Account',
                linkTo: '/user/dashboard',
                public: false
            },
            {
                name: 'Log In',
                linkTo: '/register_login',
                public: true
            },
            {
                name: 'Log Out',
                linkTo: '/user/logout',
                public: false
            },
        ],
        headerShow: false
    }

    showHeader = () => {
        if(window.scrollY > 0){
            this.setState({
                headerShow: true
            })
       } else {
            this.setState({
                headerShow: false
            })
       }
    }

    componentDidMount = () => {
        window.addEventListener('scroll',this.showHeader);
    }

    logoutHandler = () => {

        this.props.dispatch(logoutUser()).then(response => {
            if (response.payload.success){
                // Component không thuộc React Router nên ko push đc
                this.props.history.push('/');
            }
        })
    }

    defaultLink = (item, i) => (

        item.name === 'Log Out' ? 
            <div className="log_out_link" key={i} onClick={()=>this.logoutHandler()}>
                {item.name}
            </div>
        :

        <Link to={item.linkTo} key={i}>
            {item.name}
        </Link>
    );

    cardLinks = (item,i) => {

        const user = this.props.user.userData;
        return (
            <div className="cart_link" key={i}> 
                <span>{user.cart ? user.cart.length : 0}</span>
                <Link to={item.linkTo}>
                    {item.name}
                </Link>
            </div>
        )
    }

    showLinks =(type) => {
        let list = [];

        // Nếu có data người dùng 
        if(this.props.user.userData){
            
            type.forEach((item)=>{
                if (!this.props.user.userData.isAuth){
                    // Nếu user không được Auth thì chỉ thêm LOG IN
                    if (item.public === true){
                        list.push(item);
                    }
                } else {
                    // Nếu được Auth thì thêm Tất cả
                    if (item.name !== 'Log In'){
                        list.push(item);
                    }
                }
            });
        }

        return list.map((item,i)=>{
            if(item.name !== 'My Cart'){
                return this.defaultLink(item,i);
            } else{
                return this.cardLinks(item,i);
            }
        })

    }

    render() {


        return (
                <header className={this.state.headerShow ? "bck_b_light" : ""}>
                    <Toolbar>
                    <div className="container">
                        <div className="left">
                            <div className="logo">
                                ALBUM Co.
                            </div>
                        </div>
                        <div className="right">
                            <div className="top">
                            {this.showLinks(this.state.user)}
                            </div>
                            <div className="bottom">
                                {this.showLinks(this.state.page)}
                            </div>
                        </div>
                    </div>
                    </Toolbar>
                </header>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(withRouter(Header));
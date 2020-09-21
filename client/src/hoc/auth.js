import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';

export default function(ComposedClass,reload,adminRoute = null){

    class AuthCheck extends Component {
        render() {
            return (
                <div>
                    
                </div>
            );
        }
    }
    
    return connect()(AuthCheck);
}
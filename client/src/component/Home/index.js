import { connect } from 'react-redux';
import React, { Component } from 'react';
import HomePromotion from './home_promotion';
import HomeSlider from './home_slider';
import { getProductByArrival, getProductBySell } from '../../redux/actions/product';
import Card from '../utils/card';





class Home extends Component {

    componentDidMount(){
        this.props.dispatch(getProductBySell());
        this.props.dispatch(getProductByArrival());
    }

    render() {
        return (
            <div style={{position:'relative'}}>
                <HomeSlider/>
                <Card
                    list={this.props.product.bySell}
                    title="Best selling Albums"
                />
                <HomePromotion/>
                <Card
                    list={this.props.product.byArrival}
                    title="New Arrivals"
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        product: state.product
    }
}

export default connect(mapStateToProps)(Home);
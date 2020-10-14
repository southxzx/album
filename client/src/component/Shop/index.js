import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getGenres, getMaterials } from '../../redux/actions/product';
import CollapseCheckbox from '../utils/collapseCheckbox';
import { scores } from '../utils/Form/fixed_categories';
import PageTop from '../utils/page_top';



class Shop extends Component {

    state = {
        grid: '',
        limit: 6,
        skip: 0,
        filters:{
            genres:[],
            scores:[],
            materials:[],
            price:[]
        }
    }

    componentDidMount(){
        this.props.dispatch(getGenres());
        this.props.dispatch(getMaterials());
    }

   

    handleFilters = (filters,categories) => {
        const newFilters = {...this.state.filters};
        // VD: newFilters[genres] = 
        newFilters[categories] = filters;

        this.setState({
            filters: newFilters
        });
    }

    render() {

        console.log(this.state.filters)
        const product = this.props.product;

        return (
            <div>
                <PageTop title="Browse Products"/>
                <div className="container">
                    <div className="shop_wrapper">
                        <div className="left">
                            <CollapseCheckbox
                                initState={true}
                                title="Genres"
                                list={product.byGenres}
                                // Nhận từ child component
                                handleFilters={(filters)=> this.handleFilters(filters,'genres')}
                            />
                            <CollapseCheckbox
                                initState={false}
                                title="Scores"
                                list={scores}
                                // Nhận từ child component
                                handleFilters={(filters)=> this.handleFilters(filters,'scores')}
                            />
                            <CollapseCheckbox
                                initState={false}
                                title="Materials"
                                list={product.byMaterials}
                                // Nhận từ child component
                                handleFilters={(filters)=> this.handleFilters(filters,'materials')}
                            />
                            
                        </div>
                        <div className="right">
                            Right
                        </div>
                        
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        product: state.product
    }
}

export default connect(mapStateToProps)(Shop);

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getGenres, getMaterials, getProductsToShop } from '../../redux/actions/product';
import CollapseCheckbox from '../utils/collapseCheckbox';
import CollapseRadio from '../utils/collapseRadio';
import { price, scores } from '../utils/Form/fixed_categories';
import PageTop from '../utils/page_top';
import LoadmoreCard from './loadmoreCard';


class Shop extends Component {

    state = {
        grid: '',
        limit: 6,
        skip: 0,
        filters:{
            genre:[],
            scores:[],
            material:[],
            price:[]
        }
    }

    componentDidMount(){
        this.props.dispatch(getGenres());
        this.props.dispatch(getMaterials());

        this.props.dispatch(getProductsToShop(
            this.state.skip,
            this.state.limit,
            this.state.filters
        ));

    }

    // Dựa vào _id để lấy mảng array[0,10],...
    handlePrice = (value) => {
        const data = price;
        let array = [];

        for (let key in data){
            //data[0]._id = 0
            if(data[key]._id === parseInt(value,10)){
                // print array[] value trong price
                array = data[key].array
            }
        }
        return array;
    }
   

    handleFilters = (filters,categories) => {
        // Cập nhật filters vào state
        const newFilters = {...this.state.filters};
        newFilters[categories] = filters;

        //
        if (categories == 'price'){
            let priceValues = this.handlePrice(filters);
            newFilters[categories] = priceValues;
        }

        this.showFiltersResults(newFilters);

        this.setState({
            filters: newFilters
        });
    }

    showFiltersResults = (filters) => {
        this.props.dispatch(getProductsToShop(
            0,
            this.state.limit,
            filters
        )).then(()=>{
            this.setState({
                skip: 0
            })
        })
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
                                handleFilters={(filters)=> this.handleFilters(filters,'genre')}
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
                                handleFilters={(filters)=> this.handleFilters(filters,'material')}
                            />
                            <CollapseRadio
                                initState={true}
                                title="Price"
                                list={price}
                                // Nhận từ child component
                                handleFilters={(filters)=> this.handleFilters(filters,'price')}
                            />
                            
                            
                        </div>
                        <div className="right">
                            <div className="shop_options">
                                <div className="shop_grids clear">
                                    grids
                                </div>
                            </div>
                            <div>
                                <LoadmoreCard
                                    grid={this.state.grid}
                                    limit={this.state.limit}
                                    size={product.toShopSize}
                                    products={product.toShop}
                                    loadMore={() => console.log('loadmore')}
                                />
                            </div>
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

import React, { Component } from 'react'


class CardItem extends Component {

    renderCardImage (image){
        if (image.length > 0){
            return image[0];
        }
        else{
            return '/image/pinktape.jpg';
        }
    }

    render() {
        const props = this.props;
        console.log(props.image);
        return (
            <div className={`card_item_wrapper ${props.grid}`}>
                <div 
                    className="image"
                    style={{
                        background: `url(${this.renderCardImage(props.image)}) no-repeat`
                    }}
                ></div>
                <div className="action_container">
                    <div className="tags">
                        <div className="brand">{props.name.length > 20 ? props.name.slice(0,20)+'...' : props.name}</div>
                        <div className="brand">{props.singer}</div>
                        <div className="brand">{props.price}$</div>
                    </div>
                </div>
                {props.grid ?
                    <div className="description">
                        Tình yêu màu nắng
                    </div>
                     : null
                }
                <div>

                </div>
            </div>
        )
    }
}
export default CardItem;

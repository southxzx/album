import React from 'react';
import CardItem from '../utils/cardItem';

const CardBlockShop = (props) => {

    const renderCard = () => (
        props.list ? 
            props.list.map((card)=>(
                <CardItem
                    key={card.id}
                    {...card}
                    grid={props.grid}
                />
            ))
        : null 
    )

    console.log(props.list);

    return (
        <div className="card_block_shop">
            <div>
                <div>
                    {/* Check xem có product ko */}
                    {props.list ? 
                        props.list.length === 0 ? 
                            <div className="no_result">
                                Sorry, no results
                            </div>
                        : null
                    : null}

                    {renderCard(props.list)}

                </div>

            </div>
        </div>
    );
};

export default CardBlockShop;
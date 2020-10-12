import React from 'react';
import CardItem from './cardItem';

const Card = (props) => {

    const renderCard = () => (
        props.list ?
            props.list.map((card,i)=>(
                <CardItem
                    key={i}
                    {...card}
                />
            ))
         : null
    )

    return (
        <div className="card_block">
            <div className="container">
                {
                    props.title ?
                        <div className="title">
                            {props.title}
                        </div>
                     : null
                }
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap'
                }}>
                    {renderCard(props.list)}
                </div>
            </div>
        </div>
    );
};

export default Card;
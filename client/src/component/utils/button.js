import React from 'react';
import { Link } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faShoppingBag, faPhone} from '@fortawesome/free-solid-svg-icons';


const MyButton = (props) => {

    const button = () => {
        let template = '';

        switch (props.type) {
            case 'default':
                template = <Link 
                className= {!props.altClass ? 'link_default' : props.altClass}
                to={props.linkTo}
                {...props.addStyles}>
                    {props.title}
                </Link>
                break;
            case 'bag_link': 
                template = 
                    <div className="bag_link"
                        onClick={()=>{
                            props.runAction();
                        }}
                    >
                        <FontAwesomeIcon icon={faShoppingBag}/>
                    </div>
                break;
            default:
                template='';
        }

        return template;
    }

    return (
        <div className="my_link">
            {button()}
        </div>
    );
};

export default MyButton;
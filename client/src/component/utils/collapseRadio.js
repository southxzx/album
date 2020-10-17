import React, { Component } from 'react'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';


import { Collapse, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

export default class CollapseRadio extends Component {

    state = {
        open: false,
        value: '0'
    }

    componentDidMount(){
        if (this.props.initState) {
            // MỞ dropdown
            this.setState({open: true});
        } else {
            
        }
    }

    handleAngle = () => (
        this.state.open ? 
            <FontAwesomeIcon icon={faAngleUp} className="icon"/>
        : <FontAwesomeIcon icon={faAngleDown} className="icon"/>
    )

    handleClick = () => {
        this.setState({open: !this.state.open});
    }

    handleChange = (event) =>{
        this.props.handleFilters(event.target.value);
        this.setState({value: event.target.value})
    }

    renderList = () =>(
        this.props.list ? 
            this.props.list.map(value => (
                <FormControlLabel
                    key={value._id}
                    value={`${value._id}`} //value này để chuyển qua handleFilters ở cha
                    control={<Radio/>}
                    label={value.name}
                />
            ))
        : null
    )

    render() {
        return (
            <div>
                <List style={{ borderBottom: '1px solid #dbdbdb' }}>
                    <ListItem onClick={this.handleClick} style={{ padding: '10px 23px 10px 0' }}>
                        <ListItemText
                            primary={this.props.title}
                            className="collapse_title"
                        />
                        {/* Nút Mũi tên up/down */}
                        {this.handleAngle()}
                    </ListItem>

                    {/* thuộc tính IN là để xuất hiện Collapse */}
                    <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <RadioGroup 
                                aria-label="prices"
                                name="prices"
                                value={this.state.value}
                                onChange={(event) => this.handleChange(event)}
                            >
                                {this.renderList()}
                            </RadioGroup>
                        </List>
                    </Collapse>
                </List>
            </div>
        )
    }
}

import React, { Component } from 'react'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import { Collapse } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';



export default class CollapseCheckbox extends Component {

    state = {
        open: false,
        checked: []
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

    renderList = () => (
        this.props.list ?
            this.props.list.map((value)=>(
                <ListItem key={value._id} style={{padding: '10px 0'}}>
                    <ListItemText primary={value.name}/>
                    <ListItemSecondaryAction>
                        <Checkbox
                            color="primary"
                            onChange={() => this.handleToggle(value._id)}
                            // Nếu mảng checked[] có thì mới check đc -_-
                            checked={this.state.checked.indexOf(value._id) !== -1}
                        />
                    </ListItemSecondaryAction>
                </ListItem>
            ))
         : null
    )

    // Nếu check thì lấy trong checked[] ra cái list và ngược lại :)))
    handleToggle = (value) => {
        const checked = this.state.checked;

        // Check vị trí của value._id trong mảng Checked[]
        const currentIndex = checked.indexOf(value);
        
        const newChecked = [...checked];

        // Nếu ko có vị trí thì thêm value._id vào mảng mới
        if (currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }

        // Update state
        this.setState({
            checked: newChecked

        // Callback function để kích hoạt hàm ở Component cha
        },()=>{
            this.props.handleFilters(newChecked);
        })
    }

    render() {
        return (
            <div className="collapse_items_wrapper">
                <List style={{borderBottom: '1px solid #dbdbdb'}}>
                    <ListItem onClick={this.handleClick} style={{padding: '10px 23px 10px 0'}}>
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
                            {this.renderList()}
                        </List>
                    </Collapse>
                </List>
            </div>
        )
    }
}

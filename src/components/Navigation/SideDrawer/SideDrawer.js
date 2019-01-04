import React from 'react';
import NavigationItems from '../NavigationItems/Navigationitems';
import Logo from '../../Logo/Logo';
import classes from './SideDrawer.css';
import BackDrop from '../../UI/Backdrop/Backdrop';
import Auxi from '../../../hoc/Auxi/Auxi';



const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <Auxi>
            <BackDrop show={props.open} clickedBackDrop={props.closed} />
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>

                <nav>
                    <NavigationItems />
                </nav>

            </div>
        </Auxi>
    )
}


export default sideDrawer;

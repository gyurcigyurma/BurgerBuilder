import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import Navigationitems from '../NavigationItems/Navigationitems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';


let toolbar = (props) => (
  <header className={classes.Toolbar}>
    <DrawerToggle clicked={props.drawerToggleClicked}/>
    <div className={classes.Logo}>
      <Logo />
    </div>

    <nav className={classes.DesktopOnly}>
      <Navigationitems isAuthenticated={props.isAuth} />
    </nav>

  </header>
)


export default toolbar;

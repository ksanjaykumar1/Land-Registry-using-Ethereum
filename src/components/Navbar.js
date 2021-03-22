import React, { Component, useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './X/SidebarData';
import './X/Navbar.css';
import { IconContext } from 'react-icons';


export default class Navbar extends Component {

 

  constructor(props) {
    super(props)
    this.state = {
      sidebar:false
    }
    
    
    this.showSidebar =this.showSidebar.bind(this)
  }
   showSidebar(e){
    e.preventDefault();
    this.setState(state =>({ sidebar: !state.sidebar }))

  } 
  
   

  render() {
    return (
      <div>
            <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
        <Link to='#' className='menu-bars'>
            <FaIcons.FaBars  onClick={this.showSidebar}/>
          </Link>
          
          <h5 className="topnav"> Account :{this.props.account}</h5>
          
        </div>
          
      
        <nav className={this.state.sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={this.showSidebar} >
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
         
        </nav>
      </IconContext.Provider>
    </>
        
        
      </div>
    )
  }
}


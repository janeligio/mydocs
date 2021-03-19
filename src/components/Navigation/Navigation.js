import React from 'react';

import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { AiOutlineHome, AiOutlineMenu } from 'react-icons/ai'
import { FiCode } from 'react-icons/fi';
import { GoBeaker } from 'react-icons/go';
import { IoBookSharp } from 'react-icons/io5';
const CTCI_DATA = [
    {
      title: 'VI. Big O',
      URL: 'https://raw.githubusercontent.com/janeligio/ctci/master/VI-Big_O.md',
      path: '/ctci/',
    }
  ];
  
  [1,2,3,4,5,6,7,8,10,11,13,15].forEach(value => {
    CTCI_DATA.push({
      title: `IX. Chapter ${value}`,
      URL: `https://raw.githubusercontent.com/janeligio/ctci/master/IX.%20Interview%20Questions/IX-Interview_Questions-${value}.md`,
      path: '/ctci/'
    })
  })

export default function Navigation(props) {
    function handler(route) {
        return () => {
            props.setCurrentView(route);
        }
    }
    return (
        <ProSidebar
            collapsed={props.collapsed}
            onToggle={(value) => props.setCollapsed(value)}
            breakpoint="md"
            collapsedWidth="0px"
            image={`https://images.unsplash.com/photo-1615912844755-bd8b6dd6789e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1234&q=80`}>
        <Menu>
            <MenuItem onClick={() => props.setCollapsed(!props.collapsed)} icon={<AiOutlineMenu/>}></MenuItem>
            <MenuItem icon={<AiOutlineHome/>} onClick={handler('home')}>Home</MenuItem>
            <SubMenu icon={<FiCode/>} title="Languages">
                <MenuItem onClick={handler('typescript')}>TypeScript</MenuItem>
                <MenuItem>Python</MenuItem>
                <MenuItem>HTML5</MenuItem>   
                <SubMenu title="CSS3">
                    <MenuItem>General</MenuItem>                    
                    <MenuItem>LESS</MenuItem>                    
                    <MenuItem>SASS</MenuItem>                    
                </SubMenu> 
            </SubMenu>
            <SubMenu icon={<GoBeaker/>} title="Algorithms">
                <SubMenu title="Cracking the Coding Interview">
                    {CTCI_DATA.map(datum => {
                        return (
                            <MenuItem onClick={() => {
                                props.setCurrentView(datum.title);
                                props.setCurrentURL(datum.URL);
                            }}>
                                {datum.title}
                            </MenuItem>
                        );
                    })}
                    <MenuItem>Chapter 1</MenuItem>
                </SubMenu>
                <MenuItem>HackerRank</MenuItem>
            </SubMenu>
            <SubMenu icon={<IoBookSharp/>} title="Methodologies">
                <MenuItem>Agile</MenuItem>
                <MenuItem>Scrum</MenuItem>
                <MenuItem>RAD</MenuItem>
            </SubMenu>
        </Menu>
        </ProSidebar>
    );
}
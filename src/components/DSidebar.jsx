import { Box, Typography } from '@mui/material';
import React, { useState } from 'react'
import { Sidebar, Menu, MenuItem, sidebarClasses } from 'react-pro-sidebar';
import ProfileImage from '../assets/images/profile.jpg'
import {CategoryOutlined, FoodBankOutlined, InfoOutlined, MonetizationOn, MoreOutlined, QueryStats} from '@mui/icons-material'
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

const DSidebar = () => {
  const [defaultCollapsed , setDefaultCollapsed] = useState(false)
  const location = useLocation()
  return (
    
    <Box
      sx={{
        height : 'calc(100vh - 20px)',
        marginLeft : '8px',
        borderRadius : '12px',
        backgroundColor : '#1c1500',
        overflow : "hidden",
        position: 'sticky',
        top: '10px',
        paddingTop : '40px'
      }}
    >
      <Sidebar
        collapsed={defaultCollapsed}
        breakPoint={'md'}
        transitionDuration={400}
        rootStyles={{
          '&' : {
            height : '100% !important',
            borderRadius : '12px',
            backgroundColor : '#1c1500',
            border : 'none',
            position : 'sticky',
            top : '10px'
          },
          [`.${sidebarClasses.container}`]: {
            height : '100% !important',
            borderRadius : '12px',
            backgroundColor : '#1c1500'
          },
        }}
      >
        <Menu
          closeOnClick={true}
          menuItemStyles={{
            button: ({ active }) => {
                return {
                  color : active ? '#D0B05C' : 'white',
                  borderLeft : active ? '2px solid #D0B05C' : 'none',
                  borderRadius : '4px',
                  transition : '0.3s',
                  fontFamily : 'openSans',
                  "&:hover" : {
                    background : 'transparent',
                    color  : '#b68f2d'
                  }
                };
            },
          }}
        >
          <MenuItem component={<Link to={'/'}/>} active={location.pathname === '/'}  icon={<InfoOutlined />}> Overview </MenuItem>
          <MenuItem component={<Link to={'/meals'}/>} active={location.pathname === '/meals'} icon={<FoodBankOutlined />}> Meals </MenuItem>
          <MenuItem component={<Link to={'/categories'}/>} active={location.pathname === '/categories'} icon={<CategoryOutlined />}> Categories </MenuItem>
          <MenuItem component={<Link to={'/orders'}/>} active={location.pathname === '/orders'} icon={<MonetizationOn />}> Orders </MenuItem>
          <MenuItem component={<Link to={'/statistics'}/>} active={location.pathname === '/statistics'} icon={<QueryStats />}> Statistics </MenuItem>
        </Menu>
      </Sidebar>
    </Box>
  )
}

export default DSidebar
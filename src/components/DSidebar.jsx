import { Box, Typography } from '@mui/material';
import React, { useState } from 'react'
import { Sidebar, Menu, MenuItem, sidebarClasses } from 'react-pro-sidebar';
import ProfileImage from '../assets/images/profile.jpg'
import {CategoryOutlined, FoodBankOutlined, InfoOutlined, MonetizationOn, MoreOutlined} from '@mui/icons-material'
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
        backgroundColor : '#262834',
        overflow : "hidden",
        position: 'sticky',
        top: '10px'
      }}
    >
      
      <Box
        sx={{
          display : 'flex',
          alignItems : 'center',
          justifyContent : 'center',
          flexDirection : 'column',
          marginBottom : '60px',
          backgroundColor : '#25273a',
        }}
      >
          <Typography
            sx={{
              textAlign : 'center',
              fontSize : '35px',
              color : 'white',
              fontWeight : 'bold',
              textTransform : 'capitalize',
              marginTop : '10px',
            }}
          >
            le salon
          </Typography>
        
        <Box
          sx={{
            padding : '5px',
            borderRadius : '50%',
            transform : 'translateY(40px)'
          }}
          className={'animated-rgb'}
        >
            <Box
              sx={{
                width : '80px',
                height : '80px',
                borderRadius : '50%',
                backgroundImage : `url(${ProfileImage})`,
                backgroundRepeat : 'no-repeat',
                backgroundSize : 'cover',
                backgroundPosition : 'center'
              }}
            >

            </Box>
        </Box>
      </Box>
      <Sidebar
        collapsed={defaultCollapsed}
        breakPoint={'md'}
        transitionDuration={400}
        rootStyles={{
          '&' : {
            height : '100% !important',
            borderRadius : '12px',
            backgroundColor : '#262834',
            border : 'none',
            position : 'sticky',
            top : '10px'
          },
          [`.${sidebarClasses.container}`]: {
            height : '100% !important',
            borderRadius : '12px',
            backgroundColor : '#262834'
          },
        }}
      >
        <Menu
          closeOnClick={true}
          menuItemStyles={{
            button: ({ active }) => {
                return {
                  color : active ? '#1ebd28' : 'white',
                  borderLeft : active ? '2px solid #00900a' : 'none',
                  borderRadius : '4px',
                  transition : '0.3s',
                  fontFamily : 'openSans',
                  "&:hover" : {
                    background : 'transparent',
                    color  : '#009f0b'
                  }
                };
            },
          }}
        >
          <MenuItem component={<Link to={'/'}/>} active={location.pathname === '/'}  icon={<InfoOutlined />}> Overview </MenuItem>
          <MenuItem component={<Link to={'/meals'}/>} active={location.pathname === '/meals'} icon={<FoodBankOutlined />}> Meals </MenuItem>
          <MenuItem component={<Link to={'/categories'}/>} active={location.pathname === '/categories'} icon={<CategoryOutlined />}> Categories </MenuItem>
          <MenuItem component={<Link to={'/orders'}/>} active={location.pathname === '/orders'} icon={<MonetizationOn />}> Orders </MenuItem>
        </Menu>
      </Sidebar>
    </Box>
  )
}

export default DSidebar
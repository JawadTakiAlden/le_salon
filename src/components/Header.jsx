import { NotificationsOutlined } from '@mui/icons-material'
import { Box, Button, IconButton, Typography } from '@mui/material'
import React from 'react'
import { logout, useJawadAuthController } from '../context'
import { useNavigate } from 'react-router'

const Header = () => {
    const [, duspatch] = useJawadAuthController()
    const navigate = useNavigate()
    const logoutUser = () => {
        logout(duspatch , null)
        navigate('/signin')
    }
  return (
    <Box
        sx={{
            height : '80px',
            display : 'flex',
            alignItems : ' center',
            justifyContent : 'space-between',
            marginTop : '10px',
            backgroundColor : '#1c1500',
            borderRadius : '10px',
            padding : '0px 20px',
            width : 'calc(100% - 10px)',
        }}
    >
        <Typography
            sx={{
                color : '#D0B05C',
                textTransform : 'capitalize',
                fontSize : '22px',
            }}
        >
            Godiva
        </Typography>
        <Box>
            <Button
                color='error'
                onClick={logoutUser}
            >
                logout
            </Button>
        </Box>
    </Box>
  )
}

export default Header
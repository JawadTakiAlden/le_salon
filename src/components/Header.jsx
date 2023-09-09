import { NotificationsOutlined } from '@mui/icons-material'
import { Box, Button, IconButton, Typography } from '@mui/material'
import React from 'react'

const Header = () => {
  return (
    <Box
        sx={{
            height : '80px',
            display : 'flex',
            alignItems : ' center',
            justifyContent : 'space-between',
            marginTop : '10px',
            backgroundColor : '#262834',
            borderRadius : '10px',
            padding : '0px 20px',
            width : 'calc(100% - 10px)',
        }}
    >
        <Typography
            sx={{
                color : '#23db3c',
                textTransform : 'capitalize',
                fontSize : '22px',
            }}
        >
            le salon
        </Typography>
        <Box>
            <IconButton
                color='success'
            >
                <NotificationsOutlined 
                    sx={{
                        color:'#fff'
                    }}
                />
            </IconButton>
            <Button
                color='error'
            >
                logout
            </Button>
        </Box>
    </Box>
  )
}

export default Header
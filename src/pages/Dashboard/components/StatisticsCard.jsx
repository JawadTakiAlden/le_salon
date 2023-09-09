import { ProductionQuantityLimitsOutlined } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import React from 'react'

const StatisticsCard = ({title , value}) => {
    const randomDegree = Math.floor(Math.random() * 360)
  return (
    <Box
        sx={{
            display : 'flex',
            alignItems : 'center',
            justifyContent : 'center',
            width : '100%',
            height : '100%',
            padding  : '30px',
            gap : '15px',
            backgroundImage : `linear-gradient(${randomDegree}deg ,#261e00 , #D0B05C)`,
            borderRadius : '15px'
        }}
    >
        <Box
            sx={{
                backgroundImage : 'linear-gradient(#D0B05C , #2d2000)',
                display : 'flex',
                alignItems : 'center',
                justifyContent : 'center',
                padding  :'10px',
                borderRadius : '50%'
            }}
        >
            <ProductionQuantityLimitsOutlined 
                sx={{
                    color : 'white',
                }}
            />
        </Box>
        <Box>
            <Typography
                sx={{
                    fontSize : '20px',
                    color : 'white'
                }}
            >
                {value}
            </Typography>
            <Typography
                sx={{
                    color : '#9ba09e',
                    fontSize : '14px',
                    fontWeight : 'normal'
                }}
            >
                {title}
            </Typography>
        </Box>
    </Box>
  )
}

export default StatisticsCard
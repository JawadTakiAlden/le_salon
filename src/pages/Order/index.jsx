import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Box, IconButton, Typography } from '@mui/material';
import { ArrowOutward, Delete, DeleteOutlined } from '@mui/icons-material';
import { request } from '../../api/request';
import { useQuery } from '@tanstack/react-query';


const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'table_id', headerName: 'Table ID', width : 100 },
    { field: 'total', headerName: 'Total', width : 100},
    { field: 'state', headerName: 'State', type : 'singleSelect' , valueOptions : ['wanting' , 'new' , 'onGoing' , 'ready'] , editable : true , width : 150 , align : 'center' ,
        renderCell : (params) => (
            <Box>
                <Typography
                    sx={{
                        color : 'white',
                        padding : '4px 16px',
                        backgroundColor : params.row.state === 'new'? '#9eb5ff' : params.row.state === 'preparing' ? '#ffe32c' : '#239b16',
                        borderRadius : '20px'
                    }}
                >
                    {params.row.state}
                </Typography>
            </Box>
        )
    },
    { field: 'actions', type : 'actions' , headerName: 'Action', width : 200 ,  
        renderCell : (params) => (
            <Box>
                <IconButton>
                    <ArrowOutward color='warning' />
                </IconButton>
                <IconButton>
                    <DeleteOutlined color='error' />
                </IconButton>
            </Box>
        )
    },
];

const getOrdersFromServer = () => {
    return request({
        url : '/orders'
    })
}

const Orders = () => {

    const ordersQuery = useQuery({
        queryKey : ['get-orders-from-server'],
        queryFn : getOrdersFromServer
    })

    if(ordersQuery.isLoading){
        return 'loading ...'
    }

    if(ordersQuery.isError) {
        if(ordersQuery.error.response.status === 401){

        }
    }


  return (
    <Box 
        sx={{
        height: 300,
        maxWidth: '100%',
      }}
    >
        <DataGrid 
            rows={ordersQuery.data.data.data} 
            columns={columns}
            sx={{
                boxShadow: 2,
                border: 2,
                width : '100%',
                borderColor: 'gray',
                "& .MuiDataGrid-columnHeaders":{

                },
                "& .MuiToolbar-root" : {
                    color : 'white',
                    "& .MuiSvgIcon-root" : {
                        color : 'white'
                    }
                },
                '& .MuiDataGrid-cell:hover': {
                  color: '#1ebd28',
                },
                "& .MuiDataGrid-cell" : {
                    color : 'white',
                    transition : '0.3s'
                },
                '& .super-app-theme--header': {
                    backgroundColor: 'rgba(255, 7, 0, 0.55)',
                },
                "& .MuiDataGrid-columnHeader" : {
                    color : 'white'
                },
                "& .MuiDataGrid-overlay" : {
                    backgroundColor : 'transparent',
                    color : 'white'
                }
            }}
        />
    </Box>
  )
}

export default Orders
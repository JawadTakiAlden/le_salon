import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, IconButton, TextField, Typography, useMediaQuery } from '@mui/material'
import React, { useState } from 'react'
import CategoryImage from '../assets/images/meal-01.jpg'
import { DeleteOutlined, UpdateOutlined } from '@mui/icons-material'
import { useMutation } from '@tanstack/react-query'
import { request } from '../api/request'
import { Formik } from 'formik'
import * as Yup from 'yup'

const CategoryCard = ({data , setMessage , setSeverity , setOpenAlterOpen , refetch}) => {
    const [open, setOpen] = useState(false);
    const isNonMobile = useMediaQuery("(min-width:600px)")
    const [UpdateFormOpen , setUpdateFormOpen] = useState(false)


const handleUpdateCategory = (values) => {
        console.log(values)
        let categoryValues = {
            name : values.name,
        }

        if(values.image){
            categoryValues.image = values.imageFile
        }
        updateCategoruMutation.mutate(categoryValues)
    }
const handleFormClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setUpdateFormOpen(false);
    };


    const HandleFormClick = () => {
        setUpdateFormOpen(true)
    }


    const updateCategoryToServer = (values) => {
        return request({
            url : `/categories/${data.id}`,
            method  : 'POST',
            headers : {
                "Content-Type": "multipart/form-data",
            },
            data : values
        })
    }

    const updateCategoruMutation = useMutation({
        mutationKey : ['add-category-to-server'],
        mutationFn : updateCategoryToServer,
        onError : (error) => {
            setMessage(error.message)
            setSeverity('error')
            setOpenAlterOpen(true)
        },
        onSuccess : () => {
            handleFormClose()
            refetch()
        }
    })

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteCategoryFromServer = () => {
        return request({
            url : `/categories/${data.id}`,
            method : 'delete'
        })
    }


    
const validationSchema = Yup.object({
    name : Yup.string().required('name field is required'),
})
    const initialValues = {
        name : data.name ,
        image : '' ,
        imageFile : {} ,
    }

    const deleteCategoryMutation = useMutation({
        mutationKey : ['delete-category-from-server'],
        mutationFn : deleteCategoryFromServer,
        onError : (error) => {
            setMessage(error.message)
            setSeverity('error')
            setOpenAlterOpen(true)
            
        },
        onSuccess : (data) => {
            refetch()
            handleClose()
        }
    })
    const handleConfirm = () => {
        deleteCategoryMutation.mutate()
    }

    if(deleteCategoryMutation.isLoading){
        return "loading ..."
    }
  return (
    <>
        <Box
            sx={{
                display : 'flex',
                alignItems : 'center',
                justifyContent : 'center',
                boxShadow : '2px 2px 10px -4px #23db3c',
                padding : '20px',
                gap : '10px'
            }}
        >
            
            <Box
                sx={{
                    display : 'flex',
                    alignItems : 'center',
                    justifyContent : 'center',
                    flexDirection : 'column',
                }}
            >
                <Box
                    sx={{
                        width : '80px',
                        height : '80px',
                        borderRadius : '50%',
                        backgroundImage : `url(http://127.0.0.1:8000${data.image})`,
                        backgroundSize : 'cover',
                        backgroundPosition : 'center',
                        backgroundRepeat : 'no-repeat',
                        marginBottom : '10px'
                    }}
                >

                </Box>
                <Typography
                    className=''
                    sx={{
                        background: 'linear-gradient(to right, #23db3c 20%, #FF0 40%, #FF0 60%, #23db3c 80%)',
                        backgroundSize: '200% auto',
                        
                        color: '#000',
                        backgroundClip: 'text',
                        textFillColor: 'transparent',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        animation: 'shine 4s linear infinite',
                        fontSize : '20px',
                        textTransform : 'capitalize',
                        textAlign : 'center'
                    }}
                >
                    {data.name}
                </Typography>
            </Box>
            <Box
                sx={{
                    display : 'flex',
                    flexDirection : 'column',
                    gap : '5px'
                }}
            >
                <Fab
                    sx={{
                        backgroundColor :'transparent',
                        "&:hover" :{
                            backgroundColor :'transparent',
                        }
                    }}
                    onClick={handleClickOpen}
                >
                    <DeleteOutlined 
                        color='error'
                    />
                </Fab>
                <Fab
                    sx={{
                        backgroundColor :'transparent',
                        "&:hover" :{
                            backgroundColor :'transparent',
                        }
                    }}

                    onClick={HandleFormClick}
                >
                    <UpdateOutlined 
                        color='warning'
                        />
                </Fab>
            </Box>
            
        </Box>
        <Dialog
        open={open}
        onClose={handleClose}
        sx={{
            "& .MuiPaper-root" : {
                backgroundColor : '#525252'
            }
        }}
    >
        <DialogTitle
            sx={{
                color : '#23db3c',
                textTransform : 'capitalize'
            }}
        >
            Delete Category Alter
        </DialogTitle>
        <DialogContent>
            <DialogContentText 
                sx={{
                    color : 'white',
                    textTransform :'capitalize'
                }}
            >
                are you sure you want to delete this category from you menu
            </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button color='error' variant="contained" onClick={handleClose}>Disagree</Button>
        <Button color='success' variant="contained" onClick={handleConfirm} autoFocus>
            Agree
        </Button>
        </DialogActions>
    </Dialog>

    <Dialog open={UpdateFormOpen} onClose={handleFormClose} maxWidth='md'>
            <DialogTitle>New Meal</DialogTitle>
            <DialogContent>
                <Formik
                    onSubmit={handleUpdateCategory}
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                >
                    {
                    (
                        {
                        values,
                        errors,
                        touched,
                        handleBlur,
                        handleChange,
                        handleSubmit,
                        setFieldValue
                        }
                    ) => (
                        <form onSubmit={handleSubmit}>
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            sx={{
                            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                            }}
                        >
                            <TextField 
                                type='text'
                                fullWidth 
                                sx={{ gridColumn: "span 4" }}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.name}
                                name="name"
                                error={!!touched.name && !!errors.name}
                                helperText={touched.name && errors.name}
                                label="Name"
                                variant="filled"
                            />
                            <TextField 
                                type='file'
                                fullWidth 
                                sx={{ gridColumn: "span 4" }}
                                onBlur={handleBlur}
                                onChange={(e) => {
                                    setFieldValue('imageFile' , e.currentTarget.files[0])
                                    handleChange(e)
                                }}
                                value={values.image}
                                name="image"
                                error={!!touched.image && !!errors.image}
                                label="Image"
                                variant="filled"
                            />
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="success" variant="contained">
                                add
                            </Button>
                        </Box>
                        </form>
                        )
                    }
                </Formik>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleFormClose}>Cancel</Button>
            </DialogActions>
      </Dialog>
    </>
  )
}

export default CategoryCard
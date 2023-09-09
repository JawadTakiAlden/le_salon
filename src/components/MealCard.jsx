import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, MenuItem, Select, TextField, Typography, useMediaQuery } from '@mui/material'
import React, { useState } from 'react'
import MealImage from '../assets/images/meal-01.jpg'
import { DeleteForeverOutlined, HideImageOutlined, ShowerOutlined, UpdateOutlined, Visibility, VisibilityOff } from '@mui/icons-material'
import { useMutation } from '@tanstack/react-query'
import { request } from '../api/request'
import { Formik } from 'formik'
import * as Yup from 'yup'



const gideMealInServer = (id) => {
    return request({
        url : `/switch_meal/${id}`,
        method :'patch'
    })
}


const MealCard = ({withActions , setMessage , setSeverity , data , setOpenAlterOpen , refetch , categories}) => {
    const randomDegree = Math.floor(Math.random() * 360)
    const [open, setOpen] = useState(false);
    const [AddFormOpen , setAddFormOpen] = useState(false)
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleFormClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setAddFormOpen(false);
    };


    const HandleFormClick = () => {
        setAddFormOpen(true)
    }

    const updateMealToServer = (values) => {
        return request({
            url : `/meals/${data.id}`,
            method: "post",
            headers : {
                'Content-Type' : 'multipart/form-data'
            },
            data : values
        })
    }

    const hideMealMutatrtion = useMutation({
        mutationKey : ['hide-meal-in-server'],
        mutationFn : gideMealInServer,
        onSuccess : () => {
            refetch()
            setMessage('a meal switched successfully')
            setSeverity('success')
            setOpenAlterOpen(true)
            setAddFormOpen(false)
            refetch()
        }
    })

    const updateMealMutation = useMutation({
        mutationKey : ['add-meal-to-category'],
        mutationFn : updateMealToServer,
        onError : (error) => {
            setMessage(error?.response?.message)
            setSeverity('error')
            setOpenAlterOpen(true)
            setAddFormOpen(false)
        },
        onSuccess : () => {
            setMessage('a meal created successfully')
            setSeverity('success')
            setOpenAlterOpen(true)
            setAddFormOpen(false)
            refetch()
        }
    })


    const handleUpdateNewMeal = (values) => {
        let data = {
            name : values.name,
            description : values.description,
            category_id : values.category_id,
            price : values.price
        }

        if(values.image){
            data.image = values.imageFile
        }

        updateMealMutation.mutate(data)
    }

    const deleteMealFromServer = () => {
        return request({
            url : `/meals/${data.id}`,
            method : 'delete'
        })
    }

    const deleteFromServer = useMutation({
        mutationKey : ['delete-meal-from-server'],
        mutationFn : deleteMealFromServer,
        onSuccess : () => {
            setSeverity('success')
            setMessage('meal deleted successfully')
            setOpenAlterOpen(true)
            refetch()
        },
        onError : (error) => {
            setSeverity('error')
            setMessage(error.message)
            setOpenAlterOpen(true)
        }
    })


    const initialValues = {
        name : data.name,
        category_id : data.category_id,
        price : data.price,
        description : data.description,
        image : ''
    }

    const handleConfirm = () => {
        deleteFromServer.mutate()
    }

    if(deleteFromServer.isLoading || hideMealMutatrtion.isLoading){
        return "loading ..."
    }
  return (
    <>
    <Box
        sx={{
            display : 'flex',
            gap : '30px',
            backgroundImage : `linear-gradient(${randomDegree}deg ,#000000 , #372700)`,
            borderRadius : '12px',
            padding : '20px',
            transition : '0.3s',
            flexDirection : 'column',
            justifyContent : 'center',
        }}
    >
        <Box
            sx={{
                maxHeight : '200px',
                overflow : 'hidden',
                borderRadius : '12px'
            }}
        >
            <img 
                style={{
                    maxWidth : '100%',
                    borderRadius : '12px'
                }}
                src={`http://127.0.0.1:8000${data.image}`}
            />
        </Box>
        <Box>
            <Typography
                sx={{
                    color : 'white',
                    textTransform : 'capitalize',
                    fontSize : '20px',
                    marginBottom : '10px'
                }}
            >
                {data.name}
            </Typography>
            <Typography
                sx={{
                    color : '#888',
                    textTransform : 'capitalize',
                    fontSize : '16px',
                    marginBottom : '10px',
                    fontWeight : '400'
                }}
            >
                {data.description}
            </Typography>
            <Typography
                sx={{
                    color : '#D0B05C',
                    textTransform : 'uppercase',
                    fontSize : '14px',
                    marginBottom : '10px',
                    fontWeight : '600'
                }}
            >
                {data.price} SAD
            </Typography>
            {/* <Box
                sx={{
                    display : 'flex',
                    alignItems : 'center',
                    gap : '10px',
                    flexWrap : 'wrap',
                }}
            >
                <Typography
                    sx={{
                        width : 'fit-content',
                        padding : '4px 16px',
                        borderRadius : '20px',
                        border : '1px solid #23db3c',
                        color : '#a6a6a6'
                    }}
                >
                    jawad
                </Typography>
                <Typography
                    sx={{
                        width : 'fit-content',
                        padding : '4px 16px',
                        borderRadius : '20px',
                        border : '1px solid #23db3c',
                        color : '#a6a6a6'
                    }}
                >
                    noor
                </Typography>
                <Typography
                    sx={{
                        width : 'fit-content',
                        padding : '4px 16px',
                        borderRadius : '20px',
                        border : '1px solid #23db3c',
                        color : '#a6a6a6'
                    }}
                >
                    firas
                </Typography>
                <Typography
                    sx={{
                        width : 'fit-content',
                        padding : '4px 16px',
                        borderRadius : '20px',
                        border : '1px solid #23db3c',
                        color : '#a6a6a6'
                    }}
                >
                    ali
                </Typography>
                <Typography
                    sx={{
                        width : 'fit-content',
                        padding : '4px 16px',
                        borderRadius : '20px',
                        border : '1px solid #23db3c',
                        color : '#a6a6a6'
                    }}
                >
                    adnan
                </Typography>
            </Box> */}
        </Box>
        {
            withActions
            ? (
                <Box
                    sx={{
                        display : 'flex',
                        alignItems : 'center',
                        justifyContent : 'center',
                        gap : '20px'
                    }}
                >
                    <IconButton
                        onClick={HandleFormClick}
                    >
                        <UpdateOutlined color='warning'/>
                    </IconButton>
                    <IconButton
                        onClick={handleClickOpen}
                    >
                        <DeleteForeverOutlined color='error' />
                    </IconButton>
                    <IconButton
                        onClick={() => hideMealMutatrtion.mutate(data.id)}
                    >
                        {
                            data.visibility
                            ? (
                                <VisibilityOff  color='info'/>
                            )
                            : (
                                <Visibility color='info' />
                            )
                        }
                    </IconButton>
                </Box>
            )
            : undefined
        }
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
            Delete Meal Alter
        </DialogTitle>
        <DialogContent>
            <DialogContentText 
                sx={{
                    color : 'white',
                    textTransform :'capitalize'
                }}
            >
                are you sure you want to delete this meal from you menu
            </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button color='error' variant="contained" onClick={handleClose}>Disagree</Button>
        <Button color='success' variant="contained" onClick={handleConfirm} autoFocus>
            Agree
        </Button>
        </DialogActions>
    </Dialog>


    <Dialog open={AddFormOpen} onClose={handleFormClose} maxWidth='md'>
            <DialogTitle>New Meal</DialogTitle>
            <DialogContent>
                <Formik
                    onSubmit={handleUpdateNewMeal}
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
                                type='text'
                                fullWidth 
                                sx={{ gridColumn: "span 4" }}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.description}
                                name="description"
                                error={!!touched.description && !!errors.description}
                                helperText={touched.description && errors.description}
                                label="Description"
                                variant="filled"
                            />
                            <TextField 
                                type='text'
                                fullWidth 
                                sx={{ gridColumn: "span 4" }}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.price}
                                name="price"
                                error={!!touched.price && !!errors.price}
                                helperText={touched.price && errors.price}
                                label="Price"
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
                            {/* <Autocomplete
                                multiple
                                id="tags-outlined"
                                options={extra}
                                getOptionLabel={(option) => option}
                                defaultValue={[extra[1]]}
                                filterSelectedOptions
                                fullWidth
                                renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Extra Ingradients"
                                    placeholder="Favorites"
                                />
                                )}
                                sx={{
                                    gridColumn: "span 4"
                                }}
                            /> */}
                            <Select
                                value={values.category_id}
                                onChange={handleChange}
                                autoWidth
                                fullWidth
                                sx={{
                                    gridColumn: "span 4"
                                }}
                                label="Category"
                                name='category_id'
                                error={!!touched.category && !!errors.category}
                                >

                                {
                                    categories.map(category => (
                                        <MenuItem key ={category.id} value= { category.id }>{category.name}</MenuItem>
                                    ))
                                }
                            </Select>
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


const validationSchema = Yup.object({
    name : Yup.string().required('name field is required'),
    price : Yup.number().required('price field is requred'),
    description : Yup.string().required('description field is required'),
    category_id : Yup.string().required('category field is required') 
})


export default MealCard
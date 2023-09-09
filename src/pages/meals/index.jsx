import { Alert, Autocomplete, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem, Select, Snackbar, TextField, useMediaQuery } from '@mui/material'
import React, { useState } from 'react'
import GridBox from '../../components/GridBox'
import GridItem from '../../components/GridItem'
import MealCard from '../../components/MealCard'
import AddButton from '../../components/AddButton'
import {Formik} from 'formik'
import * as Yup from 'yup'
import { request } from '../../api/request'
import { useMutation, useQuery } from '@tanstack/react-query'


const getCategoryFromServer = () => {
    return request({
      url : '/categories'  
    })
}
const getMealsFromServer = () => {
    return request({
        url : '/meals'
    })
}

const addMealToServer = (values) => {
    return request({
        url : '/meals',
        method : 'Post',
        headers : {
            'Content-Type' : 'multipart/form-data'
        },
        data : values
    })
}

const Meals = () => {
    const [openAlterOpen, setOpenAlterOpen] = useState(false);
    const [AddFormOpen , setAddFormOpen] = useState(false)
    const [message, setMessage] = useState(false);
    const [severity , setSeverity] = useState('success')
    const isNonMobile = useMediaQuery("(min-width:600px)");


    const getMealsQuery = useQuery({
        queryKey : ['get-meals-from-server'],
        queryFn : getMealsFromServer
    })

    const getCategoryQuery = useQuery({
        queryKey : ['get-categoories-in-meals-page'],
        queryFn : getCategoryFromServer
    })


    const addMealMutation = useMutation({
        mutationKey : ['add-meal-to-category'],
        mutationFn : addMealToServer,
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
            getMealsQuery.refetch()
        }
    })

    if(getMealsQuery.isLoading || getCategoryQuery.isLoading){
        return "loading ..."
    }

    if(getMealsQuery.isError){
        throw new Error(getMealsQuery.error.message)
    }

    if(getCategoryQuery.isError){
        throw new Error(getCategoryQuery.error.message)
    }

    const handleAlterClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenAlterOpen(false);
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

    const handleAddNewMeal = (values) => {
        let data = {
            name : values.name,
            description : values.description,
            image : values.imageFile,
            category_id : values.category_id,
            price : values.price
        }

        addMealMutation.mutate(data)
    }

    console.log(getMealsQuery.data.data)
    return (
      <>
        <Box>
            <AddButton reactionFunction={HandleFormClick}/>
            <GridBox spacing={2}>
                {
                    getMealsQuery.data.data.data.map(meal => (
                        <GridItem key={meal.id} xs={12} sm={6} md={4}lg={3}>
                            <MealCard withActions={true} setMessage={setMessage} setSeverity={setSeverity} setOpenAlterOpen={setOpenAlterOpen} data={meal} refetch={getMealsQuery.refetch} categories={getCategoryQuery.data.data.data}/>
                        </GridItem>
                    ))
                }
                {/* <GridItem xs={12} sm={6} md={4}lg={3}>
                    <MealCard withActions={true} setMessage={setMessage} setSeverity={setSeverity} setOpenAlterOpen={setOpenAlterOpen}/>
                </GridItem>
                <GridItem xs={12} sm={6} md={4}lg={3}>
                    <MealCard withActions={true} setMessage={setMessage} setSeverity={setSeverity}setOpenAlterOpen={setOpenAlterOpen}/>
                </GridItem>
                <GridItem xs={12} sm={6} md={4} lg={3}>
                    <MealCard withActions={true} setMessage={setMessage} setSeverity={setSeverity}setOpenAlterOpen={setOpenAlterOpen}/>
                </GridItem> */}
            </GridBox>
        </Box>
        <Snackbar open={openAlterOpen} autoHideDuration={4000} onClose={handleAlterClose}>
            <Alert onClose={handleAlterClose} severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
        <Dialog open={AddFormOpen} onClose={handleFormClose} maxWidth='md'>
            <DialogTitle>New Meal</DialogTitle>
            <DialogContent>
                <Formik
                    onSubmit={handleAddNewMeal}
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
                                    getCategoryQuery.data.data.data.map(category => (
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

const initialValues = {
    name : '',
    price : '',
    description : '',
    image : '',
    imageFile : {},
    category_id : ''
}

const validationSchema = Yup.object({
    name : Yup.string().required('name field is required'),
    price : Yup.number().required('price field is requred'),
    description : Yup.string().required('description field is required'),
    image : Yup.string().required('image field is required'),
    category_id : Yup.string().required('category field is required') 
})

export default Meals
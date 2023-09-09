import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, TextField, useMediaQuery } from '@mui/material'
import React, { useState } from 'react'
import GridBox from '../../components/GridBox'
import GridItem from '../../components/GridItem'
import CategoryCard from '../../components/CategoryCard'
import AddButton from '../../components/AddButton'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { request } from '../../api/request'
import { useMutation, useQuery } from '@tanstack/react-query'

const getCategoriesFromServer = () => {
    return request({
        url : '/categories'
    })
}

const addCategoryToServer = (values) => {
    return request({
        url : '/categories',
        method  : 'POST',
        headers : {
            "Content-Type": "multipart/form-data",
        },
        data : values
    })
}

const Categories = () => {
    const [openAlterOpen, setOpenAlterOpen] = useState(false);
    const [AddFormOpen , setAddFormOpen] = useState(false)
    const [message, setMessage] = useState(false);
    const [severity , setSeverity] = useState('success')
    const isNonMobile = useMediaQuery("(min-width:600px)");


    const categoriesQuery = useQuery({
        queryKey : ['get-categories-from-server'],
        queryFn : getCategoriesFromServer
    })

    const addCategoruMutation = useMutation({
        mutationKey : ['add-category-to-server'],
        mutationFn : addCategoryToServer,
        onError : (error) => {
            setMessage(error.message)
            setSeverity('error')
            setOpenAlterOpen(true)
        },
        onSuccess : () => {
            handleFormClose()
            categoriesQuery.refetch()
        }
    })

    const handleAddNewCategory = (values) => {
        console.log(values)
        const categoryValues = {
            name : values.name,
            image : values.imageFile
        }
        addCategoruMutation.mutate(categoryValues)
    }

    if(categoriesQuery.isLoading){
        return "loading .."
    }

    if(categoriesQuery.isError){
        throw new Error(categoriesQuery.error.message)
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


    if(addCategoruMutation.isLoading){
        return "loading ..."
    }

    console.log(categoriesQuery.data.data.categories)
  return (
    <>
        <Box>
            <AddButton reactionFunction={HandleFormClick}/>
            <GridBox spacing={2}>
                {
                    categoriesQuery.data.data.data.map(category => (
                        <GridItem key={category.id} xs={12} sm={6} md={4} lg={3}>
                            <CategoryCard data={category} setMessage={setMessage} setSeverity={setSeverity} setOpenAlterOpen={setOpenAlterOpen} refetch={categoriesQuery.refetch} />
                        </GridItem>
                    ))
                }
                {/* <GridItem xs={12} sm={6} md={4} lg={3}>
                    <CategoryCard />
                </GridItem>
                <GridItem xs={12} sm={6} md={4} lg={3}>
                    <CategoryCard />
                </GridItem>
                <GridItem xs={12} sm={6} md={4} lg={3}>
                    <CategoryCard />
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
                    onSubmit={handleAddNewCategory}
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


const initialValues = {
    name : '',
    image : '',
    imageFile : {},
}

const validationSchema = Yup.object({
    name : Yup.string().required('name field is required'),
    image : Yup.string().required('image field is required'),
})

export default Categories
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, IconButton, TextField, Typography, useMediaQuery } from '@mui/material'
import React, { useState } from 'react'
import CategoryImage from '../assets/images/meal-01.jpg'
import { DeleteOutlined, UpdateOutlined } from '@mui/icons-material'
import { useMutation } from '@tanstack/react-query'
import { imageBaseURL, request } from '../api/request'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Loader from './Loader'

const CategoryCard = ({data , setAlterMessage , setMessageType , setAlterOpen , refetch}) => {
    const [open, setOpen] = useState(false);
    const isNonMobile = useMediaQuery("(min-width:600px)")
    const [UpdateFormOpen , setUpdateFormOpen] = useState(false)


const handleUpdateCategory = (values) => {
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
        mutationKey : [`update-category-${data.id}-in-server`],
        mutationFn : updateCategoryToServer,
            onError : (error) => {
                if (error.response){
                  switch(error.response.status){
                    case 401 : {
                      setAlterMessage('you are not authorize to make this action')
                      setMessageType('error')
                      setAlterOpen(true)
                      break
                    }
                    case 422 : {
                      setAlterMessage('there are some issues with your data')
                      setMessageType('error')
                      setAlterOpen(true)
                      break
                    }
                    case 500 : {
                      setAlterMessage('we have a problem in our server , come later')
                      setMessageType('error')
                      setAlterOpen(true)
                      break
                    }
                    case 404 : {
                      setAlterMessage("we out of space , we can't find your destenation")
                      setMessageType('error')
                      setOpen(true)
                      break
                    }
                    default : {
                      setAlterMessage("unkown error accoure : request falid with status code" + error.response.status)
                      setMessageType('error')
                      setAlterOpen(true)
                      break
                    }
                  }
                }else if(error.request){
                  setAlterMessage('server response with nothing , Check your internet connection or contact support if the problem persists')
                  setMessageType('error')
                  setAlterOpen(true)
                }else {
                  setAlterMessage('unknow error : ' + error.message)
                  setMessageType('error')
                  setAlterOpen(true)
                }
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
        mutationKey : [`delete-category-${data.id}-from-server`],
        mutationFn : deleteCategoryFromServer,
        onError : (error) => {
            if (error.response){
              switch(error.response.status){
                case 401 : {
                  setAlterMessage('you are not authorize to make this action')
                  setMessageType('error')
                  setAlterOpen(true)
                  break
                }
                case 422 : {
                  setAlterMessage('there are some issues with your data')
                  setMessageType('error')
                  setAlterOpen(true)
                  break
                }
                case 500 : {
                  setAlterMessage('we have a problem in our server , come later')
                  setMessageType('error')
                  setAlterOpen(true)
                  break
                }
                case 404 : {
                  setAlterMessage("we out of space , we can't find your destenation")
                  setMessageType('error')
                  setOpen(true)
                  break
                }
                default : {
                  setAlterMessage("unkown error accoure : request falid with status code" + error.response.status)
                  setMessageType('error')
                  setAlterOpen(true)
                  break
                }
              }
            }else if(error.request){
              setAlterMessage('server response with nothing , Check your internet connection or contact support if the problem persists')
              setMessageType('error')
              setAlterOpen(true)
            }else {
              setAlterMessage('unknow error : ' + error.message)
              setMessageType('error')
              setAlterOpen(true)
            }
          },
        onSuccess : (data) => {
            refetch()
            handleClose()
        }
    })
    const handleConfirm = () => {
        deleteCategoryMutation.mutate()
    }

    if(deleteCategoryMutation.isLoading || updateCategoruMutation.isLoading){
        return <Loader/>
    }
    console.log(data)
  return (
    <>
        <Box
            sx={{
                display : 'flex',
                alignItems : 'center',
                justifyContent : 'center',
                boxShadow : '2px 2px 15px -4px #D0B05C',
                padding : '20px',
                borderRadius : '12px',
                gap : '10px',
                height : '100%'
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
                        backgroundImage : `url(${imageBaseURL}${data.image})`,
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
                        background: 'linear-gradient(to right, #D0B05C 20%, #875800 40%, #875800 60%, #D0B05C 80%)',
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
                color : '#D0B05C',
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
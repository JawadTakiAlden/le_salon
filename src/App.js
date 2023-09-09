import React from 'react'
import { Box } from '@mui/material'
import DSidebar from './components/DSidebar'
import Header from './components/Header'
import Breadcrumb from './components/Breadcrumb'
import { Route, Routes, useLocation } from 'react-router'
import Dashboard from './pages/Dashboard'
import "./App.css"
import './components/Animation.css'
import Meals from './pages/meals'
import Categories from './pages/Category'
import Orders from './pages/Order'
import ExtraIngrediants from './pages/ExtraIngrediants'
import { ErrorBoundary } from 'react-error-boundary'
import SignIn from './pages/Login'

function fallbackRender({ error, resetErrorBoundary }) {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.

  return (
    <div role="alert">
      <p style={{color : 'white'}}>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
    </div>
  );
}


const App = () => {
  const location = useLocation()
  return (
      <Box
        sx={{
          display : 'flex',
          gap : '10px',
          minHeight : '100vh',
        }}
      >
        <Box>
          {
            location.pathname !== '/signin' && (
              <DSidebar />
            )
          }
        </Box>

        <Box
          sx={{
            flex : '1'
          }}
        >
          {
            location.pathname !== '/signin' && ( 
              <>  
                <Header />
                <Breadcrumb />
              </>
            )
          }
          <ErrorBoundary 
            fallbackRender={fallbackRender} 
            onReset={(details) => {
              // Reset the state of your app so the error doesn't happen again
            }}
          >
            <Routes>
              <Route path='/' element={<Dashboard />} />
              <Route path='/signin' element={<SignIn />} />
              <Route path='/meals' element={<Meals />} />
              <Route path='/categories' element={<Categories />} />
              <Route path='/orders' element={<Orders />} />
            </Routes>
          </ErrorBoundary>
        </Box>
      </Box>
  )
}

export default App
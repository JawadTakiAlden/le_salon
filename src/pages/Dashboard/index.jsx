import { Box } from '@mui/material'
import React from 'react'
import StatisticsCards from './components/StatisticsCards'
import TopMeals from './components/TopMeals'
import { useQuery } from '@tanstack/react-query'
import { request } from '../../api/request'

const getStatisticsFromServer = () => {
  return request({
    url : '/statistics'
  })
}

const getTopMealsFromServer = () => {
  return request({
    url : '/topMeals'
  })
}

const Dashboard = () => {
  const statisticsQuery = useQuery({
    queryKey  : ['get-statistics-from-serve'],
    queryFn : getStatisticsFromServer,
  })

  const TopMealsQuery = useQuery({
    queryKey  : ['get-top-meals-from-serve'],
    queryFn : getTopMealsFromServer
  })

  if(statisticsQuery.isError){
    throw new Error(statisticsQuery?.error?.message)
  }

  if(TopMealsQuery.isError){
    throw new Error(TopMealsQuery?.error?.message)
  }

  if(statisticsQuery.isLoading || TopMealsQuery.isLoading){
    return 'loading ...'
  }



  return (
    <Box>
        <StatisticsCards data={statisticsQuery?.data?.data} />
        <TopMeals data={TopMealsQuery?.data?.data?.meals} />
    </Box>
  )
}

export default Dashboard
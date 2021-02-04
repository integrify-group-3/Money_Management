import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Calendar from 'react-calendar'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import { AppState, CalendarScheduler } from '../../types'
import { date } from '../../utils/dateValues'
import useYearExpenses from '../../hooks/useYearExpenses'
import useYearChart from '../../hooks/useYearChart'
import IncomeExpensesChart from '../../components/ExpensesIncomeChart'


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '5rem 1rem',
    width: '100vw',
    paddingLeft: '6rem',
    overflow: 'hidden',
  },
  container: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    width: '70vw',
  },
  grid: {
    width: '90vw',
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  fixedHeightCalendar: {
    height: 260,
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  chartHeightPaper: {
    height: 498,
  },
}))

export default function Analytics(props: any) {
  const classes = useStyles()
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)
  const isAuthenticated = useSelector((state: AppState) => state.user.isAuthenticated)
  const user = useSelector((state: AppState) => state.user.user)
  const [calendarDate] = useState(date)
  const [selectedYear, setSelectedYear] = useState(0)
  const [yearChart, setYearChart] = useState({} as CalendarScheduler)
  const [
    expensesErr,
    expensesData,
    yearViewExpenses,
    yearTotalExpenses,
    avgYExpenses
  ] = useYearExpenses(selectedYear)

 const [chartErr, chartData] = useYearChart(yearChart)

 console.log('year expenses', expensesData)

 //this is dummy data, and how the chart data should look like
 const data = [
  {month: 'January', income: 4000, expenses: 3400},
  {month: 'February', income: 3900, expenses: 3900},
  {month: 'March', income: 3700, expenses: 3700},
  {month: 'April', income: 3800, expenses: 3500},
  {month: 'May', income: 3900, expenses: 3600},
  {month: 'June', income: 3700, expenses: 3700},
  {month: 'July', income: 3600, expenses: 3900},
  {month: 'August', income: 3800, expenses: 4000},
  {month: 'September', income: 3900, expenses: 3590},
  {month: 'October', income: 3950, expenses: 3393},
  {month: 'November', income: 3850, expenses: 3490},
  {month: 'December', income: 3800, expenses: 3530},
]

  useEffect(() => {
    if (!isAuthenticated) {
      props.history.push('/login')
    } else {
        setSelectedYear(date.getFullYear())
        setYearChart(expensesData)
    }
  }, [isAuthenticated, props.history])
  
  const onChange = async (e: any) => {
    try {
      const clickedYear = await e.getFullYear()
      setSelectedYear(clickedYear)
    } catch(err) {

    } 
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      {/* <main className={classes.content}>
        <div className={classes.appBarSpacer} /> */}
      <main>
        <div />
        <Container maxWidth="md" className={classes.container}>
          <Grid container spacing={3} className={classes.grid}>
            <Grid item xs={5} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
              {/* Total year expenses go hear */}
              <h2>Expenses {yearViewExpenses.year}</h2>
              <h4>Total {yearTotalExpenses}</h4>
              <h4>Average {avgYExpenses} </h4> 
              </Paper>
            </Grid>
             <Grid item xs={5} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
              <h2>Income </h2>
                {/* total year income goes here */}
                <h4>Total</h4>
                <h4>Average</h4>
              </Paper>
            </Grid>
            <Grid item xs={5} md={6} lg={5}>
              <Paper className={fixedHeightPaper}>
                <h3>{user.firstName} {user.lastName}</h3>
                {/* year balance goes here */}
                <h3>Total Balance</h3>
                <h3>Year {selectedYear}</h3>
              </Paper>
            </Grid>

             <Grid item xs={5} md={8} lg={8}>
              <Paper className={classes.chartHeightPaper}>
                <h1>Expenses for {expensesData.year}</h1>
                {/*Expenses chart goes here, a series or bar chart for expenses and income for the year */}
                <IncomeExpensesChart data={data}/> 
              </Paper>
            </Grid>

             <Grid item xs={10} md={4}>
                {/*Calendar for decade can goe here */}
                <Calendar
                onChange={onChange}
                value={calendarDate}
                defaultView="decade"
                maxDetail="decade"
                // tileContent={({ date, view }) => showExpenseOnCalendar(date, view)}
              />
            </Grid>
          </Grid>
          <Box pt={4}></Box>
        </Container>
      </main>
    </div>
  )
}


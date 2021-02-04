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

import { AppState, ViewMonth } from '../../types'
import { date } from '../../utils/dateValues'
import TotalExpenses from '../../components/TotalExpenses'
import useMonthlyExpenses from '../../hooks/useMonthlyExpenses'
import useTotalExpenses from '../../hooks/useTotalExpenses'
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
    height: 370,
  },
}))

export default function Dashboard(props: any) {
  const classes = useStyles()
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)
  const isAuthenticated = useSelector((state: AppState) => state.user.isAuthenticated)
  const user = useSelector((state: AppState) => state.user.user)
  const [calendarDate] = useState(date)
  const [monthlyTotalExpenses, setMonthlyTotalExpenses] = useState(
    ([] as unknown) as ViewMonth
  )
  const [
    err,
    expensesData,
    calendarData,
    defaultDateView,
    defaultMonth,
  ] = useMonthlyExpenses()
  const [totalExpenses] = useTotalExpenses(monthlyTotalExpenses)
 
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
      setMonthlyTotalExpenses(defaultMonth)
    }
  }, [isAuthenticated, props.history])
  
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
              {/* Current month total expenses go here */}
              <Paper className={fixedHeightPaper}>
                <TotalExpenses
                  year={defaultDateView.year}
                  month={defaultDateView.month}
                  totalAmount={totalExpenses}
                />
              </Paper>
              </Paper>
            </Grid>
             <Grid item xs={5} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
              {/* Current month total income goes here */}
              <h2>Income for </h2>
                <h4>Total</h4>
                <h4>Average</h4>
              </Paper>
            </Grid>
            <Grid item xs={5} md={6} lg={5}>
              <Paper className={fixedHeightPaper}>
                <h2>Dashboard {user.firstName} {user.lastName}</h2>
                <p>{user.email}</p>
                {/* Current month balance goes here */}
                <h3>Total Balance</h3>
              </Paper>
            </Grid>

             <Grid item xs={8} md={11} lg={11}>
              <Paper className={classes.chartHeightPaper}>
                {/*Expenses chart goes here, a series chart for expenses and income for the current month */}
                <IncomeExpensesChart data={data}/>
              </Paper>
            </Grid>
            {/*This is temporary, calendar might be not needed as it will be on analytics page */}
             {/* <Grid item xs={10} md={4}>
                <Calendar
                // onChange={onChange}
                value={calendarDate}
                defaultView="decade"
                maxDetail="decade"
                tileContent={({ date, view }) => showExpenseOnCalendar(date, view)}
              />
            </Grid> */}
          </Grid>
          <Box pt={4}></Box>
        </Container>
      </main>
    </div>
  )
}


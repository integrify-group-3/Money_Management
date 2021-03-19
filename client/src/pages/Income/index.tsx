import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Calendar from 'react-calendar'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import { AppState, CalendarScheduler, DateView, ViewMonth } from '../../types'
import { clearUpdate } from '../../redux/actions/income'
import useMonthlyIncomeChart from '../../hooks/useMonthlyIncomeChart'
import EmptyChartContainer from '../../components/EmptyChartContainer'
import { Income } from '../../types/income'
import useIncome from '../../hooks/useMonthlyIncome'
import IncomeTable from '../../components/IncomeTable'
import TotalMonthlyIncome from '../../components/TotalMonthlyIncome'
import { months } from '../../utils/dateValues'
import IncomeMonthlyChart from '../../components/IncomeMonthlyChart'
import useTotalMonthlyIncome from '../../hooks/useTotalMonthlyIncome'
import useTotalMonthlyExpenses from '../../hooks/useTotalMonthlyExpenses'
import MonthlyBudget from '../../components/MonthlyBudget'
import 'react-calendar/dist/Calendar.css'
import './style.css'


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '5rem 3rem',
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
    height: 340,
  },
  chartHeightPaper: {
    height: 640,
  },
}))

export default function IncomePage(props: any) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)
  const isAuthenticated = useSelector(
    (state: AppState) => state.user.isAuthenticated
  )
  const isUpdating = useSelector((state: AppState) => state.income.isUpdating)

  const [isMonthClicking, setIsMonthClicking] = useState(false)
  const [calendarDate, setCalendarDate] = useState(new Date())
  const [calendar, setCalendar] = useState({} as any)
  const [monthlyChart, setMonthlyChart] = useState([])
  const [monthIncome, setMonthIncome] = useState([] as Income[])
  const [monthlyData, setMonthlyData] = useState(([] as unknown) as ViewMonth)
  const [
    err,
    incomeData,
    defaultDateView,
    calendarData,
    defaultMonth,
  ] = useIncome()
  const [incomeChartData] = useMonthlyIncomeChart(monthlyChart)
  const [totalMonthlyIncome] = useTotalMonthlyIncome(monthlyData)
  const [totalMonthlyExpenses] = useTotalMonthlyExpenses(monthlyData)
  const [loaded, setIsLoaded] = useState(false)
  const [dateView, setDateView] = useState({
    year: 0,
    month: '',
  } as DateView)

  //this one only loads the chart for default month
  const loadChart = () => {
    setMonthlyChart(defaultMonth?.income as any)
  }

  useEffect(() => {
    if (!isAuthenticated) {
      props.history.push('/login')
    } else {
      setCalendar(calendarData)
      console.log(isMonthClicking, isUpdating)
      if (!isMonthClicking) {
        // console.log('I am calling now', incomeData)
        //atm the below set state keeps running an infinite loop
        setDateView(defaultDateView as DateView)
        loadChart()
        // console.log('I am calling now for monthly data', defaultMonth)
        setMonthlyData(defaultMonth)
        dispatch(clearUpdate())
      } else if(isMonthClicking && isUpdating) {
         setMonthlyData(defaultMonth)
         loadChart()
         setMonthIncome(defaultMonth.income)
         console.log('income data shuld update', incomeData)
        //  console.log(monthIncome)
         dispatch(clearUpdate())
        //  console.log('monthly data from ismonthclicking', monthlyData)
      }
    }
  }, [isAuthenticated, monthIncome, incomeData, calendarData, dateView, defaultDateView, defaultMonth])

  const changeMonthView = (
    currentYear: number,
    currentMonth: string,
    foundYear: CalendarScheduler | undefined,
    currentIndex: number
  ) => {
    const foundMonth = foundYear?.months.find(
      (month: any) => month.name === months[currentIndex]
    )
    setMonthIncome(foundMonth?.income)
    setMonthlyChart(foundMonth.income)
    console.log('from changeMonthView', monthlyChart)
    setMonthlyData(foundMonth)
    console.log('from changeMonthView', monthlyData)
    setIsLoaded(true)
  }

  // useEffect(() => {
  //   setMonthIncome(incomeData as Income[])
  // }, [])

  const showMonthOnClick = (e: any) => {
    setIsMonthClicking(true)
    const year = e.getFullYear()
    const currentIndex = e.getMonth()
    const yearIncome = calendar.years.find((i: any) => i.year === year)
    setDateView({ ...dateView, year: year, month: months[currentIndex] })
    changeMonthView(dateView.year, dateView.month, yearIncome, currentIndex)
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
                <TotalMonthlyIncome
                  year={dateView.year}
                  month={dateView.month}
                  totalAmount={totalMonthlyIncome}
                />
              </Paper>
            </Grid>
            <Grid item xs={5} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                {/* Total balance goes here */}
                <MonthlyBudget
                  year={dateView.year}
                  month={dateView.month}
                  totalMonthlyExpenses={totalMonthlyExpenses}
                  totalMonthlyIncome={totalMonthlyIncome}
                />
              </Paper>
            </Grid>
            <Grid item xs={5} md={6} lg={6}>
              <Paper className={fixedHeightPaper}>
                {incomeChartData.length > 0 ? (
                  <IncomeMonthlyChart
                    chartData={incomeChartData}
                    month={dateView.month}
                    year={dateView.year}
                  />
                ) : (
                  <EmptyChartContainer
                    month={dateView.month}
                    year={dateView.year}
                  />
                )}
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Paper className={fixedHeightPaper}>
                <IncomeTable
                  // key={calendar?._id}
                  monthlyIncome={!isMonthClicking ? incomeData : monthIncome}
                  year={dateView.year}
                  month={dateView.month}
                />
              </Paper>
            </Grid>
            <Grid item xs={10} md={6} lg={6}>
              <Calendar
                // onChange={onChange}
                value={calendarDate}
                showNeighboringMonth={true}
                // onClickYear={showYearOnClick}
                onChange={showMonthOnClick}
                defaultView="year"
                maxDetail="year"
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

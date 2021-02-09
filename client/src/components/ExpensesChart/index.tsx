import React, { useEffect, useState } from 'react'
import Paper from '@material-ui/core/Paper'

import {
  Chart,
  PieSeries,
  ValueAxis,
  ArgumentAxis,
  BarSeries,
  Legend,
  Tooltip,
  Title,
} from '@devexpress/dx-react-chart-material-ui'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import NativeSelect from '@material-ui/core/NativeSelect'
import FormControl from '@material-ui/core/FormControl'
import { Animation } from '@devexpress/dx-react-chart'
import { scaleBand } from '@devexpress/dx-chart-core'
import { ArgumentScale, Stack } from '@devexpress/dx-react-chart'
import { EventTracker } from '@devexpress/dx-react-chart'
import {
  schemeCategory10,
  schemeAccent,
  schemeDark2,
  schemePaired,
  schemePastel1,
  schemePastel2,
  schemeSet1,
  schemeSet2,
  schemeSet3,
} from 'd3-scale-chromatic'
import { Palette } from '@devexpress/dx-react-chart'

import SwitchChartBtn from '../../components/SwitchChartBtn'
import { ExpensesChartProps } from '../../types'

const schemeCollection = [
  schemeCategory10,
  schemeAccent,
  schemeDark2,
  schemePaired,
  schemePastel1,
  schemePastel2,
  schemeSet1,
  schemeSet2,
  schemeSet3,
]

const useStyles = makeStyles((theme: any) => ({
  root: {
    height: '200px',
  },
  chartContainer: {
    height: '10rem',
  },
  typography: {
    marginTop: 0,
    marginBottom: theme.spacing(1),
  },
  div: {
    width: '200px',
    marginLeft: '50px',
    paddingBottom: '30px',
  },
  item: {
    width: '40px',
    height: '40px',
  },
  schemeConteiner: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(1),
  },
  pieChart: {
    height: '5rem,',
  },
}))

export default function ExpensesChart({
  chartData,
  year,
  month,
  valueField,
  argumentField,
  name
}: ExpensesChartProps) {
  const [scheme, setScheme] = useState(schemeCollection[7])

  const changeScheme = (e: any) => {
    setScheme(schemeCollection[e.target.value])
  }
  const classes = useStyles()
  const [switchChart, setSwitchChart] = useState(false)
 
  const switchChartView = () => {
    setSwitchChart(!switchChart)
  }

  const pieChartText = 'Pie Chart'
  const barChartText = 'Bar Chart'

  console.log('chart data', chartData)
  console.log(name)
  // console.log('values', props.valueField, 'arguments', props.argumentField)
  return (
    <Paper>
      {switchChart ? (
        <Chart data={chartData}>
          <ArgumentScale factory={scaleBand} />
          <ArgumentAxis />
          <ValueAxis />

          {/* <BarSeries
         valueField={props.valueField}
         argumentField={props.argumentField}
        name={props.name}
       /> */}

          { chartData.map((data: any) => (
            <BarSeries
              valueField={valueField}
              argumentField={argumentField}
              name={data.category}
            />
          ))}

          <Stack />
          <EventTracker />
          <Tooltip />
          <Legend />
          <Title text={`Expenses Chart ${month} ${year}`} />
          <SwitchChartBtn
            switchChartView={switchChartView}
            btnText={pieChartText}
          />
          <Animation />
        </Chart>
      ) : (
        <>
          <Chart data={chartData}>
            <Palette
              scheme={scheme}
              // name="category"
            />
            <PieSeries
              valueField={valueField}
              argumentField={argumentField}
              name={name}
            />
            <Legend />
            <Title text={`Expenses Chart ${month} ${year}`} />
            <SwitchChartBtn
              switchChartView={switchChartView}
              btnText={barChartText}
            />
            <EventTracker />
            <Tooltip />
            <Animation />
          </Chart>
          <div className={classes.schemeConteiner}>
            {scheme.map((color) => (
              <div
                key={color}
                className={classes.item}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <div className={classes.div}>
            <Typography
              component="h5"
              variant="h5"
              className={classes.typography}
            >
              Scheme
            </Typography>
            <FormControl>
              <NativeSelect onChange={changeScheme} defaultValue={0}>
                <option value={0}>schemeCategory10</option>
                <option value={1}>schemeAccent</option>
                <option value={2}>schemeDark2</option>
                <option value={3}>schemePaired</option>
                <option value={4}>schemePastel1</option>
                <option value={5}>schemePastel2</option>
                <option value={6}>schemeSet1</option>
                <option value={7}>schemeSet2</option>
                <option value={8}>schemeSet3</option>
              </NativeSelect>
            </FormControl>
          </div>
        </>
      )}
    </Paper>
  )
}

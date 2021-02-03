import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Title from '../Title'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import { removeIncome } from '../../redux/actions/income'
import { IncomeTableProps, Income } from '../../types'
import AddIncomeBtn from '../AddIncomeBtn'
import AddIncome from '../AddIncome'
import EditIncome from '../EditIncome'

const useStyles = makeStyles((theme) => ({
  depositContext: {
    flex: 0,
  },
  margin: {
    margin: theme.spacing(1),
  },
  incomeList: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  editIncome: {
    color: 'lightblue',
    cursor: 'pointer',
  },
}))

export default function IncomeTable({
  year,
  month,
  monthlyIncome,
  updateMonthlyIncome,
}: IncomeTableProps) {
  // console.log('fromt props', monthlyIncome, year, month)
  console.log('me', monthlyIncome)

  const [editOpen, setEditOpen] = useState(false)
  const dispatch = useDispatch()
  const classes = useStyles()
  const [openForm, setOpenForm] = React.useState(false)
  const showFormOnClick = () => {
    setOpenForm(true)
  }
  const openEditOnClick = (id: string) => {
    setEditOpen(true)
  }

  const hideFormOnClick = (e: any) => {
    setEditOpen(false)
  }

  const handleClose = () => {
    setOpenForm(false)
  }

  const deleteOnClick = (id: string, income: Income) => {
    dispatch(removeIncome(id, income))
  }

  return (
    <React.Fragment>
      {!openForm ? (
        <>
          <Title>
            {month} {year}
          </Title>
          {monthlyIncome.length < 1 ? (
            <Typography component="p" variant="h5">
              No income registered
            </Typography>
          ) : (
            <>
              <TableHead>
                <TableRow>
                  <TableCell>Category</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Amount</TableCell>
                </TableRow>
              </TableHead>
              {monthlyIncome.map((income: any) => {
                const { _id, category, description, amount } = income
                return (
                  <TableRow key={_id}>
                    <TableCell>{category}</TableCell>
                    <TableCell>{description}</TableCell>
                    <TableCell>{amount}</TableCell>
                    <TableCell>{editOpen && <EditIncome />}</TableCell>
                    <TableCell>
                      <EditIcon
                        className={classes.editIncome}
                        onClick={() => openEditOnClick(income._id)}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="delete"
                        className={classes.margin}
                        onClick={(e) => deleteOnClick(income._id, income)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )
              })}
            </>
          )}
          <AddIncomeBtn showFormOnClick={showFormOnClick} />
        </>
      ) : (
        <div>
          <AddIncome
            year={year}
            month={month}
            openForm={openForm}
            handleClose={handleClose}
            updateMonthlyIncome={updateMonthlyIncome}
          />
        </div>
      )}
    </React.Fragment>
  )
}

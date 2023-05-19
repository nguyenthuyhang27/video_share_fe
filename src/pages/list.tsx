import Layout from '@/components/layout'
import {
  Box,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

const List = () => {
  const router = useRouter()
  const [listUser, setListUser] = useState<
    | {
        _id: string
        username: string
        password: string
        ip: string
        country: string
        city: string
        timeZone: string
      }[]
    | []
  >([])
  useEffect(() => {
    const checkAuth = async () => {
      const user = JSON.parse(sessionStorage.getItem('user') as string)
      if (!user || !user.isAdmin) return router.push('/')
      try {
        const res = await axios.get('https://long-ruby-earthworm-veil.cyclic.app/api/v1/users')
        setListUser(res?.data?.data)
      } catch (error) {
        console.log(error)
      }
    }

    checkAuth()
  }, [router])

  const rows = [{}]

  return (
    <Layout>
      <Box mt={8}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell sx={{ fontWeight: 'bold', fontSize: 16 }}>Index</StyledTableCell>
                <StyledTableCell sx={{ fontWeight: 'bold', fontSize: 16 }}>
                  Username
                </StyledTableCell>
                <StyledTableCell sx={{ fontWeight: 'bold', fontSize: 16 }}>
                  Password
                </StyledTableCell>
                <StyledTableCell sx={{ fontWeight: 'bold', fontSize: 16 }}>
                  Ip Address
                </StyledTableCell>
                <StyledTableCell sx={{ fontWeight: 'bold', fontSize: 16 }}>Country</StyledTableCell>
                <StyledTableCell sx={{ fontWeight: 'bold', fontSize: 16 }}>City</StyledTableCell>
                <StyledTableCell sx={{ fontWeight: 'bold', fontSize: 16 }}>
                  Time zone
                </StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {listUser?.map((user, index) => (
                <StyledTableRow
                  key={user?._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <StyledTableCell sx={{ fontSize: 14 }}>{index + 1}</StyledTableCell>
                  <StyledTableCell sx={{ fontSize: 14 }}>{user?.username}</StyledTableCell>
                  <StyledTableCell sx={{ fontSize: 14 }}>{user?.password}</StyledTableCell>
                  <StyledTableCell sx={{ fontSize: 14 }}>{user?.ip}</StyledTableCell>
                  <StyledTableCell sx={{ fontSize: 14 }}>{user?.country}</StyledTableCell>
                  <StyledTableCell sx={{ fontSize: 14 }}>{user?.city}</StyledTableCell>
                  <StyledTableCell sx={{ fontSize: 14 }}>{user?.timeZone}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Layout>
  )
}

export default List

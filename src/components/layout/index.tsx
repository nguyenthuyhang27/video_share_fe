import { Box } from '@mui/material'
import Header from './Header'

type Props = {
  children: any
}

const Layout = ({ children }: Props) => {
  return (
    <Box bgcolor={'#282828'} minHeight={'100vh'} pb={10}>
      <Header />
      {children}
    </Box>
  )
}

export default Layout

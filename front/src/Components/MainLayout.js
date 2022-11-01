import { Box } from '@mui/material'
import { Header } from './Header'


export const MainLayout =({ children }) => {

  return (
    <Box>
      <Header/>
      {children}
    </Box>
  )
}

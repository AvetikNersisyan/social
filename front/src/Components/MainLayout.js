import { Box } from '@mui/material'
import { Header } from './Header'


export const MainLayout =({ children }) => {

  return (
    <Box>
      <Header/>
      <Box style={{
        marginTop: '4rem'
      }}>

      {children}
      </Box>
    </Box>
  )
}

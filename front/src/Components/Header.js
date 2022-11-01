import { Box } from '@mui/material'
import { NavLink } from 'react-router-dom'


export const Header =() => {

  return (
    <Box style={{
      height: '30px',
      display: 'flex',
      gap: '2rem',
      backgroundColor: '#ccc',
      textDecoration: 'none'
    }}>
      <NavLink to={'/'}> News Feed </NavLink>
      <NavLink to={'/account'}> Account </NavLink>
    </Box>
  )
}

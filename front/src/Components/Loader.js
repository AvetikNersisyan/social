import { CircularProgress } from '@mui/material'


export const Loader =() => {

  return (
    <span style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: "100%",
      height: "100vh"
    }}>
      <CircularProgress/>
    </span>
  )
}

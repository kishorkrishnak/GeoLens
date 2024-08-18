import { Box, CircularProgress } from '@mui/material'

const SuspenseFallback = () => {
  return (
    <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    height="100vh"
  >
    <CircularProgress />
  </Box>
  )
}

export default SuspenseFallback
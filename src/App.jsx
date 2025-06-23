import React from 'react'
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router'

//pages
import MainPage from './pages/MainPage'
import AuthPage from './pages/AuthPage'

//redux
import { useSelector } from 'react-redux'
import { Box, CssBaseline } from '@mui/material'

//utils
import { AlertProvider } from './utils/AlertProvider'

//calendar
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { ruRU } from '@mui/x-date-pickers/locales'
import 'dayjs/locale/ru';
import dayjs from 'dayjs'

dayjs.locale('ru'); //calendar localization

const PrivateRoute = () => {
  const {isAuth} = useSelector((state) => state.auth);
  return isAuth ? <Outlet/> : <Navigate to="/auth"/>
}

function App() {
  return (
    <LocalizationProvider adapterLocale="ru"
    localeText={ruRU.components.MuiLocalizationProvider.defaultProps.localeText} dateAdapter={AdapterDayjs}>
      <AlertProvider>
        <CssBaseline />
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
          }}
          >
          <BrowserRouter>
            <Routes>
              <Route element={<PrivateRoute />}>
                <Route path="/" element={<MainPage/>} />
              </Route>
              <Route path="/auth" element={<AuthPage/>} />
            </Routes>
          </BrowserRouter>
        </Box>
      </AlertProvider>
    </LocalizationProvider>
  )
}

export default App

import 'bootstrap/dist/css/bootstrap.css'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import { UserContext, UserProvider } from './context/UserContext'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import ProtectedRoute from './components/ProtectedRoute'
import { Container } from 'react-bootstrap'
import { useContext, useEffect, useState } from 'react'
import MyItemPage from './pages/MyItemPage'
import HeaderNav from './components/HeaderNav'
import UserService from './services/UserService'

function App () {
  const { user, updateBalance } = useContext(UserContext)
  const [balance, setBalance] = useState(0)

  const refreshBalance = () => {
    if (user) {
      console.log('call balance')
      UserService.profile().then(res => {
        setBalance(res.data.balance)
        updateBalance(res.data.balance);
      })
    }
  }

  useEffect(() => {
    // Update the document title using the browser API
    console.log('loaded', user);
    refreshBalance();
  })

  return (
    <UserProvider>
      <HeaderNav balanceUser={balance} stateChanged={()=>refreshBalance()} />
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <DashboardPage stateChanged={()=>refreshBalance()} />
            </ProtectedRoute>
          }
        />
        <Route
          path='/my-item'
          element={
            <ProtectedRoute>
              <MyItemPage />
            </ProtectedRoute>
          }
        />
      </Routes>
      <footer className='bg-light py-2'>
        <Container>
          <p className='text-center pb-0 mb-0'>
            <small>
              Auction System made with React TSX + Node Express TS &copy;
              Copyright {new Date().getFullYear()} by{' '}
              <a href='https://hendryzheng.com'>HendryZheng</a>
            </small>
          </p>
        </Container>
      </footer>
    </UserProvider>
  )
}

export default App

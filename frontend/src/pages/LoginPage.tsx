import '../styles/Form.css'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useUserContext } from '../context/UserContext'
import { Link } from 'react-router-dom'
import AuthService from '../services/AuthService'
import AlertMsg from '../components/Alert'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [variant, setVariant] = useState('')
  const [message, setMessage] = useState('')
  const location = useLocation()
  const emailRegistered = location?.state?.emailRegistered;

  if (emailRegistered) {
    setEmail(emailRegistered)
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }
  const { login } = useUserContext();
  const navigate = useNavigate()
  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    AuthService.login(email, password)
      .then(response => {
        if (response.data.access_token) {
          const user = {
            email,
            accessToken: response.data.access_token
          };
          login(user);
          setVariant('success')
          setMessage(
            `Login successful! we will redirect you to dashboard page in 3s`
          )
          setEmail('')
          setPassword('')
          navigate('/', {replace: true})
        } else {
          setVariant('danger')
          setMessage(`Login failed ! ${response.data.message}`)
        }
      })
      .catch(error => {
        console.log(error);
        setVariant('danger')
        setMessage(`Login failed ! ${error.response.data.message}`)
      })
  }

  return (
    <div className='back'>
      <div className='div-center'>
        <div className='content'>
          <h3>Auction System Login</h3>
          <hr />
          <form onSubmit={handleLogin}>
            <input
              type='email'
              value={email}
              onChange={handleEmailChange}
              className='form-control mb-3'
              placeholder='Email'
              required
            />

            <input
              type='password'
              value={password}
              onChange={handlePasswordChange}
              className='form-control mb-3'
              placeholder='Password'
              required
            />
            <div className='text-center mb-3'>
              Don't have an account yet? <Link to='/register'>Register</Link>
            </div>
            <div className='d-flex justify-content-center mt-2'>
              <button type='submit' className='btn btn-primary btn-block'>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
      <AlertMsg variant={variant} message={message} />
    </div>
  )
}

export default LoginPage

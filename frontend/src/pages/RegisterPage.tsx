import '../styles/Form.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import AuthService from '../services/AuthService'
import AlertMsg from '../components/Alert'

const RegisterPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [variant, setVariant] = useState('')

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const navigate = useNavigate()
  const handleRegister = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    // Make API call to register user
    AuthService.register(email, password)
      .then(response => {
        if (response.status < 300) {
          setVariant('success')
          setMessage(
            `Registration successful! Your email ${email} has been registered. You may login now, we will redirect you to login page in 3s`
          )
          setEmail('')
          setPassword('')
          setTimeout(() => {
            navigate('/',{state: {emailRegistered: email}})
          }, 3000)
        } else {
          setVariant('danger')
          setMessage(`Registration failed ! ${response.data.message}`)
        }
      })
      .catch(error => {
        setVariant('danger')
        setMessage(`Registration failed ! ${error.response.data.message}`)
      })
  }
  return (
    <div className='back'>
      <div className='div-center'>
        <div className='content'>
          <h3>Register an Account</h3>
          <hr />
          <form onSubmit={handleRegister}>
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
              pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}'
              title='Must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters'
              value={password}
              onChange={handlePasswordChange}
              className='form-control mb-3'
              placeholder='Password'
              required
            />
            <div className='text-center mb-3'>
              Already have an account? <Link to='/login'>Login Here</Link>
            </div>
            <div className='d-flex justify-content-center'>
              <button
                type='submit'
                className='btn btn-primary btn-block mx-auto'
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
      <AlertMsg variant={variant} message={message} />
    </div>
  )
}

export default RegisterPage

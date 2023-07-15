import { NavDropdown, Navbar, Nav, Button, Badge, Container } from 'react-bootstrap'
import { useUserContext } from '../context/UserContext'
import { useEffect, useState } from 'react'
import UserService from '../services/UserService'
import { Link } from 'react-router-dom'

const HeaderNav = () => {
  const [balance, setBalance] = useState('')
  const [active, setActive] = useState('dashboard')
  const handleNavSelect = (eventKey: string | null) => {
    console.log(eventKey)
    setActive(eventKey as string)
  }
  const { user } = useUserContext()
  useEffect(() => {
    // Update the document title using the browser API
    console.log('loaded')
    UserService.profile().then(response => {
      console.log(response)
      setBalance(response.data.balance);
    })
  })

  return (
    <Container fluid>
    <Navbar bg='light' expand='lg'>
      <Navbar.Brand href='#'>Dashboard</Navbar.Brand>

      <Navbar.Toggle aria-controls='basic-navbar-nav' />

      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav activeKey={active} onSelect={handleNavSelect} variant='underline'>
          <Nav.Link eventKey='dashboard' as={Link} to='/dashboard'>
            Bids
          </Nav.Link>
          <Nav.Link eventKey='my-item' as={Link} to='/my-item'>
            My Item
          </Nav.Link>
          <Nav.Link eventKey='deposit' href='#'>
            Deposit
          </Nav.Link>
        </Nav>

        <Nav className='ms-auto' variant='pills'>
          <Nav.Item>
            <Button variant='primary'>
              Balance <Badge bg='secondary'>${balance}</Badge>
            </Button>
          </Nav.Item>
        </Nav>
        <Nav className='ms-auto'>
          <NavDropdown
            align={'end'}
            title={user?.email}
            id='basic-nav-dropdown'
          >
            <NavDropdown.Item href='#action/3.3'>Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    </Container>
    
  )
}

export default HeaderNav

import {
  NavDropdown,
  Navbar,
  Nav,
  Button,
  Badge,
  Container
} from 'react-bootstrap'
import { useUserContext } from '../context/UserContext'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DepositModal from './DepositModal'

interface HeaderNavProps {
  balanceUser: number;
  stateChanged: ()=> void;
}

const HeaderNav = ({balanceUser, stateChanged}: HeaderNavProps) => {
  const { user, logout } = useUserContext()

  const [showDepositModal, setShowDepositModal] = useState(false)
  const [active, setActive] = useState('dashboard')
  const handleNavSelect = (eventKey: string | null) => {
    setActive(eventKey as string)
  }

  const navigate = useNavigate()
  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <Container fluid>
      <Navbar bg='light' expand='lg'>
        <Navbar.Brand href='#'>Dashboard</Navbar.Brand>

        <Navbar.Toggle aria-controls='basic-navbar-nav' />

        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav
            activeKey={active}
            onSelect={handleNavSelect}
            variant='underline'
          >
            <Nav.Link eventKey='dashboard' as={Link} to='/'>
              Bids
            </Nav.Link>
            <Nav.Link eventKey='my-item' as={Link} to='/my-item'>
              My Item
            </Nav.Link>
          </Nav>

          <Nav className='ms-auto' variant='pills'>
            <Nav.Item>
              <Button variant='primary'>
                Balance <Badge bg='secondary'>${balanceUser}</Badge>
              </Button>
            </Nav.Item>
            <Nav.Item>
              <Button
                onClick={() => {
                  setShowDepositModal(true)
                }}
                variant='warning'
              >
                Top Up (+)
              </Button>
            </Nav.Item>
          </Nav>
          <Nav className='ms-auto'>
            <NavDropdown
              align={'end'}
              title={user?.email}
              id='basic-nav-dropdown'
            >
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <DepositModal
        showModal={showDepositModal}
        handleClose={() => {
          setShowDepositModal(false);
          stateChanged();
        }}
      />
    </Container>
  )
}

export default HeaderNav

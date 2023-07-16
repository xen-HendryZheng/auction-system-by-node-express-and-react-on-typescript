import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap'
import OngoingBidTab from './tabs/OngoingBidTab'
import CompletedBidTab from './tabs/CompletedBidTab'

interface DashboardPageProps {
  stateChanged: () => void
}

const DashboardPage = ({ stateChanged }: DashboardPageProps) => {
  return (
    <Container fluid>
      <Row className='pt-5'>
        <Col>
          <Tabs
            defaultActiveKey='ongoing'
            id='uncontrolled-tab-example'
            className='mb-3'
          >
            <Tab eventKey='ongoing' title='Ongoing Bid'>
              <OngoingBidTab stateChanged={stateChanged} />
            </Tab>
            <Tab eventKey='completed' title='Completed Bid'>
              <CompletedBidTab />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  )
}

export default DashboardPage

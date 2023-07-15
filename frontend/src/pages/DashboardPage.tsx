import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap'
import OngoingBidTab from './tabs/OngoingBidTab'
import CompletedBidTab from './tabs/CompletedBidTab'

const DashboardPage = () => {
  return (
    <Container fluid>
      <Row className='pt-5'>
        <Col md={9}>
          <Tabs
            defaultActiveKey='ongoing'
            id='uncontrolled-tab-example'
            className='mb-3'
          >
            <Tab eventKey='ongoing' title='Ongoing Bid'>
              <OngoingBidTab />
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

import { Container, Row, Col, Button, Table } from 'react-bootstrap'

const MyItemPage = () => {
  return (
    <Container fluid>
      <Row className='pt-5'>
        <Col md={9}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Item Name</th>
                <th>Current Price</th>
                <th>Duration Left</th>
                <th>Bid</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Blue Sapphire</td>
                <td>$500</td>
                <td>58m10s left</td>
                <td>
                  <Button className='btn btn-primary'>Bid</Button>
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>Blue Sapphire</td>
                <td>$500</td>
                <td>58m10s left</td>
                <td>
                  <Button className='btn btn-primary'>Bid</Button>
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>Blue Sapphire</td>
                <td>$500</td>
                <td>58m10s left</td>
                <td>
                  <Button className='btn btn-primary'>Bid</Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  )
}

export default MyItemPage

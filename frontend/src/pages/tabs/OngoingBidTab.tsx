import { Button, Table } from 'react-bootstrap'

const OngoingBidTab = () => {
  return (
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
  )
}

export default OngoingBidTab

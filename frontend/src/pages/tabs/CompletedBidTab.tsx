import { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import ItemService from '../../services/ItemService'
import ItemCompletedRow from '../../components/ItemCompletedRow';

const CompletedBidTab = () => {

  const [items, setItems] = useState([]);
  useEffect(() => {
    console.log('loaded owned bid tab')
    getItems();
  },[])
  const getItems = async () => {
    const results = await ItemService.getCompletedBid()
    console.log(results);
    setItems(results.data.data)
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Item Name</th>
          <th>From User</th>
          <th>Auctioned To</th>
          <th>End Price</th>
          <th>Completed At</th>
        </tr>
      </thead>
      <tbody>
        <ItemCompletedRow items={items}/>
      </tbody>
    </Table>
  )
}

export default CompletedBidTab

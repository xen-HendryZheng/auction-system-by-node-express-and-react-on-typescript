import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import ItemService from '../../services/ItemService'
import ItemOngoingRow from '../../components/ItemOngoingRow';

const CompletedBidTab = () => {

  const [items, setItems] = useState([]);
  useEffect(() => {
    console.log('loaded owned bid tab')
    getItems();
  },[])
  const getItems = async () => {
    const results = await ItemService.getOwnedItems()
    console.log(results);
    setItems(results.data.data)
  };

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
        <ItemOngoingRow items={items}/>
      </tbody>
    </Table>
  )
}

export default CompletedBidTab

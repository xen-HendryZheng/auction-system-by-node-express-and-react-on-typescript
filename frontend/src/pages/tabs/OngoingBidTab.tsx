import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import ItemService from '../../services/ItemService'
import ItemOngoingRow from '../../components/ItemOngoingRow';

const OngoingBidTab = () => {

  const [items, setItems] = useState([]);
  useEffect(() => {
    console.log('loaded ogoing bid tab')
    getItems();
  },[])
  const getItems = async () => {
    const results = await ItemService.getPublishedItems()
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

export default OngoingBidTab

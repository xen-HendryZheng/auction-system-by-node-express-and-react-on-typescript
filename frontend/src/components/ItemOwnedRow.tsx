import { Badge, Button } from 'react-bootstrap'
import CountdownTimer from './CountDownTimer'
import moment from 'moment'
import ItemService from '../services/ItemService'

interface Item {
  item_id: number
  item_name: string
  time_window: string
  created_by: string
  owned_by: string
  start_price: number
  current_price: number
  expired_at: string
  created_at: string
  item_status: string
}
interface ItemProps {
  items: Item[]
  stateChanged: () => void
}

const ItemOwnedRow = ({ items, stateChanged }: ItemProps) => {
  const handlePublish = (itemId: number) => {
    // eslint-disable-next-line no-restricted-globals
    var resultConfirm = confirm('Are you sure you want to publish?')
    if (resultConfirm) {
      ItemService.publishItem(itemId)
        .then(res => {
          console.log(res)
          stateChanged()
        })
    }
  }

  const checkItemStatus = (item: Item) => {
    if (item.item_status === 'draft') {
      return (
        <Button
          onClick={() => handlePublish(item.item_id)}
          size='sm'
          className='btn btn-primary'
        >
          Publish
        </Button>
      )
    } else if (item.item_status === 'publish') {
      return <CountdownTimer targetDateString={item.expired_at} />
    } else if (item.item_status === 'closed') {
      return (
        <Badge className='danger'>
          Complete Auctioned at {item.expired_at}
        </Badge>
      )
    }
  }

  return (
    <>
      {items.map((item: Item, idx: number) => (
        <tr key={idx}>
          <td>{idx + 1}</td>
          <td>{item.item_name}</td>
          <td>{item.time_window} hour</td>
          <td>{item.item_status.toUpperCase()}</td>
          <td>{item.created_by}</td>
          <td>{item.owned_by}</td>
          <td>${item.start_price}</td>
          <td>${item.current_price}</td>
          <td>{moment(item.created_at).toLocaleString()}</td>
          <td>{checkItemStatus(item)}</td>
        </tr>
      ))}
    </>
  )
}

export default ItemOwnedRow

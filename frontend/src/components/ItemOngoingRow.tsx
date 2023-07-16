import { Button } from 'react-bootstrap'
import CountdownTimer from './CountDownTimer'
import moment from 'moment'
import BidService from '../services/BidService'
import { useState } from 'react'
import { useUserContext } from '../context/UserContext'

interface Item {
  item_id: number
  item_name: string
  start_price: string
  current_price: string
  expired_at: string
  item_status: string
}
interface ItemProps {
  items: Item[]
  stateChanged: () => void,
  alertProps: (variant: string, message: string) => void
}
interface ItemCountdown {
  item_id: number
  expired: string
}

const ItemOngoingRow = ({ items, stateChanged, alertProps }: ItemProps) => {
  const { user } = useUserContext()
  console.log(user)
  const [disabledOptions, setDisabledOptions] = useState<number[]>([])
  const [intervalCountdown, setIntervalCountdown] = useState<ItemCountdown[]>(
    []
  )
  const handleBid = (item: Item) => {
    let bidPrice = prompt('Bid Price')
    if (!isNaN(parseFloat(bidPrice as string))) {
      BidService.bidItem(item.item_id, parseFloat(bidPrice as string))
        .then(res => {
          if (res.status < 300) {
            const newDisabledArray: number[] = [
              ...disabledOptions,
              item.item_id
            ]
            setDisabledOptions(newDisabledArray)
            setTimeout(() => {
              const newDisabledArray: number[] = disabledOptions.filter(
                option => option !== item.item_id
              )
              setDisabledOptions(newDisabledArray)

              const newIntervalCountdown = intervalCountdown.filter(
                option => option.item_id !== item.item_id
              )
              setIntervalCountdown(newIntervalCountdown)
            }, 5000)
            const itemCountDown = {
              item_id: item.item_id,
              expired: moment().add(6, 'second').format()
            }
            setIntervalCountdown([...intervalCountdown, itemCountDown])
            stateChanged()
          } else {
            console.log(res)
            alertProps('danger', res.data.message);
          }
        })
        .catch(error => {
            // alert(error.response.data.message)
            alertProps('danger', error.response.data.message);
        })
    }
  }

  const renderCountdown = (item: Item) => {
    const found = intervalCountdown.find(x => x.item_id === item.item_id)
    if (found) {
      return <CountdownTimer targetDateString={found.expired} />
    }
  }

  const renderButtonBid = (item: Item) => {
    if (moment(item.expired_at).isAfter(moment())) {
      return (
        <Button
          size='sm'
          onClick={() => handleBid(item)}
          disabled={disabledOptions.includes(item.item_id)}
          className='btn btn-success'
        >
          Bid {renderCountdown(item)}
        </Button>
      )
    } else {
      return 'Window time has passed'
    }
  }

  return (
    <>
      {items.map((item: Item, idx: number) => (
        <tr key={idx}>
          <td>{idx + 1}</td>
          <td>{item.item_name}</td>
          <td>{item.item_status.toLocaleUpperCase()}</td>
          <td>${item.start_price}</td>
          <td>${item.current_price}</td>
          <td>
            <CountdownTimer targetDateString={item.expired_at} />
          </td>
          <td>{renderButtonBid(item)}</td>
        </tr>
      ))}
    </>
  )
}

export default ItemOngoingRow

import { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import ItemService from '../../services/ItemService'
import ItemOngoingRow from '../../components/ItemOngoingRow'
import AlertMsg from '../../components/Alert'
interface OngoingBidTabProps {
  stateChanged: () => void
}

interface AlertProps {
  variant: string,
  message: string
}

const OngoingBidTab = ({ stateChanged }: OngoingBidTabProps) => {
  const [items, setItems] = useState([])
  const [alertProps, setAlertProps] = useState<AlertProps>()
  useEffect(() => {
    console.log('loaded ogoing bid tab')
    getItems()
  }, [])
  const getItems = async () => {
    const results = await ItemService.getOngoingBid()
    console.log(results)
    setItems(results.data.data)
  }

  return (
    <>
    <AlertMsg variant={alertProps?.variant as string} message={alertProps?.message as string}/>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Item Name</th>
          <th>Item Status</th>
          <th>Start Price</th>
          <th>Current Price</th>
          <th>Duration Left</th>
          <th>Bid</th>
        </tr>
      </thead>
      <tbody>
        <ItemOngoingRow items={items} stateChanged={() => {getItems(); stateChanged()}} alertProps={(variant, message)=>{
          setAlertProps({
            variant,
            message
          })
        }} />
      </tbody>
    </Table>
    </>
    
  )
}

export default OngoingBidTab

import { useEffect, useState } from 'react'
import { Container, Row, Col, Button, Table } from 'react-bootstrap'
import ItemService from '../services/ItemService'
import ItemOwnedRow from '../components/ItemOwnedRow'
import NewItemModal from '../components/NewItemModal'

const MyItemPage = () => {
  const [items, setItems] = useState([])
  const [showModal, setShowModal] = useState(false)
  useEffect(() => {
    console.log('loaded owned bid tab')
    getItems()
  }, [])
  const getItems = async () => {
    const results = await ItemService.getOwnedItems()
    console.log(results)
    setItems(results.data.data)
  }

  return (
    <>
      <Container fluid>
        <Row className='mt-5'>
          <Col md={3}>
            <Button onClick={() => setShowModal(true)} className='btn-primary'>
              Add New Item
            </Button>
          </Col>
        </Row>
        <Table className='mt-2' striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Item Name</th>
              <th>Time Window</th>
              <th>Status</th>
              <th>From User</th>
              <th>Auctioned To</th>
              <th>Start Price</th>
              <th>End Price</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <ItemOwnedRow items={items} stateChanged={() => getItems()} />
          </tbody>
        </Table>
      </Container>
      <NewItemModal
        showModal={showModal}
        handleClose={() => {
          getItems()
          setShowModal(false)
        }}
      />
    </>
  )
}

export default MyItemPage

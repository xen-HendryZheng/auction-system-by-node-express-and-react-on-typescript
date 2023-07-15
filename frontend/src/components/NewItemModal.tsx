import { Modal } from "react-bootstrap"
import { useState } from 'react'
import { Button } from 'react-bootstrap';
import ItemService from "../services/ItemService";
import AlertMsg from "./Alert";

interface DepositProps {
    showModal: boolean;
    handleClose: () => void;
}
const NewItemModal = ({ showModal, handleClose }: DepositProps) => {
    const [price, setPrice] = useState('');
    const [timeW, setTimeW] = useState('');
    const [name, setName] = useState('');
    const [variant, setVariant] = useState('')
    const [message, setMessage] = useState('')
    const handleAdd = () => {
        ItemService.addItem(name, Number(price), Number(timeW)).then(res => {
            if (res.status < 300) {
                setVariant('success')
                setMessage(
                    `Item ${name} added successfully !`
                )
                setPrice('');
                setTimeW('');
                setName('');
            } else {
                setVariant('danger')
                setMessage(`Failed to add ! ${res.data.message}`)
            }
        })
    }

    return (
        <>
            <Modal show={showModal}>
                <form onSubmit={handleAdd}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Item</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input
                            type='text'
                            value={name}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setName(event.target.value)
                            }}
                            className='form-control mb-3'
                            placeholder='Enter price'
                            required
                        />
                        <input
                            type='number'
                            step='any'
                            value={price}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setPrice(event.target.value)
                            }}
                            className='form-control mb-3'
                            placeholder='Enter price'
                            required
                        />
                        <input
                            type='number'
                            step='any'
                            value={timeW}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setTimeW(event.target.value)
                            }}
                            className='form-control mb-3'
                            placeholder='Enter time window'
                            required
                        />

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleAdd}>
                            Create Item
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
            <AlertMsg variant={variant} message={message} />
        </>
    )
}
export default NewItemModal
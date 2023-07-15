import { Modal } from "react-bootstrap"
import { useState } from 'react'
import { Button } from 'react-bootstrap';
import UserService from "../services/UserService";

interface DepositProps {
    showModal: boolean;
    handleClose: () => void;
}
const DepositModal = ({ showModal, handleClose }: DepositProps) => {
    const [amount, setAmount] = useState('');
    const handleDeposit = (e: { preventDefault: () => void; }) => { 
        e.preventDefault();
        UserService.deposit(Number(amount)).then(res => {
            console.log(res);
            handleClose();
        })
    }

    return (
        <Modal show={showModal}>
            <form onSubmit={handleDeposit}>
                <Modal.Header>
                    <Modal.Title>Deposit Some Money</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <input
                        type='number'
                        step='any'
                        value={amount}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setAmount(event.target.value)
                        }}
                        className='form-control mb-3'
                        placeholder='Enter amount'
                        required
                    />

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleDeposit}>
                        Deposit Now
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}
export default DepositModal
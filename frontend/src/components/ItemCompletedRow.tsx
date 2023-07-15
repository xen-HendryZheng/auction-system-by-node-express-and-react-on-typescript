import { Button } from 'react-bootstrap';

interface Item {
    item_id: number;
    item_name: string;
    current_price: string;
    expired_at: string;
    item_status: string;
}
interface ItemProps {
    items: Item[]
}

const ItemCompletedRow = ({ items }: ItemProps) => {
    return <>{
        items.map((item: Item, idx: number) => <tr key={idx }>
            <td>{idx+1}</td>
            <td>{item.item_name}</td>
            <td>{item.current_price}</td>
            <td>{item.expired_at}</td>
            <td>
                <Button className='btn btn-primary'>Bid</Button>
            </td>
        </tr>)}</>
}

export default ItemCompletedRow

interface Item {
    item_id: number;
    item_name: string;
    created_by: string;
    owned_by: string;
    current_price: number;
    expired_at: string;
}
interface ItemProps {
    items: Item[]
}

const ItemCompletedRow = ({ items }: ItemProps) => {
    return <>{
        items.map((item: Item, idx: number) => <tr key={idx }>
            <td>{idx+1}</td>
            <td>{item.item_name}</td>
            <td>{item.created_by}</td>
            <td>{item.owned_by}</td>
            <td>{item.current_price}</td>
            <td>{item.expired_at}</td>
        </tr>)}</>
}

export default ItemCompletedRow
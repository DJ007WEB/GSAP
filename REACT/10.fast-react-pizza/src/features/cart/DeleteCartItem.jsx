/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import { deleteItem } from './cartSlice';

export default function DeleteCartItem({ pizzaId }) {
  const dispatch = useDispatch();

  return (
    <Button type="small" onClicked={() => dispatch(deleteItem(pizzaId))}>
      Delete
    </Button>
  );
}

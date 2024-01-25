/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import { decreaseQuantity, increaseQuantity } from './cartSlice';

export default function UpdateItemQuantity({ pizzaId, currentQuantity }) {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center gap-1 md:gap-3">
      <Button
        type="round"
        onClicked={() => dispatch(decreaseQuantity(pizzaId))}
      >
        -
      </Button>
      <span className="text-sm font-medium">{currentQuantity}</span>
      <Button
        type="round"
        onClicked={() => dispatch(increaseQuantity(pizzaId))}
      >
        +
      </Button>
    </div>
  );
}

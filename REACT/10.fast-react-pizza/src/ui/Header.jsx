import { Link } from 'react-router-dom';
import SearchOrder from '../features/order/SearchOrder';
import User from '../features/user/User';
export default function Header() {
  return (
    <header className="flex items-center justify-between border-b border-stone-200 bg-yellow-400 px-4 py-3 sm:px-6">
      <Link to="/" className="tracking-widest">
        Fast React Pizza
      </Link>
      <SearchOrder />
      <User />
    </header>
  );
}

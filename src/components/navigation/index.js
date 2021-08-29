import './index.css';

function Navigation() {
  return (
    <div className="nav_bar cf">
      <ul className="nav_menu inner">
        <li>
          <a href="/">home</a>
        </li>
        <li className="nav_item">
          <a href="/sequence">sequence list</a>
        </li>
        <li className="nav_item">
          <a href="/announcement">announcement list</a>
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
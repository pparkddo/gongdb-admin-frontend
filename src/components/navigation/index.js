import './index.css';

function Navigation() {
  return (
    <div className="nav_bar cf">
      <ul className="nav_menu inner">
        <li>
          <a href="/">메인</a>
        </li>
        <li className="nav_item">
          <a href="/sequence">차수 리스트</a>
        </li>
        <li className="nav_item">
          <a href="/announcement">공고 리스트</a>
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
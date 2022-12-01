import { Link, NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'lightblue',
        padding: '20px',
      }}
    >
      <h3>Logo</h3>
      <div>
        <ul
          style={{
            display: 'flex',
            flexDirection: 'row',
            listStyle: 'none',
            width: '400px',
            justifyContent: 'space-around',
          }}
        >
          <li>
            <NavLink activeclassname="active" className="inactive" to="/">
              Lista completa
            </NavLink>
          </li>
          <li>
            <NavLink
              activeclassname="active"
              className="inactive"
              to="/category/pantalones"
            >
              Pantalones
            </NavLink>
          </li>
          <li>
            <NavLink
              activeclassname="active"
              className="inactive"
              to="/category/sombreros"
            >
              Sombreros
            </NavLink>
          </li>
        </ul>
      </div>
      <div>
        {/* <a href="/cart">Carrito</a> */}
        <Link to="/cart">Carrito</Link>
      </div>
    </div>
  );
};

export default NavBar;

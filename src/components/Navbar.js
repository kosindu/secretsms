import Logo from './Logo';

const Navbar = () => {
  return (
    <nav id="navbar">
      <div className="container">
        <div className="nav">
          <h1 className="nav-logo">
            <a href="/">
              Secret SMS <Logo height={30} width={30} />
            </a>
          </h1>
          <ul className="nav-links">
            <li>
              <a href="/">sign in</a>
            </li>
            <li>
              <a href="/">menu</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

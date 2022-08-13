import Logo from './Logo';

const Header = () => {
  return (
    <>
      <header id="header">
        <div className="container">
          <div className="header-inner">
            <h1 className="header-main">Share a secret</h1>
            <Logo height={100} width={100} />
            <h2 className="header-sub">
              ...with your friends that can only be opened for{' '}
              <span>one time</span> and then self-destructs
            </h2>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;

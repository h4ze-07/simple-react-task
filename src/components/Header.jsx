import logo from '../assets/logo.svg';

const Header = () => {
  return (
    <header className='header'>
        <nav className="nav">
            <img src={logo} alt="logo" className="nav-logo" />
            <div className="nav-buttons">
                <button className="nav-button">Users</button>
                <button className="nav-button">Sign Up</button>
            </div>
        </nav>
    </header>
  )
}

export default Header
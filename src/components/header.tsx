import reactLogo from '../assets/react.svg'
import viteLogo from '../../public/vite.svg'
function Header() {
    return (
      <header className='app-header'>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
            </a>
            <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </header>
    );
  }
  
  export default Header;
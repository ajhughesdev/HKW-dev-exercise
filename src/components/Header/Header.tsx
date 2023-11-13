import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'

import { UserContext } from '../../context/User.provider'
import { ReactComponent as Logo } from './../../assets/svgs/logo.svg'
import Nav from '../Nav/Nav'

import { navLinks } from './navLinks'

const Header = () => {
  const { isLoggedIn } = useContext(UserContext)

  const [isMenuOpen, setMenuOpen] = useState(false)
  const [isDropdownOpen, setDropdownOpen] = useState(false)

  return (
    <div className={`ccare__header-root ${isLoggedIn ? 'logged-in' : ''}`}>
      <div className='ccare__header-left'>
        <Link to='/' className='ccare__header-logo'>
          <Logo height={16} />
        </Link>
      </div>
      <div className='ccare__header-right'>
        {isLoggedIn && (
          <Nav
            navMobileVisible={isMenuOpen}
            toggleNavScreen={() => setMenuOpen(!isMenuOpen)}
            navLinks={navLinks}
            isVisible={isDropdownOpen}
          />
        )}
      </div>
    </div>
  )
}

export default Header

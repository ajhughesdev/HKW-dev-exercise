import { useContext, useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

import NavMobile from '../NavMobile'
import { ReactComponent as Hamburger } from '../../assets/svgs/hamburger.svg'
import { ReactComponent as ArrowDown } from './arrow-down.svg'
import { ReactComponent as ArrowUp } from './arrow-up.svg'

import { UserContext } from '../../context/User.provider'

type NavProps = {
  navMobileVisible: boolean
  toggleNavScreen: () => void
  navLinks: Array<any>
  isVisible: boolean
}

const Nav = ({
  navMobileVisible,
  toggleNavScreen,
  navLinks,
  isVisible,
}: NavProps) => {
  const { currentUser } = useContext(UserContext)
  const [isExpanded, setExpanded] = useState(false)
  const [userMenuWidth, setUserMenuWidth] = useState<number | null>(null)

  const userMenuRef = useRef<HTMLDivElement>(null)

  const handleMouseEnter = () => setExpanded(true)
  const handleMouseLeave = () => setExpanded(false)

  useEffect(() => {
    if (userMenuRef.current) {
      setUserMenuWidth(userMenuRef.current.offsetWidth)
      const pricingLink = document.querySelector(
        '[data-label="Pricing"]'
      ) as HTMLElement
      if (pricingLink) {
        pricingLink.style.marginInlineEnd = `${userMenuWidth! + 30}px`
      }
    }
  }, [userMenuWidth])

  return (
    <>
      <nav aria-labelledby='main-nav-aria-label' className='ccare__nav-menu'>
        <span id='main-nav-aria-label' className='ccare__visually-hidden'>
          Main Navigation
        </span>

        {navLinks.map((link) => (
          <NavLink
            key={link.id}
            data-label={link.text}
            to={link.to}
            className='ccare__navlink'
            tabIndex={0}
          >
            {link.text}
          </NavLink>
        ))}
        <div
          className='ccare__nav-usermenu'
          ref={userMenuRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button
            type='button'
            className='ccare__nav-usermenu-btn'
            aria-haspopup='true'
            aria-expanded={isExpanded ? 'true' : 'false'}
            aria-label='User menu'
          >
            <span className='ccare__nav-usermenu-btn-text'>
              {currentUser.data.user_email}
            </span>
            {isExpanded ? (
              <ArrowUp width={16} height={16} />
            ) : (
              <ArrowDown width={16} height={16} />
            )}
          </button>
          <div className='ccare__nav-usermenu-items'>
            <Link to='/2fa-preferences'>2FA Preferences</Link>
            <a href='/wp-login.php?action=logout'>Logout</a>
          </div>
        </div>

        <button
          type='button'
          className={`ccare__nav-hamburger ${isVisible ? 'ccare__active' : ''}`}
          aria-label='mobile navigation'
          aria-expanded={isVisible ? 'true' : 'false'}
          aria-controls='NavMobile'
          onClick={toggleNavScreen}
        >
          <Hamburger />
        </button>
        {navMobileVisible && <NavMobile links={navLinks} />}
      </nav>
    </>
  )
}

export default Nav

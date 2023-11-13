import { useState } from 'react'

type Link = {
  id: string
  to: string
  text: string
}

type NavMobileProps = {
  links: Link[]
}

const NavMobile = ({ links }: NavMobileProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleClick = () => setIsExpanded(!isExpanded)

  return (
    <div
      key='navmobile'
      className='ccare__navmobile'
    >
      <div className='container'>
        <nav className='NavMobileMenu menu'>
          {links.map((link) => (
            <a
              key={link.id}
              className='Link link NavMobileMenuLink'
              href={`/${link.to}/`}
            >
              {link.text}
            </a>
          ))}
          <div className={`NavMobileMenuGroup ${isExpanded ? 'open' : ''}`}>
            <button
              className='button'
              aria-controls='NavMobileGroup-resources'
              aria-expanded={isExpanded ? 'true' : 'false'}
              onClick={handleClick}
            >
              <span className='button-text'>Resources</span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                aria-hidden='true'
                focusable='false'
                viewBox='0 0 24 24'
                className='button-icon'
              >
                <path d='M18.9,10.9h-6v-6c0-0.6-0.4-1-1-1s-1,0.4-1,1v6h-6c-0.6,0-1,0.4-1-1s0.4,1,1,1h6v-6c0,0.6,0.4,1,1,1s1-0.4,1-1v-6h6c0.6,0,1-0.4,1-1S19.5,10.9,18.9,10.9z'></path>
              </svg>
            </button>
            <div id='NavMobileGroup-resources' className='items'>
              <div className='item'>
                <a href='about' className='Link link NavMovileMenuGroupLink'>
                  About
                </a>
              </div>
              <div className='group'>
                <div className='NavMobileMenuGroupSection'>
                  {/* {resourceLinks.map((link) => (
                    <a
                      key={link.id}
                      className='Link link NavMobileMenuGroupLink external-link-icon'
                      href={link.url}
                      target='_blank'
                      rel='noreferrer'
                    >
                      {link.text}
                    </a>
                  ))} */}
                </div>
              </div>
            </div>
          </div>
        </nav>
        <div className='NavMobileAppearance appearance'>
          <p className='text'>Appearance</p>
          {/* <SwitchAppearance
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
          /> */}
        </div>
        <div className='SocialLinks NavMobileSocialLinks social-links'>
          {/* {socials.map((link) => (
            <a
              href={link.to}
              key={link.id}
              className='SocialLink'
              aria-label={link.text}
              target='_blank'
              rel='noopener'
            >
              <Icon icon={link.icon} role='img' />
            </a>
          ))} */}
        </div>
      </div>
    </div>
  )
}

export default NavMobile

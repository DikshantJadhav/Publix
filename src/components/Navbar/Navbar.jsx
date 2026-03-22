import React, { useEffect, useRef } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';
import profile_img from '../../assets/profile_img.png';
import caret_icon from '../../assets/caret_icon.svg';
import { logout } from '../../firebase';

const Navbar = ({ homeRef, blockbusterRef, onlyOnPublixRef, upcomingRef, topPicsRef }) => {
  const navRef = useRef();
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current) {
        navRef.current.classList.add('navbar-hidden');
      } else {
        navRef.current.classList.remove('navbar-hidden');
      }

      if (currentScrollY >= 80) {
        navRef.current.classList.add('nav-dark');
      } else {
        navRef.current.classList.remove('nav-dark');
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={navRef} className='navbar'>
      <div className="navbar-left">
        <img src={logo} alt="Publix Logo" />
        <ul>
          <li onClick={() => scrollToSection(homeRef)}>Home</li>
          <li onClick={() => scrollToSection(blockbusterRef)}>Blockbuster Movies</li>
          <li onClick={() => scrollToSection(onlyOnPublixRef)}>Only On Publix</li>
          <li onClick={() => scrollToSection(upcomingRef)}>Upcoming</li>
          <li onClick={() => scrollToSection(topPicsRef)}>Top Pics For You</li>
        </ul>
      </div>

      <div className="navbar-right">
        <div className="navbar-profile">
          <img src={profile_img} alt="Profile" className='profile' />
          <img src={caret_icon} alt="Dropdown" />
          <div className="dropdown">
            <p onClick={logout}>Sign Out of Publix</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

import React from 'react';

import Link from 'next/link';

import './Navbar.scss';

const Navbar = props => {
  return (
    <nav className="c-navbar">
      <ul className="c-navbar__links">
        <li className="c-navbar__link">
          <Link href="/"><a>Colour picker</a></Link>
        </li>
        <li className="c-navbar__link">
          <Link href="/inspiration"><a>Inspiration</a></Link>
        </li>
        <li className="c-navbar__link">
          <Link href="/shortlist"><a>Saved colours</a></Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

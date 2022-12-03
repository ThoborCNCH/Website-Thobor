import React from 'react'

function Footer() {
  return (
    <footer className="footer">
    <div className="footer__addr">
      <h1 className="footer__logo">Genii ale Culturii Românești</h1>

      <h2>Contact</h2>

      <address>
        contacto@institutohispanorumano.org
        <br />
        <a
          className="footer__btn"
          href="mailto:contacto@institutohispanorumano.org"
        >
          Email Us
        </a>
      </address>
    </div>

    <ul className="footer__nav">
      <li className="nav__item">
        <h2 className="nav__title">Our channels</h2>

        <ul className="nav__ul">
          <li>
            <a href="https://institutohispanorumano.org/">
              Institutul Hispano-Român
            </a>
          </li>

          <li>
            <a href="https://scoala.institutohispanorumano.org/">
              Scoala Nicolae Iorga
            </a>
          </li>
        </ul>
      </li>

      <li className="nav__item">
        <h2 className="nav__title">Legal</h2>

        <ul className="nav__ul">
          <li>
            <a href="#">Privacy Policy</a>
          </li>

          <li>
            <a href="#">Terms of Use</a>
          </li>

          <li>
            <a href="#">Sitemap</a>
          </li>
        </ul>
      </li>
    </ul>

    <div className="legal">
      <p>&copy; 2022 Instituto Hispano-Rumano All rights reserved.</p>

      <div className="legal__links">
        <span>
          Editors Matei <span className="heart">&</span> Mihail
        </span>
      </div>
    </div>
  </footer>
  )
}

export default Footer
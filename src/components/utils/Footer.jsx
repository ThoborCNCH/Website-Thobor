import React from 'react';
import './styles/footer.scss';

import facebook from '../../images/facebook.png';
import instagram from '../../images/instagram.png';
import youtube from '../../images/youtube.png';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__addr">
                <div className="legal">
                    <p>Copyright © 2024 Thobor #RO068 All rights reserved.</p>
                    <ul className="nav__ul">
                        <li>
                            <a href="/privacyPolicy">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="/termsAndConditions">Terms and Conditions</a>
                        </li>
                    </ul>
                </div>
            </div>
            <ul className="nav__ul">
                <li>
                    <a className="footer__btn" href="mailto:contact@thobor-team.com">Email Us</a>
                </li>
                <li>
                    <a href="https://www.facebook.com/ThoborCNCH">
                        <img src={facebook} alt="Facebook" />
                    </a>
                </li>
                <li>
                    <a href="https://www.instagram.com/thoborcnch/">
                        <img src={instagram} alt="Instagram" />
                    </a>
                </li>
                <li>
                    <a href="https://www.youtube.com/@thobor7033">
                        <img src={youtube} alt="YouTube" />
                    </a>
                </li>
            </ul>
        </footer> 
    );
};

export default Footer;

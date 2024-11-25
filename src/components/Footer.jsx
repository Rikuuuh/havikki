import React from 'react';
import logo from "../images/siilinjarvi-footer-logo.png";

const Footer = () => {
  const socialLinks = [
    {
      href: "https://www.facebook.com/siilinjarven.kunta/",
      src: "https://siilinjarvi.fi/wp-content/uploads/2024/06/facebook-f.svg",
      alt: "Facebook ikoni",
    },
    {
      href: "https://twitter.com/siilinjarvenkun?lang=fi",
      src: "https://siilinjarvi.fi/wp-content/uploads/2024/06/x-twitter.svg",
      alt: "X (Twitter) ikoni",
    },
    {
      href: "https://www.instagram.com/siilinjarvi/",
      src: "https://siilinjarvi.fi/wp-content/uploads/2024/06/instagram.svg",
      alt: "Instagram ikoni",
    },
    {
      href: "https://www.linkedin.com/company/siilinj%C3%A4rven-kunta",
      src: "https://siilinjarvi.fi/wp-content/uploads/2024/06/linkedin-in.svg",
      alt: "LinkedIn ikoni",
    },
  ];

  return (
    <footer className="footer">
      <div className="footer-columns">
        <div className="footer-column w-4/5">
          <h2 className="footer-h2">Seuraa meitä</h2>
          <ul className="some-links">
            {socialLinks.map(({ href, src, alt }) => (
              <li key={alt} className="mr-4 bg-gray-700 rounded-full p-2">
                <a href={href} target="_blank" rel="noopener noreferrer">
                  <img src={src} alt={alt} className="w-8 h-8" />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-column w-1/10">
          <p>
            Siilinjärven kunta
            <br />
            PL 5, 71801 Siilinjärvi
            <br />
            017 401 111
          </p>
          <p>
            kirjaamo@siilinjarvi.fi
            <br />
            etunimi.sukunimi@siilinjarvi.fi
            <br />
            Y-tunnus: 0172718-0
          </p>
        </div>
        <div className="footer-column w-1/5">
          <figure className="wp-block-image">
            <img src={logo} alt="Siilinjarvi logo" className="w-36 h-auto" />
          </figure>
        </div>
      </div>
      <div className="footer-bottom">
        <div>
          <p>© Siilinjärvi 2024</p>
        </div>
        <div>
          <ul className="flex list-none p-0">
            <li className="mr-4">
              <a href="https://siilinjarvi.asiointi.fi/eFeedback">Anna palautetta</a>
            </li>
            <li className="mr-4">
              <a href="https://siilinjarvi.fi/siilinjarven-kunta/asiointi/asioi-verkossa/">Asioi verkossa</a>
            </li>
            <li className="mr-4">
              <a href="https://siilinjarvi.fi/siilinjarven-kunta/tietoa-siilinjarvesta/laskut-laskuttaminen/">Laskutus ja maksaminen</a>
            </li>
            <li className="mr-4">
              <a href="https://siilinjarvi.fi/tietoa-siilinjarvesta/saavutettavuus/">Saavutettavuus</a>
            </li>
            <li className="mr-4">
              <a href="https://siilinjarvi.fi/evastekaytanto/">Evästekäytäntö</a>
            </li>
            <li className="mr-4">
              <a className="cmplz-show-banner" href="#">Hallitse suostumusta</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
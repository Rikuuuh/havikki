import React from 'react';
import logo from "../images/siilinjarvi-footer-logo.png";

const Footer = () => {
  return (
    <footer className="relative bg-cover bg-no-repeat bg-top text-black font-medium p-12">
      <div className="flex flex-wrap justify-between gap-4">
        {/* Seuraa meitä -osio */}
        <div className="flex-1 min-w-[200px]">
          <h2 className="text-xl mb-3">Seuraa meitä</h2>
          <ul className="flex list-none p-0">
            {[
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
            ].map(({ href, src, alt }) => (
              <li key={alt} className="mr-4">
                <a href={href} target="_blank" rel="noopener noreferrer">
                  <img
                    src={src}
                    alt={alt}
                    className="w-8 h-8"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Osoite ja yhteystiedot */}
        <div className="flex-1 min-w-[200px]">
          <div className="mb-4">
            <p>
              Siilinjärven kunta
              <br />
              PL 5, 71801 Siilinjärvi
              <br />
              017 401 111
            </p>
          </div>
          <div>
            <p>
              kirjaamo@siilinjarvi.fi
              <br />
              etunimi.sukunimi@siilinjarvi.fi
              <br />
              Y-tunnus: 0172718-0
            </p>
          </div>
        </div>

        {/* Logo */}
        <div className="flex-1 min-w-[200px]">
          <figure className="wp-block-image">
            <img
              src={logo}
              alt="Siilinjarvi logo"
              className="w-36 h-auto"
            />
          </figure>
        </div>
      </div>

      {/* Footerin alaosa */}
      <div className="flex flex-wrap justify-between items-center mt-8 border-t border-gray-700 pt-4">
        <div className="flex-1 min-w-[15%]">
          <p>© Siilinjärvi 2024</p>
        </div>
        <div className="flex-1 min-w-[85%]">
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
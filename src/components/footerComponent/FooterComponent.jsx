import { Fragment } from "react";
import "./FooterComponent.scss";
import { FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <Fragment>
      <hr></hr>
      <footer>
        <div className="footer-content">
          <h3>Games don't make you violent, lag does</h3>
          <p>
            Dedicated and efficient full stack developer Seeking to further
            improve my skills as a future developer{" "}
          </p>
          <ul className="socials">
            <li className="facbook ms-2">
              <a href="#">
                <FaFacebook />
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/tal-poris-b7217423b/">
                <FaLinkedin />
              </a>
            </li>
            <li>
              <a href="https://github.com/TalPO24?tab=repositories">
                <FaGithub />
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-bottom">
          <p> Copyright© 2023. Tal Poris All Rights Reserved </p>

          <span>
            To get in touch, you can send an email to the address -
            talpor212@gmail.com
          </span>
        </div>
      </footer>
    </Fragment>
  );
};

export default Footer;

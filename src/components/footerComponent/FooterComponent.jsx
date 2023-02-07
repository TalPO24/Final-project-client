import { Fragment } from "react";
import "./FooterComponent.scss";
import { FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";

{
  /* <div className="hr">
  <hr />
</div>
<div className="card-body">
  <blockquote className="blockquote">
    <footer className="blockquote-footer">
      copyright© 2022. Tal poris All Rights Reserved
    </footer>
  </blockquote>
</div> */
}

//* this function is a simple one we just add the footer code from bootstrap.
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
            <li>
              <a href="#">
                <FaFacebook />
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/%D7%98%D7%9C-%D7%A4%D7%95%D7%A8%D7%99%D7%A1-b7217423b/">
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
          <span>E-Mail - talpor212@gmail.com</span>
        </div>
      </footer>
    </Fragment>
  );
};

export default Footer;

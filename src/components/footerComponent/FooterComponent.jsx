import { Fragment } from "react";
import "./FooterComponent.scss";

//* this function is a simple one we just add the footer code from bootstrap.
const Footer = () => {
  return (
    <Fragment>
      <div className="hr">
        <hr />
      </div>
      <div className="card-body">
        <blockquote className="blockquote">
          <footer className="blockquote-footer">
            copyright© 2022. Tal poris All Rights Reserved
          </footer>
        </blockquote>
      </div>
    </Fragment>
  );
};

export default Footer;

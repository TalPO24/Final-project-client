import { Fragment } from "react";
import "../aboutUsPage/AboutusPage.scss";

const AboutUsPage = () => {
  return (
    <Fragment>
      <h1>About Us</h1>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="main">
              <div className="service">
                <div className="service-logo">
                  <img
                    src="../../../images/controllerAboutus.jpg"
                    alt="logo"
                    style={{ aspectRatio: "2 / 1", objectFit: "cover" }}
                  />
                </div>
                <h4> Tal Poris</h4>
                <p>
                  Dedicated and efficient full stack developer Seeking to
                  further improve my skills as a future developer
                </p>
              </div>
              <div className="shadow1"></div>
              <div className="shadow2"></div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="main">
              <div className="service">
                <div className="service-logo">
                  <img
                    src="../../../images/profile.webp"
                    alt="logo"
                    style={{ aspectRatio: "2 / 1", objectFit: "cover" }}
                  />
                </div>
                <h4> Tal Poris</h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Adipisci beatae numquam nisi hic impedit? Et eos est eveniet
                  nesciunt quod tenetur quibusdam ex. Dicta recusandae,
                  voluptate provident dolor nisi explicabo!
                </p>
              </div>
              <div className="shadow1"></div>
              <div className="shadow2"></div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AboutUsPage;

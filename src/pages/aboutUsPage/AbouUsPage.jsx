import { Fragment } from "react";
import "../aboutUsPage/AboutusPage.scss";

const AboutUsPage = () => {
  return (
    <Fragment>
      <h1> A little bit about the site and me</h1>
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
                <h4> Our Site</h4>
                <p>
                  On this site you can find any game you are looking for, by
                  category or sorting by price or search by name, in addition
                  you can also add and remove from favorites, and you can also
                  get more information about each card. As an admin you can edit
                  create and delete any game card.
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
                    src="../../../images/about-us-profile.png"
                    alt="logo"
                    style={{ aspectRatio: "2 / 1", objectFit: "cover" }}
                  />
                </div>
                <h4> Tal Poris</h4>
                <p>
                  Dedicated and efficient full stack developer Seeking to
                  further improve my skills as a future developer. can adapt
                  quickly and learn new things.highly motivated in this field,
                  always passionate about learning new skills and technologies.
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

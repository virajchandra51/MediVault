import React from "react";

import "./Home.css";
import { Link, NavLink } from "react-router-dom";
import { GiStethoscope } from 'react-icons/gi';

import logo from "../data/logo.png";
import logosvg from "../data/logo.svg";
import sthetoscope from "../data/stethoscope.png";
import down from "../data/upload.svg";
import user from "../data/user.svg";
import tick from "../data/tick.svg";
import store from "../data/store.png";
import doc from "../data/doc.svg";
import disease from "../data/disease.png";
import member1 from "../data/1.png";
import member2 from "../data/2.png";

const Home = () => {
  return (
    <div>
      <header className="header" id="header">
        <nav className="nav container">
          <div className="logo">
            <img className="logo-img" src={logosvg} />
            <a href="#" className="nav__logo">
              MediVault
            </a>
          </div>
          <div className="nav__menu" id="nav-menu">
            <ul className="nav__list">
              <li className="nav__item">
                <a href="#home" className="nav__link">
                  Home
                </a>
              </li>
              <li className="nav__item">
                <a href="#about" className="nav__link">
                  Get Started
                </a>
              </li>
              {/* <li className="nav__item">
                <a href="#how" className="nav__link">
                  How?
                </a>
              </li> */}
              <li className="nav__item">
                <a href="#services" className="nav__link">
                  Services
                </a>
              </li>
              <li className="nav__item">
                <a href="#contact" className="nav__link">
                  Contact Us
                </a>
              </li>

              <i
                className="bx bx-toggle-left change-theme"
                id="theme-button"
              ></i>
            </ul>
          </div>

          <div className="nav__toggle" id="nav-toggle">
            <i className="bx bx-grid-alt"></i>
          </div>
          <div style={{ display: "flex" }}>
            <Link to="/login" className="button button__header log">
              Log In
            </Link>
            <Link to="/signup" className="button button__header">
              Sign Up
            </Link>
          </div>
        </nav>
      </header>
      <main className="main">
        <section className="home section container" id="home">
          <div className="home__container  grid">
            <div className="home__data">
              <h1 className="home__title">Health Record System</h1>
              <p className="home__description">
                MediVault is a secure blockchain based platform for storage of
                highly sensitive and critical data related to patients that is
                shared among multiple facilities and agencies for effective
                diagnosis and treatment.
              </p>

              <Link to="/signup" className="button">
                Sign Up Now!
              </Link>
            </div>
            <img className="sto-img" src={sthetoscope} />
          </div>
        </section>
        <section className="services section container" id="about">
          <h2 className="section__title">Getting started is quick and easy</h2>
          <div className="services__container grid">
            <div className="services__data">
              <h3 className="services__subtitle">Register Yourself</h3>
              <img className="services__img" src={user} />
              <p className="services__description">
                Register yourself to the locker, secured by blockchain
                technology.
              </p>
            </div>

            <div className="services__data">
              <h3 className="services__subtitle">Authenticate Yourself</h3>
              <img className="services__img" src={tick} />
              <p className="services__description">
                Log In with your credentials.
              </p>
            </div>

            <div className="services__data">
              <h3 className="services__subtitle">Upload your Data</h3>
              <img className="services__img" src={down} />
              <p className="services__description">
                Create, update, or view your health record information.
              </p>
            </div>
          </div>
        </section>
        <section className="services section container" id="services">
          <h2 className="section__title">Services we deliver</h2>
          <div className="services__container grid">
            <div className="services__data">
              <h3 className="services__subtitle">Maintaining Medical Records</h3>
              <img className="services__img" src={store} />
              <p className="services__description">
              Keep track of your medical records, enabled by blockchain
                technology.
              </p>
            </div>

            <div className="services__data">
              <h3 className="services__subtitle">Connect With Doctors</h3>
              <img className="services_img" src={doc} />
              <p className="services__description">
              Share your records with our trusted medical experts, to get a prescription.
              </p>
            </div>

            <div className="services__data">
              <h3 className="services__subtitle">Disease Prediction Model</h3>
              <img className="servicesimg" src={disease} />
              <p className="services__description">
              Get a quick diagnosis about diseases you might suffer from, based on our ML model.
              </p>
            </div>
          </div>
        </section>

        
        {/* <section class="team-container section container" id="team">
            <h2 class="section__title">Our Team - DumbDumberDumbest</h2>
            <div class="team">
                <div class="card">
                    <div class="card--border">
                        <img src={member1} alt="card image" class="card--img"/>
                    </div>
                    <h3 class="card--name">Viraj Chandra</h3>
                    <span class="card--profession">Frontend Developer</span>

                    <div class="card--social" id="card-social1">
                        <div class="card--social-control">
                            <div class="card--social-toggle" id="card-toggle1">
                                <i class="ri-add-line"></i>
                            </div>

                            <span class="card--social-text">Reach Me</span>
                            <ul class="card--social-list">
                                <a href="https://www.instagram.com/me_ayan_710/" target="_blank"
                                    class="card--social-link">
                                    <i class="ri-instagram-line"></i>
                                </a>
                                <a href="https://www.linkedin.com/in/viraj-chandra/" target="_blank"
                                    class="card--social-link">
                                    <i class="ri-linkedin-line"></i>
                                </a>
                                <a href="https://github.com/virajchandra51" target="_blank" class="card--social-link">
                                    <i class="ri-github-line"></i>
                                </a>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="card--border">
                        <img src={member2} alt="card image" class="card--img"/>
                    </div>
                    <h3 class="card--name">Vibhor Singh</h3>
                    <span class="card--profession">Backend Developer</span>

                    <div class="card--social" id="card-social2">
                        <div class="card--social-control">
                            <div class="card--social-toggle" id="card-toggle2">
                                <i class="ri-add-line"></i>
                            </div>

                            <span class="card--social-text">Reach Me</span>
                            <ul class="card--social-list">
                                <a href="https://www.instagram.com/vibhorsingh_1234/" target="_blank" class="card--social-link">
                                    <i class="ri-instagram-line"></i>
                                </a>
                                <a href="https://www.linkedin.com/in/vibhor-singh-1577b122a/" target="_blank"
                                    class="card--social-link">
                                    <i class="ri-linkedin-line"></i>
                                </a>
                                <a href="https://github.com/Singh-Vibhor" target="_blank" class="card--social-link">
                                    <i class="ri-github-line"></i>
                                </a>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="card--border">
                        <img src={member2} alt="card image" class="card--img"/>
                    </div>
                    <h3 class="card--name">Vikash Kumar</h3>
                    <span class="card--profession">GUI Developer</span>

                    <div class="card--social" id="card-social3">
                        <div class="card--social-control">
                            <div class="card--social-toggle" id="card-toggle3">
                                <i class="ri-add-line"></i>
                            </div>

                            <span class="card--social-text">Reach Me</span>
                            <ul class="card--social-list">
                                <a href="https://instagram.com/honey__vikash?igshid=ZDdkNTZiNTM=" target="_blank"
                                    class="card--social-link">
                                    <i class="ri-instagram-line"></i>
                                </a>
                                <a href="https://www.linkedin.com/in/vikash-kumar-93bb39229/" target="_blank"
                                    class="card--social-link">
                                    <i class="ri-linkedin-line"></i>
                                </a>
                                <a href="https://github.com/honeyvikash" target="_blank" class="card--social-link">
                                    <i class="ri-github-line"></i>
                                </a>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section> */}
        <section className="contact section container" id="contact">
            <div className="contact__container grid">
                <div className="contact__content">
                    <h2 className="section__title-center">Contact Us</h2>
                    <p className="contact__description">You can contact us from here, you can write to us,
                        call us for suggestions and enhancements.</p>
                </div>

                <ul className="contact__content grid">
                    <li className="contact__address">Telephone: <span className="contact__information">+91 9129916977</span>
                    </li>
                    <li className="contact__address">Email: <span
                            className="contact__information">virajchandra51@gmail.com</span></li>
                    <li className="contact__address">Location: <span className="contact__information">NIT Raipur - Great Eastern
                            Rd, Amanaka, Raipur, Chhattisgarh 492010</span></li>
                </ul>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14874.196331166764!2d81.6050291!3d21.2497222!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x21543965c50c43c7!2sNational%20Institute%20of%20Technology(NIT)%2C%20Raipur!5e0!3m2!1sen!2sin!4v1674894759884!5m2!1sen!2sin"
                    width="300" height="200" style={{border:"0",}} allowfullscreen="" loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </section>
      </main>
        <footer className="footer section">
          <p className="footer__copy">
            Design And Developed By The Blockheads
          </p>
          <p className="footer__copy">&#169; MediVault. All right reserved</p>
        </footer>
    </div>
  );
};

export default Home;

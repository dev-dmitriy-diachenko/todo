import './Footer.scss';

export const Footer = () => (
  <footer className="page__footer footer">
    <div className="footer__container">
      <div className="footer__links">
        <a
          className="footer__link"
          href="https://github.com/dev-dmitriy-diachenko/todo"
          target="_blank"
          rel="noreferrer"
        >
          <div className="icon icon--github" />
        </a>
        <a
          className="footer__link"
          href="https://www.linkedin.com/in/dev-dmitriy-diachenko/"
          target="_blank"
          rel="noreferrer"
        >
          <div className="icon icon--linkedin" />
        </a>
      </div>
      <p className="footer__terms">
        &copy; 2022 All rights reserved.
        <br />
        Terms of Use & Privacy Policy
      </p>
    </div>
  </footer>
);

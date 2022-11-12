import logo from '../../assets/images/homepage.png';
import './Home.page.scss';

export const Home = () => (
  <main className="homepage">
    <img
      src={logo}
      alt="greeting"
    />
    Hello, world! Welcome in my task manager app.
    <br />
    In order to continue, please make sure you&apos;re signed in.
  </main>
);

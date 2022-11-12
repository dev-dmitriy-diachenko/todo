import { Routes, Route } from 'react-router-dom';

import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';

const App = () => (
  <Routes>
    <Route
      path="/"
      element={
        <>
          <Navigation />
          <Footer />
        </>
      }
    >
      <Route
        index
        element={<Home />}
      />

      <Route
        path="sign-in"
        element={<SignIn />}
      />
      <Route
        path="sign-up"
        element={<SignUp />}
      />
    </Route>
  </Routes>
);

export default App;

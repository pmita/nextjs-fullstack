
import { AuthContextProvider } from '../context/AuthContext';
// COMPONENTS
import Navbar from '../components/Navbar/component';
// STYLES
import '../styles/App.scss';

function MyApp({ Component, pageProps }) {
  return(
    <AuthContextProvider>
      <Navbar />
      <Component {...pageProps} />
    </AuthContextProvider>
  );
}

export default MyApp

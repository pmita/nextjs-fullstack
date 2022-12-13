
// import '../styles/globals.css'
// COMPONENTS
import Navbar from '../components/Navbar/component';
import '../styles/App.scss';

function MyApp({ Component, pageProps }) {
  return(
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp

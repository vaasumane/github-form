import './App.css';
import './logo.svg';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Register from './Components/Register';


function App() {
  return (
    <>
      <div>
        <div className="signup-space  ">
          <div className="signup-stars"></div>
          <div className="signup-stars"></div>
          <div className="signup-stars"></div>
          <div className="signup-stars"></div>
          <div className="signup-stars"></div>
          <div className="signup-stars"></div>
        </div>
      </div>
      <header>
        <Header />
      </header>
      <div className='container'>
        <Register />
      </div>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;

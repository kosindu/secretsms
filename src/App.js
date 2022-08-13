import './App.css';
import Factory from './components/Factory';
import Footer from './components/Footer';
import Header from './components/Header';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Header />
      <Factory />
      <Footer />
    </div>
  );
}

export default App;

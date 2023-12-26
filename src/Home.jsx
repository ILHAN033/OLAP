import Header from "./Header";
import Nav from "./Nav";
import Intro from "./intro";
import "./home.css";
import Footer from "./Footer";

function Home() {
  return (
    <div className="App">
      <div className="gradient_bg">
        <Nav />
        <Header />
      </div>
      <Intro />
      <Footer />
    </div>
  );
}

export default Home;

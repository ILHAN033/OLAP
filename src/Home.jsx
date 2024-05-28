import Header from "./Header";
import "./home.css";
import Footer from "./Footer";

function Home() {
  return (
    <div className="App">
      <div className="gradient_bg">
        <Header />
      </div>
      {/* <Intro /> */}
      <Footer />
    </div>
  );
}

export default Home;

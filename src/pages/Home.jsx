import Header from "../components/Header";
import heroBanner from "../assets/heroBanner.jpg"; // Import the banner image
import "../App.css";

function Home() {
//   const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <div className="hero-banner-container">
        <img src={heroBanner} alt="Hero Banner" className="hero-banner-img" />
        <div className="hero-banner-content">
          <h1>Welcome to SchemeServe QA Tech Test</h1>
          <p>Get started by exploring the features!</p>
        </div>
      </div>
    </>
  );
}

export default Home;

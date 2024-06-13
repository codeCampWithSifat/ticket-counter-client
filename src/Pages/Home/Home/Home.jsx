import Banner from "../Banner/Banner";
import HomeEvents from "../HomeEvents/HomeEvents";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Banner />
      <HomeEvents />
    </div>
  );
};

export default Home;

import Info from "../components/Info";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="full-height">
      <Info />
      <Link to="/profile">Go to profile</Link>
    </div>
  );
};

export default Home;

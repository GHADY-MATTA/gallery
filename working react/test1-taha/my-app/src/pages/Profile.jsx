import { Link } from "react-router-dom";

const Profile = () => {
  const buttonText = "Go to home";

  return (
    <div className="full-height">
      <h1>profile</h1>
      <Link to="/home">{buttonText}</Link>
    </div>
  );
};

export default Profile;

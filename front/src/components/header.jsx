import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const userData = useSelector((state) => state);

  return (
    <nav className="main-nav">
      <a className="main-nav-logo" href="/">
        <img
          className="main-nav-logo-image"
          src="./argentBankLogo.png"
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </a>
      {userData.status.online ? (
        <Connected userData={userData} />
      ) : (
        <Disconnected />
      )}
    </nav>
  );
};

const Connected = (props) => {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  function signOut() {
    localStorage.clear();
    dispatch({ type: "status/clear" });
    navigate("/");
  }
  return (
    <div>
      <a className="main-nav-item" href="/user">
        <i className="fa fa-user-circle"></i>
        {props.userData.status.data.firstName}
      </a>
      <a className="main-nav-item" href="/sign-in" onClick={() => signOut()}>
        <i className="fa fa-sign-out"></i>
        Sign Out
      </a>
    </div>
  );
};
const Disconnected = () => {
  return (
    <div>
      <a className="main-nav-item" href="./sign-in">
        <i className="fa fa-user-circle"></i>
        Sign In
      </a>
    </div>
  );
};
export default Header;

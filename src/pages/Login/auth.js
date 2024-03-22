import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import Alert from "@mui/material/Alert";
import { AuthenticatorLogin } from "../../service/Authentication";

import { useNavigate } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";
import img1 from "./images/reciclea.svg";
import img2 from "./images/register.svg";
import img3 from "./images/chave.png";
// import RecoverPasswordModal from "../../components/Recuper-password";
import Spinner from "../../components/Spinner";
import "./style.scss";
import "./auth.css";
import { Link } from "@mui/material";

const LoginScreen = () => {
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setloading] = useState(false);
  const [errorMessageField, setErrorMessageField] = useState("");
  const [flag, setFlag] = useState(0);
  const clickHandle = (e) => {
    setFlag((prev) => prev ^ 1);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setloading(true);
  };
  const navigate = useNavigate();

  const handleShow = () => setShow(true);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Realize a validação dos campos aqui
    if (!username || !password) {
      toast.error(
        <p className="toast-text">Por favor, preencha todos os campos!</p>,
        {
          // position: "top-right",
          autoClose: 8000,
          hideProgressBar: false,
          newestOnTop: false,
          // closeOnClick: true,
          rtl: false,
          pauseOnFocusLoss: true,
          draggable: true,
          pauseOnHover: true,
        }
      );
    } else {
      setloading(true);
      // Lógica de autenticação ou redirecionamento após o login
      const resp = await AuthenticatorLogin(username, password);
      if (resp.user) {
        setloading(false);
        navigate("/home");
      } else {
        setloading(false);
        toast.error(
          <p className="toast-text">
            Email ou senha invalida, tente novamente!
          </p>,
          {
            // position: "top-right",
            autoClose: 8000,
            hideProgressBar: false,
            newestOnTop: false,
            // closeOnClick: true,
            rtl: false,
            pauseOnFocusLoss: true,
            draggable: true,
            pauseOnHover: true,
            type: "error",
          }
        );
      }
    }
  };

  return (
    <>
      <div className={flag === 0 ? "container1" : "container1 sign-up-mode"}>
        <div className="forms-container" style={{ width: "100%" }}>
          <div className="signin-signup">
            <form className="sign-in-form" onSubmit={handleSignIn}>
              <Alert
                variant="outlined"
                severity="info"
                style={{ fontFamily: "poppins" }}
                className="mt-2"
              >
                Bem-vindo novamente! <br /> Coloque seu cpf e sua senha para
                entrar no sistema.
              </Alert>
              <div className="input-field">
                <i className="fas fa-user" />
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  // onChange={handleSignInData}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock" />
                {/* <div
                  style={{
                    border: "0 solid #FFF",
                    borderLeftColor: "#acacac"
                  }}
                > */}
                <input
                  name="password"
                  // type={inputType}
                  placeholder="Password"
                  // onChange={handleSignInData}
                />

                {/* </div> */}
              </div>
              <input type="submit" value="Entrar" className="btn solid" />
              <Link to="/forget" style={{ fontFamily: "Poppins" }}>
                Esqueceu a senha?
              </Link>
            </form>
            <form
              // onSubmit={handleSignUpSubmit}
              class="sign-up-form"
            >
              <h2 className="title" style={{ fontFamily: "poppins" }}>
                Sign up
              </h2>
              <div className="input-field">
                <i className="fas fa-user" />
                <input
                  // onChange={handleSignUpData}
                  // value={data.name}
                  name="name"
                  type="text"
                  placeholder="Name"
                />
              </div>
              <div className="input-field">
                <i className="fas fa-envelope" />
                <input
                  // onChange={handleSignUpData}
                  // value={data.email}
                  name="email"
                  type="email"
                  placeholder="Email"
                />
              </div>
              <div className="input-field">
                <i className="fas fa-phone" />
                <input
                  // onChange={handleSignUpData}
                  // value={data.number}
                  type="text"
                  name="number"
                  placeholder="Contact Number"
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock" />
                <input
                  // onChange={handleSignUpData}
                  // value={data.password}
                  name="password"
                  type="password"
                  placeholder="Password"
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock" />
                <input
                  // onChange={handleSignUpData}
                  // value={data.confirmPassword}
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                />
              </div>
              <input type="submit" class="btn" value="Sign up" />
            </form>
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <img src={img1} className="image" alt="" />
              <h3 style={{ fontFamily: "poppins" }}>New here ?</h3>
              <p style={{ fontFamily: "poppins" }}>
                Then Sign Up and Start Ordering!
              </p>
              <button
                className="btn transparent"
                id="sign-up-btn"
                onClick={clickHandle}
                style={{ fontFamily: "poppins" }}
              >
                Sign up
              </button>
            </div>
            <img src={require("./images/log.svg")} className="image" alt="" />
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3 style={{ "font-family": "poppins" }}>One of us ?</h3>
              <p style={{ "font-family": "poppins" }}>
                Then Sign In and get Started!
              </p>
              <button
                className="btn transparent"
                onClick={clickHandle}
                id="sign-in-btn"
                style={{ "font-family": "poppins" }}
              >
                Sign in
              </button>
            </div>
            <img src={img2} className="image" alt="" />
          </div>
        </div>
      </div>
      {loading && <Spinner />}
      {/* <RecoverPasswordModal show={show} setShow={setShow} /> */}
    </>
  );
};

export default LoginScreen;

import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Alert from "@mui/material/Alert";
import {
  AuthenticatorLogin,
  RecoverPassword,
} from "../../services/Authentication.tsx";

import { useNavigate } from "react-router-dom";

import img2 from "./images/register.svg";
import img4 from "./images/avatar.png";
import img5 from "./images/log.svg"

import img3 from "./images/chave.png";
// import RecoverPasswordModal from "../../components/Recuper-password";
import Spinner from "../../components/Spinner";
import "./style.scss";
import "./auth.css";
import { Box, Link } from "@mui/material";

const LoginScreen = () => {
  // const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [errorMessage, setErrorMessage] = useState("");
  const [loading, setloading] = useState(false);
  // const [errorMessageField, setErrorMessageField] = useState("");
  const [flag, setFlag] = useState(0);
  const clickHandle = () => {
    setFlag((prev) => prev ^ 1);
  };

  const navigate = useNavigate();

  // const handleShow = () => setShow(true);

  const handleSignIn = async (e: any) => {
    e.preventDefault();

    // Realize a validação dos campos aqui
    if (!username || !password) {
      toast.error(
        <p className="toast-text">Por favor, preencha todos os campos!</p>,
        {
          // position: "top-right",
          autoClose: 8000,
          hideProgressBar: false,
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
        navigate("/dashboard");
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

  const RecoverPasswordFunc = async (e: any) => {
    e.preventDefault();
    setloading(true);

    if (userEmail) {
      await RecoverPassword(userEmail);
      setloading(false);
      clickHandle();
      toast.success(
        <p className="toast-text">
          Foi enviado o link de recuperação no teu e-email!
        </p>,
        {
          // position: "top-right",
          autoClose: 8000,
          hideProgressBar: false,
          // closeOnClick: true,
          rtl: false,
          pauseOnFocusLoss: true,
          draggable: true,
          pauseOnHover: true,
          type: "success",
        }
      );
      // clickHandle();
    } else {
      setloading(false);
      toast.error(
        <p className="toast-text">Email ou senha invalida, tente novamente!</p>,
        {
          // position: "top-right",
          autoClose: 8000,
          hideProgressBar: false,
          // closeOnClick: true,
          rtl: false,
          pauseOnFocusLoss: true,
          draggable: true,
          pauseOnHover: true,
          type: "error",
        }
      );
    }
  };

  return (
    <>
      <div className={flag === 0 ? "container1" : "container1 sign-up-mode"}>
        <ToastContainer
          toastStyle={{ width: "100%" }}
          bodyStyle={{ width: "100%" }}
          closeButton={false}
          // icon= {false}
          theme="colored"
        />
        <div className="forms-container" style={{ width: "100%" }}>
          <div className="signin-signup">
            <form className="sign-in-form" onSubmit={handleSignIn}>

              <Alert severity="info" >

                Bem-vindo novamente! <br /> Coloque seu e-mail e sua senha para
                entrar no sistema.
              </Alert>

              <div className="input-field">
                <img
                  src={img4}
                  alt=""
                  height={30}
                  style={{ marginTop: "10px" }}
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Login"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="input-field">
                <img
                  src={img3}
                  alt=""
                  height={30}
                  style={{ marginTop: "10px" }}
                />
                {/* <div
                  style={{
                    border: "0 solid #FFF",
                    borderLeftColor: "#acacac"
                  }}
                > */}
                <input
                  name="password"
                  type="password"
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                {/* </div> */}
              </div>
              <input type="submit" value="Entrar" className=" btn bt solid" />
              <Link
                onClick={clickHandle}
                style={{
                  fontFamily: "Poppins",
                  cursor: "pointer",
                }}
              >
                Esqueceu a senha?
              </Link>
              <Box sx={{ typography: 'body1' }}>
             <Link href="/cadastro">Faça seu cadastrado</Link>
           </Box>
            </form>
            <form
              // onSubmit={handleSignUpSubmit}
              className="sign-up-form"
            >
              <Alert
                variant="outlined"
                severity="info"
                style={{ fontFamily: "poppins" }}
                className="mt-2"
              >
                Para recuperar sua senha <br /> basta digitar o e-mail
                cadastrado . <br /> será enviado um link de recuperação de senha
                no e-mail.
              </Alert>

              {/* <div className="input-field">
                <i className="fas fa-user" />
                <input
                  // onChange={handleSignUpData}
                  // value={data.name}
                  name="name"
                  type="text"
                  placeholder="Name"
                />
              </div> */}
              <div className="input-field">
                <img
                  src={img4}
                  alt=""
                  height={30}
                  style={{ marginTop: "10px" }}
                />
                <input
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  name="email"
                  type="email"
                  placeholder="Digite seu e-mail"
                />
              </div>
              {/* <div className="input-field">
                <i className="fas fa-phone" />
                <input type="text" name="number" placeholder="Contact Number" />
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
              </div> */}
              <input
                type="submit"
                onClick={RecoverPasswordFunc}
                className="btn bt"
                value="Recuperar"
              />
            </form>
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <img src={img5} className="image" alt="" />
          </div>
          <div className="panel right-panel">
            <div className="content">
              <img src={img2} className="image" alt="" />
              <button
                className="btn bt transparent"
                onClick={clickHandle}
                id="sign-in-btn bt"
              >
                Voltar
              </button>
            </div>
          </div>
        </div>
      </div>
      {loading && <Spinner />}
      {/* <RecoverPasswordModal show={show} setShow={setShow} /> */}
    </>
  );
};

export default LoginScreen;

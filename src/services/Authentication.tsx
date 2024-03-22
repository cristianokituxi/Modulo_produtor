import * as firebaseAuth from "firebase/auth";
import { auth } from "../../FirebaseConfig"

export const AuthenticatorLogin = (email: string, senha: string) => {
  const data = firebaseAuth
    .signInWithEmailAndPassword(auth, email, senha)
    .then((user: any) => {
      console.log(user);
      return user;
    })
    .catch((error: any) => {
      console.log("error", error);
      return error;
    });

  return data;
};

export const RecoverPassword = (email: string) => {
  return firebaseAuth.sendPasswordResetEmail(auth, email);
};

export const LogOut = () => {
  return firebaseAuth.signOut(auth);
};

export const CreatUser = (email: string, senha: string) => {
  firebaseAuth.createUserWithEmailAndPassword(auth, email, senha);
};

export const DisableUser = (uid: firebaseAuth.User) => {
  console.log(uid, "aqui");
  firebaseAuth
    .deleteUser(uid)
    .then(() => {
      console.log("Usuário bloqueado com sucesso!");
    })
    .catch((error: any) => {
      console.error("Erro ao bloquear usuário:", error);
    });
};

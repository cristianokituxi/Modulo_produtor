
import { ReactNode, useEffect, useState } from 'react';
import * as firebaseAuth from "firebase/auth";
import { auth } from "../../../FirebaseConfig";
import AuthContext, { AuthContextType } from './AuthContext';
import axios from 'axios';


interface Props {
  children?: ReactNode,
  // Ao longo do curso são adicionadas mais props
}

function AuthProvider(Prop: Props) {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDataPessoa = async (user: any) => {
    if (user) {
      const { uid } = user

      try {
        const response = await axios.get(
          `https://apisisges.vercel.app/usuario/get${uid}`
        );
        if (response) {
          setUser(
            response?.data?.rows.sort((a: any, b: any) => (a.nome > b.nome ? 1 : -1))
          );
        }
        setLoading(false);
        return;
      } catch (error) {
        console.error(error);
      }
    }
    setLoading(false);
    setUser(null);
  }

  useEffect(() => {
    firebaseAuth.onAuthStateChanged(auth, (authUser) => {
      fetchDataPessoa(authUser);
    });

  }, []);

  const contextValue: AuthContextType = {
    user,
    loading,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {Prop.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

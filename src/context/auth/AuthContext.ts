// AuthContext.tsx
import { createContext, useContext } from 'react';
// import { auth } from "../../FirebaseConfig"

export interface AuthContextType {
  user: any | null;
  loading: boolean;
  children?: React.ReactNode
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;

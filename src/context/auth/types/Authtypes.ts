

export type User = {} | null;
export type AuthContextType = {

  // Define the context type
    user: User;
    uid: string
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
  
}

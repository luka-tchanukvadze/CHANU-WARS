import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  _id: string;
  name?: string;
  email: string;
  password: string;
  passwordConfirm?: string;
  role?: string;
}
interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext)!;

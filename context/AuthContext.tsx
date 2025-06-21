// AuthContext.tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";

interface User {
  _id: string;
  name?: string;
  email: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await axios.get(
          "https://chanu-wars-back.vercel.app/api/v1/users/me",
          {
            // const res = await axios.get("http://localhost:8000/api/v1/users/me", {
            withCredentials: true,
          }
        );
        setUser(res.data.data.data);
        console.log("user", user);
      } catch (error) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCurrentUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
};

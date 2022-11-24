import { Center, Spinner } from "@chakra-ui/react";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { Dashboard } from "./pages/Dashboard";
import { LoginPage } from "./pages/LoginPage";
import { auth } from "./utils/firebase";
import { loginState } from "./utils/provider";

const App = () => {
  const setUser = useSetRecoilState(loginState);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setIsLoading(false);
      setUser(currentUser ? currentUser.uid : null);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <BrowserRouter>
      {isLoading ? (
        <Center height="100vh">
          <Spinner />
        </Center>
      ) : (
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default App;

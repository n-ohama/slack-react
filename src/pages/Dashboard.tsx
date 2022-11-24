import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { loginState } from "../utils/provider";
import { GoSignOut } from "react-icons/go";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { Grid, GridItem } from "@chakra-ui/react";

export const Dashboard = () => {
  const loginInfo = useRecoilValue(loginState);
  const logout = () => signOut(auth);
  return !loginInfo ? (
    <Navigate to="/" />
  ) : (
    <>
      <Grid
        templateAreas={`"header header"
                  "nav main"
                  "nav footer"`}
        gridTemplateRows={"50px 1fr 30px"}
        gridTemplateColumns={"150px 1fr"}
        h="100vh"
        gap="1"
        color="blackAlpha.700"
        fontWeight="bold"
      >
        <GridItem p="2" bg="orange.300" area={"header"}>
          <GoSignOut size={20} onClick={logout} />
        </GridItem>
        <GridItem pl="2" bg="pink.300" area={"nav"}>
          Nav
        </GridItem>
        <GridItem pl="2" bg="green.300" area={"main"}>
          Main
        </GridItem>
        <GridItem pl="2" bg="blue.300" area={"footer"}>
          Footer
        </GridItem>
      </Grid>
    </>
  );
};

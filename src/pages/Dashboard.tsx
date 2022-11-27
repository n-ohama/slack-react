import { Navigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { loginState, userInfoState } from "../utils/provider";
import { database, userConverter, USER_DB } from "../utils/firebase";
import { Grid, GridItem, useDisclosure } from "@chakra-ui/react";
import { NavContent } from "../components/dashboard/nav_content";
import { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { MainContent } from "../components/dashboard/main/main_content";
import { FooterContent } from "../components/dashboard/footer_content";
import { AddChannelModal } from "../components/common/add_channel_modal";
import { HeaderContent } from "../components/dashboard/header_content";

export const Dashboard = () => {
  const loginInfo = useRecoilValue(loginState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (!userInfo && loginInfo) {
      getDoc(
        doc(database, USER_DB, loginInfo).withConverter(userConverter)
      ).then((value) => {
        if (value.exists()) {
          setUserInfo(value.data());
        }
      });
    }
  }, []);

  return !loginInfo ? (
    <Navigate to="/" />
  ) : (
    <>
      <Grid
        templateAreas={`"header header"
                  "nav main"
                  "nav footer"`}
        gridTemplateRows={"40px 1fr 64px"}
        gridTemplateColumns={"400px 1fr"}
        h="100vh"
        color="blackAlpha.700"
        fontWeight="bold"
      >
        <GridItem bg="pink.900" area={"header"}>
          <HeaderContent />
        </GridItem>

        <GridItem p="4" bg="pink.800" area={"nav"} color="gray.300">
          <NavContent userInfo={userInfo} onOpen={onOpen} />
        </GridItem>

        <GridItem pl="2" bg="white" area={"main"}>
          <MainContent />
        </GridItem>

        <GridItem p="3" bg="gray.200" area={"footer"}>
          <FooterContent />
        </GridItem>
      </Grid>

      <AddChannelModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

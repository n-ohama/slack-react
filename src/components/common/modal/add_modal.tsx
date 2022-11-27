import { Box, Button, Flex, Input } from "@chakra-ui/react";
import { FC, useState } from "react";
import { useRecoilState } from "recoil";
import { userInfoState } from "../../../utils/provider";
import { RoomTyp, UserTyp } from "../../../utils/types";
import { v4 as uuidv4 } from "uuid";
import { database, ROOM_DB, USER_DB } from "../../../utils/firebase";
import { setDoc, doc } from "firebase/firestore";

type Props = {
  channelNm: string;
  setChannelNm: (value: string) => void;
  closeModal: () => void;
};

export const AddModal: FC<Props> = ({
  channelNm,
  setChannelNm,
  closeModal,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const createChannel = async () => {
    if (!userInfo) return;
    setIsLoading(true);
    const roomId = uuidv4();
    const roomData: RoomTyp = {
      roomId,
      roomName: channelNm,
      messages: [],
      members: [{ id: userInfo.userId, name: userInfo.userName }],
    };

    const userData: UserTyp = {
      ...userInfo,
      myRooms: [...userInfo.myRooms, { id: roomId, name: channelNm }],
    };

    // firestore に追加 ①
    setDoc(doc(database, USER_DB, userInfo.userId), userData).then((_) => {
      setUserInfo(userData); // recoil に追加
    });

    // firestore に追加 ②
    setDoc(doc(database, ROOM_DB, roomId), roomData).finally(() => {
      setIsLoading(false);
      closeModal();
    });
  };

  return (
    <Flex gap={4} flexDirection={"column"}>
      <Input
        placeholder="Channel Name"
        value={channelNm}
        onChange={(e) => setChannelNm(e.target.value)}
      />
      <Box textAlign="right">
        <Button
          bg="cyan.200"
          mr={3}
          onClick={createChannel}
          disabled={channelNm === ""}
          isLoading={isLoading}
          w="30%"
        >
          Create
        </Button>
      </Box>
    </Flex>
  );
};

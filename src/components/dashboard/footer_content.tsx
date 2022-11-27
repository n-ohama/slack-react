import { Button, Flex, Input } from "@chakra-ui/react";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { GrSend } from "react-icons/gr";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { database, ROOM_DB } from "../../utils/firebase";
import { roomState, userInfoState } from "../../utils/provider";
import { MessageTyp } from "../../utils/types";
import { v4 as uuidv4 } from "uuid";

export const FooterContent = () => {
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { roomId } = useParams();
  const roomInfo = useRecoilValue(roomState(roomId!));
  const userInfo = useRecoilValue(userInfoState);

  const sendMsg = () => {
    if (roomId && msg && roomInfo && userInfo) {
      setIsLoading(true);
      const messages: MessageTyp[] = [
        ...roomInfo.messages,
        {
          id: uuidv4(),
          messengerId: userInfo.userId,
          messengerNm: userInfo.userName,
          content: msg,
        },
      ];
      setDoc(doc(database, ROOM_DB, roomId), { ...roomInfo, messages }).finally(
        () => setIsLoading(false)
      );
      setMsg("");
    }
  };

  return (
    <Flex gap={2}>
      <Input
        bg="gray.50"
        placeholder="message..."
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
      />
      <Button bg="cyan.200" onClick={sendMsg} isLoading={isLoading}>
        <GrSend />
      </Button>
    </Flex>
  );
};

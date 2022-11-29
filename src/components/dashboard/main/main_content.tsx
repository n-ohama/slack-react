import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { database, roomConverter, ROOM_DB } from "../../../utils/firebase";
import {
  historyState,
  roomState,
  userInfoState,
} from "../../../utils/provider";
import { MessageContent } from "./message_content";
import { Box } from "@chakra-ui/react";

export const MainContent = () => {
  const { roomId } = useParams();
  const msgEndRef = useRef<HTMLDivElement>(null);
  const setHistory = useSetRecoilState(historyState);
  const userInfo = useRecoilValue(userInfoState);
  const [roomInfo, setRoomInfo] = useRecoilState(roomState(roomId!));

  const idArr = userInfo?.myRooms.map((item) => item.id);
  useEffect(() => {
    if (roomId && roomId !== "home" && idArr && idArr.includes(roomId)) {
      setHistory(roomId);
      const unsubscribe = onSnapshot(
        doc(database, ROOM_DB, roomId).withConverter(roomConverter),
        (doc) => {
          if (
            doc.exists() &&
            doc.data().messages.length !== roomInfo?.messages.length
          ) {
            setRoomInfo(doc.data());
          }
        }
      );

      return () => {
        unsubscribe();
      };
    }
  }, [roomId, idArr]);

  useEffect(() => {
    msgEndRef.current?.scrollIntoView();
  }, [roomInfo?.messages]);
  return (
    <Box h="680px" overflow="scroll">
      {roomInfo && (
        <>
          {roomInfo.messages.map((msg) => (
            <MessageContent msg={msg} />
          ))}
          <div ref={msgEndRef} />
        </>
      )}
    </Box>
  );
};

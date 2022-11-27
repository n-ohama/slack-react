import { doc, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { database, roomConverter, ROOM_DB } from "../../../utils/firebase";
import {
  historyState,
  roomState,
  userInfoState,
} from "../../../utils/provider";
import { MessageContent } from "./message_content";

export const MainContent = () => {
  const { roomId } = useParams();
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
          if (doc.exists()) {
            setRoomInfo(doc.data());
          }
        }
      );

      return () => {
        unsubscribe();
      };
    }
  }, [roomId, idArr]);
  return (
    <>
      {roomInfo && roomInfo.messages.map((msg) => <MessageContent msg={msg} />)}
    </>
  );
};

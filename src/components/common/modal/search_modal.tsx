import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Center,
  Flex,
  Highlight,
  IconButton,
  Input,
  Spinner,
  Text,
  Tooltip,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { FC, useEffect, useState } from "react";
import { RoomTyp, UserTyp } from "../../../utils/types";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import {
  database,
  roomConverter,
  ROOM_DB,
  USER_DB,
} from "../../../utils/firebase";
import { useRecoilState } from "recoil";
import { searchRoomsState, userInfoState } from "../../../utils/provider";

type Props = {
  searchNm: string;
  setSearchNm: (value: string) => void;
  closeModal: () => void;
};

export const SearchModal: FC<Props> = ({
  searchNm,
  setSearchNm,
  closeModal,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [filterResult, setFilterResult] = useState<RoomTyp[]>([]);
  const [isConfirm, setIsConfirm] = useState(false);
  const [selectRoomNm, setSelectRoomNm] = useState("");

  const [result, setResult] = useRecoilState(searchRoomsState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  useEffect(() => {
    const db = collection(database, ROOM_DB).withConverter(roomConverter);
    getDocs(db)
      .then((result) => {
        setIsLoading(true);
        const responseData = result.docs.map((item) => item.data());
        setResult(responseData);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const searchChannel = () => {
    if (!userInfo) return;
    const filtered = result
      .filter((item) => item.roomName.includes(searchNm))
      .filter((item) => {
        return (
          userInfo.myRooms.find((room) => room.id === item.roomId) === undefined
        );
      });
    setFilterResult(filtered);
    setIsSearching(true);
  };

  const confirm = (rid: string) => {
    setIsConfirm(true);
    setSelectRoomNm(rid);
  };

  const selectRoomInfo = filterResult.find(
    (item) => item.roomId === selectRoomNm
  );

  const reset = () => {
    setIsConfirm(false);
    setSelectRoomNm("");
  };

  const joinRoom = () => {
    if (!userInfo || !selectRoomInfo) return;
    const myRooms = [
      ...userInfo.myRooms,
      { id: selectRoomInfo.roomId, name: selectRoomInfo.roomName },
    ];
    const userData: UserTyp = {
      ...userInfo,
      myRooms,
    };

    setIsLoading2(true);
    setDoc(doc(database, USER_DB, userInfo.userId), userData)
      .then((_) => {
        setUserInfo(userData);
        reset();
        closeModal();
      })
      .finally(() => setIsLoading2(false));

    const members = [
      ...selectRoomInfo.members,
      { id: userInfo.userId, name: userInfo.userName },
    ];

    const roomData: RoomTyp = {
      ...selectRoomInfo,
      members,
    };
    setDoc(doc(database, ROOM_DB, selectRoomInfo.roomId), roomData);
  };

  return (
    <>
      {isConfirm && selectRoomInfo ? (
        isLoading2 ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <Box>
            <Box py={10}>
              <Highlight
                query={selectRoomInfo.roomName}
                styles={{ px: "1", py: "1", bg: "orange.100" }}
              >
                {`Are you sure to join ${selectRoomInfo.roomName} ??`}
              </Highlight>
              <Text my={3}>Members ...</Text>
              <Wrap>
                {selectRoomInfo.members.map((item) => (
                  <WrapItem>
                    <Tooltip label={item.name}>
                      <Avatar name={item.name} size="sm" />
                    </Tooltip>
                  </WrapItem>
                ))}
              </Wrap>
            </Box>
            <Flex justifyContent="flex-end" gap={2}>
              <Button onClick={reset}>Back</Button>
              <Button bg="cyan.200" onClick={joinRoom}>
                Join
              </Button>
            </Flex>
          </Box>
        )
      ) : (
        <>
          <Flex gap={2}>
            <Input
              placeholder="Search.."
              value={searchNm}
              onChange={(e) => setSearchNm(e.target.value)}
            />
            <IconButton
              aria-label="Search database"
              icon={<SearchIcon />}
              disabled={searchNm === ""}
              onClick={searchChannel}
            />
          </Flex>

          {isSearching ? (
            isLoading ? (
              <Center>
                <Spinner />
              </Center>
            ) : filterResult.length ? (
              <Box mt="32px">
                {filterResult.map((item) => (
                  <Box
                    p={2}
                    _hover={{ cursor: "pointer" }}
                    key={item.roomId}
                    onClick={() => confirm(item.roomId)}
                  >
                    <Text _hover={{ color: "cyan.600" }}>{item.roomName}</Text>
                    <Text fontSize="xs" color="gray.400">
                      {item.roomId}
                    </Text>
                  </Box>
                ))}
              </Box>
            ) : (
              <Text p={1} mt="24px" color="gray.600">
                Not Found
              </Text>
            )
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
};

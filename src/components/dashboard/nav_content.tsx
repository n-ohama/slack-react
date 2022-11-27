import {
  Text,
  Box,
  Flex,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  Avatar,
} from "@chakra-ui/react";
import { FC } from "react";
import { Link } from "react-router-dom";
import { UserTyp } from "../../utils/types";
import { GiMechanicalArm } from "react-icons/gi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useRecoilValue } from "recoil";
import { historyState, userInfoState } from "../../utils/provider";
import { BsThreeDots } from "react-icons/bs";

type Props = {
  userInfo: UserTyp | null;
  onOpen: () => void;
};

export const NavContent: FC<Props> = ({ userInfo, onOpen }) => {
  const historyPath = useRecoilValue(historyState);
  const isMatch = (arg: string): boolean => {
    return arg === historyPath;
  };

  const deleteChannel = () => {};

  return (
    <>
      <Flex alignItems="center" gap={2}>
        <Avatar name={userInfo?.userName} size="sm" />
        <Text fontSize="lg" fontWeight="bold" color="whiteAlpha.900">
          {userInfo?.userName}
        </Text>
      </Flex>
      <Flex mt={3} alignItems="center" justifyContent="space-between">
        <Flex>
          <GiMechanicalArm size={20} />
          <Text ml={2} fontSize="md">
            チャンネル
          </Text>
        </Flex>

        <AiOutlinePlusCircle size={20} onClick={onOpen} />
      </Flex>
      <Box mt={3} ml={3}>
        {userInfo?.myRooms.map((item) => (
          <Flex
            justifyContent="space-between"
            alignItems="center"
            key={item.id}
          >
            <Link to={`/dashboard/${item.id}`} key={item.id}>
              <Text
                my={2}
                fontSize="md"
                fontWeight={isMatch(item.id) ? "black" : "normal"}
              >
                {`# ${item.name}`}
              </Text>
            </Link>
            <Menu>
              <MenuButton>
                <BsThreeDots />
              </MenuButton>
              <MenuList>
                <MenuItem color="blackAlpha.700" onClick={deleteChannel}>
                  Delete
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        ))}
      </Box>
    </>
  );
};

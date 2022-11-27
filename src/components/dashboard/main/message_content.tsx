import { FC } from "react";
import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { MessageTyp } from "../../../utils/types";

type Props = {
  msg: MessageTyp;
};

export const MessageContent: FC<Props> = ({ msg }) => {
  return (
    <Box p={2}>
      <Flex alignItems="center" gap={2}>
        <Avatar name={msg.messengerNm} size="sm" />
        <Text>{msg.messengerNm}</Text>
      </Flex>
      <Text fontWeight="normal" key={msg.id} ml={"40px"}>
        {msg.content}
      </Text>
    </Box>
  );
};

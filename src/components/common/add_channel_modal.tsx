import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import { AddModal } from "./modal/add_modal";
import { SearchModal } from "./modal/search_modal";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const AddChannelModal: FC<Props> = ({ isOpen, onClose }) => {
  const [createNm, setCreateNm] = useState("");
  const [searchNm, setSearchNm] = useState("");

  const closeModal = () => {
    setCreateNm("");
    setSearchNm("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>New Channel</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Tabs variant="soft-rounded" colorScheme="green">
            <TabList>
              <Tab>Search</Tab>
              <Tab>Create</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <SearchModal
                  searchNm={searchNm}
                  setSearchNm={setSearchNm}
                  closeModal={closeModal}
                />
              </TabPanel>
              <TabPanel>
                <AddModal
                  channelNm={createNm}
                  setChannelNm={setCreateNm}
                  closeModal={closeModal}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

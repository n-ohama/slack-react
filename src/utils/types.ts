export type UserTyp = {
  userId: string;
  userName: string;
  myRooms: Array<{ id: string; name: string }>;
};

export type RoomTyp = {
  roomId: string;
  roomName: string;
  members: Array<{ id: string; name: string }>;
  messages: MessageTyp[];
};

export type MessageTyp = {
  id: string;
  content: string;
  messengerId: string;
  messengerNm: string;
};

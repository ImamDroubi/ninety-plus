import { useState } from "react";
import SearchInput from "../other/SearchInput";
import { Avatar, Button } from "@mui/material";
import { SendIcon, ThreeDotsIcon } from "../icons/icons";
import DropDownMenu from "../menus/DropdownMenu";

export default function Messages() {
  const [searchText, setSearchText] = useState();

  return (
    <section className="mb-4 flex justify-between gap-1">
      <div className="nav-section w-full md:w-1/3 border-[1px] border-gray-100 h-[35rem] overflow-auto">
        <div className="nav-header p-3">
          <h2 className="mb-3 text-lg font-semibold">الرسائل</h2>
          <SearchInput stateChanger={setSearchText} />
        </div>
        <div className="conversation-list mt-2">
          <ConversationPreview />
          <ConversationPreview />
          <ConversationPreview />
          <ConversationPreview />
          <ConversationPreview />
        </div>
      </div>
      <div className="conversation-body w-full hidden md:w-2/3  border-[1px] border-gray-100  md:block px-2">
        <ConversationBody />
      </div>
    </section>
  );
}

export function ConversationPreview({ isSelected }) {
  const [selected, setIsSelected] = useState(isSelected || false);
  const conversation = {
    userPhoto:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=1780&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    username: "خالد كشميري",
    lastMessage: "مساء العنبر، معك 20 شيقل",
    lastMessageDate: "الآن",
    isRead: false,
  };
  const basePreviwStyle =
    "flex gap-1 justify-between p-2 duration-100 cursor-pointer hover:bg-primary-200 text-sm ";
  return (
    <>
      <div
        className={
          selected ? `${basePreviwStyle} bg-primary-200 ` : basePreviwStyle
        }
        onClick={() => setIsSelected(!selected)}
      >
        <Avatar sx={{ width: 50, height: 50 }} src={conversation.userPhoto} />
        <div className="body w-2/3 flex flex-col justify-around items-start ">
          <p className="text-gray-900 font-semibold">{conversation.username}</p>
          <p className="text-gray-600">{conversation.lastMessage}</p>
        </div>
        <div className="info flex flex-col justify-around items-end">
          <p className="text-gray-600">{conversation.lastMessageDate}</p>
          {!conversation.isRead && (
            <div className="w-[10px] h-[10px] bg-primary-500 rounded-full"></div>
          )}
        </div>
      </div>
    </>
  );
}

export function ConversationBody() {
  const optionsMenu = [
    {
      text: "حذف المحادثة",
      callback: () => {
        console.log("Conversation Deleted.");
      },
    },
  ];

  const conversation = {
    username: "خالد كشميري",
    userPhoto:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=1780&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    lastActive: "متصل الآن",
    messages: [
      {
        owner: "client",
        date: "yesterday",
        text: "مساء العنبر أبو الشباب شو الوضع",
      },
      {
        owner: "server",
        date: "yesterday",
        text: "هلا بيك هلا",
      },
    ],
  };

  return (
    <>
      <div className="header flex justify-between p-2 border-b-2 items-center">
        <div className="user flex  gap-2">
          <Avatar sx={{ width: 70, height: 70 }} src={conversation.userPhoto} />
          <div className="info flex flex-col justify-center">
            <p className="text-gray-900 font-semibold text-lg">
              {conversation.username}
            </p>
            <p className="text-gray-600">{conversation.lastActive}</p>
          </div>
        </div>
        <div className="options">
          <DropDownMenu list={optionsMenu}>
            <ThreeDotsIcon className="cursor-pointer text-gray-900 bg-gray-50 p-2 hover:bg-primary-200" />
          </DropDownMenu>
        </div>
      </div>
      <div className="body text-sm h-[30rem]">
        <div className="section">
          <p className="date text-xs my-2 m-auto text-center bg-gray-100 text-gray-700 p-2 w-fit">
            Yesterday
          </p>
          {conversation.messages.map((message, ind) => {
            return <Message message={message} key={ind} />;
          })}
        </div>
        <div className="section">
          <p className="date text-xs my-5 m-auto text-center bg-gray-100 text-gray-700 p-2 w-fit">
            Today
          </p>
          {conversation.messages.map((message) => {
            return <Message message={message} />;
          })}
        </div>
      </div>
      <div className="input flex gap-2 p-1 border-t-[1px] border-gray-100">
        <input
          className="p-1 w-full text-sm border-[1px] border-gray-100"
          placeholder="أكتب رسالة جديدة..."
          type="text"
          name=""
          id=""
        />
        <Button variant="contained" disableElevation sx={{ display: "flex", gap: "5px" }}>
          إرسال
          {<SendIcon />}
        </Button>
      </div>
    </>
  );
}

export function Message({ message }) {
  const clientMessageStyle = "bg-primary-500 text-gray-white";
  const serverMessageStyle = "bg-gray-100 text-gray-900";
  const messageBaseStyle = "max-w-[70%] p-2 my-1 break-words";
  return (
    <>
      <div
        className={`w-full flex ${
          message.owner === "client" ? "justify-start" : "justify-end"
        }`}
      >
        <p
          className={`${messageBaseStyle} ${
            message.owner === "client" ? clientMessageStyle : serverMessageStyle
          }`}
        >
          {message.text}
        </p>
      </div>
    </>
  );
}

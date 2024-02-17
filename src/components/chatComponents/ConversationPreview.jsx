import { Avatar } from "@mui/material";
import { useState } from "react";

export default function ConversationPreview({ isSelected }) {
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

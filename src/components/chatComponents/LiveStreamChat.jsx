import { Button } from "@mui/material";
import { SendIcon } from "../icons/icons";
import Message from "./Message";

export default function LiveStreamChat() {
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
    <div className="bg-gray-white border-2">
      <div className="body text-sm h-[30rem]">
        <div className="section">
          <p className="date text-xs my-2 m-auto text-center bg-gray-100 text-gray-700 p-2 w-fit">
            Today
          </p>
          {conversation.messages.map((message, ind) => {
            return <Message message={message} key={ind} />;
          })}
        </div>
      </div>
      <div className="input flex gap-2 p-1 border-t-[1px] border-gray-100 bg-gray-100">
        <input
          className="p-1 w-full text-sm border-[1px] border-gray-100"
          placeholder="أكتب رسالة جديدة..."
          type="text"
          name=""
          id=""
        />
        <Button
          variant="contained"
          disableElevation
          sx={{ display: "flex", gap: "5px" }}
        >
          إرسال
          {<SendIcon />}
        </Button>
      </div>
    </div>
  );
}

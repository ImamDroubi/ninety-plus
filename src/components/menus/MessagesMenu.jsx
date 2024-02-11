import { useState } from "react";
import { MessageIcon } from "../icons/icons";
import DropdownMenu from "./DropdownMenu";
import { Badge } from "@mui/material";

export default function MessagesMenu({ count = 3 }) {
  const [messagesCount, setMessagesCount] = useState(count);

  return (
    <Badge
      color="primary"
      className="text-xl text-gray-700"
      badgeContent={messagesCount}
    >
      <DropdownMenu list={[{ text: "first" }, { text: "second" }]}>
        <MessageIcon className={"cursor-pointer hover:text-primary-500"} />
      </DropdownMenu>
    </Badge>
  );
}

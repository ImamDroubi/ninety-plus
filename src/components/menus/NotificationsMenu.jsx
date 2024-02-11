import { Badge } from "@mui/material";
import DropdownMenu from "./DropdownMenu";
import { BellIcon } from "../icons/icons";
import { useState } from "react";

export default function NotificationsMenu({ count = 2 }) {
  const [notificationsCount, setNotificationsCount] = useState(2);

  return (
    <Badge
      color="primary"
      className="text-xl text-gray-700"
      badgeContent={notificationsCount}
    >
      <DropdownMenu list={[{ text: "first" }, { text: "second" }]}>
        <BellIcon className={"cursor-pointer hover:text-primary-500"} />
      </DropdownMenu>
    </Badge>
  );
}

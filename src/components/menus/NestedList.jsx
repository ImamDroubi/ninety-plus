import { Button } from "@mui/material";
import {
  ArrowDownIcon,
  EditIcon,
  HumburgerIcon,
  PlusIcon,
  TrashIcon,
} from "../icons/icons";
import DropdownMenu from "./DropdownMenu";

export default function NestedList({ itemsList, setItemsList }) {
  return (
    <>
      {itemsList.map((item, index) => {
        return (
          <div key={index} className="text-gray-900 bg-gray-50 w-full p-2 mb-3">
            <div className="header flex justify-between p-2">
              <h3>
                <HumburgerIcon className="hidden sm:inline" /> {item.name}
              </h3>
              <div className="icons flex  text-gray-600 ">
                <PlusIcon className="cursor-pointer hover:bg-gray-300 p-1 rounded-full" />
                <EditIcon className="cursor-pointer hover:bg-gray-300 p-1 rounded-full" />
                <TrashIcon className="cursor-pointer hover:bg-gray-300 p-1 rounded-full" />
              </div>
            </div>
            <div className="body w-full">
              {item.subList.map((subItem, index) => {
                return (
                  <div className="w-full bg-gray-white my-2 p-2 flex justify-between cursor-pointer hover:bg-gray-100 duration-200">
                    <h3 className="text-gray-600 ">
                      <HumburgerIcon className="hidden sm:inline" />{" "}
                      {subItem.name}
                    </h3>
                    <div className="icons flex text-gray-600 text-xs gap-1">
                      <DropdownMenu
                        small={true}
                        list={[{ text: "إضافة مقطع فيديو" }]}
                      >
                        <Button
                          size="small"
                          variant="outlined"
                          disableElevation
                        >
                          <span className="ml-1">المحتويات</span>
                          <ArrowDownIcon />
                        </Button>
                      </DropdownMenu>
                      <EditIcon className="cursor-pointer hover:bg-gray-300 p-1 rounded-full" />
                      <TrashIcon className="cursor-pointer hover:bg-gray-300 p-1 rounded-full" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      <Button
        sx={{ width: "100%", opacity: "0.8" }}
        variant="contained"
        disableElevation
      >
        إضافة وحدة جديدة
      </Button>
    </>
  );
}

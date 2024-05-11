import { Button } from "@mui/material";
import CurriculumChapter from "./CurriculumChapter";
import { useState } from "react";
import PopupLayout from "../../layouts/PopupLayout";
import ClosePopupButton from "../../buttons/ClosePopupButton";
import AddChapter from "../../popups/CurriculumPopups/AddChapter";

export default function NestedList({ itemsList = [], setItemsList }) {
  const addItem = (newItem) => {
    const newId = itemsList.length + 1;
    setItemsList([...itemsList, { ...newItem, id: newId }]);
  };

  const [addChapterPopupOpen, setAddChapterPopupOpen] = useState(false);

  const editItem = (itemId, updatedItem) => {
    const newItemsList = itemsList.map((item) => {
      if (item.id !== itemId) return item;
      return {
        ...item,
        ...updatedItem,
        id: itemId,
      };
    });
    setItemsList(newItemsList);
  };
  const deleteItem = (itemId) => {
    let newItemsList = itemsList.filter((item) => item.id !== itemId);
    newItemsList = newItemsList.map((item, key) => {
      return {
        ...item,
        id: key + 1,
      };
    });
    setItemsList(newItemsList);
  };

  return (
    <>
      {itemsList.map((chapter, index) => {
        return (
          <CurriculumChapter
            key={index}
            chapter={chapter}
            editChapter={editItem}
            deleteChapter={deleteItem}
          />
        );
      })}
      {itemsList.length == 0 && (
        <p className="my-2">
          لم يتم إضافة أي وحدات، يمكنك الإضافة من الزر أدناه.
        </p>
      )}
      <Button
        sx={{ width: "100%", opacity: "0.8" }}
        variant="contained"
        disableElevation
        onClick={() => setAddChapterPopupOpen(true)}
      >
        إضافة وحدة جديدة
      </Button>

      {/* POPUP TO ADD CHAPTER */}
      {addChapterPopupOpen ? (
        <PopupLayout>
          <div className="w-9/12  md:w-5/12 z-10 bg-gray-50 p-4 relative py-5">
            <ClosePopupButton setOpen={setAddChapterPopupOpen} />
            <AddChapter callback={addItem} setOpen={setAddChapterPopupOpen} />
          </div>
        </PopupLayout>
      ) : null}
    </>
  );
}

import { Button } from "@mui/material";

import CurriculumChapter from "./CurriculumChapter";

export default function NestedList({ itemsList, setItemsList }) {
  const addItem = (newItem) => {
    const newId = itemsList.length + 1;
    setItemsList([...itemsList, { ...newItem, id: newId }]);
  };

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
  const newChapter = {
    id: 1,
    name: "تمت الإضافة",
    lectures: [],
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
        onClick={() => addItem(newChapter)}
      >
        إضافة وحدة جديدة
      </Button>
    </>
  );
}

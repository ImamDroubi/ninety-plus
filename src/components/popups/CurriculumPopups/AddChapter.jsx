import { useState } from "react";
import SingleFormInputContainer from "../../containers/SingleFormInputContainer";
import { Button } from "@mui/material";

export default function AddChapter({ callback = () => {}, setOpen }) {
  const [chapterName, setChapterName] = useState("");
  const [error, setError] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!chapterName || chapterName == "") {
      setError("لا يمكن أن يكون اسم الوحدة فارغاً");
      return;
    }
    callback({
      name: chapterName,
      lectures: [],
    });
    setOpen(false);
  };

  const labelBaseStyle = "mb-2 text-base block font-semibold";
  const inputBaseStyle =
    "border-[2px] border-gray-100 p-2 w-full focus:border-primary-500 outline-none duration-200";
  return (
    <form
      className="flex flex-col gap-2"
      onInput={() => {
        setError(null);
      }}
      onSubmit={handleSubmit}
    >
      <SingleFormInputContainer error={error}>
        <label className={`${labelBaseStyle}`}>اسم الوحدة</label>
        <input
          className={`${inputBaseStyle}`}
          type="text"
          value={chapterName}
          onChange={(e) => setChapterName(e.target.value)}
          placeholder="التفاضل والتكامل"
        />
      </SingleFormInputContainer>

      <Button
        variant="contained"
        disableElevation
        sx={{ borderRadius: "0px" }}
        type="submit"
      >
        إضافة وحدة
      </Button>
    </form>
  );
}

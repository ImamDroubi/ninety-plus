import { Button } from "@mui/material";
import SingleFormInputContainer from "../containers/SingleFormInputContainer";
import { useState } from "react";

export default function TextInputPopup({
  defaultValue = "",
  label = "النص",
  buttonLabel = "تأكيد",
  setOpen,
  affectedObject,
  callback,
}) {
  const [text, setText] = useState(defaultValue);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text || text == "") {
      setError("لا يمكن أن يكون النص فارغاً!");
      return;
    }
    callback(affectedObject, text);
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
        <label className={`${labelBaseStyle}`}>{label}</label>
        <input
          className={`${inputBaseStyle}`}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </SingleFormInputContainer>

      <Button
        variant="contained"
        disableElevation
        sx={{ borderRadius: "0px" }}
        type="submit"
      >
        {buttonLabel}
      </Button>
    </form>
  );
}

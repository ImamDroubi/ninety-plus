import { useState } from "react";
import { Button } from "@mui/material";
import { WarningIcon } from "../icons/icons";

export default function DeleteObjectPopup({
  callback = async () => {},
  setOpen,
  objectId = -1,
  title = "تأكيد حذف العنصر"
}) {
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      await callback(objectId);
      setOpen(false);
    } catch (error) {
      setError(error.message)
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="text-5xl text-error-400">
        <WarningIcon />
      </div>
      <h3 className="font-semibold text-2xl text-gray-900 mt-3 mb-1">{title}</h3>
      <p className="text-gray-500 text-center w-9/12 mb-4">
        هل أنت متأكد من عملية الحذف؟ لا يمكنك التراجع عن هذا الإجراء لاحقاً
      </p>
      {error && <p className="text-error-500">{error}</p>}

      <div className="flex justify-between w-full">
        <Button
          variant="outlined"
          disableElevation
          sx={{ borderRadius: "0px" }}
          onClick={() => setOpen(false)}
        >
          إلغاء
        </Button>
        <Button
          variant="contained"
          disableElevation
          sx={{ borderRadius: "0px" }}
          onClick={handleSubmit}
        >
          تأكيد
        </Button>
      </div>
    </div>
  );
}

import useCreateResource from "../../../apiCalls/useCreateResource";
import useGetResources from "../../../apiCalls/useGetResources";
import useUpdateResource from "../../../apiCalls/useUpdateResource";
import useDeleteResource from "../../../apiCalls/useDeleteResource";
import { useAlert } from "../../../hooks/useAlert";
import { useEffect, useState } from "react";
import PaginatedTable from "../../tables/PaginatedTable";
import { Button, CircularProgress } from "@mui/material";
import TopAlert from "../../alerts/TopAlert";
import PopupLayout from "../../layouts/PopupLayout";
import ClosePopupButton from "../../buttons/ClosePopupButton";
import TextInputPopup from "../../popups/TextInputPopup";
import DeleteObjectPopup from "../../popups/DeleteObjectPopup";

const initialBranches = [
  { id: 1, name: "الفرع العلمي" },
  { id: 2, name: "الفرع الأدبي" },
];

const branchesPaginatedHeaders = ["الرقم", "الاسم", "الإجراءات"];

export default function AdminBranchesSection() {
  const [branches, setBranches] = useState([]);
  const [updatePopupOpen, setUpdatePopupOpen] = useState(false);
  const [deletePopupOpen, setDeletePopupOpen] = useState(false);

  const getBranchesQuery = useGetResources("branches");
  const createBranchMutation = useCreateResource("branches");
  const updateBranchMutation = useUpdateResource("branches");
  const deleteBranchMutation = useDeleteResource("branches");

  const alertController = useAlert();

  const [newBranchName, setNewBranchName] = useState("");
  const [currentObject, setCurrentObject] = useState();
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    if (getBranchesQuery.data) {
      console.log("branches : ", getBranchesQuery.data.data.data);
      setBranches(getBranchesQuery.data.data.data);
    }
  }, [getBranchesQuery.isSuccess]);

  const handleCreate = async () => {
    if (!newBranchName || newBranchName == "") return;
    const index = branches.length + 1;
    const newItem = {
      id: index,
      name: newBranchName,
    };
    setIsCreating(true);
    const oldList = branches;
    setBranches([...branches, newItem]);
    try {
      const response = await createBranchMutation.mutateAsync({
        ...newItem,
        id: undefined,
      });
      alertController.alertSuccessToggle("تمت الإضافة بنجاح!");
      setNewBranchName("");
    } catch (error) {
      console.log(error);
      alertController.alertErrorToggle(`خطأ في الإضافة!`);
      setBranches(oldList);
    }
    setIsCreating(false);
  };

  const handleUpdate = async (oldObject, data) => {
    const index = branches.indexOf(oldObject.id);
    const newItem = { ...oldObject, name: data };
    setBranches(
      branches.map((item) => (item.id == oldObject.id ? newItem : item))
    );
    try {
      const response = await updateBranchMutation.mutateAsync(oldObject.id, {
        ...newItem,
        id: undefined,
      });
      alertController.alertSuccessToggle("تم التعديل بنجاح!");
    } catch (error) {
      console.log(error);
      alertController.alertErrorToggle(`خطأ في التعديل!`);
      setBranches(
        branches.map((item) => (item.id == oldObject.id ? oldObject : item))
      );
    }
  };

  const handleDelete = async (objectID) => {
    const oldList = branches;
    setBranches(branches.filter((item) => item.id != objectID));
    try {
      const response = await deleteBranchMutation.mutateAsync(objectID);
      alertController.alertSuccessToggle("تم الحذف بنجاح!");
    } catch (error) {
      console.log(error);
      alertController.alertErrorToggle(`خطأ في الحذف!`);
      setBranches(oldList);
    }
  };

  const handleUpdateClick = (object) => {
    setCurrentObject(object);
    setUpdatePopupOpen(true);
  };

  const handleDeleteClick = (object) => {
    setCurrentObject(object);
    setDeletePopupOpen(true);
  };

  return (
    <>
      {alertController.showSuccessAlert && (
        <TopAlert
          message={alertController.successAlertMessage}
          type="success"
        />
      )}
      {alertController.showErrorAlert && (
        <TopAlert message={alertController.errorAlertMessage} type="error" />
      )}
      <div className="mb-6 w-9/12 m-auto">
        <h2 className="text-xl font-bold text-center my-4">جدول الفروع</h2>

        {getBranchesQuery.isPending && false ? (
          <CircularProgress />
        ) : (
          <PaginatedTable
            headers={branchesPaginatedHeaders}
            data={[
              ...branches.map((branch) => {
                return [
                  branch.id,
                  branch.name,
                  <>
                    <Button onClick={() => handleUpdateClick(branch)}>
                      <span className="text-success-500">تعديل</span>
                    </Button>
                    <Button
                      onClick={() => handleDeleteClick(branch)}
                      className="text-error-500 py-2 px-4 rounded"
                    >
                      <span className="text-error-500">حذف</span>
                    </Button>
                  </>,
                ];
              }),
            ]}
          />
        )}

        {/* input  */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-center my-4">إضافة فرع</h2>
          <div className="flex flex-col items-center mb-4">
            <input
              type="text"
              value={newBranchName}
              onChange={(e) => setNewBranchName(e.target.value)}
              placeholder="اسم الفرع"
              className="border rounded px-2 py-1 mx-2 mb-2"
            />
            <Button
              disabled={isCreating}
              disableElevation
              onClick={handleCreate}
              variant="contained"
            >
              {isCreating ? "جاري الإضافة..." : "إضافة"}
            </Button>
          </div>
        </div>
      </div>

      {updatePopupOpen ? (
        <PopupLayout>
          <div className="w-9/12  md:w-5/12 z-10 bg-gray-50 p-4 relative py-5">
            <ClosePopupButton setOpen={setUpdatePopupOpen} />
            <TextInputPopup
              affectedObject={currentObject}
              defaultValue={currentObject.name}
              callback={handleUpdate}
              setOpen={setUpdatePopupOpen}
              label="اسم الفرع"
              buttonLabel="تعديل"
            />
          </div>
        </PopupLayout>
      ) : null}
      {deletePopupOpen ? (
        <PopupLayout>
          <div className="w-9/12  md:w-5/12 z-10 bg-gray-50 p-4 relative py-5">
            <ClosePopupButton setOpen={setUpdatePopupOpen} />
            <DeleteObjectPopup
              callback={handleDelete}
              objectId={currentObject.id}
              setOpen={setDeletePopupOpen}
              title="تأكيد حذف الفرع"
            />
          </div>
        </PopupLayout>
      ) : null}
    </>
  );
}

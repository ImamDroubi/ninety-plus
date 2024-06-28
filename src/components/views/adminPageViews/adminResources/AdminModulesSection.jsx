import useCreateResource from "../../../../apiCalls/useCreateResource";
import useGetResources from "../../../../apiCalls/useGetResources";
import useUpdateResource from "../../../../apiCalls/useUpdateResource";
import useDeleteResource from "../../../../apiCalls/useDeleteResource";
import { useAlert } from "../../../../hooks/useAlert";
import { useEffect, useState } from "react";
import PaginatedTable from "../../../tables/PaginatedTable";
import { Button, CircularProgress } from "@mui/material";
import TopAlert from "../../../alerts/TopAlert";
import PopupLayout from "../../../layouts/PopupLayout";
import ClosePopupButton from "../../../buttons/ClosePopupButton";
import TextInputPopup from "../../../popups/TextInputPopup";
import DeleteObjectPopup from "../../../popups/DeleteObjectPopup";
import SingleFormInputContainer from "../../../containers/SingleFormInputContainer";
import SelectDropdown from "../../../menus/SelectDropdown";

const modulesPaginatedHeaders = ["الرقم", "الاسم", "الفرع", "الإجراءات"];

export default function AdminModulesSection() {
  const [modules, setModules] = useState([]);
  const [updatePopupOpen, setUpdatePopupOpen] = useState(false);
  const [deletePopupOpen, setDeletePopupOpen] = useState(false);

  const getModulesQuery = useGetResources("countries/1/modules");
  const createModuleMutation = useCreateResource("countries/1/modules");
  const updateModuleMutation = useUpdateResource("modules");
  const deleteModuleMutation = useDeleteResource("modules");

  const alertController = useAlert();

  const [newModuleName, setNewModuleName] = useState("");

  const [currentObject, setCurrentObject] = useState();
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    if (getModulesQuery.data) {
      console.log("modules : ", getModulesQuery.data.data.data);
      setModules(getModulesQuery.data.data.data);
    }
  }, [getModulesQuery.isSuccess]);

  const handleCreate = async () => {
    if (!newModuleName || newModuleName == "") return;
    if (!newModuleBranch || Object.keys(newModuleBranch).length === 0) return;
    const index = modules.length + 1;
    const newItem = {
      id: index,
      name: newModuleName,
      branch_id: newModuleBranch.id,
      branch: {
        id: newModuleBranch.id,
        name: newModuleBranch.name,
      },
    };
    setIsCreating(true);
    const oldList = modules;
    setModules([...modules, newItem]);
    try {
      const response = await createModuleMutation.mutateAsync({
        ...newItem,
        id: undefined,
      });
      alertController.alertSuccessToggle("تمت الإضافة بنجاح!");
      setNewModuleName("");
    } catch (error) {
      console.log(error);
      alertController.alertErrorToggle(`خطأ في الإضافة!`);
      setModules(oldList);
    }
    setIsCreating(false);
  };

  const handleUpdate = async (oldObject, data) => {
    const newItem = { ...oldObject, name: data };
    setModules(
      modules.map((item) => (item.id == oldObject.id ? newItem : item))
    );
    try {
      const response = await updateModuleMutation.mutateAsync(oldObject.id, {
        name: newItem.name,
        branch_id: newItem.branch_id,
        // id: undefined,
      });
      alertController.alertSuccessToggle("تم التعديل بنجاح!");
    } catch (error) {
      console.log(error);
      alertController.alertErrorToggle(`خطأ في التعديل!`);
      setModules(
        modules.map((item) => (item.id == oldObject.id ? oldObject : item))
      );
    }
  };

  const handleDelete = async (objectID) => {
    const oldList = modules;
    setModules(modules.filter((item) => item.id != objectID));
    try {
      const response = await deleteModuleMutation.mutateAsync(objectID);
      alertController.alertSuccessToggle("تم الحذف بنجاح!");
    } catch (error) {
      console.log(error);
      alertController.alertErrorToggle(`خطأ في الحذف!`);
      setModules(oldList);
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

  // ====================================== Other Rseources Dependency ==========================

  const [branches, setBranches] = useState([]);
  const getBranchesQuery = useGetResources("branches");
  const [newModuleBranch, setNewModuleBranch] = useState({});

  useEffect(() => {
    if (getBranchesQuery.data) {
      console.log("branches : ", getBranchesQuery.data.data.data);
      setBranches(getBranchesQuery.data.data.data);
    }
  }, [getBranchesQuery.isSuccess]);

  //=============================================================================================

  const labelBaseStyle = "mb-2 text-base block font-semibold";

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
        <h2 className="text-xl font-bold text-center my-4">جدول المواد</h2>

        {getModulesQuery.isPending && false ? (
          <CircularProgress />
        ) : (
          <PaginatedTable
            headers={modulesPaginatedHeaders}
            data={[
              ...modules.map((module) => {
                return [
                  module.id,
                  module.name,
                  module.branch.name,
                  <>
                    <Button onClick={() => handleUpdateClick(module)}>
                      <span className="text-success-500">تعديل</span>
                    </Button>
                    <Button
                      onClick={() => handleDeleteClick(module)}
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
          <h2 className="text-xl font-bold text-center my-4">إضافة مادة</h2>
          <div className="flex flex-col items-center mb-4">
            <input
              type="text"
              value={newModuleName}
              onChange={(e) => setNewModuleName(e.target.value)}
              placeholder="اسم المادة"
              className="border rounded px-2 py-1 mx-2 mb-2"
            />
            <SingleFormInputContainer error={null}>
              <div className="mb-3 flex items-center gap-1 ">
                <label className={`${labelBaseStyle}`}>الفرع:</label>
                {getBranchesQuery.isPending && false ? (
                  <CircularProgress />
                ) : (
                  <SelectDropdown
                    title="الفرع"
                    list={branches}
                    stateChanger={setNewModuleBranch}
                  />
                )}
              </div>
            </SingleFormInputContainer>
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
              label="اسم المادة"
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
              title="تأكيد حذف المادة"
            />
          </div>
        </PopupLayout>
      ) : null}
    </>
  );
}

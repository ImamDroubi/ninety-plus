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

const initialChapters = [
  { id: 1, name: "متوسط التغير", module_id: 1 },
  { id: 2, name: "كان وأخواتها", module_id: 2 },
];

const initialModulesList = [
  {
    id: 1,
    name: "رياضيات",
  },
  {
    id: 2,
    name: "عربي",
  },
];

const chaptersPaginatedHeaders = ["الرقم", "الاسم", "المادة", "الإجراءات"];

export default function AdminChaptersSection() {
  const [chapters, setChapters] = useState([]);
  const [updatePopupOpen, setUpdatePopupOpen] = useState(false);
  const [deletePopupOpen, setDeletePopupOpen] = useState(false);

  const getChaptersQuery = useGetResources("chapters");
  const createChapterMutation = useCreateResource("chapters");
  const updateChapterMutation = useUpdateResource("chapters");
  const deleteChapterMutation = useDeleteResource("chapters");

  const alertController = useAlert();

  const [newChapterName, setNewChapterName] = useState("");

  const [currentObject, setCurrentObject] = useState();
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    if (getChaptersQuery.data) {
      console.log("chapters : ", getChaptersQuery.data.data.data);
      setChapters(getChaptersQuery.data.data.data);
    }
  }, [getChaptersQuery.isSuccess]);

  const handleCreate = async () => {
    if (!newChapterName || newChapterName == "") return;
    if (!newChapterModule || Object.keys(newChapterModule).length === 0) return;
    const index = chapters.length + 1;
    const newItem = {
      id: index,
      title: newChapterName,
      module_id: newChapterModule.id,
    };
    setIsCreating(true);
    const oldList = chapters;
    setChapters([...chapters, newItem]);
    try {
      const response = await createChapterMutation.mutateAsync({
        ...newItem,
        id: undefined,
      });
      alertController.alertSuccessToggle("تمت الإضافة بنجاح!");
      setNewChapterName("");
    } catch (error) {
      console.log(error);
      alertController.alertErrorToggle(`خطأ في الإضافة!`);
      setChapters(oldList);
    }
    setIsCreating(false);
  };

  const handleUpdate = async (oldObject, data) => {
    const index = chapters.indexOf(oldObject.id);
    const newItem = { ...oldObject, name: data };
    setChapters(
      chapters.map((item) => (item.id == oldObject.id ? newItem : item))
    );
    try {
      const response = await updateChapterMutation.mutateAsync(oldObject.id, {
        ...newItem,
        id: undefined,
      });
      alertController.alertSuccessToggle("تم التعديل بنجاح!");
    } catch (error) {
      console.log(error);
      alertController.alertErrorToggle(`خطأ في التعديل!`);
      setChapters(
        chapters.map((item) => (item.id == oldObject.id ? oldObject : item))
      );
    }
  };

  const handleDelete = async (objectID) => {
    const oldList = chapters;
    setChapters(chapters.filter((item) => item.id != objectID));
    try {
      const response = await deleteChapterMutation.mutateAsync(objectID);
      alertController.alertSuccessToggle("تم الحذف بنجاح!");
    } catch (error) {
      console.log(error);
      alertController.alertErrorToggle(`خطأ في الحذف!`);
      setChapters(oldList);
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

  const [modules, setModules] = useState([]);
  const getModulesQuery = useGetResources("countries/1/modules");
  const [newChapterModule, setNewChapterModule] = useState({});

  useEffect(() => {
    if (getModulesQuery.data) {
      console.log("modules : ", getModulesQuery.data.data.data);
      setModules(getModulesQuery.data.data.data);
    }
  }, [getModulesQuery.isSuccess]);

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
        <h2 className="text-xl font-bold text-center my-4">جدول الوحدات</h2>

        {getChaptersQuery.isPending && false ? (
          <CircularProgress />
        ) : (
          <PaginatedTable
            headers={chaptersPaginatedHeaders}
            data={[
              ...chapters.map((chapter) => {
                return [
                  chapter.id,
                  chapter.title,
                  // initialModulesList[chapter.module_id - 1].name,
                  <>
                    <Button onClick={() => handleUpdateClick(chapter)}>
                      <span className="text-success-500">تعديل</span>
                    </Button>
                    <Button
                      onClick={() => handleDeleteClick(chapter)}
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
          <h2 className="text-xl font-bold text-center my-4">إضافة وحدة</h2>
          <div className="flex flex-col items-center mb-4">
            <input
              type="text"
              value={newChapterName}
              onChange={(e) => setNewChapterName(e.target.value)}
              placeholder="اسم الوحدة"
              className="border rounded px-2 py-1 mx-2 mb-2"
            />
            <SingleFormInputContainer error={null}>
              <div className="mb-3 flex items-center gap-1 ">
                <label className={`${labelBaseStyle}`}>المادة:</label>
                {getModulesQuery.isPending && false ? (
                  <CircularProgress />
                ) : (
                  <SelectDropdown
                    title="المادة"
                    list={modules}
                    stateChanger={setNewChapterModule}
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
              label="اسم الوحدة"
              buttonLabel="تعديل"
            />
          </div>
        </PopupLayout>
      ) : null}
      {deletePopupOpen ? (
        <PopupLayout>
          <div className="w-9/12  md:w-5/12 z-10 bg-gray-50 p-4 relative py-5">
            <ClosePopupButton setOpen={setDeletePopupOpen} />
            <DeleteObjectPopup
              callback={handleDelete}
              objectId={currentObject.id}
              setOpen={setDeletePopupOpen}
              title="تأكيد حذف الوحدة"
            />
          </div>
        </PopupLayout>
      ) : null}
    </>
  );
}

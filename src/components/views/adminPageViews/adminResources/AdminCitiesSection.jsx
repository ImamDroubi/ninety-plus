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

const initialCities = [
  { id: 1, name: "طولكرم" },
  { id: 2, name: "جنين" },
];

const citiesPaginatedHeaders = ["الرقم", "الاسم", "الإجراءات"];

export default function AdminCitiesSection() {
  const [cities, setCities] = useState([]);
  const [updatePopupOpen, setUpdatePopupOpen] = useState(false);
  const [deletePopupOpen, setDeletePopupOpen] = useState(false);

  const getCitiesQuery = useGetResources("cities");
  const createCityMutation = useCreateResource("cities");
  const updateCityMutation = useUpdateResource("cities");
  const deleteCityMutation = useDeleteResource("cities");

  const alertController = useAlert();

  const [newCityName, setNewCityName] = useState("");
  const [currentObject, setCurrentObject] = useState();
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    if (getCitiesQuery.data) {
      console.log("cities : ", getCitiesQuery.data.data.data);
      setCities(getCitiesQuery.data.data.data);
    }
  }, [getCitiesQuery.isSuccess]);

  const handleCreate = async () => {
    if (!newCityName || newCityName == "") return;
    const index = cities.length + 1;
    const newItem = {
      id: index,
      name: newCityName,
    };
    setIsCreating(true);
    const oldList = cities;
    setCities([...cities, newItem]);
    try {
      const response = await createCityMutation.mutateAsync({
        ...newItem,
        id: undefined,
      });
      alertController.alertSuccessToggle("تمت الإضافة بنجاح!");
      setNewCityName("");
    } catch (error) {
      console.log(error);
      alertController.alertErrorToggle(`خطأ في الإضافة!`);
      setCities(oldList);
    }
    setIsCreating(false);
  };

  const handleUpdate = async (oldObject, data) => {
    const index = cities.indexOf(oldObject.id);
    const newItem = { ...oldObject, name: data };
    setCities(cities.map((item) => (item.id == oldObject.id ? newItem : item)));
    try {
      const response = await updateCityMutation.mutateAsync(oldObject.id, {
        ...newItem,
        id: undefined,
      });
      alertController.alertSuccessToggle("تم التعديل بنجاح!");
    } catch (error) {
      console.log(error);
      alertController.alertErrorToggle(`خطأ في التعديل!`);
      setCities(
        cities.map((item) => (item.id == oldObject.id ? oldObject : item))
      );
    }
  };

  const handleDelete = async (objectID) => {
    const oldList = cities;
    setCities(cities.filter((item) => item.id != objectID));
    try {
      const response = await deleteCityMutation.mutateAsync(objectID);
      alertController.alertSuccessToggle("تم الحذف بنجاح!");
    } catch (error) {
      console.log(error);
      alertController.alertErrorToggle(`خطأ في الحذف!`);
      setCities(oldList);
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
        <h2 className="text-xl font-bold text-center my-4">جدول المدن</h2>

        {getCitiesQuery.isPending && false ? (
          <CircularProgress />
        ) : (
          <PaginatedTable
            headers={citiesPaginatedHeaders}
            data={[
              ...cities.map((city) => {
                return [
                  city.id,
                  city.name,
                  <>
                    <Button onClick={() => handleUpdateClick(city)}>
                      <span className="text-success-500">تعديل</span>
                    </Button>
                    <Button
                      onClick={() => handleDeleteClick(city)}
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
          <h2 className="text-xl font-bold text-center my-4">إضافة مدينة</h2>
          <div className="flex flex-col items-center mb-4">
            <input
              type="text"
              value={newCityName}
              onChange={(e) => setNewCityName(e.target.value)}
              placeholder="اسم المدينة"
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
              label="اسم المدينة"
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
              title="تأكيد حذف المدينة"
            />
          </div>
        </PopupLayout>
      ) : null}
    </>
  );
}

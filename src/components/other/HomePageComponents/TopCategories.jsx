import Container90 from "../../containers/Container90";
import LabelWithIcon from "../LabelWithIcon";
import { categoriesList } from "../../data/categoriesList";
import { BookIcon } from "../../icons/icons";
export default function TopCategories() {
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7];
  const styles = ["primary", "secondary", "error", "success"];
  return (
    <div className="w-full py-6 bg-gray-50">
      <Container90>
        <div className="content w-full flex flex-col items-center">
          <h2 className="text-gray-900 font-semibold text-3xl my-5">
            التصنيفات الأكثر شهرة
          </h2>
          <div className="w-full justify-center  grid grid-cols-4 gap-3">
            {categoriesList.map((category, key) => {
              return (
                <div className="col-span-1 flex items-center justify-center" key={category.id}>
                  <LabelWithIcon
                    icon={category.icon || <BookIcon />}
                    label={category.name}
                    description={`${category.frequency} دورة`}
                    style={styles[key < 4 ? key : 7 - key]}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </Container90>
    </div>
  );
}

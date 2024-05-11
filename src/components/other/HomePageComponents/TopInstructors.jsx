import CourseCard from "../../cards/CourseCard";
import TeacherCard from "../../cards/TeacherCard";
import Container90 from "../../containers/Container90";

export default function TopInstructors() {
  const numbers = [0, 1, 2, 3];

  return (
    <div className="w-full py-5 bg-gray-50">
      <Container90>
        <div className="content w-full flex flex-col items-center">
          <h2 className="text-gray-900 font-semibold text-3xl my-5">
            الأساتذة الأكثر شهرة
          </h2>
          <div className="w-full justify-center  grid grid-cols-4 gap-3">
            {numbers.map((teacher, id) => {
              return (
                <div className="col-span-1 flex items-center justify-center" key={id}>
                  <TeacherCard />
                </div>
              );
            })}
          </div>
        </div>
      </Container90>
    </div>
  );
}

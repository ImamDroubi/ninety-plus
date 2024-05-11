import CourseCard from "../../cards/CourseCard";
import Container90 from "../../containers/Container90";

export default function TopSellingCourses() {
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7];

  return (
    <div className="w-full py-5">
      <Container90>
        <div className="content w-full flex flex-col items-center">
          <h2 className="text-gray-900 font-semibold text-3xl  my-5">
            الدورات الأكثر مبيعاً
          </h2>
          <div className="w-full justify-center grid grid-cols-4 gap-3 ">
            {numbers.map((course, id) => {
              return (
                <div className="col-span-1 flex items-center justify-center" key={id}>
                  <CourseCard />
                </div>
              );
            })}
          </div>
        </div>
      </Container90>
    </div>
  );
}

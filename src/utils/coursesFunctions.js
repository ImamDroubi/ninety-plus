// courses is an object with 3 arrays: draft, active and over
export const combineCourses = (courses) => {
  let returnArray = [];
  if (courses.draft) returnArray = [...returnArray, ...courses.draft];
  if (courses.active) returnArray = [...returnArray, ...courses.active];
  if (courses.over) returnArray = [...returnArray, ...courses.over];
  return returnArray;
};

export const countCourses = (courses) => {
  const count =
    (courses.draft?.length || 0) +
    (courses.active?.length || 0) +
    (courses.over?.length || 0);
  return count;
};

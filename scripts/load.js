import { LoadAllCourses, LoadCourseDetails } from "./courses.js";

const kursListaElementID = "kurslista";

document.getElementById(kursListaElementID).addEventListener('click', async e => {
  const link = e.target.closest("a");
  if (!link) return;

  e.preventDefault();

  const courseId = link.dataset.courseId;
  await LoadCourseDetails(courseId);
})

await LoadAllCourses();

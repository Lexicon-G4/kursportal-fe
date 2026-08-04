import { LoadAllCourses, LoadCourseDetails } from "./courses.js";

const kursListaElementID = "kurslista";

document.getElementById(kursListaElementID).addEventListener('click', async e => {
  const link = e.target.closest("a");
  if (!link) return;

  e.preventDefault();

  const courseId = link.dataset.courseId;
  document.querySelectorAll(`#${kursListaElementID} a.active`)
    .forEach(activeLink => activeLink.classList.remove("active"));
  link.classList.add("active");
  await LoadCourseDetails(courseId);
})

await LoadAllCourses();

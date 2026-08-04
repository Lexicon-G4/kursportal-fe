import { ServerGet } from "./api.js";

const basePath = "courses";
const listElementID = "kurslista";
const detailsElementID = "kursfält";

export async function FetchAllCourses() {
  try {
    return ServerGet(`${basePath}`);
  } catch (error) {
    console.error("Failed to fetch courses:", error);
    return [];
  }
}

export async function FetchCourse(id) {
  try {
    return ServerGet(`${basePath}/${id}`);
  } catch (error) {
    console.error(`Failed to fetch course ${id}:`, error);
    return null;
  }
}

export async function LoadAllCourses() {
  const listElement = document.querySelector(`#${listElementID}`);
  const courses = await FetchAllCourses();

  if (!courses) return;

  listElement.replaceChildren();

  courses.forEach((course) => {
    const linkNode = document.createElement("a");
    linkNode.classList.add("nav-link");
    linkNode.href ="#";
    linkNode.dataset.courseId = course.id;
    linkNode.innerText = course.title;

    const listNode = document.createElement("li");
    listNode.appendChild(linkNode);
    listNode.classList.add("nav-item");
    listElement.appendChild(listNode);
  });
}

export async function LoadCourseDetails(id) {
  const detailsElement = document.querySelector(`#${detailsElementID}`);
  const courseData = await FetchCourse(id);

  if (!courseData) return;

  detailsElement.replaceChildren();

  const teBadges = courseData.techniques
    .map((te) => `<div class="techiquesbadge">${te}</div>`)
    .reduce((line, elem) => (line += elem), "");
  const taBadges = courseData.tags
    .map((ta) => `<div class="tagsbadge">${ta}</div>`)
    .reduce((line, elem) => (line += elem), "");
  const teacherCards = courseData.teachers
    .map(
      (te) =>
        `<div class="teachercard" data-teacherId="${te.id}">
      <div>${te.name}</div>
      <div>${te.email}</div>
    </div>`,
    )
    .reduce((line, elem) => (line += elem), "");

  detailsElement.innerHTML = `<div id="kursdetaljer">
    <h2 class="kurstitel">${courseData.title}</h2>
    <div class="kursbeskrivning">
      <p>${courseData.description}</p>
    </div>
    <div class="courselength">Kurslängd: ${courseData.length}</div>
    <div class="courseteachers">
      <h3>Lärare</h3>
      <div class="teachercards">${teacherCards}</div>
    </div>
    <div class="coursetechniques">
      <h3>Tekniker</h3>
      <div class="techiguebadges">${teBadges}</div>
    <div>
    <div class="coursetags">
      <h3>Tags</h3>
      <div class="tagbadges">${taBadges}</div>
    </div>
  </div>`;
}

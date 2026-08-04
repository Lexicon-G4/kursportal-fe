import { ServerGet } from "./api";

const basePath = "kurser";
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

export function LoadAllCourses() {
  const listElement = document.querySelector(`#${listElementID}`);
  const courses = await FetchAllCourses();

  if (!courses) return;

  listElement.replaceChildren();

  courses.array.forEach(course => {
    const linkNode = document.createElement("a");
    linkNode.href ="#";
    linkNode.dataset["course-id"] = course.id;
    linkNode.innerText = course.title;

    const listNode = document.createElement("li");
    listNode.appendChild(listNode);
  });
}

export function LoadCourseDetails(id) {
  const detailsElement = document.querySelector(`#${detailsElementID}`);
  const courseData = FetchCourse(id);

  if (!courseData) return;

  detailsElement.replaceChildren();

  detailsElement.innerHTML = `<div id="kursdetaljer">
    <h2 class="kurstitel">${course.title}</h2>
    <div class="kursbeskrivning">
      <p>${course.desription}</p>
    </div>
    <div class="kurslärare">${course.teacher}</div>
    <div class="kurstekniker"></div>
    <div class="kurstaggar"></div>
  </div>`
}

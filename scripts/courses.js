import { ServerGet } from "./api.js";

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

export async function LoadAllCourses() {
  const listElement = document.querySelector(`#${listElementID}`);
  const courses = await FetchAllCourses();

  if (!courses) return;

  listElement.replaceChildren();

  courses.forEach(course => {
    const linkNode = document.createElement("a");
    linkNode.href ="#";
    linkNode.dataset.courseId = course.id;
    linkNode.innerText = course.titel;

    const listNode = document.createElement("li");
    listNode.appendChild(linkNode);
    listElement.appendChild(linkNode);
  });
}

export async function LoadCourseDetails(id) {
  const detailsElement = document.querySelector(`#${detailsElementID}`);
  const courseData = await FetchCourse(id);

  if (!courseData) return;

  detailsElement.replaceChildren();
  console.log(courseData);

  detailsElement.innerHTML = `<div id="kursdetaljer">
    <h2 class="kurstitel">${courseData.titel}</h2>
    <div class="kursbeskrivning">
      <p>${courseData.beskrivning}</p>
    </div>
    <div class="kurslärare">${courseData.lärare}</div>
    <div class="kurstekniker"></div>
    <div class="kurstaggar"></div>
  </div>`
}

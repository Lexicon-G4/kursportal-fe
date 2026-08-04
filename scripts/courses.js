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

  courses.forEach(course => {
    const linkNode = document.createElement("a");
    linkNode.href ="#";
    linkNode.dataset.courseId = course.id;
    linkNode.innerText = course.title;

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

  const teBadges = courseData.techniques.map(te => `<div class="teknikbadge">${te}</div>`).reduce((line, elem) => line += elem, "");
  const taBadges = courseData.tags.map(ta => `<div class="teknikbadge">${ta}</div>`).reduce((line, elem) => line += elem, "");

  detailsElement.innerHTML = `<div id="kursdetaljer">
    <h2 class="kurstitel">${courseData.titel}</h2>
    <div class="kursbeskrivning">
      <p>${courseData.description}</p>
    </div>
    <div class="kurslängd">${courseData.length}</div>
    <div class="kurslärare">${courseData.teachers[0].name}</div>
    <div class="kurstekniker">${teBadges}</div>
    <div class="kurstaggar">${taBadges}</div>
  </div>`
}

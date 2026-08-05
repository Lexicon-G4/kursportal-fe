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


  detailsElement.innerHTML = `
    <div class="row justify-content-center">
      <div class="col-12 col-lg-11 col-xl-10">
        <section id="kursdetaljer" class="py-2">
  
          <div class="mb-4">
            <h2 class="h4 mb-3">
              ${courseData.title}
            </h2>
  
            <p class="mb-0">
              ${courseData.description}
            </p>
          </div>
  
          <hr class="my-4 border-white opacity-100">
  
          <div class="mb-4">
            <h3 class="h6 text-uppercase fw-bold mb-2">Kurslängd</h3>
            <p class="">${courseData.length}</p>
          </div>
  
          <div class="mb-4">
            <h3 class="h6 text-uppercase fw-bold mb-3">Lärare</h3>
            <div class="row g-3">
              ${teacherCards}
            </div>
          </div>
  
          <div class="mb-4">
            <h3 class="h6 text-uppercase fw-bold mb-3">Tekniker</h3>
            <div class="d-flex flex-wrap gap-2">
              ${teBadges}
            </div>
          </div>
  
          <div>
            <h3 class="h6 text-uppercase fw-bold mb-3">Taggar</h3>
            <div class="d-flex flex-wrap gap-2">
              ${taBadges}
            </div>
          </div>
  
        </section>
      </div>
    </div>
  `;
}

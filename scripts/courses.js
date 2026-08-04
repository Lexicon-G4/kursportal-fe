import { ServerGet } from "./api";

const basePath = "kurser";

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
    return [];
  }
}

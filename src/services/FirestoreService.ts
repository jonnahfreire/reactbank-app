// import { CourseData } from '../contexts/CourseContext';

const baseUrl = "https://decola-app-api.herokuapp.com";

export async function getCoursesCollection() : Promise<void> {
    const response = await fetch(`${baseUrl}/courses`);

    const courses = await response.json();
    return courses;
}

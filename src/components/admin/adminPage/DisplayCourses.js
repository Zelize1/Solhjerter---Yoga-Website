import { useState, useEffect } from "react";
import { baseUrl } from "../../../settings/constants/api";
import { Link } from "react-router-dom";

function DisplayCourses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const coursesUrl = baseUrl + "/courses";

    useEffect(function () {
        async function fetchCourses() {
            try {
                const response = await fetch(coursesUrl);

                if(response.ok) {
                    const json = await response.json();
                    setCourses(json);
                } else {
                    setError("Can't log courses");
                }
            } catch(error) {
                setError(error.toString());
            } finally {
                setLoading(false);
            }
        }
        fetchCourses();
    }, );

    if(loading) {
        return <div>Laster inn...</div>;
    }

    if (error) {
        return <div>Kunne ikke laste inn</div>;
    }

    return (
        <>
            {courses.map(function (course) {
                return (
            <div className="display-posts">
                <ul>
                    <li key={course.id}>
                        <Link to = {`/admin/admin-page/edit-course/${course.id}`}>{course.Title}</Link>
                    </li>
                </ul>
            </div>
            )})}
        </>
    )
}

export default DisplayCourses;
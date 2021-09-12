import { baseUrl } from "../../settings/constants/api";
import { useState, useEffect } from "react";

export default function SignupOptions() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const coursesUrl = baseUrl + "/courses";

    useEffect(function () {
        async function fetchCourses() {
            try {
                const response = await fetch(coursesUrl);

                if (response.ok) {
                    const json = await response.json();
                    setCourses(json);
                } else {
                    setError("Can't load courses");
                }
            } catch (error) {
                setError(error.toString());
            } finally {
                setLoading(false);
            }
        }
        fetchCourses();

    }, );

    if (loading) {
        return <div>Laster inn...</div>;
    }

    if (error) {
        return <div>Kunne ikke laste innhold...</div>
    }

    return (
        <>
            {courses.map(function (course) {
                return <>
                
        <option value="Kurs 1" placeholder="Velg kurs..." className="form-control">{course.Title}</option>

           </>     
                })}
        </>
    )
}

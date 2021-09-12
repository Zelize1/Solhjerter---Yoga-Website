import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row";
import { baseUrl } from "../../settings/constants/api";
import { useState, useEffect } from "react";
import Heading from "../layout/Heading";

export default function Courses() {
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
        return <div className="loading-div">Laster inn...</div>;
    }

    if (error) {
        return <div className="loading-div">Kunne ikke laste innhold...</div>
    }



    return (
        <>

        <Heading title="Kurs"/>
        
            <Container className="card-container">
            <Row>
            {courses.map(function (course) {
                return <>
            
            <Card className="course-card">
                    <Card.Body className="course-card-body">
                        <Card.Title>{course.Title}</Card.Title>
                        <Card.Text>
                            {course.Description}
                        </Card.Text>
                        <a href="/signup"><button className="button" id="course-button">Meld deg på nå!</button></a>
                    </Card.Body>
                    </Card>


                
                </>
                })}
                </Row>
            </Container>
        
        </>
    )
}

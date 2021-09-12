import Heading from "../../layout/Heading";
import DisplayPosts from "./DisplayPosts";
import DisplayCourses from"./DisplayCourses";

export default function UpdateContent() {
    return(
        <>
        <Heading title="Oppdater blogginnlegg" />
        <DisplayPosts />
        <Heading title="Oppdater kurs" />
        <DisplayCourses />
        </>
    )
}
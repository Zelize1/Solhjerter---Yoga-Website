import Heading from "../../../layout/Heading";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useAxios from "../../../../hooks/useAxios";
import CoursesDeleteButton from "./CoursesDeleteButton";

const schema = yup.object().shape({
    Title: yup.string(),
    Description: yup.string(),
});

export default function EditCourse() {
    const [course, setCourse] = useState(null);
    const [updated, setUpdated] = useState(false);
    const [fetchingCourse, setFetchingCourse] = useState(true);
    const [updatingCourse, setUpdatingCourse] = useState(false);
    const [fetchError, setFetchError] = useState(null);
    const [updateError, setUpdateError] = useState(null)

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const http = useAxios();

    let { id } = useParams();

    const url = `/courses/${id}`;

    useEffect(
        function () {
            async function getCourse() {
                try {
                    const response = await http.get(url);
                    console.log("response", response.data);
                    setCourse(response.data);
                } catch (error) {
                    console.log(error);
                    setFetchError(error.toString());
                } finally {
                    setFetchingCourse(false);
                }
            }

            getCourse();
        },
    );

    async function onSubmit(data) {
        setUpdatingCourse(true);
        setUpdateError(null);
        setUpdated(false);

        console.log(data);

        try {
            const response = await http.put(url, data);
            console.log("response", response.data);
            setUpdated(true);
        } catch (error) {
            console.log("error", error);
            setUpdateError(error.toString());
        } finally {
            setUpdatingCourse(false);
        }
    }

    if (fetchingCourse) return <div>Laster inn innlegg...</div>

    if (fetchError) return <div>Kunne ikke laste inn innlegg</div>

    return (
        <>
        <Heading title="Rediger innlegg" />

        <form onSubmit={handleSubmit(onSubmit)} className="form-row">
                {updateError && <span>{updateError}</span>}
                {updated && <span>Kurs oppdatert!</span>}
            <input type="text" placeholder="Tittel" defaultValue={course.Title} className="form-control" {...register("Title", {required: true, min: 5, maxLength: 30})} />
            {errors.Title && <span>Legg til en tittel</span>}
            <textarea type="text" placeholder="Innhold" defaultValue={course.Description} className="form-control" {...register("Body", { min: 30, maxLength: 300})} />
            {errors.Body && <span>Legg til tekst</span>}


            <button variant="primary" type="submit" className="button" size="lg" block id="edit-button">
            {updatingCourse ? "Sender inn..." : "Send inn"}
            </button>
            <CoursesDeleteButton id={course.id} />
            </form>
        </>
    )
}
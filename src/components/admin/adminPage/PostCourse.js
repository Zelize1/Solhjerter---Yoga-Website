import Heading from "../../layout/Heading";
import { useForm } from 'react-hook-form';
import { useState } from "react";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useAxios from "../../../hooks/useAxios";

const schema = yup.object().shape({
    Title: yup.string(),
    Description: yup.string(),
    id: yup.number(),
});



export default function PostCourse() {

    const [submitting, setSubmitting] = useState(false);
    const [serverError, setServerError] = useState(null);

    const history = useHistory();
    const http = useAxios();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
   
    async function onSubmit(data) {
        setSubmitting(true);
        setServerError(null);

        data.status = "published";

        console.log(data);

        try {
            const response = await http.post("/courses", data);
            console.log("response", response.data);
            history.push("/courses");

        } catch (error) {
            console.log("error", error);
            setServerError(error.tostring());
        } finally {
            setSubmitting(false);
        }   
    }

    return (
        <>
            <Heading title="Legg til kurs" />

            <form onSubmit={handleSubmit(onSubmit)} className="form-row">
                {serverError && <span>{serverError}</span>}
            <input type="text" placeholder="Tittel" className="form-control" {...register("Title", {required: true, min: 5, maxLength: 30})} />
            {errors.Title && <span>Legg til en tittel</span>}
            <textarea type="text" placeholder="Innhold" className="form-control" {...register("Description", { min: 30, maxLength: 300})} />
            {errors.Body && <span>Legg til tekst</span>}


            <button type="submit" className="button" size="lg" block>
            {submitting ? "Sender inn..." : "Send inn"}
            </button>
            </form>
        </>
    );
}
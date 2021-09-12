import Heading from "../../../layout/Heading";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useAxios from "../../../../hooks/useAxios";
import PostsDeleteButton from "./PostsDeleteButton";

const schema = yup.object().shape({
    Title: yup.string(),
    Body: yup.string(),
    Posted: yup.date(),
});

export default function EditPost() {
    const [post, setPost] = useState(null);
    const [updated, setUpdated] = useState(false);
    const [fetchingPost, setFetchingPost] = useState(true);
    const [updatingPost, setUpdatingPost] = useState(false);
    const [fetchError, setFetchError] = useState(null);
    const [updateError, setUpdateError] = useState(null)

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const http = useAxios();

    let { id } = useParams();

    const url = `/blog-posts/${id}`;

    useEffect(
        function () {
            async function getPost() {
                try {
                    const response = await http.get(url);
                    console.log("response", response.data);
                    setPost(response.data);
                } catch (error) {
                    console.log(error);
                    setFetchError(error.toString());
                } finally {
                    setFetchingPost(false);
                }
            }

            getPost();
        },
    );

    async function onSubmit(data) {
        setUpdatingPost(true);
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
            setUpdatingPost(false);
        }
    }

    if (fetchingPost) return <div>Laster inn innlegg...</div>

    if (fetchError) return <div>Kunne ikke laste inn innlegg</div>

    return (
        <>
        <Heading title="Rediger innlegg" />

        <form onSubmit={handleSubmit(onSubmit)} className="form-row">
                {updateError && <span>{updateError}</span>}
                {updated && <span>Post oppdatert!</span>}
            <input type="text" placeholder="Tittel" defaultValue={post.Title} className="form-control" {...register("Title", {required: true, min: 5, maxLength: 30})} />
            {errors.Title && <span>Legg til en tittel</span>}
            <textarea type="text" placeholder="Innhold" defaultValue={post.Body} className="form-control" {...register("Body", { min: 30, maxLength: 300})} />
            {errors.Body && <span>Legg til tekst</span>}
            <input type="date" placeholder="Dato" defaultValue={post.Posted} className="form-control" {...register("Posted", {required: true})}/>


            <button variant="primary" type="submit" className="button" size="lg" block id="edit-button">
            {updatingPost ? "Sender inn..." : "Send inn"}
            </button>
            <PostsDeleteButton id={post.id} />
            </form>
        </>
    )
}
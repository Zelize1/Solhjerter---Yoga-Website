import { useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import useAxios from "../../../../hooks/useAxios";

export default function PostsDeleteButton ({ id }) {
    const [error, setError] = useState(null);

    const http = useAxios();
    const history = useHistory();

    const url = `/blog-posts/${id}`;

    async function handleDelete() {
        const confirmDelete = window.confirm("Bekreft sletting");

        if(confirmDelete){
            try {
                await http.delete(url);
                history.push("/update-content");
            } catch (error) {
                setError(error);
            } 
        }  
    }

    return (
        <button type="button" className="button" id="delete-button" onClick={handleDelete}>
            {error ? "Noe gikk galt" : "SLETT"}
        </button>
    );
}

PostsDeleteButton.propTypes = {
    id: PropTypes.number.isRequired,
};
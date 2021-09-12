import { useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import useAxios from "../../../../hooks/useAxios";

export default function CoursesDeleteButton ({ id }) {
    const [error, setError] = useState(null);

    const http = useAxios();
    const history = useHistory();

    const url = `/courses/${id}`;

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

CoursesDeleteButton.propTypes = {
    id: PropTypes.number.isRequired,
};
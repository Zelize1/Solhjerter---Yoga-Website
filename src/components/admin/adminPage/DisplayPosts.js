import { useState, useEffect } from "react";
import { baseUrl } from "../../../settings/constants/api";
import { Link } from "react-router-dom";

function DisplayPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const postsUrl = baseUrl + "/blog-posts";

    useEffect(function () {
        async function fetchPosts() {
            try {
                const response = await fetch(postsUrl);

                if(response.ok) {
                    const json = await response.json();
                    setPosts(json);
                } else {
                    setError("Can't log blog post");
                }
            } catch(error) {
                setError(error.toString());
            } finally {
                setLoading(false);
            }
        }
        fetchPosts();
    }, );

    if(loading) {
        return <div>Laster inn...</div>;
    }

    if (error) {
        return <div>Kunne ikke laste inn</div>;
    }

    return (
        <>
            {posts.map(function (post) {
                return (
            <div className="display-posts">
                <ul>
                    <li key={post.id}>
                        <Link to = {`/admin/admin-page/edit-post/${post.id}`}>{post.Title}</Link>
                    </li>
                </ul>
            </div>
            )})}
        </>
    )
}

export default DisplayPosts;
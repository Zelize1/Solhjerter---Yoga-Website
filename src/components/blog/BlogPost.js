import { useState, useEffect } from "react";
import { baseUrl } from "../../settings/constants/api";
import Card from 'react-bootstrap/Card';

function BlogPost() {
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
        return <div className="loading-div">Laster inn...</div>;
    }

    if (error) {
        return <div className="loading-div">Kunne ikke laste inn</div>;
    }

    return (
        <>
            {posts.map(function (post) {
                return (

                <Card className="blog-card">
                    <Card.Body className="blog-card-body">
                        <Card.Title>{post.Title}</Card.Title>
                        <Card.Text>{post.Body}</Card.Text>
                    </Card.Body>
                <Card.Footer className="text-muted">
                    {post.Posted}
                    </Card.Footer>
                </Card>

            )})}
        </>
    )
}

export default BlogPost;
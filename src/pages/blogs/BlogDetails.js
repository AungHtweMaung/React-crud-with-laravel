import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { API_BASE_URL } from '../../config';
import Loader from '../../components/Loader';
import Breadcrumb from '../../components/Breadcrumb';

export default function BlogDetails() {
  let { id } = useParams();
  let navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let url = `${API_BASE_URL}/blogs/${id}`;

  useEffect(() => {
    const fetchBlogDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        let response = await fetch(url);
        if (response.status === 404) {
          navigate('/404');
          return;
        }
        if (!response.ok) {
          throw new Error('Failed to fetch blog details');
        }
        let data = await response.json();
        setBlog(data.data);
      } catch (error) {
        console.error("Error fetching blog details:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetails();
  }, [url, navigate]);


  return (
    <div>
      {loading && <Loader />}
      {error && <div className="alert alert-danger">{error}</div>}
      {blog && <>
        <Breadcrumb items={[
          { label: 'Home', path: '/' },
          { label: 'Blogs', path: '/blogs' },
          { label: 'Details' },
        ]} />
        <h1>{blog.title}</h1>
        <p>{blog.description}</p>
      </>}
    </div>
  )
}

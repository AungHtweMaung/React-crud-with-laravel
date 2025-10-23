import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { API_BASE_URL } from '../../config';
import Loader from '../../components/Loader';
import Breadcrumb from '../../components/Breadcrumb';

export default function BlogDetails() {
  let {id} = useParams();
  let [blog, setBlog] = useState(null);
  let [loading, setLoading] = useState(false);
  let [errors, setErrors] = useState({});

  let navigate = useNavigate();
  let url = `${API_BASE_URL}/blogs/${id}`;

  useEffect (() => {
    async function fetchBlog() {
      // setErrors({});
      setLoading(true);
      try {
        let response = await fetch(url)
        if (!response.ok) {
          throw new Error('Failed to fetch blog');
        } else if (response.status === 404) {
          navigate('/404');
        }

        let data = await response.json();
        if (data) {
          setBlog(data.data);
          // console.log(data.data);
          setLoading(false);
          setErrors({});
        }
      } catch (error) {
        console.error('Error fetching blog:', error);
        setErrors({ fetch: 'Failed to fetch blog details' });
      } finally {
        setLoading(false);
      }
    }

    fetchBlog();
  }, [url, navigate]);

  return (
    <div>
      
        <Breadcrumb items={[
          { label: 'Home', path: '/' },
          { label: 'Blogs', path: '/blogs' },
          { label: 'Details' },
        ]} />
        
        {loading && <Loader />}
        { errors.fetch && <h2 className='text-danger'>{ errors.fetch }</h2> }
        {!errors.fetch && !loading && blog && <div>
          <h2>{blog.title}</h2>  
          <p>{blog.description}</p>
        </div>}
      
    </div>
  )
}

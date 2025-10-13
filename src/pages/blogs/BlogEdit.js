import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_BASE_URL } from '../../config';
import Loader from '../../components/Loader';

export default function BlogEdit() {
  const param = useParams();
  let navigate = useNavigate();
  let [blog, setBlog] = useState(null);
  let [loading, setLoading] = useState(false);
  let [submitting, setSubmitting] = useState(false);
  let [errors, setErrors] = useState({});


  let url = `${API_BASE_URL}/blogs/${param.id}`;

  useEffect(() => {
    const fetchBlogDetails = async () => {
      setLoading(true);
      setErrors({});
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
        if (data && data.data) {
          setBlog(data.data);
        } else {
          setBlog({});
        }
        console.log(data.data);
      } catch (error) {
        console.error("Error fetching blog details:", error);
        setErrors({ fetch: error.message });
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetails();
  }, [url, navigate]);


  let [formData, setFormData] = useState({
    title: '',
    description: ''
  })

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title || '',
        description: blog.description || ''
      });
    }
  }, [blog]);

  let handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  let handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors({});
    try {
      let response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to update blog');
      }
      let data = await response.json();
      toast.success('Blog updated successfully!');
      navigate('/blogs');

    } catch (error) {
      console.error('Error updating blog:', error);
      toast.error('Error updating blog');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      {loading && <Loader />}

      {!loading && <>
        <h1>Edit Blog</h1>
        <p>This is editing for blog id : {param.id} </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group my-3">
            <label htmlFor="title">Title</label>
            <input
              className="form-control"
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleChange}
            />
            {errors.title && <div className="text-danger">{errors.title}</div>}
          </div>
          <div className="form-group my-3">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              rows={7}
              className="form-control"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
            {errors.description && <div className="text-danger">{errors.description}</div>}
          </div>
          {errors.submit && <div className="text-danger">{errors.submit}</div>}
          <div className="d-flex justify-content-end gap-2">
            <button className="btn btn-dark" type="button" onClick={() => navigate('/blogs')}>Back</button>
            <button className="btn btn-primary" type="submit" disabled={loading || submitting}>
              {submitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </>}
    </div>
  )
}

import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { toast } from 'react-toastify';
import { API_BASE_URL } from '../../config';
import Loader from '../../components/Loader';


export default function BlogEdit() {
  let { id } = useParams();
  let navigate = useNavigate();
  let [blog, setBlog] = useState(null);
  let [submitting, setSubmitting] = useState(false);

  let url = `${API_BASE_URL}/blogs/${id}`;
  let { data, loading, error } = useFetch(url);

  let [formData, setFormData] = useState({
    title: '',
    description: ''
  })

  useEffect(() => {
    if (data) {
      setFormData({
        title: data.data.title ?? '',
        description: data.data.description ?? ''
      })
    }
  }, [data]);


  let handleChange = (e) => {
    setFormData({...formData, 
      [e.target.name]: e.target.value}
    )
  }

  let handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      let response = await fetch(url, {
        method: 'PUT',
        headers: {
          "Content-Type": "Application/json",
          "Accept": "Application/json"
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error('Failed to Update');
      } 

      let data = await response.json();
      if (data) {
        toast.success('Updated Successfully');
        navigate('/blogs')
      }
    } catch (error) {
      console.error('Failed to updated', error);
      toast.error('Failed to update');
    } finally {
      setSubmitting(false);
    }
  }






  return (
    <div>
      {loading && <Loader />}
      {!loading && <>
        <h1>Edit Blog</h1>

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
            >


            </textarea>
          </div>
          <div className="d-flex justify-content-end gap-2">
            <button className="btn btn-dark" type="button" onClick={() => navigate('/blogs')}>Back</button>
            <button className="btn btn-primary" type="submit" disabled={submitting}>
              {submitting ? "Submitting" : "Submit"}
            </button>
          </div>
        </form>
      </>}
    </div>
  )
}

import React, { useState } from "react";
import { generatePath, Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import Breadcrumb from "../../components/Breadcrumb";
import { API_BASE_URL } from "../../config";

export default function BlogCreate() {
    let navigate = useNavigate();
    let [loading, setLoading] = useState(false);
    let [errors, setErrors] = useState({});
    let [formData, setFormData] = useState({
        title: '',
        description: ''
    })

    let handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    let handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        let newErrors = {};
        if (!formData.title.trim()) newErrors.title = "Title is required";
        if (!formData.description.trim())
            newErrors.description = "Description is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setLoading(false);
            return;
        }

        try {
            let url = `${API_BASE_URL}/blogs`;
            let response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            let data = await response.json();

            if (response.ok) {
                toast.success('Created Successfully');
                navigate('/blogs');
            } else if (response.status === 422 && data.errors) {
                setErrors(data.errors);
                toast.error('Failed to create blog');
                // console.log(data.errors);
            } else {
                toast.error('Failed to create blog');
            }

        } catch (error) {
            // console.error('Failed to update: ', error);
        }
    }


    return (
        <div className="col-md-8 offset-md-2">
            <Breadcrumb items={[
                { label: 'Home', path: '/' },
                { label: 'Blogs', path: '/blogs' },
                { label: 'Create' }
            ]} />
            <div className="d-flex-row justify-content-center">
                <div className="card shadow p-4">
                    <h1 className="text-center">Create Blog</h1>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group my-3">
                            <label htmlFor="title">Title</label>
                            <input
                                className="form-control"
                                type="text"
                                name="title"
                                id="title"
                                onChange={handleChange}
                            />
                            {errors.title && <span className="text-danger">{errors.title}</span>}
                        </div>
                        <div className="form-group my-3">
                            <label htmlFor="description">Description</label>
                            <textarea
                                name="description"
                                id="description"
                                rows={7}
                                className="form-control"
                                onChange={handleChange}
                            ></textarea>
                            {errors.description && <span className="text-danger">{errors.description}</span>}

                        </div>
                        <div className="d-flex justify-content-end gap-2">
                            <Link to="/blogs"><button className="btn btn-dark" type="button">Back</button></Link>
                            <button className="btn btn-primary" type="submit" disabled={loading}>
                                {loading ? "Submitting": "Submit"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

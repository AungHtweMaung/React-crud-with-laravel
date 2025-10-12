import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import { API_BASE_URL } from "../../config";

export default function BlogCreate() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ title: '', description: '' });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // setErrors('');

        try {
            const response = await fetch(`${API_BASE_URL}/blogs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json' // Important: Laravel returns JSON validation errors
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                // Success
                navigate('/blogs', { state: { showToast: true } });
            } else if (response.status === 422 && data.errors) {
                // Validation errors
                // const errors = Object.values(data.errors).flat().join(', ');
                setErrors(data.errors);
            } else {
                // Other API errors
                setErrors(data.message || 'Something went wrong');
            }
        } catch (err) {
            // Network error
            console.error('Fetch error:', err);
            setErrors('Network error: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

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
                    {/* {error && <div className="alert alert-danger">{error}</div>} */}
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
                            {errors.title && <small className="text-danger">{errors.title[0]}</small>}
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
                            {errors.description && <small className="text-danger">{errors.description[0]}</small>}  
                        </div>
                        <div className="d-flex justify-content-end gap-2">
                            <Link to="/blogs"><button className="btn btn-dark" type="button">Back</button></Link>
                            <button className="btn btn-primary" type="submit" disabled={loading}>
                                {loading ? 'Creating...' : 'Submit'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

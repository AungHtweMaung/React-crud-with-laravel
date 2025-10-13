import React, { useState } from "react";
import { generatePath, Link, useNavigate } from "react-router-dom";
import {toast} from 'react-toastify';
import Breadcrumb from "../../components/Breadcrumb";
import { API_BASE_URL } from "../../config";

export default function BlogCreate() {
    let navigate = useNavigate();
    let [loading, setLoading] = useState(false);
    let [errors, setErrors] = useState({});
    let [generalError, setGeneralError] = useState('');
    let [showGeneralError, setShowGeneralError] = useState(false);


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
        setGeneralError('');
        setShowGeneralError(false);

        let response = await fetch(`${API_BASE_URL}/blogs`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Accept": 'application/json'
            },
            body: JSON.stringify(formData)
        });

        let data = await response.json();


        if (response.ok) {
            toast.success("Blog created successfully");
            navigate('/blogs');
        } else if (response.status === 422 && data.errors) {
            setErrors(data.errors);
            setLoading(false);
        } else {
            setGeneralError("An error occurred");
            setShowGeneralError(true);
            setLoading(false);
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
                    {showGeneralError && generalError && <div className="alert alert-warning alert-dismissible fade show" role="alert">
                        <strong>{ generalError }</strong>
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setShowGeneralError(false)}></button>
                    </div>}
                    {/* {error && <div className="alert alert-danger">{typeof error === 'string' ? error : error.message || error.error || 'An error occurred'}</div>} */}
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
                            {errors.title && <div className="text-danger">{errors.title}</div>}
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
                            {errors.description && <div className="text-danger">{errors.description}</div>}
                        </div>
                        <div className="d-flex justify-content-end gap-2">
                            <Link to="/blogs"><button className="btn btn-dark" type="button">Back</button></Link>
                            <button className="btn btn-primary" type="submit" disabled={loading}>
                                {loading ? 'Submitting...' : 'Submit'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

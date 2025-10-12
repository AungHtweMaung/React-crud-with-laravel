import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { API_BASE_URL } from '../../config';
import useFetch from '../../hooks/useFetch';
import Breadcrumb from '../../components/Breadcrumb';

export default function BlogList() {
    let url = `${API_BASE_URL}/blogs`;
    const location = useLocation();
    const [showToast, setShowToast] = useState(location.state?.showToast || false);

    let { data, loading, error } = useFetch(url);
    let blogs = data ? data.data : [];
    // console.log(blogs);

    return (
        <div>
            {showToast &&  (
                <div className="toast float-end align-items-center text-bg-success border-0 show" role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="d-flex">
                        <div className="toast-body">
                            Blog created successfully!
                        </div>
                        <button type="button" className="btn-close btn-close-white me-2 m-auto" onClick={() => setShowToast(false)} aria-label="Close"></button>
                    </div>
                </div>
            )}
            <Breadcrumb items={[
                { label: 'Home', path: '/' },
                { label: 'Blogs' }
            ]} />

            {error && <div className="alert alert-danger">{error}</div>}
            <Link to="/blogs/create"><button className='btn btn-success' >Create</button></Link>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {loading && <tr><td colSpan={4} className="text-center p-5">Loading...</td></tr>}
                    {blogs && blogs.map((blog, index) => (
                        <tr key={blog.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{blog.title}</td>
                            <td>{blog.description}</td>
                            <td className='col-2'>
                                <button className="btn btn-sm btn-primary mx-1">Edit</button>
                                <button className="btn btn-sm btn-danger mx-1">Delete</button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>

        </div>
    )
}

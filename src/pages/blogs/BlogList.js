import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { API_BASE_URL } from '../../config';
import useFetch from '../../hooks/useFetch';
import Breadcrumb from '../../components/Breadcrumb';
import Blog from './Blog';

export default function BlogList() {
    let url = `${API_BASE_URL}/blogs`;

    let { data, loading, error, refetch } = useFetch(url);
    let blogs = data ? data.data : [];
    // console.log(blogs);

    let handleDelete = () => {
        // Refetch the data to ensure consistency after deletion
        refetch();
    };

    return (
        <div>
            
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
                        <th scope="col" className='text-center'>Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {loading && <tr><td colSpan={4} className="text-center p-5">Loading...</td></tr>}
                    {blogs && blogs.map((blog, index) => (
                        <Blog key={blog.id} blog={blog} index={index} onDelete={handleDelete} />
                    ))}

                </tbody>
            </table>

        </div>
    )
}

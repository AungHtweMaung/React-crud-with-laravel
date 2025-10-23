import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { API_BASE_URL } from '../../config';
import useFetch from '../../hooks/useFetch';
import Breadcrumb from '../../components/Breadcrumb';
import Blog from './Blog';
import BlogFilter from './BlogFilter';

export default function BlogList({ searchKey }) {
    let url = searchKey ? `${API_BASE_URL}/blogs?search=${encodeURIComponent(searchKey)}` : `${API_BASE_URL}/blogs`;

    let { data, loading, error, refetch } = useFetch(url);
    let blogs = data ? data.data : [];
    // console.log(blogs);

    let refetchBlog = () => {
        refetch();
    }


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
                    {!loading && blogs && blogs.map((blog, index) => (
                        <Blog key={blog.id} blog={blog} index={index} refetchBlog={refetchBlog}/>
                    ))}
                    {!loading && blogs.length === 0 &&
                        <tr>
                            <td colSpan={4}><h3 className='text-center'>There is no blog!</h3></td>
                        </tr>
                    }

                </tbody>
            </table>

        </div>
    )
}

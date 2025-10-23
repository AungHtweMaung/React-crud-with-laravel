import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { API_BASE_URL } from '../../config';
import { toast } from 'react-toastify';

export default function Blog({ blog, index, refetchBlog }) {
    let [deleting, setDeleting] = useState(false);
    let url = `${API_BASE_URL}/blogs/${blog.id}`;

    let deleteData = async () => {
        setDeleting(true);
        if (window.confirm('Are you srue to delete?')) {
            try {
                let response = await fetch(url, {
                    method: 'DELETE'
                });

                if (!response.ok) {
                    toast.error('Fail to delete');
                    throw new Error('Failed to delete');
                }
                let data = await response.json();
                toast.success('Deleted Successfully');
                refetchBlog();

            } catch (error) {
                console.error("Fail to delete: ", error)
            } finally {
                setDeleting(false);
            }
        }
    }


    return (
        <tr key={blog.id}>
            <th scope="row">{index + 1}</th>
            <td className='col-5 text-center'>{blog.title}</td>
            <td >{blog.description}</td>
            <td className='col-2'>
                <Link to={`/blogs/${blog.id}`}>
                    <button className='btn btn-sm btn-warning'>Details</button>
                </Link>
                <Link to={`/blogs/${blog.id}/edit`}>
                    <button className="btn btn-sm btn-primary mx-1">Edit</button>
                </Link>
                <button className="btn btn-sm btn-danger mx-1" onClick={deleteData} disabled={deleting}>
                    {deleting ? 'Deleting' : 'Delete'}
                </button>
            </td>
        </tr>
    )
}

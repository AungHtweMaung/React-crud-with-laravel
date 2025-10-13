import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../../config';
import { toast } from 'react-toastify';

export default function Blog({ blog, index, onDelete }) {

    let [deleting, setDeleting] = useState(false);

    let deleteData = async () => {
        if (window.confirm("Are you sure to delete?")) {
            setDeleting(true);
            try {
                let response = await fetch(`${API_BASE_URL}/blogs/${blog.id}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error('Failed to delete blog');
                }
                let data = await response.json();
                toast.success('Blog deleted successfully!');
                onDelete(blog.id); // Call the onDelete callback to update the list
            } catch (error) {
                console.error('Error deleting blog:', error);
                toast.error('Failed to delete blog');
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
                    {deleting ? 'Deleting...' : 'Delete'}
                </button>
            </td>
        </tr>
    )
}

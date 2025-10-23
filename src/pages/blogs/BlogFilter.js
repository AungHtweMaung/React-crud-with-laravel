import React, { useState } from 'react'

export default function BlogFilter({ onSearch }) {
    let [searchKey, setSearchKey] = useState('');

    let handleSearch = (e) => {
        e.preventDefault();
        if (onSearch) {
            onSearch(searchKey);
        }
    }
    return (
        <div className='col-12'>

            <div className="row d-flex justify-content-end">
                <div className="col-3">

                <form onSubmit={handleSearch}>
                    <div className="d-flex gap-2 form-group">
                        <input type="text" onChange={(e) => setSearchKey(e.target.value)} className='form-control' placeholder='Search...'  />
                        <button className='btn btn-sm btn-primary'>Search</button>

                    </div>
                </form>
                </div>
            </div>
        </div>
    )
}

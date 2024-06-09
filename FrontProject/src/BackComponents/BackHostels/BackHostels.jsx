import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BackHostels() {
    const [formData, setFormData] = useState({
        nom: '',
        image: null,
    });
    const [categories, setCategories] = useState([]);
    const [hostels, setHostels] = useState([]);
    // const [filterCategory, setFilterCategory] = useState('');
    const [sortOrder, setSortOrder] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleHostelChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // if (!formData.category) {
            //     console.error('Please select a category.');
            //     return;
            // }
            const data = new FormData();
            data.append('nom', formData.nom);
            data.append('image', formData.image);
            // data.append('category', formData.category);
            const response = await axios.post('http://127.0.0.1:8000/create-hostel/', data);
            console.log('Hostel uploaded:', response.data);
            fetchHostels(); 
        } catch (error) {
            console.error('Error uploading hostel:', error);
        }
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         if (!formData.category) {
    //             console.error('Please select a category.');
    //             return;
    //         }
    //         const data = new FormData();
    //         data.append('nom', formData.name);
    //         data.append('image', formData.image);
    //         // data.append('category', formData.category);
    //         const response = await axios.post('http://127.0.0.1:8000/create-hostel/', data);
    //         console.log('Hostel uploaded:', response.data);
    //         fetchImages(); 
    //     } catch (error) {
    //         console.error('Error uploading hostel:', error);
    //     }
    // };

    // const fetchCategories = async () => {
    //     try {
    //         const response = await axios.get('http://127.0.0.1:8000/categories/');
    //         setCategories(response.data);
    //     } catch (error) {
    //         console.error('Error fetching categories:', error);
    //     }
    // };

    const fetchHostels = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/hostels/');
            setHostels(response.data);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    useEffect(() => {
        // fetchCategories();
        fetchHostels();
    }, []);

    // const handleFilterChange = (e) => {
    //     setFilterCategory(e.target.value);
    // };

    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
    };

    const filteredHostels = hostels
        // .filter(image => filterCategory ? image.category === filterCategory : true)
        .sort((a, b) => {
            if (sortOrder === 'asc') return a.nom.localeCompare(b.nom);
            if (sortOrder === 'desc') return b.nom.localeCompare(a.nom);
            return 0;
        });

    return (
        <div>
            <h2>Upload Image</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="nom" nom="nom" value={formData.nom} onChange={handleHostelChange} />
                </div>
                <div>
                    <label htmlFor="image">Image:</label>
                    <input type="file" id="image" name="image" onChange={handleHostelChange} />
                </div>
                {/* <div>
                    <label htmlFor="category">Category:</label>
                    <select id="category" name="category" value={formData.category} onChange={handleChange}>
                        <option value="">Select category</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div> */}
                <button type="submit">Upload</button>
            </form>

            <div>
                <h2>Filter Hostels</h2>
                {/* <div>
                    <label htmlFor="filterCategory">Category:</label>
                    <select id="filterCategory" value={filterCategory} onChange={handleFilterChange}>
                        <option value="">All categories</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div> */}
                <div>
                    <label htmlFor="sortOrder">Sort by Name:</label>
                    <select id="sortOrder" value={sortOrder} onChange={handleSortChange}>
                        <option value="">None</option>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>
            </div>

            <div>
                <h2>All Hostels</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {filteredHostels.map(hostel => (
                        <div key={hostel.id} style={{ margin: '10px', textAlign: 'center' }}>
                            <img src={hostel.image_url} alt={hostel.nom} style={{ width: '200px', height: '200px', objectFit: 'cover' }} />
                            <p>{hostel.nom}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default BackHostels
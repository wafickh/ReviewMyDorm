import React, { useEffect, useState } from 'react'
import axios from 'axios';

function Test() {
    const [cars, setCars] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCars, setTotalCars] = useState(0);
    const [pageSize] = useState(2); // Number of cars to display per page
    const [sortOptions, setSortOptions] = useState([]); // Array to store selected sort options


    useEffect(() => {
        fetchData();
    }, [currentPage, sortOptions]);
    const fetchData = async () => {
        try {
            const response = await axios.get('/api/dorms/', {
                params: {
                    page: currentPage,
                    pageSize,
                    sortBy: sortOptions.join(','), // Pass comma-separated string of selected sort options
                },
            });

            setCars(response.data.cars);
            setTotalCars(response.data.totalCars);
        } catch (error) {
            console.error('Failed to fetch cars:', error);
        }
    };

    const handleSortChange = (event) => {
        const { value, checked } = event.target;

        if (checked) {
            // Add selected sort option to the array
            setSortOptions((prevSortOptions) => [...prevSortOptions, value]);
        } else {
            // Remove deselected sort option from the array
            setSortOptions((prevSortOptions) =>
                prevSortOptions.filter((option) => option !== value)
            );
        }

        setCurrentPage(1); // Reset page number when changing sort options
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <div>
                <label>
                    <input
                        type="checkbox"
                        value="Rating"
                        checked={sortOptions.includes('Rating')}
                        onChange={handleSortChange}
                    />
                    Sort by R
                </label>
                <label>
                    <input
                        type="checkbox"
                        value="model"
                        checked={sortOptions.includes('model')}
                        onChange={handleSortChange}
                    />
                    Sort by Model
                </label>
                <label>
                    <input
                        type="checkbox"
                        value="name"
                        checked={sortOptions.includes('name')}
                        onChange={handleSortChange}
                    />
                    Sort by Name
                </label>
                <label>
                    <input
                        type="checkbox"
                        value="year"
                        checked={sortOptions.includes('year')}
                        onChange={handleSortChange}
                    />
                    Sort by Year
                </label>
                <label>
                    <input
                        type="checkbox"
                        value="type"
                        checked={sortOptions.includes('type')}
                        onChange={handleSortChange}
                    />
                    Sort by Type
                </label>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Model</th>
                        <th>Color</th>
                    </tr>
                </thead>
                <tbody>
                    {cars.map((car) => (
                        <tr key={car.id}>
                            <td>{car.id}</td>
                            <td>{car.model}</td>
                            <td>{car.color}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <button
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    Previous
                </button>
                <button
                    disabled={currentPage * pageSize >= totalCars}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default Test

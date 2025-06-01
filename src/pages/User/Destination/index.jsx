import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { destinationsData } from '../../../data/destinations'; // Giữ đường dẫn theo yêu cầu

function Destination() {
    const [filteredDestinations, setFilteredDestinations] = useState(destinationsData);

    const [filters, setFilters] = useState({
        searchTerm: '',
        priceRange: [0, 10000000],
    });

    const [tempFilters, setTempFilters] = useState(filters);

    const priceRanges = [
        { label: "Tất cả", value: [0, 10000000] },
        { label: "Từ 0đ đến 1.000.000đ", value: [0, 1000000] },
        { label: "Từ 1.000.000đ đến 3.000.000đ", value: [1000000, 3000000] },
        { label: "Từ 3.000.000đ đến 5.000.000đ", value: [3000000, 5000000] },
        { label: "Từ 5.000.000đ đến 7.000.000đ", value: [5000000, 7000000] },
        { label: "Trên 7.000.000đ", value: [7000000, 10000000] },
    ];

    const handleSearch = () => {
        setFilters(tempFilters);
    };

    useEffect(() => {
        let result = [...destinationsData];

        if (filters.searchTerm) {
            const keyword = filters.searchTerm.toLowerCase();
            result = result.filter(
                (dest) =>
                    dest.name.toLowerCase().includes(keyword) ||
                    dest.description.toLowerCase().includes(keyword)
            );
        }

        result = result.filter(
            (dest) =>
                parseInt(dest.price.replace(/[^0-9]/g, '')) >= filters.priceRange[0] &&
                parseInt(dest.price.replace(/[^0-9]/g, '')) <= filters.priceRange[1]
        );

        setFilteredDestinations(result);
    }, [filters]);

    const popularDestinations = destinationsData
        .sort((a, b) => parseInt(b.price.replace(/[^0-9]/g, '')) - parseInt(a.price.replace(/[^0-9]/g, '')))
        .slice(0, 2);

    // Debug: Log destinationsData
    console.log('Destinations Data:', destinationsData);

    return (
        <section className="destinations-section py-5">
            <div className="container">
                <h1 className="text-center mb-5">Danh Sách Điểm Đến</h1>

                {/* Bộ lọc */}
                <div className="filter-section mb-5 p-4 rounded shadow-sm bg-light">
                    <div className="row g-3 align-items-center">
                        <div className="col-12 col-md-6">
                            <input
                                type="text"
                                className="form-control search-input"
                                placeholder="Tìm kiếm điểm đến..."
                                value={tempFilters.searchTerm}
                                onChange={(e) =>
                                    setTempFilters({ ...tempFilters, searchTerm: e.target.value })
                                }
                            />
                        </div>
                        <div className="col-12 col-md-4">
                            <label className="form-label mb-1">Khoảng giá:</label>
                            <select
                                className="form-select price-select"
                                value={JSON.stringify(tempFilters.priceRange)}
                                onChange={(e) => {
                                    const selectedRange = JSON.parse(e.target.value);
                                    setTempFilters({
                                        ...tempFilters,
                                        priceRange: selectedRange,
                                    });
                                }}
                            >
                                {priceRanges.map((range, index) => (
                                    <option key={index} value={JSON.stringify(range.value)}>
                                        {range.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-12 col-md-2">
                            <button className="btn btn-primary w-100 search-btn" onClick={handleSearch}>
                                Tìm kiếm
                            </button>
                        </div>
                    </div>
                </div>

                {/* Điểm đến phổ biến */}
                <div className="popular-destinations mb-5">
                    <h2 className="text-center mb-4">Điểm Đến Phổ Biến</h2>
                    <div className="row">
                        {popularDestinations.map((dest) => (
                            <div key={dest.id} className="col-md-6 mb-4">
                                <div className="destination-card rounded shadow p-3">
                                    <div className="row align-items-center">
                                        <div className="col-md-5">
                                            <img
                                                src={dest.image}
                                                alt={dest.name}
                                                className="img-fluid rounded"
                                                style={{ height: '150px', objectFit: 'cover' }}
                                            />
                                        </div>
                                        <div className="col-md-7">
                                            <h3 className="mb-2">{dest.name}</h3>
                                            <p className="text-muted mb-2">{dest.description}</p>
                                            <p className="mb-2"><b>Giá từ:</b> {dest.price}</p>
                                            <div className="d-flex gap-2">
                                                <Link to={`/tours?location=${dest.name.toLowerCase()}`} className="btn btn-primary btn-sm details-btn">
                                                    Xem tour
                                                </Link>
                                                <Link
                                                    to={`/destinations/${dest.id}`}
                                                    className="btn btn-outline-primary btn-sm details-btn"
                                                    onClick={() => console.log('Navigating to:', `/destinations/${dest.id}`)}
                                                >
                                                    Xem chi tiết
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Danh sách điểm đến */}
                <div className="destination-list">
                    <h2 className="text-center mb-4">Tất Cả Điểm Đến</h2>
                    {filteredDestinations.length === 0 ? (
                        <p className="text-center text-muted">Không tìm thấy điểm đến nào phù hợp.</p>
                    ) : (
                        <div className="row">
                            {filteredDestinations.map((dest) => (
                                <div key={dest.id} className="col-md-4 mb-4">
                                    <div className="destination-card rounded shadow p-3">
                                        <img
                                            src={dest.image}
                                            alt={dest.name}
                                            className="img-fluid rounded mb-3"
                                            style={{ height: '200px', objectFit: 'cover' }}
                                        />
                                        <h3 className="mb-2">{dest.name}</h3>
                                        <p className="text-muted mb-2">{dest.description}</p>
                                        <p className="mb-2"><b>Giá từ:</b> {dest.price}</p>
                                        <div className="d-flex gap-2">
                                            <Link to={`/tours?location=${dest.name.toLowerCase()}`} className="btn btn-primary btn-sm details-btn">
                                                Xem tour
                                            </Link>
                                            <Link
                                                to={`/destinations/${dest.id}`}
                                                className="btn btn-outline-primary btn-sm details-btn"
                                                onClick={() => console.log('Navigating to:', `/destinations/${dest.id}`)}
                                            >
                                                Xem chi tiết
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* CSS nội tuyến */}
            <style>
                {`
                    .destinations-section {
                        font-family: 'Be Vietnam Pro', 'Montserrat', Arial, sans-serif;
                        background-color: #f8f9fa;
                    }
                    .destinations-section h1, .destinations-section h2 {
                        font-weight: bold;
                        color: #1e3a8a;
                    }
                    .filter-section {
                        background: #fff;
                        border: 1px solid #e0e0e0;
                        border-radius: 12px;
                        padding: 20px;
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
                        transition: box-shadow 0.3s ease;
                    }
                    .filter-section:hover {
                        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
                    }
                    .search-input, .price-select, .search-btn {
                        height: 45px;
                        font-size: 0.95rem;
                        border-radius: 8px;
                    }
                    .search-input {
                        border: 1px solid #ced4da;
                        padding: 0 15px;
                        transition: border-color 0.3s ease;
                    }
                    .search-input:focus {
                        border-color: #1e3a8a;
                        box-shadow: 0 0 0 0.2rem rgba(30, 58, 138, 0.1);
                    }
                    .price-select {
                        border: 1px solid #ced4da;
                        padding: 0 10px;
                    }
                    .search-btn {
                        background: linear-gradient(45deg, #1e3a8a, #3b82f6);
                        border: none;
                        font-weight: 500;
                        transition: transform 0.3s ease, background 0.3s ease;
                    }
                    .search-btn:hover {
                        background: linear-gradient(45deg, #3b82f6, #1e3a8a);
                        transform: translateY(-2px);
                    }
                    .destination-card {
                        background: #fff;
                        transition: transform 0.3s ease, box-shadow 0.3s ease;
                    }
                    .destination-card:hover {
                        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
                        transform: scale(1.05);
                    }
                    .destination-card img {
                        width: 100%;
                        transition: transform 0.3s ease;
                    }
                    .destination-card:hover img {
                        transform: scale(1.1);
                    }
                    .destination-card h3 {
                        font-size: 1.25rem;
                        font-weight: 600;
                        color: #1e3a8a;
                    }
                    .btn-primary, .btn-outline-primary {
                        font-weight: 500;
                        transition: background-color 0.3s ease, transform 0.3s ease;
                    }
                    .btn-primary {
                        background-color: #1e3a8a;
                        border: none;
                    }
                    .btn-outline-primary {
                        border-color: #1e3a8a;
                        color: #1e3a8a;
                    }
                    .btn-primary:hover, .btn-outline-primary:hover {
                        background-color: #ff9d00;
                        border-color: #ff9d00;
                        color: #fff;
                        transform: translateY(-2px);
                    }
                    .details-btn {
                        padding: 8px 16px;
                        border-radius: 20px;
                        font-size: 0.9rem;
                        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                        display: inline-block;
                    }
                    .details-btn:hover {
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
                    }
                    @media (max-width: 767px) {
                        .filter-section {
                            padding: 15px;
                        }
                        .search-input, .price-select, .search-btn {
                            height: 40px;
                        }
                        .form-label {
                            margin-bottom: 5px;
                        }
                    }
                `}
            </style>
        </section>
    );
}

export default Destination;
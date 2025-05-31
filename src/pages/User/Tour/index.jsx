import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Tours() {
    const toursData = [
        {
            id: 1,
            title: "Tour Sapa Mùa Lúa Chín",
            description: "Khám phá vẻ đẹp Sapa với những cung đường tuyệt đẹp và văn hóa độc đáo.",
            image: "/images/blog/sapa.jpeg",
            price: 5000000,
            duration: 3,
            location: "Sapa",
            popularity: 120,
        },
        {
            id: 2,
            title: "Tour Đà Lạt 5 Ngày",
            description: "Hành trình khám phá Đà Lạt với các điểm đến nổi bật và không khí trong lành.",
            image: "/images/blog/dalat-2.jpg",
            price: 7000000,
            duration: 5,
            location: "Đà Lạt",
            popularity: 200,
        },
        {
            id: 3,
            title: "Tour Phú Quốc 4 Ngày",
            description: "Thư giãn tại thiên đường biển Phú Quốc với bãi biển xanh ngọc bích.",
            image: "/images/blog/phuquoc-3.jpg",
            price: 6000000,
            duration: 4,
            location: "Phú Quốc",
            popularity: 180,
        },
    ];

    const [filteredTours, setFilteredTours] = useState(toursData);

    const [filters, setFilters] = useState({
        searchTerm: '',
        priceRange: [0, 10000000],
        duration: '',
        location: '',
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
        let result = [...toursData];

        if (filters.searchTerm) {
            const keyword = filters.searchTerm.toLowerCase();
            result = result.filter(
                (tour) =>
                    tour.title.toLowerCase().includes(keyword) ||
                    tour.description.toLowerCase().includes(keyword)
            );
        }

        result = result.filter(
            (tour) =>
                tour.price >= filters.priceRange[0] &&
                tour.price <= filters.priceRange[1]
        );

        if (filters.duration !== '') {
            const d = parseInt(filters.duration);
            if (!isNaN(d)) {
                result = result.filter((tour) => tour.duration === d);
            }
        }

        if (filters.location !== '') {
            result = result.filter((tour) => tour.location === filters.location);
        }

        setFilteredTours(result);
    }, [filters]);

    const popularTours = toursData
        .sort((a, b) => b.popularity - a.popularity)
        .slice(0, 2);

    return (
        <section className="tours-section py-5">
            <div className="container">
                <h1 className="text-center mb-5">Danh Sách Tour Du Lịch</h1>

                {/* Bộ lọc */}
                <div className="filter-section mb-5 p-4 rounded shadow bg-light">
                    <div className="row g-3">
                        {/* Tìm kiếm */}
                        <div className="col-md-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Tìm kiếm tour..."
                                value={tempFilters.searchTerm}
                                onChange={(e) =>
                                    setTempFilters({ ...tempFilters, searchTerm: e.target.value })
                                }
                            />
                        </div>

                        {/* Lọc giá */}
                        <div className="col-md-3">
                            <label className="form-label">Khoảng giá:</label>
                            <select
                                className="form-select"
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

                        {/* Thời gian */}
                        <div className="col-md-2">
                            <label className="form-label">Thời gian (ngày):</label>
                            <select
                                className="form-select"
                                value={tempFilters.duration}
                                onChange={(e) =>
                                    setTempFilters({ ...tempFilters, duration: e.target.value })
                                }
                            >
                                <option value="">Tất cả</option>
                                <option value="3">3 ngày</option>
                                <option value="4">4 ngày</option>
                                <option value="5">5 ngày</option>
                            </select>
                        </div>

                        {/* Địa điểm */}
                        <div className="col-md-2">
                            <label className="form-label">Địa điểm:</label>
                            <select
                                className="form-select"
                                value={tempFilters.location}
                                onChange={(e) =>
                                    setTempFilters({ ...tempFilters, location: e.target.value })
                                }
                            >
                                <option value="">Tất cả</option>
                                <option value="Sapa">Sapa</option>
                                <option value="Đà Lạt">Đà Lạt</option>
                                <option value="Phú Quốc">Phú Quốc</option>
                                <option value="Hạ Long">Hạ Long</option>
                            </select>
                        </div>

                        {/* Nút tìm kiếm */}
                        <div className="col-md-2 d-flex align-items-end">
                            <button className="btn btn-primary w-100 search-btn" onClick={handleSearch}>
                                Tìm kiếm
                            </button>
                        </div>
                    </div>
                </div>

                {/* Tour phổ biến */}
                <div className="popular-tours mb-5">
                    <h2 className="text-center mb-4">Tour Phổ Biến</h2>
                    <div className="row">
                        {popularTours.map((tour) => (
                            <div key={tour.id} className="col-md-6 mb-4">
                                <div className="tour-card rounded shadow p-3">
                                    <div className="row align-items-center">
                                        <div className="col-md-5">
                                            <img
                                                src={tour.image}
                                                alt={tour.title}
                                                className="img-fluid rounded"
                                                style={{ height: '150px', objectFit: 'cover' }}
                                            />
                                        </div>
                                        <div className="col-md-7">
                                            <h3 className="mb-2">{tour.title}</h3>
                                            <p className="text-muted mb-2">{tour.description}</p>
                                            <p className="mb-1"><b>Giá:</b> {tour.price.toLocaleString()} VNĐ</p>
                                            <p className="mb-1"><b>Thời gian:</b> {tour.duration} ngày</p>
                                            <p className="mb-2"><b>Địa điểm:</b> {tour.location}</p>
                                            <Link to={`/tours/${tour.id}`} className="btn btn-primary btn-sm details-btn">
                                                Xem chi tiết
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Danh sách tour */}
                <div className="tour-list">
                    <h2 className="text-center mb-4">Tất Cả Tour</h2>
                    {filteredTours.length === 0 ? (
                        <p className="text-center text-muted">Không tìm thấy tour nào phù hợp.</p>
                    ) : (
                        <div className="row">
                            {filteredTours.map((tour) => (
                                <div key={tour.id} className="col-md-4 mb-4">
                                    <div className="tour-card rounded shadow p-3">
                                        <img
                                            src={tour.image}
                                            alt={tour.title}
                                            className="img-fluid rounded mb-3"
                                            style={{ height: '200px', objectFit: 'cover' }}
                                        />
                                        <h3 className="mb-2">{tour.title}</h3>
                                        <p className="text-muted mb-2">{tour.description}</p>
                                        <p className="mb-1"><b>Giá:</b> {tour.price.toLocaleString()} VNĐ</p>
                                        <p className="mb-1"><b>Thời gian:</b> {tour.duration} ngày</p>
                                        <p className="mb-2"><b>Địa điểm:</b> {tour.location}</p>
                                        <Link to={`/tours/${tour.id}`} className="btn btn-primary btn-sm details-btn">
                                            Xem chi tiết
                                        </Link>
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
                    .tours-section {
                        font-family: 'Be Vietnam Pro', 'Montserrat', Arial, sans-serif;
                        background-color: #f8f9fa;
                    }
                    .tours-section h1, .tours-section h2 {
                        font-weight: bold;
                        color: #1e3a8a;
                    }
                    .tour-card {
                        background: #fff;
                        transition: transform 0.3s ease, box-shadow 0.3s ease;
                    }
                    .tour-card:hover {
                        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
                        transform: scale(1.05);
                    }
                    .tour-card img {
                        width: 100%;
                        transition: transform 0.3s ease;
                    }
                    .tour-card:hover img {
                        transform: scale(1.1);
                    }
                    .tour-card h3 {
                        font-size: 1.25rem;
                        font-weight: 600;
                        color: #1e3a8a;
                    }
                    .btn-primary {
                        background-color: #1e3a8a;
                        border: none;
                        font-weight: 500;
                        transition: background-color 0.3s ease, transform 0.3s ease;
                    }
                    .btn-primary:hover {
                        background-color: #ff9d00; 
                        transform: translateY(-2px);
                    }
                    .search-btn {
                        padding: 10px 20px;
                        border-radius: 25px; 
                        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                        font-size: 1rem;
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
                `}
            </style>
        </section>
    );
}

export default Tours;
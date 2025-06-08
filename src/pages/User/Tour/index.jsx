import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toursData } from '../../../data/toursData';

function Tours() {
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

    // Tích hợp jQuery để xử lý hiệu ứng hover
    useEffect(() => {
        if (window.jQuery) {
            $('.tour-card').hover(
                function () {
                    // Gradient bar
                    $(this).find('.gradient-bar').addClass('active');
                    // Phóng to hình ảnh
                    $(this).find('.tour-img').css({
                        transform: 'scale(1.1)',
                        transition: 'transform 0.5s ease'
                    });
                    // Fade-in nội dung
                    $(this).find('.content-details').css({
                        transition: 'opacity 0.5s ease'
                    });
                },
                function () {
                    // Gradient bar
                    $(this).find('.gradient-bar').removeClass('active');
                    // Thu nhỏ hình ảnh về ban đầu
                    $(this).find('.tour-img').css({
                        transform: 'scale(1)',
                        transition: 'transform 0.5s ease'
                    });
                    // Fade-out nội dung về trạng thái ban đầu
                    $(this).find('.content-details').css({
                        opacity: 0.7,
                        transition: 'opacity 0.5s ease'
                    });
                }
            );
        }
    }, []);

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
                                    {/* Thanh gradient hiệu ứng */}
                                    <div className="gradient-bar"></div>
                                    <div className="content-wrapper">
                                        <div className="row align-items-center">
                                            <div className="col-md-5">
                                                <img
                                                    src={tour.image}
                                                    alt={tour.title}
                                                    className="tour-img img-fluid rounded"
                                                    style={{ height: '150px', objectFit: 'cover' }}
                                                />
                                            </div>
                                            <div className="col-md-7 content-details">
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
                                        {/* Thanh gradient hiệu ứng */}
                                        <div className="gradient-bar"></div>
                                        <div className="content-wrapper">
                                            <img
                                                src={tour.image}
                                                alt={tour.title}
                                                className="tour-img img-fluid rounded mb-3"
                                                style={{ height: '200px', objectFit: 'cover' }}
                                            />
                                            <div className="content-details">
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
                        position: relative;
                    }
                    .tour-card:hover {
                        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
                        transform: scale(1.05);
                    }
                    .tour-img {
                        width: 100%;
                        transition: transform 0.5s ease; 
                    }
                    .content-details {
                        transition: opacity 0.5s ease; 
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
                    .gradient-bar {
                        height: 4px;
                        width: 0;
                        background: linear-gradient(to right, #3b82f6, #8b5cf6);
                        border-radius: 9999px;
                        transition: width 0.5s ease;
                        position: absolute;
                        top: 0;
                        left: 50%;
                        transform: translateX(-50%);
                    }
                    .gradient-bar.active {
                        width: 100%;
                    }
                    .content-wrapper {
                        margin-top: 8px; 
                    }
                    @media (max-width: 767px) {
                        .filter-section {
                            padding: 15px;
                        }
                        .form-control, .form-select, .search-btn {
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

export default Tours;
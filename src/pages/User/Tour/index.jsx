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
        .slice()
        .sort((a, b) => b.popularity - a.popularity)
        .slice(0, 2);

    return (
        <section className="tours-section py-5">
            <div className="container">
                <h1 className="text-center mb-5 display-4 fw-bold text-gradient" style={{letterSpacing: 1}}>Khám Phá Tour Du Lịch</h1>

                {/* Bộ lọc */}
                <div className="filter-section mb-5 p-4 rounded-5 shadow bg-white border-0">
                    <form
                        className="row g-3 align-items-center"
                        onSubmit={e => {
                            e.preventDefault();
                            handleSearch();
                        }}
                        autoComplete="off"
                    >
                        <div className="col-12 col-md-4 col-lg-3">
                            <div className="input-group stylish-search shadow-sm">
                                <span className="input-group-text bg-white border-end-0 px-3">
                                    <svg width="20" height="20" fill="none" stroke="#1e3a8a" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                                </span>
                                <input
                                    type="text"
                                    className="form-control border-start-0 stylish-input"
                                    placeholder="Tìm kiếm tour, mô tả..."
                                    value={tempFilters.searchTerm}
                                    onChange={(e) =>
                                        setTempFilters({ ...tempFilters, searchTerm: e.target.value })
                                    }
                                    style={{
                                        background: "#f5f8fa",
                                        fontSize: "1.08rem",
                                        fontWeight: 500,
                                        color: "#1e3a8a",
                                        border: "none"
                                    }}
                                />
                            </div>
                        </div>
                        <div className="col-6 col-md-2 col-lg-2">
                            <select
                                className="form-select price-select shadow-sm"
                                value={JSON.stringify(tempFilters.priceRange)}
                                onChange={(e) => {
                                    const selectedRange = JSON.parse(e.target.value);
                                    setTempFilters({
                                        ...tempFilters,
                                        priceRange: selectedRange,
                                    });
                                }}
                                style={{
                                    background: "#f5f8fa",
                                    fontWeight: 500,
                                    color: "#1e3a8a",
                                    border: "none"
                                }}
                            >
                                {priceRanges.map((range, index) => (
                                    <option key={index} value={JSON.stringify(range.value)}>
                                        {range.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-6 col-md-2 col-lg-2">
                            <select
                                className="form-select shadow-sm"
                                value={tempFilters.duration}
                                onChange={(e) =>
                                    setTempFilters({ ...tempFilters, duration: e.target.value })
                                }
                                style={{
                                    background: "#f5f8fa",
                                    fontWeight: 500,
                                    color: "#1e3a8a",
                                    border: "none"
                                }}
                            >
                                <option value="">Tất cả thời gian</option>
                                <option value="3">3 ngày</option>
                                <option value="4">4 ngày</option>
                                <option value="5">5 ngày</option>
                            </select>
                        </div>
                        <div className="col-6 col-md-2 col-lg-2">
                            <select
                                className="form-select shadow-sm"
                                value={tempFilters.location}
                                onChange={(e) =>
                                    setTempFilters({ ...tempFilters, location: e.target.value })
                                }
                                style={{
                                    background: "#f5f8fa",
                                    fontWeight: 500,
                                    color: "#1e3a8a",
                                    border: "none"
                                }}
                            >
                                <option value="">Tất cả địa điểm</option>
                                <option value="Sapa">Sapa</option>
                                <option value="Đà Lạt">Đà Lạt</option>
                                <option value="Phú Quốc">Phú Quốc</option>
                                <option value="Hạ Long">Hạ Long</option>
                            </select>
                        </div>
                        <div className="col-6 col-md-2 col-lg-2">
                            <button className="btn btn-gradient w-100 search-btn shadow-sm" type="submit" style={{fontWeight: 700, fontSize: "1.05rem", borderRadius: 12}}>
                                <svg width="18" height="18" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24" style={{marginRight: 6, marginTop: -2}}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                                Tìm kiếm
                            </button>
                        </div>
                    </form>
                </div>

                {/* Danh sách tour */}
                <div className="tour-list">
                    <h2 className="text-center mb-4 fw-bold text-gradient">Tất Cả Tour</h2>
                    {filteredTours.length === 0 ? (
                        <p className="text-center text-muted">Không tìm thấy tour nào phù hợp.</p>
                    ) : (
                        <div className="row g-4">
                            {filteredTours.map((tour) => (
                                <div key={tour.id} className="col-md-4">
                                    <div className="tour-card improved rounded-4 shadow-sm p-0 overflow-hidden h-100">
                                        <div className="tour-img-wrapper position-relative">
                                            <img
                                                src={tour.image}
                                                alt={tour.title}
                                                className="tour-img img-fluid w-100"
                                                style={{ height: '180px', objectFit: 'cover' }}
                                            />
                                            <div className="gradient-overlay"></div>
                                        </div>
                                        <div className="content-details p-3">
                                            <h3 className="mb-2 fw-bold">{tour.title}</h3>
                                            <p className="text-muted mb-2">{tour.description}</p>
                                            <p className="mb-1"><b>Giá:</b> <span className="text-primary">{tour.price.toLocaleString()} VNĐ</span></p>
                                            <p className="mb-1"><b>Thời gian:</b> {tour.duration} ngày</p>
                                            <p className="mb-2"><b>Địa điểm:</b> {tour.location}</p>
                                            <Link to={`/tours/${tour.id}`} className="btn btn-gradient details-btn">
                                                Xem chi tiết
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <hr />
                 {/* Tour phổ biến */}
                <div className="popular-tours mb-5">
                    <h2 className="text-center mb-4 fw-bold text-gradient">Tour Phổ Biến</h2>
                    <div className="row g-4">
                        {popularTours.map((tour, idx) => (
                            <div key={tour.id} className="col-md-6">
                                <div className="tour-card highlight-popular-tour rounded-5 shadow-lg p-0 overflow-hidden h-100 position-relative border-0">
                                    <div className="tour-img-wrapper position-relative">
                                        <img
                                            src={tour.image}
                                            alt={tour.title}
                                            className="tour-img img-fluid w-100"
                                            style={{ height: '260px', objectFit: 'cover', borderTopLeftRadius: 24, borderTopRightRadius: 24 }}
                                        />
                                        <div className="gradient-overlay"></div>
                                        <div className="popular-badge fs-6 px-4 py-2" style={{
                                            top: 18,
                                            left: 18,
                                            background: idx === 0
                                                ? "linear-gradient(90deg, #ff9d00 0%, #3b82f6 100%)"
                                                : "linear-gradient(90deg, #3b82f6 0%, #ff9d00 100%)"
                                        }}>
                                            <svg width="18" height="18" fill="#fff" style={{marginRight: 6, marginTop: -2}} viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                                            Phổ biến
                                        </div>
                                    </div>
                                    <div className="content-details p-4">
                                        <h3 className="mb-2 fw-bold fs-4 text-primary">{tour.title}</h3>
                                        <p className="text-muted mb-2">{tour.description}</p>
                                        <p className="mb-1"><b>Giá:</b> <span className="text-primary fs-5">{tour.price.toLocaleString()} VNĐ</span></p>
                                        <p className="mb-1"><b>Thời gian:</b> {tour.duration} ngày</p>
                                        <p className="mb-3"><b>Địa điểm:</b> {tour.location}</p>
                                        <Link to={`/tours/${tour.id}`} className="btn btn-gradient details-btn px-4 py-2">
                                            Xem chi tiết
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CSS nội tuyến */}
            <style>
                {`
                    .text-gradient {
                        background: linear-gradient(90deg, #1e3a8a 0%, #3b82f6 50%, #ff9d00 100%);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                    }
                    .btn-gradient {
                        background: linear-gradient(90deg, #1e3a8a 0%, #3b82f6 100%);
                        color: #fff;
                        border: none;
                        font-weight: 700;
                        transition: background 0.3s, transform 0.2s;
                        letter-spacing: 0.5px;
                    }
                    .btn-gradient:hover {
                        background: linear-gradient(90deg, #ff9d00 0%, #3b82f6 100%);
                        color: #fff;
                        transform: translateY(-2px) scale(1.04);
                    }
                    .tours-section {
                        font-family: 'Be Vietnam Pro', 'Montserrat', Arial, sans-serif;
                        background-color: #f8f9fa;
                    }
                    .filter-section {
                        background: #fff;
                        border-radius: 24px;
                        padding: 28px 24px;
                        box-shadow: 0 6px 24px rgba(30,58,138,0.09);
                        border: none;
                        margin-bottom: 2.5rem;
                    }
                    .filter-section form {
                        margin-bottom: 0;
                    }
                    .stylish-search {
                        border-radius: 12px;
                        background: #f5f8fa;
                        border: 1.5px solid #e3eaf3;
                        overflow: hidden;
                    }
                    .stylish-input {
                        border-left: none !important;
                        background: #f5f8fa !important;
                        box-shadow: none !important;
                        font-size: 1.08rem;
                        color: #1e3a8a;
                        font-weight: 500;
                        border: none !important;
                    }
                    .stylish-input:focus {
                        background: #fff !important;
                        border-color: #3b82f6 !important;
                        box-shadow: 0 0 0 0.15rem rgba(59,130,246,0.13);
                        color: #1e3a8a;
                    }
                    .stylish-search .input-group-text {
                        border-right: none !important;
                        background: #f5f8fa !important;
                        border: none !important;
                    }
                    .price-select {
                        border-radius: 12px;
                        border: 1.5px solid #e3eaf3;
                        background: #f5f8fa;
                        font-weight: 500;
                        color: #1e3a8a;
                        transition: border-color 0.3s;
                    }
                    .price-select:focus {
                        border-color: #3b82f6;
                        background: #fff;
                        color: #1e3a8a;
                    }
                    .search-btn {
                        border-radius: 12px;
                        font-size: 1.08rem;
                        font-weight: 700;
                        letter-spacing: 0.5px;
                        padding: 10px 0;
                        box-shadow: 0 2px 8px rgba(30,58,138,0.07);
                    }
                    .highlight-popular-tour {
                        border-radius: 28px !important;
                        border: none !important;
                        box-shadow: 0 10px 36px rgba(30,58,138,0.13), 0 2px 8px rgba(255,157,0,0.07);
                        background: linear-gradient(120deg, #f8fafc 80%, #fffbe6 100%);
                        transition: box-shadow 0.3s, transform 0.3s;
                    }
                    .highlight-popular-tour:hover {
                        box-shadow: 0 18px 48px rgba(30,58,138,0.18), 0 6px 18px rgba(255,157,0,0.13);
                        transform: translateY(-6px) scale(1.025);
                        background: linear-gradient(120deg, #fffbe6 60%, #f8fafc 100%);
                    }
                    .highlight-popular-tour .tour-img {
                        border-top-left-radius: 28px !important;
                        border-top-right-radius: 28px !important;
                        transition: transform 0.5s cubic-bezier(.4,2,.6,1);
                    }
                    .highlight-popular-tour:hover .tour-img {
                        transform: scale(1.06);
                    }
                    .highlight-popular-tour .popular-badge {
                        position: absolute;
                        top: 18px;
                        left: 18px;
                        z-index: 2;
                        border-radius: 18px;
                        font-weight: 700;
                        color: #fff;
                        box-shadow: 0 2px 8px rgba(30,58,138,0.09);
                        letter-spacing: 0.5px;
                        display: flex;
                        align-items: center;
                        font-size: 1.08rem;
                        padding: 7px 22px;
                    }
                    .highlight-popular-tour .content-details {
                        background: #fff;
                        border-bottom-left-radius: 28px;
                        border-bottom-right-radius: 28px;
                        min-height: 180px;
                    }
                    .highlight-popular-tour .details-btn {
                        font-size: 1.08rem;
                        border-radius: 18px;
                        font-weight: 600;
                        box-shadow: 0 2px 8px rgba(30,58,138,0.07);
                        transition: box-shadow 0.2s, transform 0.2s;
                    }
                    .highlight-popular-tour .details-btn:hover {
                        box-shadow: 0 4px 16px rgba(30,58,138,0.13);
                        transform: translateY(-2px) scale(1.04);
                    }
                    .tour-card.improved {
                        background: #fff;
                        transition: box-shadow 0.3s, transform 0.3s;
                        position: relative;
                        border-radius: 18px;
                        overflow: hidden;
                        border: 1.5px solid #e3eaf3;
                        box-shadow: 0 6px 24px rgba(30,58,138,0.08);
                        min-height: 320px;
                        display: flex;
                        flex-direction: column;
                        justify-content: stretch;
                    }
                    .tour-card.improved:hover {
                        box-shadow: 0 16px 40px rgba(30,58,138,0.16);
                        transform: translateY(-4px) scale(1.03);
                        border-color: #ff9d00;
                    }
                    .tour-img-wrapper {
                        position: relative;
                        overflow: hidden;
                    }
                    .tour-img {
                        width: 100%;
                        transition: transform 0.5s cubic-bezier(.4,2,.6,1);
                    }
                    .tour-card.improved:hover .tour-img {
                        transform: scale(1.08);
                    }
                    .gradient-overlay {
                        position: absolute;
                        left: 0; top: 0; right: 0; bottom: 0;
                        background: linear-gradient(180deg,rgba(30,58,138,0.08) 0%,rgba(30,58,138,0.13) 100%);
                        z-index: 1;
                        pointer-events: none;
                    }
                    .details-btn {
                        padding: 8px 18px;
                        border-radius: 20px;
                        font-size: 0.97rem;
                        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.07);
                        display: inline-block;
                    }
                    .details-btn:hover {
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.13);
                    }
                    @media (max-width: 767px) {
                        .filter-section {
                            padding: 12px;
                        }
                        .stylish-input, .price-select, .search-btn {
                            height: 40px;
                        }
                        .tour-img {
                            height: 140px !important;
                        }
                        .tour-card.improved,
                        .highlight-popular-tour {
                            min-height: 220px;
                        }
                    }
                `}
            </style>
        </section>
    );
}

export default Tours;
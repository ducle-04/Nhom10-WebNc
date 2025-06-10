import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { destinationsData } from '../../../data/destinations';

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
                <h1 className="text-center mb-5 display-4 fw-bold text-gradient" style={{letterSpacing: 1}}>Khám Phá Điểm Đến</h1>

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
                        <div className="col-12 col-md-7 col-lg-6">
                            <div className="input-group stylish-search shadow-sm">
                                <span className="input-group-text bg-white border-end-0 px-3">
                                    <svg width="20" height="20" fill="none" stroke="#1e3a8a" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                                </span>
                                <input
                                    type="text"
                                    className="form-control border-start-0 stylish-input"
                                    placeholder="Tìm kiếm điểm đến, mô tả..."
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
                        <div className="col-6 col-md-3 col-lg-3">
                            <label className="form-label mb-1 fw-semibold visually-hidden">Khoảng giá:</label>
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
                            <button className="btn btn-gradient w-100 search-btn shadow-sm" type="submit" style={{fontWeight: 700, fontSize: "1.05rem", borderRadius: 12}}>
                                <svg width="18" height="18" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24" style={{marginRight: 6, marginTop: -2}}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                                Tìm kiếm
                            </button>
                        </div>
                    </form>
                </div>
                {/* Danh sách điểm đến */}
                <div className="destination-list">
                    <h2 className="text-center mb-4 fw-bold text-gradient">Tất Cả Điểm Đến</h2>
                    {filteredDestinations.length === 0 ? (
                        <p className="text-center text-muted">Không tìm thấy điểm đến nào phù hợp.</p>
                    ) : (
                        <div className="row">
                            {filteredDestinations.map((dest) => (
                                <div key={dest.id} className="col-md-4 mb-4">
                                    <div className="destination-card improved rounded-4 shadow-sm p-0 overflow-hidden h-100">
                                        <div className="destination-img-wrapper position-relative">
                                            <img
                                                src={dest.image}
                                                alt={dest.name}
                                                className="destination-img img-fluid w-100"
                                                style={{ height: '180px', objectFit: 'cover' }}
                                            />
                                            <div className="gradient-overlay"></div>
                                        </div>
                                        <div className="content-details p-3">
                                            <h3 className="mb-2 fw-bold">{dest.name}</h3>
                                            <p className="text-muted mb-2">{dest.description}</p>
                                            <p className="mb-2"><b>Giá từ:</b> <span className="text-primary">{dest.price}</span></p>
                                            <div className="d-flex gap-2">
                                                <Link to={`/tours?location=${dest.name.toLowerCase()}`} className="btn btn-gradient details-btn">
                                                    Xem tour
                                                </Link>
                                                <Link
                                                    to={`/destinations/${dest.id}`}
                                                    className="btn btn-outline-primary details-btn"
                                                >
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
                      {/* Điểm đến phổ biến */}
                <div className="popular-destinations mb-5">
                    <h2 className="text-center mb-4 fw-bold text-gradient">Điểm Đến Phổ Biến</h2>
                    <div className="row">
                        {popularDestinations.map((dest) => (
                            <div key={dest.id} className="col-md-6 mb-4">
                                <div className="destination-card improved-popular rounded-4 shadow-lg p-0 overflow-hidden h-100">
                                    <div className="destination-img-wrapper position-relative">
                                        <img
                                            src={dest.image}
                                            alt={dest.name}
                                            className="destination-img img-fluid w-100"
                                            style={{ height: '220px', objectFit: 'cover' }}
                                        />
                                        <div className="gradient-overlay"></div>
                                        <div className="popular-badge">Phổ biến</div>
                                    </div>
                                    <div className="content-details p-4">
                                        <h3 className="mb-2 fw-bold">{dest.name}</h3>
                                        <p className="text-muted mb-2">{dest.description}</p>
                                        <p className="mb-2"><b>Giá từ:</b> <span className="text-primary">{dest.price}</span></p>
                                        <div className="d-flex gap-2">
                                            <Link to={`/tours?location=${dest.name.toLowerCase()}`} className="btn btn-gradient details-btn">
                                                Xem tour
                                            </Link>
                                            <Link
                                                to={`/destinations/${dest.id}`}
                                                className="btn btn-outline-primary details-btn"
                                            >
                                                Xem chi tiết
                                            </Link>
                                        </div>
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
                        box-shadow: 0 4px 16px rgba(59,130,246,0.13);
                    }
                    .btn-gradient:hover {
                        background: linear-gradient(90deg, #ff9d00 0%, #3b82f6 100%);
                        color: #fff;
                        transform: translateY(-2px) scale(1.04);
                        box-shadow: 0 8px 32px rgba(255,157,0,0.13);
                    }
                    .destinations-section {
                        font-family: 'Be Vietnam Pro', 'Montserrat', Arial, sans-serif;
                        background: linear-gradient(120deg, #f8fafc 60%, #e0e7ff 100%);
                        min-height: 100vh;
                    }
                    .filter-section {
                        background: #fff;
                        border-radius: 28px;
                        padding: 32px 28px;
                        box-shadow: 0 8px 32px rgba(30,58,138,0.11);
                        border: none;
                        margin-bottom: 2.5rem;
                        transition: box-shadow 0.3s;
                    }
                    .filter-section form {
                        margin-bottom: 0;
                    }
                    .stylish-search {
                        border-radius: 14px;
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
                        border-radius: 14px;
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
                        border-radius: 14px;
                        font-size: 1.08rem;
                        font-weight: 700;
                        letter-spacing: 0.5px;
                        padding: 10px 0;
                        box-shadow: 0 2px 8px rgba(30,58,138,0.07);
                    }
                    /* Card styles */
                    .destination-card {
                        background: #fff;
                        border-radius: 22px;
                        box-shadow: 0 6px 32px rgba(30,58,138,0.10);
                        transition: box-shadow 0.3s, transform 0.2s;
                        border: none;
                        overflow: hidden;
                        position: relative;
                    }
                    .destination-card:hover {
                        box-shadow: 0 16px 48px rgba(59,130,246,0.18), 0 2px 8px rgba(255,157,0,0.08);
                        transform: translateY(-4px) scale(1.025);
                        z-index: 2;
                    }
                    .improved-popular {
                        border: 2.5px solid #ff9d00;
                        box-shadow: 0 10px 40px rgba(255,157,0,0.13), 0 6px 32px rgba(30,58,138,0.10);
                    }
                    .destination-img-wrapper {
                        position: relative;
                        overflow: hidden;
                        border-top-left-radius: 22px;
                        border-top-right-radius: 22px;
                    }
                    .destination-img {
                        transition: transform 0.35s cubic-bezier(.4,2,.6,1), filter 0.3s;
                        filter: brightness(0.97) saturate(1.08);
                    }
                    .destination-card:hover .destination-img {
                        transform: scale(1.07) rotate(-1deg);
                        filter: brightness(1.03) saturate(1.15);
                    }
                    .gradient-overlay {
                        position: absolute;
                        left: 0; top: 0; width: 100%; height: 100%;
                        background: linear-gradient(180deg,rgba(30,58,138,0.08) 0%,rgba(255,255,255,0.0) 60%,rgba(30,58,138,0.13) 100%);
                        pointer-events: none;
                        z-index: 1;
                    }
                    .popular-badge {
                        position: absolute;
                        top: 16px;
                        left: 16px;
                        background: linear-gradient(90deg,#ff9d00 0%,#fbbf24 100%);
                        color: #fff;
                        font-weight: 700;
                        font-size: 1rem;
                        padding: 6px 18px;
                        border-radius: 16px;
                        box-shadow: 0 2px 8px rgba(255,157,0,0.13);
                        z-index: 2;
                        letter-spacing: 0.5px;
                        transition: background 0.3s, transform 0.2s;
                        border: 2px solid #fff;
                    }
                    .destination-card:hover .popular-badge {
                        background: linear-gradient(90deg,#1e3a8a 0%,#3b82f6 100%);
                        transform: scale(1.08) rotate(-2deg);
                    }
                    .content-details {
                        background: #fff;
                        border-bottom-left-radius: 22px;
                        border-bottom-right-radius: 22px;
                        transition: background 0.2s;
                    }
                    .destination-card:hover .content-details {
                        background: #f5f8fa;
                    }
                    .details-btn {
                        border-radius: 10px;
                        font-weight: 600;
                        font-size: 1rem;
                        padding: 7px 18px;
                        transition: background 0.2s, color 0.2s, border 0.2s;
                    }
                    .btn-outline-primary.details-btn {
                        border: 2px solid #3b82f6;
                        color: #1e3a8a;
                        background: #fff;
                    }
                    .btn-outline-primary.details-btn:hover {
                        background: #3b82f6;
                        color: #fff;
                        border-color: #1e3a8a;
                    }
                    /* Responsive */
                    @media (max-width: 991px) {
                        .destination-card, .improved-popular {
                            border-radius: 18px;
                        }
                        .destination-img-wrapper {
                            border-top-left-radius: 18px;
                            border-top-right-radius: 18px;
                        }
                        .content-details {
                            border-bottom-left-radius: 18px;
                            border-bottom-right-radius: 18px;
                        }
                    }
                    @media (max-width: 767px) {
                        .filter-section {
                            padding: 12px;
                        }
                        .stylish-input, .price-select, .search-btn {
                            height: 40px;
                        }
                        .destination-card, .improved-popular {
                            border-radius: 14px;
                        }
                        .destination-img-wrapper {
                            border-top-left-radius: 14px;
                            border-top-right-radius: 14px;
                        }
                        .content-details {
                            border-bottom-left-radius: 14px;
                            border-bottom-right-radius: 14px;
                        }
                        .popular-badge {
                            font-size: 0.92rem;
                            padding: 5px 12px;
                            top: 10px;
                            left: 10px;
                        }
                    }
                `}
            </style>
        </section>
    );
}

export default Destination;
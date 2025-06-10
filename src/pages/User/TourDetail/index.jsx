import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toursData } from '../../../data/toursData';

function TourDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [tour, setTour] = useState(null);

    useEffect(() => {
        const selectedTour = toursData.find((t) => t.id === parseInt(id));
        setTour(selectedTour);
    }, [id]);

    // Chặn đặt tour và đánh giá tour nếu chưa đăng nhập (dùng jQuery)
    useEffect(() => {
        if (window.$) {
            window.$(document).ready(function () {
                window.$('.tour-action-btn').off('click').on('click', function (e) {
                    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
                    if (!isLoggedIn) {
                        e.preventDefault();
                        window.$.alert
                            ? window.$.alert('Vui lòng đăng nhập để sử dụng chức năng này!')
                            : alert('Vui lòng đăng nhập để sử dụng chức năng này!');
                        return false;
                    }
                });
            });
        }
    }, []);

    if (!tour) {
        return <div className="text-center mt-5">Tour không tồn tại.</div>;
    }

    const handleBookTour = () => {
        // Lưu tour đã đặt vào localStorage
        let bookedTours = [];
        const stored = localStorage.getItem('bookedTours');
        if (stored) {
            try {
                bookedTours = JSON.parse(stored);
            } catch {}
        }
        // Kiểm tra trùng tour
        if (!bookedTours.some(t => t.id === tour.id)) {
            bookedTours.push({
                id: tour.id,
                title: tour.title,
                image: tour.image,
                description: tour.description,
                price: tour.price,
                duration: tour.duration,
                location: tour.location,
            });
            localStorage.setItem('bookedTours', JSON.stringify(bookedTours));
        }
        navigate(`/tours/${id}/book`);
    };

    const handleReviewTour = () => {
        navigate(`/tours/${id}/review`);
    };

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span key={i} style={{ color: i <= Math.floor(rating) ? '#ffb300' : '#e4e4e4', fontSize: '1.25rem', marginRight: 1 }}>
                    ★
                </span>
            );
        }
        return stars;
    };

    // Thông tin bổ sung demo
    const included = [
        "Xe đưa đón, di chuyển theo lịch trình",
        "Khách sạn 3* hoặc tương đương",
        "Ăn sáng, trưa, tối theo chương trình",
        "Vé tham quan các điểm du lịch",
        "Hướng dẫn viên chuyên nghiệp",
        "Bảo hiểm du lịch"
    ];
    const notIncluded = [
        "Chi phí cá nhân, đồ uống",
        "Thuế VAT",
        "Tiền tip cho hướng dẫn viên/lái xe",
        "Các chi phí ngoài chương trình"
    ];

    return (
        <section className="tour-detail-section py-0">
            {/* Header với ảnh lớn và overlay */}
            <div className="tour-hero position-relative mb-5">
                <img
                    src={tour.image}
                    alt={tour.title}
                    className="tour-hero-img"
                />
                <div className="tour-hero-overlay"></div>
                <div className="tour-hero-content container">
                    <div className="tour-hero-info shadow-lg rounded-4 p-4">
                        <h1 className="fw-bold mb-2 tour-title">{tour.title}</h1>
                        <div className="d-flex align-items-center gap-3 mb-2 flex-wrap">
                            <span className="badge tour-badge"><b>Địa điểm:</b> {tour.location}</span>
                            <span className="badge tour-badge"><b>Thời gian:</b> {tour.duration} ngày</span>
                            <span className="badge tour-badge"><b>Giá:</b> {tour.price.toLocaleString()} VNĐ</span>
                            <span className="badge tour-badge"><b>Lượt xem:</b> {tour.popularity}</span>
                        </div>
                        <div className="d-flex align-items-center gap-2 mb-2">
                            <span className="fs-5">{renderStars(tour.rating || 4.5)}</span>
                            <span className="text-light ms-2" style={{fontSize: 15}}>({tour.reviews.length} đánh giá)</span>
                        </div>
                        <p className="lead mb-0 text-light tour-desc">{tour.description}</p>
                    </div>
                </div>
                {/* Nút đặt tour nổi bật */}
                <div className="tour-action-bar d-none d-lg-flex flex-column align-items-center shadow-lg rounded-4">
                    <button className="btn btn-gradient tour-action-btn mb-3" onClick={handleBookTour}>
                        Đặt tour ngay
                    </button>
                    <button className="btn btn-outline-light tour-action-btn" onClick={handleReviewTour}>
                        Đánh giá Tour
                    </button>
                </div>
            </div>

            <div className="container">
                <div className="row g-4">
                    <div className="col-lg-8">
                        {/* Lịch trình */}
                        <div className="mb-5">
                            <h2 className="mb-4 fw-bold text-gradient">🗓 Lịch trình chi tiết</h2>
                            <div className="timeline-vertical">
                                {tour.schedule.map((item, index) => (
                                    <div key={index} className="timeline-vertical-item">
                                        <div className="timeline-vertical-dot">
                                            <span className="timeline-day">{index + 1}</span>
                                        </div>
                                        <div className="timeline-vertical-content shadow-sm">
                                            <p className="mb-0">{item}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Đánh giá */}
                        <div className="mb-5">
                            <h2 className="mb-4 fw-bold text-gradient">⭐ Đánh giá từ khách hàng</h2>
                            <div className="reviews-grid">
                                {tour.reviews.length > 0 ? (
                                    tour.reviews.map((review, index) => (
                                        <div key={index} className="review-card p-4 rounded-4 shadow-sm">
                                            <div className="d-flex align-items-center mb-2">
                                                <div className="avatar review-avatar me-3">
                                                    <span>{review.user.charAt(0)}</span>
                                                </div>
                                                <div>
                                                    <h5 className="mb-1">{review.user}</h5>
                                                    <div className="star-rating mb-1">{renderStars(review.rating)}</div>
                                                </div>
                                            </div>
                                            <p className="review-comment mb-1">{review.comment}</p>
                                            <small className="text-muted">{review.date}</small>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center text-muted">Chưa có đánh giá nào cho tour này.</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        {/* Thông tin bổ sung */}
                        <div className="info-card bg-white rounded-4 shadow-lg p-4 mb-4 border-0">
                            <h4 className="fw-bold mb-3 text-gradient">Thông tin Tour</h4>
                            <ul className="list-unstyled mb-3" style={{fontSize: 15}}>
                                <li><b>Khởi hành:</b> {tour.startDate || "Liên hệ"}</li>
                                <li><b>Điểm tập trung:</b> {tour.meetingPoint || "Liên hệ"}</li>
                                <li><b>Phương tiện:</b> {tour.transport || "Xe du lịch, máy bay"}</li>
                                <li><b>Loại tour:</b> {tour.type || "Theo đoàn"}</li>
                                <li><b>Độ tuổi phù hợp:</b> {tour.ageRange || "Mọi lứa tuổi"}</li>
                                <li><b>Số chỗ còn nhận:</b> {tour.availableSeats || "Còn chỗ"}</li>
                            </ul>
                        </div>
                        <div className="info-card bg-white rounded-4 shadow-lg p-4 mb-4 border-0">
                            <h4 className="fw-bold mb-3 text-gradient">Dịch vụ bao gồm</h4>
                            <ul className="mb-2 ps-3" style={{fontSize: 15}}>
                                {included.map((item, idx) => (
                                    <li key={idx} className="mb-1"><span className="text-success">✔</span> {item}</li>
                                ))}
                            </ul>
                            <h5 className="fw-bold mt-4 mb-2 text-danger">Không bao gồm</h5>
                            <ul className="ps-3" style={{fontSize: 15}}>
                                {notIncluded.map((item, idx) => (
                                    <li key={idx} className="mb-1"><span className="text-danger">✘</span> {item}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="info-card bg-white rounded-4 shadow-lg p-4 border-0">
                            <h4 className="fw-bold mb-3 text-gradient">Liên hệ tư vấn</h4>
                            <div className="mb-2"><b>Hotline:</b> <a href="tel:19001234" className="text-decoration-none text-dark">1900 1234</a></div>
                            <div className="mb-2"><b>Email:</b> <a href="mailto:info@wildquest.vn" className="text-decoration-none text-dark">info@wildquest.vn</a></div>
                            <div><b>Địa chỉ:</b> 123 Đường Du Lịch, Hà Nội</div>
                        </div>
                        {/* Nút đặt tour cho mobile */}
                        <div className="d-block d-lg-none mt-4 text-center">
                            <button
                                className="btn btn-gradient tour-action-btn mb-3 w-100"
                                onClick={() => {
                                    // Lưu tour đã đặt vào localStorage khi đặt tour trên mobile
                                    let bookedTours = [];
                                    const stored = localStorage.getItem('bookedTours');
                                    if (stored) {
                                        try {
                                            bookedTours = JSON.parse(stored);
                                        } catch {}
                                    }
                                    if (!bookedTours.some(t => t.id === tour.id)) {
                                        bookedTours.push({
                                            id: tour.id,
                                            title: tour.title,
                                            image: tour.image,
                                            description: tour.description,
                                            price: tour.price,
                                            duration: tour.duration,
                                            location: tour.location,
                                        });
                                        localStorage.setItem('bookedTours', JSON.stringify(bookedTours));
                                    }
                                    // ...chuyển hướng nếu cần...
                                    // navigate(`/tours/${id}/book`);
                                }}
                            >
                                Đặt tour ngay
                            </button>
                            <button className="btn btn-outline-secondary tour-action-btn w-100" onClick={handleReviewTour}>
                                Đánh giá Tour
                            </button>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-5">
                    <button className="btn btn-outline-secondary px-4 py-2" onClick={() => navigate('/tours')}>
                        Quay lại danh sách
                    </button>
                </div>
            </div>
            {/* CSS nội tuyến */}
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap');
                    .tour-detail-section {
                        font-family: 'Inter', 'Montserrat', Arial, sans-serif;
                        background: linear-gradient(120deg, #f5f7fa 60%, #e0e7ef 100%);
                        color: #23272f;
                        min-height: 100vh;
                    }
                    .tour-hero {
                        position: relative;
                        min-height: 340px;
                        max-height: 420px;
                        overflow: hidden;
                        margin-bottom: 60px;
                    }
                    .tour-hero-img {
                        width: 100%;
                        height: 420px;
                        object-fit: cover;
                        filter: brightness(0.85) saturate(1.08);
                        transition: filter 0.3s;
                    }
                    .tour-hero-overlay {
                        position: absolute;
                        left: 0; top: 0; width: 100%; height: 100%;
                        background: linear-gradient(120deg,rgba(34,56,120,0.48) 0%,rgba(59,130,246,0.13) 100%);
                        z-index: 1;
                    }
                    .tour-hero-content {
                        position: absolute;
                        left: 0; right: 0; top: 50%; transform: translateY(-50%);
                        z-index: 2;
                        display: flex;
                        align-items: center;
                        min-height: 220px;
                    }
                    .tour-hero-info {
                        background: rgba(34,40,60,0.90);
                        color: #fff;
                        border-radius: 22px;
                        max-width: 700px;
                        margin-left: 0;
                        box-shadow: 0 8px 32px rgba(34,56,120,0.13);
                    }
                    .tour-title {
                        font-size: 2.2rem;
                        background: linear-gradient(90deg, #fff 60%, #4f8cff 100%);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                    }
                    .tour-badge {
                        background: rgba(255,255,255,0.10);
                        color: #e3eaf3;
                        border: 1.5px solid #e3eaf3;
                        border-radius: 16px;
                        font-size: 1.01rem;
                        font-weight: 500;
                        padding: 7px 16px;
                    }
                    .tour-desc {
                        color: #e3eaf3;
                        font-size: 1.08rem;
                        margin-top: 10px;
                    }
                    .tour-action-bar {
                        position: absolute;
                        right: 40px;
                        top: 50%;
                        transform: translateY(-50%);
                        z-index: 3;
                        background: rgba(255,255,255,0.97);
                        padding: 32px 18px;
                        border-radius: 22px;
                        box-shadow: 0 6px 32px rgba(34,56,120,0.13);
                    }
                    .tour-action-btn {
                        font-weight: 700;
                        font-size: 1.08rem;
                        border-radius: 14px;
                        padding: 12px 32px;
                        letter-spacing: 0.5px;
                        box-shadow: 0 2px 8px rgba(34,56,120,0.07);
                        transition: background 0.3s, color 0.3s, transform 0.2s;
                    }
                    .btn-gradient {
                        background: linear-gradient(90deg, #3b82f6 0%, #4f8cff 100%);
                        color: #fff;
                        border: none;
                    }
                    .btn-gradient:hover {
                        background: linear-gradient(90deg, #ffb300 0%, #3b82f6 100%);
                        color: #fff;
                        transform: translateY(-2px) scale(1.04);
                    }
                    .btn-outline-light {
                        border: 2px solid #4f8cff;
                        color: #3b82f6;
                        background: #fff;
                    }
                    .btn-outline-light:hover {
                        background: #3b82f6;
                        color: #fff;
                        border-color: #1e3a8a;
                    }
                    .timeline-vertical {
                        position: relative;
                        margin-left: 18px;
                        border-left: 3px solid #4f8cff;
                        padding-left: 32px;
                    }
                    .timeline-vertical-item {
                        position: relative;
                        margin-bottom: 32px;
                        display: flex;
                        align-items: flex-start;
                    }
                    .timeline-vertical-dot {
                        position: absolute;
                        left: -44px;
                        top: 0;
                        width: 44px;
                        height: 44px;
                        background: linear-gradient(135deg,#4f8cff 60%,#ffb300 100%);
                        color: #fff;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-weight: 700;
                        font-size: 1.08rem;
                        box-shadow: 0 2px 8px rgba(59,130,246,0.13);
                        z-index: 2;
                        text-align: center;
                        padding: 0 4px;
                        word-break: break-word;
                        line-height: 1.1;
                    }
                    .timeline-day {
                        font-size: 1.02rem;
                        font-weight: 600;
                        color: #fff;
                        display: block;
                        width: 100%;
                        text-align: center;
                        line-height: 1.2;
                        white-space: normal;
                        word-break: break-word;
                    }
                    .timeline-vertical-content {
                        background: #fff;
                        border-radius: 14px;
                        padding: 18px 22px;
                        margin-left: 0;
                        min-width: 0;
                        box-shadow: 0 2px 8px rgba(34,56,120,0.07);
                        font-size: 1.05rem;
                        color: #23272f;
                        border-left: 4px solid #4f8cff;
                        transition: box-shadow 0.3s, transform 0.3s;
                    }
                    .timeline-vertical-content:hover {
                        box-shadow: 0 6px 24px rgba(59,130,246,0.13);
                        transform: translateY(-2px) scale(1.02);
                    }
                    .reviews-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
                        gap: 22px;
                    }
                    .review-card {
                        background: #fff;
                        border-radius: 16px;
                        transition: transform 0.3s, box-shadow 0.3s;
                        position: relative;
                        overflow: hidden;
                        border: 1.5px solid #e3eaf3;
                        box-shadow: 0 4px 18px rgba(34,56,120,0.04);
                    }
                    .review-card:hover {
                        transform: translateY(-4px) scale(1.03);
                        box-shadow: 0 8px 32px rgba(34,56,120,0.10);
                    }
                    .review-avatar {
                        width: 48px;
                        height: 48px;
                        background: linear-gradient(135deg,#4f8cff 60%,#ffb300 100%);
                        color: #fff;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-weight: 700;
                        font-size: 1.25rem;
                        box-shadow: 0 2px 8px rgba(59,130,246,0.13);
                    }
                    .star-rating {
                        display: flex;
                        gap: 2px;
                    }
                    .review-comment {
                        font-size: 1.01rem;
                        line-height: 1.5;
                        color: #3b4252;
                        margin-bottom: 8px;
                    }
                    .info-card {
                        border: none;
                        box-shadow: 0 4px 18px rgba(34,56,120,0.07);
                        margin-bottom: 18px;
                        border-radius: 18px;
                        background: #fafdff;
                    }
                    .info-card h4, .info-card h5 {
                        color: #23272f;
                        background: linear-gradient(90deg, #3b82f6 0%, #4f8cff 50%, #ffb300 100%);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                    }
                    .info-card ul {
                        font-size: 1rem;
                        color: #3b4252;
                    }
                    .info-card li {
                        margin-bottom: 6px;
                    }
                    .btn-outline-secondary {
                        border-color: #bfc9d1;
                        color: #23272f;
                        font-weight: 600;
                        border-radius: 18px;
                        letter-spacing: 0.5px;
                        transition: background 0.3s, color 0.3s, transform 0.2s;
                    }
                    .btn-outline-secondary:hover {
                        background-color: #4f8cff;
                        color: #fff;
                        border-color: #3b82f6;
                        transform: translateY(-2px) scale(1.04);
                    }
                    @media (max-width: 1200px) {
                        .tour-hero-info {
                            max-width: 95vw;
                        }
                        .tour-action-bar {
                            right: 10px;
                        }
                    }
                    @media (max-width: 991px) {
                        .tour-hero-info {
                            padding: 18px 12px;
                        }
                        .tour-action-bar {
                            display: none !important;
                        }
                    }
                    @media (max-width: 768px) {
                        .tour-hero-img {
                            height: 220px;
                        }
                        .tour-hero-info {
                            max-width: 100vw;
                            border-radius: 12px;
                        }
                        .timeline-vertical {
                            padding-left: 18px;
                        }
                        .timeline-vertical-dot {
                            left: -32px;
                            width: 32px;
                            height: 32px;
                            font-size: 0.92rem;
                            padding: 0 2px;
                        }
                        .timeline-day {
                            font-size: 0.92rem;
                        }
                        .timeline-vertical-content {
                            padding: 12px 12px;
                            font-size: 0.98rem;
                        }
                        .review-avatar {
                            width: 36px;
                            height: 36px;
                            font-size: 1rem;
                        }
                        .review-card {
                            border-radius: 10px;
                        }
                        .info-card {
                            border-radius: 10px;
                        }
                    }
                `}
            </style>
        </section>
    );
}

export default TourDetail;
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

    if (!tour) {
        return <div className="text-center mt-5">Tour không tồn tại.</div>;
    }

    const handleBookTour = () => {
        navigate(`/tours/${id}/book`);
    };

    const handleReviewTour = () => {
        navigate(`/tours/${id}/review`);
    };

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span key={i} style={{ color: i <= Math.floor(rating) ? '#ffd700' : '#e4e4e4', fontSize: '1.2rem' }}>
                    ★
                </span>
            );
        }
        return stars;
    };

    return (
        <section className="tour-detail-section py-5">
            <div className="container">
                <h1 className="text-center mb-4">{tour.title}</h1>

                <div className="row align-items-start">
                    <div className="col-md-6 mb-4">
                        <img
                            src={tour.image}
                            alt={tour.title}
                            className="img-fluid rounded shadow-sm"
                            style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                        />
                    </div>
                    <div className="col-md-6">
                        <p className="lead mb-3">{tour.description}</p>
                        <ul className="list-unstyled mb-3">
                            <li><b>📍 Địa điểm:</b> {tour.location}</li>
                            <li><b>⏱ Thời gian:</b> {tour.duration} ngày</li>
                            <li><b>💰 Giá:</b> {tour.price.toLocaleString()} VNĐ</li>
                            <li><b>🔥 Độ phổ biến:</b> {tour.popularity} lượt xem</li>
                        </ul>
                        <div className="d-flex gap-3 mb-3 flex-wrap">
                            <button className="btn btn-success" onClick={handleBookTour}>
                                Đặt tour ngay
                            </button>
                            <button className="btn btn-info" onClick={handleReviewTour}>
                                Đánh giá Tour
                            </button>
                        </div>
                    </div>
                </div>

                {/* Lịch trình */}
                <div className="mt-5">
                    <h2 className="mb-5">🗓 Lịch trình chi tiết</h2>
                    <div className="schedule-timeline">
                        {tour.schedule.map((item, index) => (
                            <div key={index} className="timeline-item">
                                <div className="timeline-dot">
                                    <span className="dot-icon">📅</span>
                                </div>
                                <div className="timeline-content p-3 rounded shadow-sm">
                                    <h5 className="text-primary mb-2">Phần {index + 1}</h5>
                                    <p>{item}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Đánh giá */}
                <div className="mt-5">
                    <h2 className="mb-5">⭐ Đánh giá từ khách hàng</h2>
                    <div className="reviews-grid">
                        {tour.reviews.length > 0 ? (
                            tour.reviews.map((review, index) => (
                                <div key={index} className="review-card p-3 rounded shadow-sm">
                                    <div className="d-flex align-items-center mb-2">
                                        <div className="avatar me-2">
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

                <div className="text-center mt-5">
                    <button className="btn btn-primary" onClick={() => navigate('/tours')}>
                        Quay lại danh sách
                    </button>
                </div>
            </div>

            {/* CSS nội tuyến */}
            <style>
                {`
                    .tour-detail-section {
                        font-family: 'Be Vietnam Pro', 'Montserrat', Arial, sans-serif;
                        background-color: #f8f9fa;
                        color: #333;
                    }
                    .tour-detail-section h1,
                    .tour-detail-section h2 {
                        font-weight: 700;
                        color: #1e3a8a;
                    }

                    /* Lịch trình - Timeline */
                    .schedule-timeline {
                        position: relative;
                        max-width: 700px; 
                        margin: 0 auto;
                        padding-left: 30px; 
                    }
                    .schedule-timeline::before {
                        content: '';
                        position: absolute;
                        left: 15px; 
                        top: 0;
                        bottom: 0;
                        width: 2px;
                        background: #1e3a8a;
                    }
                    .timeline-item {
                        position: relative;
                        margin-bottom: 25px; 
                    }
                    .timeline-dot {
                        position: absolute;
                        left: -35px; 
                        top: 0;
                        width: 35px; 
                        height: 35px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    .dot-icon {
                        font-size: 1.3rem; 
                        color: #1e3a8a;
                        background: #fff;
                        border-radius: 50%;
                        padding: 4px; 
                        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1); 
                    }
                    .timeline-content {
                        background: #fff;
                        border-left: 4px solid #1e3a8a; 
                        padding: 10px; 
                        transition: transform 0.3s ease, box-shadow 0.3s ease;
                    }
                    .timeline-content:hover {
                        transform: translateX(8px); 
                        box-shadow: 0 4px 12px rgba(30, 58, 138, 0.2);
                    }

                    /* Đánh giá */
                    .reviews-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); 
                        gap: 15px; 
                    }
                    .review-card {
                        background: #fff;
                        border-radius: 8px; 
                        transition: transform 0.3s ease, box-shadow 0.3s ease;
                        position: relative;
                        overflow: hidden;
                    }
                    .review-card:hover {
                        transform: translateY(-4px); 
                        box-shadow: 0 4px 12px rgba(40, 167, 69, 0.2); 
                    }
                    .avatar {
                        width: 35px; 
                        height: 35px;
                        background: #1e3a8a;
                        color: #fff;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-weight: 600;
                        font-size: 1.1rem; 
                    }
                    .star-rating {
                        display: flex;
                        gap: 2px; 
                    }
                    .review-comment {
                        font-size: 0.9rem; 
                        line-height: 1.4; 
                        color: #555;
                        margin-bottom: 8px; 
                    }
                    .review-card::before {
                        width: 4px; 
                        background: #28a745;
                    }

                    /* Nút */
                    .btn-success, .btn-info, .btn-primary {
                        padding: 10px 20px;
                        border-radius: 25px;
                        transition: background-color 0.3s ease, transform 0.3s ease;
                    }
                    .btn-success {
                        background-color: #28a745;
                        border-color: #28a745;
                    }
                    .btn-success:hover {
                        background-color: #218838;
                        border-color: #1e7e34;
                        transform: translateY(-2px);
                    }
                    .btn-info {
                        background-color: #17a2b8;
                        border-color: #17a2b8;
                    }
                    .btn-info:hover {
                        background-color: #138496;
                        border-color: #117a8b;
                        transform: translateY(-2px);
                    }
                    .btn-primary {
                        background-color: #1e3a8a;
                        border-color: #1e3a8a;
                    }
                    .btn-primary:hover {
                        background-color: #163273;
                        border-color: #122a60;
                        transform: translateY(-2px);
                    }

                    /* Responsive */
                    @media (max-width: 768px) {
                        .schedule-timeline {
                            padding-left: 25px;
                        }
                        .schedule-timeline::before {
                            left: 12px;
                        }
                        .timeline-dot {
                            left: -30px;
                        }
                        .reviews-grid {
                            grid-template-columns: 1fr;
                        }
                    }
                `}
            </style>
        </section>
    );
}

export default TourDetail;
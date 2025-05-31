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
        navigate(`/tours/${id}/book`); // Chuyển hướng đến trang đặt tour
    };

    const handleReviewTour = () => {
        navigate(`/tours/${id}/review`); // Chuyển hướng đến trang đánh giá 
    };

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span key={i} style={{ color: i <= Math.floor(rating) ? '#ffd700' : '#e4e4e4' }}>
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
                        <div className="d-flex gap-3 mb-3">
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
                    <h2 className="mb-4">🗓 Lịch trình</h2>
                    <div className="row row-cols-1 row-cols-md-2 g-4">
                        {tour.schedule.map((item, index) => (
                            <div key={index} className="col">
                                <div className="schedule-card p-3 rounded shadow-sm">
                                    <h5 className="text-primary">Phần {index + 1}</h5>
                                    <p className="mb-0">{item}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Đánh giá */}
                <div className="mt-5">
                    <h2 className="mb-4">⭐ Đánh giá</h2>
                    <div className="row row-cols-1 g-4">
                        {tour.reviews.map((review, index) => (
                            <div key={index} className="col">
                                <div className="review-card p-3 rounded shadow-sm">
                                    <h5 className="card-title mb-2">{review.user}</h5>
                                    <div className="mb-2">{renderStars(review.rating)}</div>
                                    <p className="card-text mb-0">{review.comment}</p>
                                </div>
                            </div>
                        ))}
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
                        font-weight: bold;
                        color: #1e3a8a;
                    }
                    .schedule-card {
                        background: #fff;
                        border-left: 4px solid #1e3a8a;
                        transition: box-shadow 0.3s ease;
                    }
                    .schedule-card:hover {
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    }
                    .review-card {
                        background: #fff;
                        border-left: 4px solid #28a745;
                        transition: box-shadow 0.3s ease;
                    }
                    .review-card:hover {
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    }
                    .btn-success {
                        background-color: #28a745;
                        border-color: #28a745;
                        padding: 10px 20px;
                        border-radius: 25px;
                        transition: background-color 0.3s ease, transform 0.3s ease;
                    }
                    .btn-success:hover {
                        background-color: #218838;
                        border-color: #1e7e34;
                        transform: translateY(-2px);
                    }
                    .btn-info {
                        background-color: #17a2b8;
                        border-color: #17a2b8;
                        padding: 10px 20px;
                        border-radius: 25px;
                        transition: background-color 0.3s ease, transform 0.3s ease;
                    }
                    .btn-info:hover {
                        background-color: #138496;
                        border-color: #117a8b;
                        transform: translateY(-2px);
                    }
                    .btn-primary {
                        background-color: #1e3a8a;
                        border-color: #1e3a8a;
                        padding: 10px 20px;
                        border-radius: 25px;
                        transition: background-color 0.3s ease, transform 0.3s ease;
                    }
                    .btn-primary:hover {
                        background-color: #163273;
                        border-color: #122a60;
                        transform: translateY(-2px);
                    }
                    @media (max-width: 768px) {
                        .row-cols-md-2 {
                            flex-direction: column;
                        }
                    }
                `}
            </style>
        </section>
    );
}

export default TourDetail;
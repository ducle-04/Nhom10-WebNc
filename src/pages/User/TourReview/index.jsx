import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toursData } from '../../../data/toursData';

function TourReview() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [tour, setTour] = useState(null);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const selectedTour = toursData.find((t) => t.id === parseInt(id));
        setTour(selectedTour);
    }, [id]);

    const handleRating = (rate) => {
        setRating(rate);
        setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (rating === 0) {
            setError('Vui lòng chọn số sao để đánh giá.');
            return;
        }
        if (!comment.trim()) {
            setError('Vui lòng nhập bình luận.');
            return;
        }

        const updatedTour = {
            ...tour,
            reviews: [
                ...tour.reviews,
                { user: "Người dùng mới", rating, comment, date: new Date().toLocaleDateString() },
            ],
        };
        const tourIndex = toursData.findIndex((t) => t.id === parseInt(id));
        if (tourIndex !== -1) {
            toursData[tourIndex] = updatedTour;
        }

        setRating(0);
        setComment('');
        setError('');
        alert('Cảm ơn bạn đã đánh giá!');
        navigate(`/tours/${id}`);
    };

    if (!tour) return <div className="text-center mt-5">Tour không tồn tại.</div>;

    return (
        <section className="tour-review-section py-5">
            <div className="container">
                <div className="form-wrapper mx-auto bg-white rounded-4 shadow p-4 p-md-5" style={{ maxWidth: 700 }}>
                    <h2 className="text-center fw-bold mb-4 " style={{ color: '#1e40af' }}>Đánh giá tour: {tour.title}</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="form-label fw-semibold">Xếp hạng của bạn:</label>
                            <div className="star-rating">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span
                                        key={star}
                                        className="star"
                                        onClick={() => handleRating(star)}
                                        style={{
                                            cursor: 'pointer',
                                            color: star <= rating ? '#facc15' : '#e4e4e4',
                                            fontSize: '2rem',
                                        }}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="form-label fw-semibold">Bình luận:</label>
                            <textarea
                                className="form-control rounded-4 px-4 py-3"
                                rows="4"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Viết đánh giá của bạn..."
                                required
                            />
                        </div>

                        {error && <div className="alert alert-danger mb-4">{error}</div>}

                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary btn-lg rounded-pill fw-semibold shadow-sm">
                                Gửi đánh giá
                            </button>
                        </div>
                    </form>

                    <div className="text-center mt-4">
                        <button className="btn btn-outline-secondary rounded-pill px-4 py-2" onClick={() => navigate(`/tours/${id}`)}>
                            ← Quay lại chi tiết tour
                        </button>
                    </div>
                </div>
            </div>

            {/* CSS nội tuyến */}
            <style>
                {`
                    .tour-review-section {
                        background: linear-gradient(to right, #f0f4f8, #fdfdfd);
                        font-family: 'Be Vietnam Pro', 'Montserrat', sans-serif;
                        min-height: 100vh;
                    }

                    .form-wrapper textarea:focus {
                        border-color: #1e40af;
                        box-shadow: 0 0 0 0.15rem rgba(30, 64, 175, 0.25);
                    }

                    .star-rating {
                        display: flex;
                        gap: 10px;
                    }

                    .star {
                        transition: transform 0.2s ease, color 0.2s;
                    }

                    .star:hover {
                        transform: scale(1.2);
                    }

                    .btn-primary {
                        background-color: #1e3a8a;
                        border-color: #1e3a8a;
                        transition: background-color 0.3s, transform 0.2s;
                    }

                    .btn-primary:hover {
                        background-color: #163273;
                        transform: translateY(-2px);
                    }

                    .btn-outline-secondary:hover {
                        background-color: #6c757d;
                        color: white;
                        transform: translateY(-2px);
                    }
                `}
            </style>
        </section>
    );
}

export default TourReview;

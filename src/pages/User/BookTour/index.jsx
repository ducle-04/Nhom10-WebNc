import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toursData } from '../../../data/toursData';

function BookTour() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [tour, setTour] = useState(null);
    const [formData, setFormData] = useState({
        numberOfPeople: 1,
        startDate: '',
        note: '',
        paymentMethod: 'cash',
    });

    useEffect(() => {
        const selectedTour = toursData.find((t) => t.id === parseInt(id));
        setTour(selectedTour);
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const bookingDetails = {
            tourId: id,
            tourTitle: tour.title,
            ...formData,
            totalPrice: tour.price * formData.numberOfPeople,
        };
        console.log("Booking details:", bookingDetails);
        alert(`Yêu cầu đặt tour "${tour.title}" đã được gửi thành công!\nTổng chi phí: ${bookingDetails.totalPrice.toLocaleString()} VNĐ\nChúng tôi sẽ liên hệ với bạn sớm.`);
        navigate('/tours');
    };

    if (!tour) {
        return <div className="text-center mt-5">Tour không tồn tại.</div>;
    }

    return (
        <section className="book-tour-section py-5">
            <div className="container">
                <h1 className="text-center mb-5">Đặt Tour: {tour.title}</h1>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card shadow-lg">
                            <h4 className="mb-4">Thông tin đặt tour</h4>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <p><b>Địa điểm:</b> {tour.location}</p>
                                    <p><b>Thời gian:</b> {tour.duration} ngày</p>
                                    <p><b>Giá mỗi người:</b> {tour.price.toLocaleString()} VNĐ</p>
                                </div>
                                <div className="col-md-6">
                                    <p><b>Tổng chi phí (tạm tính):</b> <span id="totalPrice">{(tour.price * formData.numberOfPeople).toLocaleString()} VNĐ</span></p>
                                </div>
                            </div>

                            <div className="form-section">
                                <div className="mb-3">
                                    <label className="form-label">Số lượng người:</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="numberOfPeople"
                                        id="numberOfPeople"
                                        value={formData.numberOfPeople}
                                        onChange={handleChange}
                                        min="1"
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Ngày đi:</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="startDate"
                                        value={formData.startDate}
                                        onChange={handleChange}
                                        min={new Date().toISOString().split('T')[0]}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Ghi chú:</label>
                                    <textarea
                                        className="form-control"
                                        name="note"
                                        value={formData.note}
                                        onChange={handleChange}
                                        rows="4"
                                        placeholder="Nhập ghi chú nếu có (ví dụ: yêu cầu đặc biệt, thông tin liên hệ...)"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label">Phương thức thanh toán:</label>
                                    <select
                                        className="form-select"
                                        name="paymentMethod"
                                        value={formData.paymentMethod}
                                        onChange={handleChange}
                                    >
                                        <option value="cash">Tiền mặt</option>
                                        <option value="bank_transfer">Chuyển khoản ngân hàng</option>
                                        <option value="credit_card">Thẻ tín dụng</option>
                                    </select>
                                </div>

                                <div className="d-flex justify-content-between">
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => navigate(`/tours/${id}`)}
                                    >
                                        Quay lại
                                    </button>
                                    <button className="btn btn-success" onClick={handleSubmit}>
                                        Gửi yêu cầu đặt tour
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>
                {`
                    .book-tour-section {
                        font-family: 'Be Vietnam Pro', 'Montserrat', Arial, sans-serif;
                        background: linear-gradient(to bottom, #f0f4f8, #ffffff);
                        color: #2d3748;
                        min-height: 100vh;
                        padding: 3rem 1rem;
                    }
                    .book-tour-section .container {
                        max-width: 1100px;
                        margin: 0 auto;
                    }
                    .book-tour-section h1 {
                        font-size: 2.25rem;
                        font-weight: 700;
                        color: #1e40af;
                        margin-bottom: 2.5rem;
                        text-align: center;
                        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.05);
                    }
                    .book-tour-section h4 {
                        font-size: 1.5rem;
                        font-weight: 600;
                        color: #1e40af;
                        margin-bottom: 1.5rem;
                        padding-left: 1.5rem;
                        border-left: 4px solid #1e40af;
                    }
                    .book-tour-section .card {
                        background: #ffffff;
                        border: none;
                        border-radius: 16px;
                        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
                        padding: 2rem;
                        transition: transform 0.3s ease, box-shadow 0.3s ease;
                    }
                    .book-tour-section .card:hover {
                        transform: translateY(-5px);
                        box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
                    }
                    .book-tour-section p {
                        font-size: 1rem;
                        color: #4a5568;
                        margin-bottom: 0.75rem;
                    }
                    .book-tour-section p b {
                        color: #2d3748;
                        font-weight: 600;
                    }
                    .book-tour-section .form-section {
                        margin-top: 1.5rem;
                    }
                    .book-tour-section .form-label {
                        font-size: 1rem;
                        font-weight: 600;
                        color: #1e40af;
                        margin-bottom: 0.5rem;
                        display: block;
                    }
                    .book-tour-section .form-control,
                    .book-tour-section .form-select {
                        border-radius: 8px;
                        border: 1px solid #e2e8f0;
                        padding: 0.75rem 1rem;
                        font-size: 1rem;
                        color: #2d3748;
                        background: #f7fafc;
                        transition: border-color 0.3s ease, box-shadow 0.3s ease;
                    }
                    .book-tour-section .form-control:focus,
                    .book-tour-section .form-select:focus {
                        border-color: #1e40af;
                        box-shadow: 0 0 0 3px rgba(30, 64, 175, 0.1);
                        outline: none;
                    }
                    .book-tour-section textarea.form-control {
                        resize: vertical;
                    }
                    .book-tour-section .btn-success {
                        background: linear-gradient(to right, #28a745, #34d058);
                        border: none;
                        padding: 0.75rem 1.5rem;
                        font-size: 1rem;
                        font-weight: 600;
                        border-radius: 8px;
                        transition: background 0.3s ease, transform 0.2s ease;
                    }
                    .book-tour-section .btn-success:hover {
                        background: linear-gradient(to right, #218838, #2cb44a);
                        transform: translateY(-2px);
                    }
                    .book-tour-section .btn-primary {
                        background: linear-gradient(to right, #1e40af, #3b82f6);
                        border: none;
                        padding: 0.75rem 1.5rem;
                        font-size: 1rem;
                        font-weight: 600;
                        border-radius: 8px;
                        transition: background 0.3s ease, transform 0.2s ease;
                    }
                    .book-tour-section .btn-primary:hover {
                        background: linear-gradient(to right, #1e3a8a, #2563eb);
                        transform: translateY(-2px);
                    }
                    @media (max-width: 768px) {
                        .book-tour-section .card {
                            padding: 1.5rem;
                        }
                        .book-tour-section h1 {
                            font-size: 1.75rem;
                        }
                        .book-tour-section h4 {
                            font-size: 1.25rem;
                        }
                        .book-tour-section .row {
                            flex-direction: column;
                        }
                        .book-tour-section .col-md-6 {
                            margin-bottom: 1rem;
                        }
                    }
                `}
            </style>
            {/* Thêm script jQuery để tính tổng chi phí */}
            <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
            <script dangerouslySetInnerHTML={{
                __html: `
                $(document).ready(function() {
                    var pricePerPerson = ${tour.price};
                    $('#numberOfPeople').on('input', function() {
                        var num = parseInt($(this).val()) || 1;
                        if(num < 1) num = 1;
                        var total = pricePerPerson * num;
                        $('#totalPrice').text(total.toLocaleString() + ' VNĐ');
                    });
                });
                `
            }} />
        </section>
    );
}

export default BookTour;
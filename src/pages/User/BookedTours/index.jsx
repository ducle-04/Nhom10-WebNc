import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function BookedTours() {
    const [bookedTours, setBookedTours] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editData, setEditData] = useState({});

    useEffect(() => {
        // Lấy thông tin tour đã đặt từ localStorage (dữ liệu được lưu khi đặt tour)
        let tours = [];
        try {
            const stored = localStorage.getItem('bookedTours');
            if (stored) {
                tours = JSON.parse(stored);
            }
        } catch {}
        setBookedTours(Array.isArray(tours) ? tours : []);
    }, []);

    // Xử lý hủy tour
    const handleCancel = (idx) => {
        if (window.confirm('Bạn có chắc chắn muốn hủy tour này?')) {
            const updated = bookedTours.filter((_, i) => i !== idx);
            setBookedTours(updated);
            localStorage.setItem('bookedTours', JSON.stringify(updated));
        }
    };

    // Bắt đầu chỉnh sửa
    const handleEdit = (idx) => {
        setEditingIndex(idx);
        setEditData({ ...bookedTours[idx] });
    };

    // Hủy chỉnh sửa
    const handleCancelEdit = () => {
        setEditingIndex(null);
        setEditData({});
    };

    // Lưu chỉnh sửa
    const handleSaveEdit = (idx) => {
        const updated = bookedTours.map((tour, i) => (i === idx ? { ...tour, ...editData } : tour));
        setBookedTours(updated);
        localStorage.setItem('bookedTours', JSON.stringify(updated));
        setEditingIndex(null);
        setEditData({});
        alert('Cập nhật thông tin tour thành công!');
    };

    // Xử lý thay đổi input khi chỉnh sửa
    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <section className="booked-tours-section py-5">
            <div className="container">
                <h1 className="text-center mb-5 fw-bold text-gradient">Hóa Đơn Đặt Tour</h1>
                {bookedTours.length === 0 ? (
                    <p className="text-center text-muted">Bạn chưa đặt tour nào.</p>
                ) : (
                    <div className="row g-4">
                        {bookedTours.map((tour, idx) => (
                            <div key={tour.id || idx} className="col-12">
                                <div className="invoice-card shadow-lg rounded-4 mb-4 p-4 position-relative">
                                    <div className="row align-items-center">
                                        <div className="col-md-3 text-center mb-3 mb-md-0">
                                            <img
                                                src={tour.image}
                                                alt={tour.title}
                                                className="invoice-img"
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            {editingIndex === idx ? (
                                                <>
                                                    <input
                                                        className="form-control mb-2"
                                                        name="title"
                                                        value={editData.title}
                                                        onChange={handleEditChange}
                                                    />
                                                    <textarea
                                                        className="form-control mb-2"
                                                        name="description"
                                                        value={editData.description}
                                                        onChange={handleEditChange}
                                                    />
                                                    <input
                                                        className="form-control mb-2"
                                                        name="location"
                                                        value={editData.location}
                                                        onChange={handleEditChange}
                                                    />
                                                    <input
                                                        className="form-control mb-2"
                                                        name="duration"
                                                        type="number"
                                                        min="1"
                                                        value={editData.duration}
                                                        onChange={handleEditChange}
                                                    />
                                                    <input
                                                        className="form-control mb-2"
                                                        name="price"
                                                        type="number"
                                                        min="0"
                                                        value={editData.price}
                                                        onChange={handleEditChange}
                                                    />
                                                    <div className="d-flex justify-content-between">
                                                        <button className="btn btn-success" onClick={() => handleSaveEdit(idx)}>
                                                            Lưu
                                                        </button>
                                                        <button className="btn btn-secondary" onClick={handleCancelEdit}>
                                                            Hủy
                                                        </button>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <h4 className="fw-bold mb-2">{tour.title || `Tour #${tour.id}`}</h4>
                                                    <div className="mb-2 text-muted">{tour.description}</div>
                                                    <div className="mb-1"><b>Địa điểm:</b> {tour.location}</div>
                                                    <div className="mb-1"><b>Thời gian:</b> {tour.duration} ngày</div>
                                                    <div className="mb-1"><b>Mã tour:</b> {tour.id}</div>
                                                </>
                                            )}
                                        </div>
                                        <div className="col-md-3 text-end">
                                            <div className="invoice-total mb-2">
                                                <span className="fw-bold">Tổng tiền:</span>
                                                <span className="text-success ms-2 fs-5">{tour.price ? tour.price.toLocaleString() : ''} VNĐ</span>
                                            </div>
                                            {editingIndex !== idx && (
                                                <div className="d-flex flex-column gap-2">
                                                    <Link to={`/tours/${tour.id}`} className="btn btn-gradient w-100">
                                                        Xem chi tiết
                                                    </Link>
                                                    <button className="btn btn-warning w-100" onClick={() => handleEdit(idx)}>
                                                        Chỉnh sửa
                                                    </button>
                                                    <button className="btn btn-danger w-100" onClick={() => handleCancel(idx)}>
                                                        Hủy tour
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="invoice-barcode mt-4 text-center">
                                        <span className="barcode">
                                            {String(tour.id).padStart(10, '0')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <div className="text-center mt-5">
                    <Link to="/tours" className="btn btn-outline-secondary px-4 py-2">
                        Quay lại danh sách tour
                    </Link>
                </div>
            </div>
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
                    .booked-tours-section {
                        font-family: 'Inter', 'Montserrat', Arial, sans-serif;
                        background: linear-gradient(120deg, #f8fafc 60%, #e0e7ff 100%);
                        min-height: 100vh;
                    }
                    .invoice-card {
                        background: #fff;
                        border-radius: 18px;
                        border: none;
                        box-shadow: 0 4px 18px rgba(30,58,138,0.09);
                        transition: box-shadow 0.3s, transform 0.2s;
                        margin-bottom: 32px;
                        padding: 32px 24px;
                        position: relative;
                    }
                    .invoice-card:hover {
                        box-shadow: 0 12px 32px rgba(59,130,246,0.13);
                        transform: translateY(-4px) scale(1.01);
                    }
                    .invoice-img {
                        width: 100%;
                        max-width: 180px;
                        height: 120px;
                        object-fit: cover;
                        border-radius: 12px;
                        box-shadow: 0 2px 8px rgba(30,58,138,0.07);
                    }
                    .invoice-total {
                        font-size: 1.15rem;
                        margin-bottom: 12px;
                    }
                    .invoice-barcode {
                        margin-top: 18px;
                        font-family: 'Courier New', Courier, monospace;
                        font-size: 1.1rem;
                        letter-spacing: 4px;
                        color: #888;
                        opacity: 0.7;
                        user-select: all;
                    }
                    @media (max-width: 991px) {
                        .invoice-card {
                            padding: 18px 8px;
                        }
                        .invoice-img {
                            max-width: 100%;
                            height: 90px;
                        }
                    }
                `}
            </style>
        </section>
    );
}

export default BookedTours;

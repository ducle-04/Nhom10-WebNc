import React, { useState } from 'react';
import { FaSearch, FaEye, FaTrash } from 'react-icons/fa';
import { Button, Modal } from 'react-bootstrap';

const mockReviews = [
  {
    id: 1,
    customer: 'Nguyễn Văn A',
    tour: 'Tour Sapa 3N2Đ',
    rating: 5,
    comment: 'Rất tuyệt vời, hướng dẫn viên nhiệt tình!',
    date: '2024-07-11',
    status: 'approved',
  },
  {
    id: 2,
    customer: 'Trần Thị B',
    tour: 'Tour Phú Quốc 4N3Đ',
    rating: 4,
    comment: 'Dịch vụ tốt, cảnh đẹp, sẽ quay lại.',
    date: '2024-07-09',
    status: 'pending',
  },
  {
    id: 3,
    customer: 'Lê Văn C',
    tour: 'Tour Đà Lạt 2N1Đ',
    rating: 3,
    comment: 'Chuyến đi ổn, nhưng thời tiết không thuận lợi.',
    date: '2024-07-05',
    status: 'rejected',
  },
];

const statusMap = {
  approved: { label: 'Đã duyệt', color: 'success' },
  pending: { label: 'Chờ duyệt', color: 'warning' },
  rejected: { label: 'Từ chối', color: 'danger' },
};

function ReviewManager() {
  const [reviews, setReviews] = useState(mockReviews);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Xem chi tiết
  const handleShowDetail = review => {
    setSelected(review);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setSelected(null);
  };

  // Xóa phản hồi
  const handleDelete = id => {
    if (window.confirm('Bạn có chắc chắn muốn xóa phản hồi này?')) {
      setReviews(prev => prev.filter(r => r.id !== id));
    }
  };

  // Lọc phản hồi
  const filtered = reviews.filter(
    r =>
      r.customer.toLowerCase().includes(search.toLowerCase()) ||
      r.tour.toLowerCase().includes(search.toLowerCase()) ||
      r.comment.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container-fluid py-3">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3 gap-2">
        <h3 className="fw-bold text-primary mb-0">Quản lý Phản hồi / Đánh giá</h3>
        <div className="input-group" style={{maxWidth: 320}}>
          <span className="input-group-text bg-white"><FaSearch /></span>
          <input
            type="text"
            className="form-control"
            placeholder="Tìm khách, tour hoặc nội dung..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-hover align-middle bg-white rounded shadow-sm">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Khách hàng</th>
              <th>Tour</th>
              <th>Đánh giá</th>
              <th>Bình luận</th>
              <th>Ngày gửi</th>
              <th>Trạng thái</th>
              <th style={{width: 100}}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center text-muted">Không có phản hồi phù hợp</td>
              </tr>
            ) : (
              filtered.map((r, idx) => (
                <tr key={r.id}>
                  <td>{idx + 1}</td>
                  <td>{r.customer}</td>
                  <td>{r.tour}</td>
                  <td>
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <span key={i} style={{color: '#ffc107'}}>★</span>
                    ))}
                  </td>
                  <td>{r.comment}</td>
                  <td>{r.date}</td>
                  <td>
                    <span className={`badge bg-${statusMap[r.status].color}`}>
                      {statusMap[r.status].label}
                    </span>
                  </td>
                  <td>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                      onClick={() => handleShowDetail(r)}
                      title="Xem chi tiết"
                    >
                      <FaEye />
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(r.id)}
                      title="Xóa"
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal chi tiết phản hồi */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Chi tiết Phản hồi / Đánh giá</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selected && (
            <div>
              <p><b>Khách hàng:</b> {selected.customer}</p>
              <p><b>Tour:</b> {selected.tour}</p>
              <p><b>Đánh giá:</b> {Array.from({ length: selected.rating }).map((_, i) => (
                <span key={i} style={{color: '#ffc107'}}>★</span>
              ))}</p>
              <p><b>Bình luận:</b> {selected.comment}</p>
              <p><b>Ngày gửi:</b> {selected.date}</p>
              <p><b>Trạng thái:</b> <span className={`badge bg-${statusMap[selected.status].color}`}>{statusMap[selected.status].label}</span></p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ReviewManager;

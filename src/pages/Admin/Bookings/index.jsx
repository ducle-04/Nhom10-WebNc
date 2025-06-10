import React, { useState } from 'react';
import { FaSearch, FaCheckCircle, FaTimesCircle, FaEye, FaClipboardList, FaHourglassHalf, FaBan } from 'react-icons/fa';
import { Button, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';

// Mock data cho các booking tour (nhiều hơn)
const mockBookings = [
  {
    id: 1,
    customer: 'Nguyễn Văn A',
    tour: 'Tour Sapa 3N2Đ',
    date: '2024-07-10',
    status: 'pending',
    phone: '0987654321',
    people: 2,
    note: 'Yêu cầu phòng đôi',
  },
  {
    id: 2,
    customer: 'Trần Thị B',
    tour: 'Tour Phú Quốc 4N3Đ',
    date: '2024-08-01',
    status: 'confirmed',
    phone: '0912345678',
    people: 4,
    note: '',
  },
  {
    id: 3,
    customer: 'Lê Văn C',
    tour: 'Tour Đà Lạt 2N1Đ',
    date: '2024-07-20',
    status: 'cancelled',
    phone: '0909123456',
    people: 1,
    note: 'Khách hủy do bận việc',
  },
  {
    id: 4,
    customer: 'Phạm Thị D',
    tour: 'Tour Hạ Long 3N2Đ',
    date: '2024-09-05',
    status: 'pending',
    phone: '0978123456',
    people: 3,
    note: '',
  },
  {
    id: 5,
    customer: 'Vũ Minh E',
    tour: 'Tour Nha Trang 5N4Đ',
    date: '2024-06-25',
    status: 'confirmed',
    phone: '0967123456',
    people: 2,
    note: 'Ăn chay',
  },
  {
    id: 6,
    customer: 'Đặng Thị F',
    tour: 'Tour Hội An 2N1Đ',
    date: '2024-08-15',
    status: 'pending',
    phone: '0956123456',
    people: 1,
    note: '',
  },
  {
    id: 7,
    customer: 'Ngô Văn G',
    tour: 'Tour Huế 3N2Đ',
    date: '2024-07-30',
    status: 'confirmed',
    phone: '0945123456',
    people: 5,
    note: '',
  },
  {
    id: 8,
    customer: 'Bùi Thị H',
    tour: 'Tour Cần Thơ 2N1Đ',
    date: '2024-06-18',
    status: 'cancelled',
    phone: '0934123456',
    people: 2,
    note: 'Đổi ngày nếu được',
  },
];

const statusMap = {
  pending: { label: 'Chờ xác nhận', color: 'warning', icon: <FaHourglassHalf /> },
  confirmed: { label: 'Đã xác nhận', color: 'success', icon: <FaCheckCircle /> },
  cancelled: { label: 'Đã hủy', color: 'danger', icon: <FaTimesCircle /> },
};

function BookingsManager() {
  const [bookings, setBookings] = useState(mockBookings);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Tổng quan nhanh
  const total = bookings.length;
  const confirmed = bookings.filter(b => b.status === 'confirmed').length;
  const pending = bookings.filter(b => b.status === 'pending').length;
  const cancelled = bookings.filter(b => b.status === 'cancelled').length;

  // Xem chi tiết booking
  const handleShowDetail = booking => {
    setSelected(booking);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setSelected(null);
  };

  // Xác nhận booking
  const handleConfirm = id => {
    setBookings(prev =>
      prev.map(b =>
        b.id === id ? { ...b, status: 'confirmed' } : b
      )
    );
  };

  // Hủy booking
  const handleCancel = id => {
    setBookings(prev =>
      prev.map(b =>
        b.id === id ? { ...b, status: 'cancelled' } : b
      )
    );
  };

  // Lọc booking
  const filtered = bookings.filter(
    b =>
      b.customer.toLowerCase().includes(search.toLowerCase()) ||
      b.tour.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container-fluid py-3">
      {/* Tổng quan nhanh */}
      <div className="row g-3 mb-4">
        <div className="col-6 col-md-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body d-flex align-items-center gap-3">
              <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center" style={{width: 40, height: 40, fontSize: 18}}>
                <FaClipboardList />
              </div>
              <div>
                <div className="fw-bold fs-6">{total}</div>
                <div className="small text-muted">Tổng booking</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body d-flex align-items-center gap-3">
              <div className="bg-success bg-opacity-10 text-success rounded-circle d-flex align-items-center justify-content-center" style={{width: 40, height: 40, fontSize: 18}}>
                <FaCheckCircle />
              </div>
              <div>
                <div className="fw-bold fs-6">{confirmed}</div>
                <div className="small text-muted">Đã xác nhận</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body d-flex align-items-center gap-3">
              <div className="bg-warning bg-opacity-10 text-warning rounded-circle d-flex align-items-center justify-content-center" style={{width: 40, height: 40, fontSize: 18}}>
                <FaHourglassHalf />
              </div>
              <div>
                <div className="fw-bold fs-6">{pending}</div>
                <div className="small text-muted">Chờ xác nhận</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body d-flex align-items-center gap-3">
              <div className="bg-danger bg-opacity-10 text-danger rounded-circle d-flex align-items-center justify-content-center" style={{width: 40, height: 40, fontSize: 18}}>
                <FaBan />
              </div>
              <div>
                <div className="fw-bold fs-6">{cancelled}</div>
                <div className="small text-muted">Đã hủy</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3 gap-2">
        <h3 className="fw-bold text-primary mb-0">Quản lý Đơn Đặt Tour</h3>
        <div className="input-group shadow-sm rounded" style={{maxWidth: 340}}>
          <span className="input-group-text bg-white border-0"><FaSearch /></span>
          <input
            type="text"
            className="form-control border-0"
            style={{background: "#f8f9fa"}}
            placeholder="Tìm khách hoặc tour..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-hover align-middle bg-white rounded-4 shadow-sm overflow-hidden">
          <thead className="table-light">
            <tr style={{background: "#f1f3f6"}}>
              <th className="text-secondary">#</th>
              <th className="text-secondary">Khách hàng</th>
              <th className="text-secondary">Tour</th>
              <th className="text-secondary">Ngày đi</th>
              <th className="text-secondary">Số người</th>
              <th className="text-secondary">Điện thoại</th>
              <th className="text-secondary text-center">Trạng thái</th>
              <th className="text-secondary">Ghi chú</th>
              <th style={{width: 160}} className="text-secondary text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center text-muted py-4">Không có đơn đặt tour phù hợp</td>
              </tr>
            ) : (
              filtered.map((b, idx) => (
                <tr key={b.id} className="align-middle" style={{transition: 'background 0.2s'}}>
                  <td>{idx + 1}</td>
                  <td className="fw-semibold">{b.customer}</td>
                  <td>{b.tour}</td>
                  <td>{b.date}</td>
                  <td>{b.people}</td>
                  <td>{b.phone}</td>
                  <td className="text-center">
                    <span
                      className={`badge px-3 py-2 bg-${statusMap[b.status].color} d-inline-flex align-items-center gap-1`}
                      style={{
                        fontSize: 14,
                        borderRadius: 12,
                        boxShadow: '0 1px 4px rgba(0,0,0,0.04)'
                      }}
                    >
                      {statusMap[b.status].icon}
                      <span>{statusMap[b.status].label}</span>
                    </span>
                  </td>
                  <td>{b.note || <span className="text-muted">-</span>}</td>
                  <td className="text-center">
                    <OverlayTrigger placement="top" overlay={<Tooltip>Xem chi tiết</Tooltip>}>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="me-2 rounded-circle"
                        style={{width: 34, height: 34, display: 'inline-flex', alignItems: 'center', justifyContent: 'center'}}
                        onClick={() => handleShowDetail(b)}
                      >
                        <FaEye />
                      </Button>
                    </OverlayTrigger>
                    {b.status === 'pending' && (
                      <>
                        <OverlayTrigger placement="top" overlay={<Tooltip>Xác nhận</Tooltip>}>
                          <Button
                            variant="outline-success"
                            size="sm"
                            className="me-2 rounded-circle"
                            style={{width: 34, height: 34, display: 'inline-flex', alignItems: 'center', justifyContent: 'center'}}
                            onClick={() => handleConfirm(b.id)}
                          >
                            <FaCheckCircle />
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger placement="top" overlay={<Tooltip>Hủy</Tooltip>}>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            className="rounded-circle"
                            style={{width: 34, height: 34, display: 'inline-flex', alignItems: 'center', justifyContent: 'center'}}
                            onClick={() => handleCancel(b.id)}
                          >
                            <FaTimesCircle />
                          </Button>
                        </OverlayTrigger>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal chi tiết booking */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton className="bg-primary bg-opacity-10 border-0">
          <Modal.Title className="fw-bold text-primary">Chi tiết Đơn Đặt Tour</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selected && (
            <div className="px-1">
              <div className="mb-2">
                <span className="fw-semibold">Khách hàng:</span> <span>{selected.customer}</span>
              </div>
              <div className="mb-2">
                <span className="fw-semibold">Tour:</span> <span>{selected.tour}</span>
              </div>
              <div className="mb-2">
                <span className="fw-semibold">Ngày đi:</span> <span>{selected.date}</span>
              </div>
              <div className="mb-2">
                <span className="fw-semibold">Số người:</span> <span>{selected.people}</span>
              </div>
              <div className="mb-2">
                <span className="fw-semibold">Điện thoại:</span> <span>{selected.phone}</span>
              </div>
              <div className="mb-2">
                <span className="fw-semibold">Trạng thái:</span>{' '}
                <span className={`badge bg-${statusMap[selected.status].color} px-3 py-2`}>
                  {statusMap[selected.status].label}
                </span>
              </div>
              <div className="mb-2">
                <span className="fw-semibold">Ghi chú:</span> {selected.note || <span className="text-muted">Không có</span>}
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button variant="secondary" onClick={handleCloseModal}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default BookingsManager;

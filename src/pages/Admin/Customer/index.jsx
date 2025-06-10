import React, { useState } from 'react';
import { FaSearch, FaEye, FaTrash, FaUser } from 'react-icons/fa';
import { Button, Modal } from 'react-bootstrap';

const mockCustomers = [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    email: 'vana@gmail.com',
    phone: '0987654321',
    address: 'Hà Nội',
    totalBookings: 3,
    status: 'active',
  },
  {
    id: 2,
    name: 'Trần Thị B',
    email: 'thib@gmail.com',
    phone: '0912345678',
    address: 'Hồ Chí Minh',
    totalBookings: 5,
    status: 'active',
  },
  {
    id: 3,
    name: 'Lê Văn C',
    email: 'vanc@gmail.com',
    phone: '0909123456',
    address: 'Đà Nẵng',
    totalBookings: 1,
    status: 'inactive',
  },
];

function CustomerManager() {
  const [customers, setCustomers] = useState(mockCustomers);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Xem chi tiết khách hàng
  const handleShowDetail = customer => {
    setSelected(customer);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setSelected(null);
  };

  // Xóa khách hàng
  const handleDelete = id => {
    if (window.confirm('Bạn có chắc chắn muốn xóa khách hàng này?')) {
      setCustomers(prev => prev.filter(c => c.id !== id));
    }
  };

  // Lọc khách hàng
  const filtered = customers.filter(
    c =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search)
  );

  return (
    <div className="container-fluid py-3">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-2">
        <div className="d-flex align-items-center gap-2">
          <FaUser size={28} className="text-primary" />
          <h3 className="fw-bold text-primary mb-0">Quản lý Khách hàng</h3>
        </div>
        <div className="input-group shadow-sm" style={{ maxWidth: 340 }}>
          <span className="input-group-text bg-white border-end-0"><FaSearch /></span>
          <input
            type="text"
            className="form-control border-start-0"
            placeholder="Tìm tên, email hoặc SĐT..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ borderLeft: 0 }}
          />
        </div>
      </div>
      <div className="card shadow-sm border-0 rounded-4">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Họ tên</th>
                  <th>Email</th>
                  <th>SĐT</th>
                  <th>Địa chỉ</th>
                  <th>Số lần đặt</th>
                  <th>Trạng thái</th>
                  <th style={{ width: 120 }}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center text-muted py-4">Không có khách hàng phù hợp</td>
                  </tr>
                ) : (
                  filtered.map((c, idx) => (
                    <tr key={c.id} style={{ background: idx % 2 === 0 ? "#f8fafc" : undefined }}>
                      <td>{idx + 1}</td>
                      <td className="fw-semibold">{c.name}</td>
                      <td>{c.email}</td>
                      <td>{c.phone}</td>
                      <td>{c.address}</td>
                      <td>
                        <span className="badge bg-info text-dark">{c.totalBookings}</span>
                      </td>
                      <td>
                        <span className={`badge bg-${c.status === 'active' ? 'success' : 'secondary'}`}>
                          {c.status === 'active' ? 'Hoạt động' : 'Ngừng'}
                        </span>
                      </td>
                      <td>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="me-2"
                          onClick={() => handleShowDetail(c)}
                          title="Xem chi tiết"
                        >
                          <FaEye />
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDelete(c.id)}
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
        </div>
      </div>
      {/* Modal chi tiết khách hàng */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <FaUser className="me-2 text-primary" />
            Chi tiết Khách hàng
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selected && (
            <div>
              <div className="mb-3 text-center">
                <FaUser size={48} className="text-primary mb-2" />
                <div className="fw-bold fs-5">{selected.name}</div>
                <div className="text-muted">{selected.email}</div>
              </div>
              <div className="row g-2">
                <div className="col-6"><b>SĐT:</b> <span className="text-secondary">{selected.phone}</span></div>
                <div className="col-6"><b>Địa chỉ:</b> <span className="text-secondary">{selected.address}</span></div>
                <div className="col-6"><b>Số lần đặt:</b> <span className="badge bg-info text-dark">{selected.totalBookings}</span></div>
                <div className="col-6">
                  <b>Trạng thái:</b>{' '}
                  <span className={`badge bg-${selected.status === 'active' ? 'success' : 'secondary'}`}>
                    {selected.status === 'active' ? 'Hoạt động' : 'Ngừng'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
      <style>{`
        .table tr:hover { background: #e9f5ff !important; }
        .card { border-radius: 1.25rem !important; }
      `}</style>
    </div>
  );
}

export default CustomerManager;

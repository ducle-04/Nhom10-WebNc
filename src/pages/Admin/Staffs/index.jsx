import React, { useState } from 'react';
import { FaSearch, FaEye, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { Button, Modal, Form } from 'react-bootstrap';

const mockStaffs = [
  {
    id: 1,
    name: 'Nguyễn Văn Quản',
    email: 'quan.nguyen@wildquest.vn',
    phone: '0987654321',
    role: 'Quản trị viên',
    status: 'active',
  },
  {
    id: 2,
    name: 'Trần Thị Điều Hành',
    email: 'dieu.tran@wildquest.vn',
    phone: '0912345678',
    role: 'Điều hành tour',
    status: 'active',
  },
  {
    id: 3,
    name: 'Lê Văn Kế Toán',
    email: 'ketoan.le@wildquest.vn',
    phone: '0909123456',
    role: 'Kế toán',
    status: 'inactive',
  },
];

function StaffsManager() {
  const [staffs, setStaffs] = useState(mockStaffs);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add'); // 'add' | 'edit'
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', role: '', status: 'active' });

  // Open modal for add/edit
  const handleOpenModal = (type, staff = null) => {
    setModalType(type);
    setSelectedStaff(staff);
    if (type === 'edit' && staff) {
      setForm({
        name: staff.name,
        email: staff.email,
        phone: staff.phone,
        role: staff.role,
        status: staff.status,
      });
    } else {
      setForm({ name: '', email: '', phone: '', role: '', status: 'active' });
    }
    setShowModal(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedStaff(null);
  };

  // Handle form change
  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // Add or Edit staff
  const handleSubmit = e => {
    e.preventDefault();
    if (modalType === 'add') {
      setStaffs(prev => [
        ...prev,
        {
          id: Date.now(),
          ...form,
        },
      ]);
    } else if (modalType === 'edit' && selectedStaff) {
      setStaffs(prev =>
        prev.map(s =>
          s.id === selectedStaff.id ? { ...s, ...form } : s
        )
      );
    }
    handleCloseModal();
  };

  // Delete staff
  const handleDelete = id => {
    if (window.confirm('Bạn có chắc chắn muốn xóa nhân viên này?')) {
      setStaffs(prev => prev.filter(s => s.id !== id));
    }
  };

  // Filter staffs
  const filtered = staffs.filter(
    s =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      s.phone.includes(search) ||
      s.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container-fluid py-3">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3 gap-2">
        <h3 className="fw-bold text-primary mb-0">Quản lý Nhân viên</h3>
        <div className="d-flex gap-2">
          <div className="input-group" style={{maxWidth: 320}}>
            <span className="input-group-text bg-white"><FaSearch /></span>
            <input
              type="text"
              className="form-control"
              placeholder="Tìm tên, email, vai trò..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <Button variant="primary" onClick={() => handleOpenModal('add')}>
            <FaPlus className="me-2" /> Thêm nhân viên
          </Button>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-hover align-middle bg-white rounded shadow-sm">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Họ tên</th>
              <th>Email</th>
              <th>SĐT</th>
              <th>Vai trò</th>
              <th>Trạng thái</th>
              <th style={{width: 120}}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center text-muted">Không có nhân viên phù hợp</td>
              </tr>
            ) : (
              filtered.map((s, idx) => (
                <tr key={s.id}>
                  <td>{idx + 1}</td>
                  <td>{s.name}</td>
                  <td>{s.email}</td>
                  <td>{s.phone}</td>
                  <td>{s.role}</td>
                  <td>
                    <span className={`badge bg-${s.status === 'active' ? 'success' : 'secondary'}`}>
                      {s.status === 'active' ? 'Hoạt động' : 'Ngừng'}
                    </span>
                  </td>
                  <td>
                    <Button
                      variant="outline-info"
                      size="sm"
                      className="me-2"
                      onClick={() => handleOpenModal('edit', s)}
                      title="Chỉnh sửa"
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(s.id)}
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

      {/* Modal add/edit */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>{modalType === 'add' ? 'Thêm nhân viên' : 'Chỉnh sửa nhân viên'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Họ tên</Form.Label>
              <Form.Control
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Nhập họ tên"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="Nhập email"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Số điện thoại</Form.Label>
              <Form.Control
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                placeholder="Nhập số điện thoại"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Vai trò</Form.Label>
              <Form.Control
                name="role"
                value={form.role}
                onChange={handleChange}
                required
                placeholder="Nhập vai trò (VD: Quản trị viên, Điều hành tour, ...)"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Trạng thái</Form.Label>
              <Form.Select
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="active">Hoạt động</option>
                <option value="inactive">Ngừng</option>
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Hủy
            </Button>
            <Button variant="primary" type="submit">
              {modalType === 'add' ? 'Thêm mới' : 'Lưu thay đổi'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default StaffsManager;

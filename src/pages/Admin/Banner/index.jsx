import React, { useState } from 'react';
import { FaSearch, FaEye, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { Button, Modal, Form } from 'react-bootstrap';

const mockBanners = [
  {
    id: 1,
    title: 'Khuyến mãi hè 2024',
    image: 'https://via.placeholder.com/200x60?text=Banner+1',
    status: 'active',
    link: 'https://wildquest.vn/khuyen-mai-he',
  },
  {
    id: 2,
    title: 'Tour Sapa giá sốc',
    image: 'https://via.placeholder.com/200x60?text=Banner+2',
    status: 'inactive',
    link: 'https://wildquest.vn/tour-sapa',
  },
];

function BannerManager() {
  const [banners, setBanners] = useState(mockBanners);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add'); // 'add' | 'edit'
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [form, setForm] = useState({ title: '', image: '', status: 'active', link: '' });

  // Open modal for add/edit
  const handleOpenModal = (type, banner = null) => {
    setModalType(type);
    setSelectedBanner(banner);
    if (type === 'edit' && banner) {
      setForm({
        title: banner.title,
        image: banner.image,
        status: banner.status,
        link: banner.link,
      });
    } else {
      setForm({ title: '', image: '', status: 'active', link: '' });
    }
    setShowModal(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBanner(null);
  };

  // Handle form change
  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // Add or Edit banner
  const handleSubmit = e => {
    e.preventDefault();
    if (modalType === 'add') {
      setBanners(prev => [
        ...prev,
        {
          id: Date.now(),
          ...form,
        },
      ]);
    } else if (modalType === 'edit' && selectedBanner) {
      setBanners(prev =>
        prev.map(b =>
          b.id === selectedBanner.id ? { ...b, ...form } : b
        )
      );
    }
    handleCloseModal();
  };

  // Delete banner
  const handleDelete = id => {
    if (window.confirm('Bạn có chắc chắn muốn xóa banner này?')) {
      setBanners(prev => prev.filter(b => b.id !== id));
    }
  };

  // Filter banners
  const filtered = banners.filter(
    b =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.link.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container-fluid py-3">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3 gap-2">
        <h3 className="fw-bold text-primary mb-0">Quản lý Banner</h3>
        <div className="d-flex gap-2">
          <div className="input-group" style={{maxWidth: 320}}>
            <span className="input-group-text bg-white"><FaSearch /></span>
            <input
              type="text"
              className="form-control"
              placeholder="Tìm tiêu đề hoặc link..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <Button variant="primary" onClick={() => handleOpenModal('add')}>
            <FaPlus className="me-2" /> Thêm banner
          </Button>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-hover align-middle bg-white rounded shadow-sm">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Tiêu đề</th>
              <th>Hình ảnh</th>
              <th>Link</th>
              <th>Trạng thái</th>
              <th style={{width: 120}}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center text-muted">Không có banner phù hợp</td>
              </tr>
            ) : (
              filtered.map((b, idx) => (
                <tr key={b.id}>
                  <td>{idx + 1}</td>
                  <td>{b.title}</td>
                  <td>
                    <img src={b.image} alt={b.title} style={{width: 100, height: 30, objectFit: 'cover', borderRadius: 4}} />
                  </td>
                  <td>
                    <a href={b.link} target="_blank" rel="noopener noreferrer">{b.link}</a>
                  </td>
                  <td>
                    <span className={`badge bg-${b.status === 'active' ? 'success' : 'secondary'}`}>
                      {b.status === 'active' ? 'Hiển thị' : 'Ẩn'}
                    </span>
                  </td>
                  <td>
                    <Button
                      variant="outline-info"
                      size="sm"
                      className="me-2"
                      onClick={() => handleOpenModal('edit', b)}
                      title="Chỉnh sửa"
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(b.id)}
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
            <Modal.Title>{modalType === 'add' ? 'Thêm banner' : 'Chỉnh sửa banner'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Tiêu đề</Form.Label>
              <Form.Control
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                placeholder="Nhập tiêu đề banner"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Hình ảnh (URL)</Form.Label>
              <Form.Control
                name="image"
                value={form.image}
                onChange={handleChange}
                required
                placeholder="Dán link hình ảnh banner"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Link</Form.Label>
              <Form.Control
                name="link"
                value={form.link}
                onChange={handleChange}
                required
                placeholder="Nhập link chuyển hướng"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Trạng thái</Form.Label>
              <Form.Select
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="active">Hiển thị</option>
                <option value="inactive">Ẩn</option>
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

export default BannerManager;

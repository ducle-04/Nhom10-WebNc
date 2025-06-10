import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaMapMarkedAlt, FaMoneyBillWave, FaCheckCircle, FaTimesCircle, FaImage } from 'react-icons/fa';
import { Modal, Button, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';

// Thêm nhiều mock data hơn, có trường image
const mockTours = [
  {
    id: 1,
    name: 'Tour Sapa 3N2Đ',
    location: 'Sapa',
    price: 3200000,
    status: 'Đang mở',
    date: '2024-07-10',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 2,
    name: 'Tour Phú Quốc 4N3Đ',
    location: 'Phú Quốc',
    price: 4200000,
    status: 'Đã đóng',
    date: '2024-08-01',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 3,
    name: 'Tour Đà Lạt 2N1Đ',
    location: 'Đà Lạt',
    price: 2500000,
    status: 'Đang mở',
    date: '2024-07-20',
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 4,
    name: 'Tour Hạ Long 3N2Đ',
    location: 'Hạ Long',
    price: 3800000,
    status: 'Đang mở',
    date: '2024-09-05',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 5,
    name: 'Tour Nha Trang 5N4Đ',
    location: 'Nha Trang',
    price: 5200000,
    status: 'Đã đóng',
    date: '2024-06-25',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 6,
    name: 'Tour Hội An 2N1Đ',
    location: 'Hội An',
    price: 2100000,
    status: 'Đang mở',
    date: '2024-08-15',
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3c8b?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 7,
    name: 'Tour Huế 3N2Đ',
    location: 'Huế',
    price: 3400000,
    status: 'Đang mở',
    date: '2024-07-30',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 8,
    name: 'Tour Cần Thơ 2N1Đ',
    location: 'Cần Thơ',
    price: 1900000,
    status: 'Đã đóng',
    date: '2024-06-18',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80'
  },
];

function TourManager() {
  const [tours, setTours] = useState(mockTours);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add'); // 'add' | 'edit'
  const [selectedTour, setSelectedTour] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageToShow, setImageToShow] = useState(null);

  // Form state
  const [form, setForm] = useState({
    name: '',
    location: '',
    price: '',
    status: 'Đang mở',
    date: '',
  });

  // Tổng quan nhanh
  const totalTours = tours.length;
  const totalRevenue = tours.reduce((sum, t) => sum + t.price, 0);
  const openTours = tours.filter(t => t.status === 'Đang mở').length;
  const closedTours = tours.filter(t => t.status === 'Đã đóng').length;

  // Open modal for add/edit
  const handleOpenModal = (type, tour = null) => {
    setModalType(type);
    setSelectedTour(tour);
    if (type === 'edit' && tour) {
      setForm({
        name: tour.name,
        location: tour.location,
        price: tour.price,
        status: tour.status,
        date: tour.date,
        image: tour.image,
      });
    } else {
      setForm({
        name: '',
        location: '',
        price: '',
        status: 'Đang mở',
        date: '',
        image: '',
      });
    }
    setShowModal(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTour(null);
  };

  // Handle form change
  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // Open image modal
  const handleShowImage = (img) => {
    setImageToShow(img);
    setShowImageModal(true);
  };
  const handleCloseImageModal = () => {
    setShowImageModal(false);
    setImageToShow(null);
  };

  // Add or Edit tour (có thêm image)
  const handleSubmit = e => {
    e.preventDefault();
    if (modalType === 'add') {
      setTours(prev => [
        ...prev,
        {
          id: Date.now(),
          ...form,
          price: Number(form.price),
          image: form.image || 'https://via.placeholder.com/80x60?text=No+Image'
        },
      ]);
    } else if (modalType === 'edit' && selectedTour) {
      setTours(prev =>
        prev.map(t =>
          t.id === selectedTour.id ? { ...t, ...form, price: Number(form.price), image: form.image || t.image } : t
        )
      );
    }
    handleCloseModal();
  };

  // Delete tour
  const handleDelete = id => {
    if (window.confirm('Bạn có chắc chắn muốn xóa tour này?')) {
      setTours(prev => prev.filter(t => t.id !== id));
    }
  };

  // Filter tours
  const filteredTours = tours.filter(
    t =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container-fluid py-3">
      {/* Tổng quan nhanh */}
      <div className="row g-3 mb-4">
        <div className="col-6 col-md-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body d-flex align-items-center gap-3">
              <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center" style={{width: 40, height: 40, fontSize: 18}}>
                <FaMapMarkedAlt />
              </div>
              <div>
                <div className="fw-bold fs-6">{totalTours}</div>
                <div className="small text-muted">Tổng số tour</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body d-flex align-items-center gap-3">
              <div className="bg-success bg-opacity-10 text-success rounded-circle d-flex align-items-center justify-content-center" style={{width: 40, height: 40, fontSize: 18}}>
                <FaMoneyBillWave />
              </div>
              <div>
                <div className="fw-bold fs-6">{totalRevenue.toLocaleString()} đ</div>
                <div className="small text-muted">Tổng doanh thu</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body d-flex align-items-center gap-3">
              <div className="bg-info bg-opacity-10 text-info rounded-circle d-flex align-items-center justify-content-center" style={{width: 40, height: 40, fontSize: 18}}>
                <FaCheckCircle />
              </div>
              <div>
                <div className="fw-bold fs-6">{openTours}</div>
                <div className="small text-muted">Tour đang mở</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body d-flex align-items-center gap-3">
              <div className="bg-secondary bg-opacity-10 text-secondary rounded-circle d-flex align-items-center justify-content-center" style={{width: 40, height: 40, fontSize: 18}}>
                <FaTimesCircle />
              </div>
              <div>
                <div className="fw-bold fs-6">{closedTours}</div>
                <div className="small text-muted">Tour đã đóng</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Thanh tiêu đề và nút thêm */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="fw-bold text-primary mb-0">Quản lý Tour</h3>
        <Button variant="primary" onClick={() => handleOpenModal('add')}>
          <FaPlus className="me-2" /> Thêm tour mới
        </Button>
      </div>
      {/* Thanh tìm kiếm */}
      <div className="mb-3 d-flex align-items-center gap-2">
        <div className="input-group" style={{maxWidth: 320}}>
          <span className="input-group-text bg-white"><FaSearch /></span>
          <input
            type="text"
            className="form-control"
            placeholder="Tìm kiếm tên hoặc địa điểm..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>
      {/* Bảng danh sách tour */}
      <div className="table-responsive">
        <table className="table table-bordered align-middle bg-white">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Ảnh</th>
              <th>Tên tour</th>
              <th>Địa điểm</th>
              <th>Giá (VNĐ)</th>
              <th>Ngày khởi hành</th>
              <th>Trạng thái</th>
              <th style={{width: 120}}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredTours.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center text-muted">Không có tour phù hợp</td>
              </tr>
            ) : (
              filteredTours.map((tour, idx) => (
                <tr key={tour.id}>
                  <td>{idx + 1}</td>
                  <td>
                    <img
                      src={tour.image}
                      alt={tour.name}
                      style={{ width: 60, height: 40, objectFit: 'cover', borderRadius: 6, cursor: 'pointer', border: '1px solid #eee' }}
                      onClick={() => handleShowImage(tour.image)}
                      title="Xem ảnh lớn"
                    />
                  </td>
                  <td className="fw-semibold">{tour.name}</td>
                  <td>{tour.location}</td>
                  <td className="text-end text-primary">{tour.price.toLocaleString()}</td>
                  <td>{tour.date}</td>
                  <td>
                    <span className={`badge px-3 py-2 bg-${tour.status === 'Đang mở' ? 'success' : 'secondary'}`}>
                      {tour.status}
                    </span>
                  </td>
                  <td>
                    <OverlayTrigger placement="top" overlay={<Tooltip>Chỉnh sửa</Tooltip>}>
                      <Button
                        variant="outline-info"
                        size="sm"
                        className="me-2"
                        onClick={() => handleOpenModal('edit', tour)}
                      >
                        <FaEdit />
                      </Button>
                    </OverlayTrigger>
                    <OverlayTrigger placement="top" overlay={<Tooltip>Xóa</Tooltip>}>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDelete(tour.id)}
                      >
                        <FaTrash />
                      </Button>
                    </OverlayTrigger>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Modal xem ảnh lớn */}
      <Modal show={showImageModal} onHide={handleCloseImageModal} centered size="xl" dialogClassName="modal-fullscreen">
        <Modal.Body className="p-0 bg-dark d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
          {imageToShow && (
            <img
              src={imageToShow}
              alt="Tour"
              style={{
                width: '100vw',
                height: '100vh',
                objectFit: 'contain',
                background: '#222'
              }}
            />
          )}
          <Button
            variant="light"
            onClick={handleCloseImageModal}
            style={{
              position: 'absolute',
              top: 20,
              right: 30,
              zIndex: 10,
              fontWeight: 'bold',
              fontSize: 22,
              opacity: 0.85
            }}
          >
            ×
          </Button>
        </Modal.Body>
      </Modal>
      {/* Modal add/edit */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>{modalType === 'add' ? 'Thêm tour mới' : 'Chỉnh sửa tour'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Tên tour</Form.Label>
              <Form.Control
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Nhập tên tour"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Địa điểm</Form.Label>
              <Form.Control
                name="location"
                value={form.location}
                onChange={handleChange}
                required
                placeholder="Nhập địa điểm"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Giá (VNĐ)</Form.Label>
              <Form.Control
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                required
                min={0}
                placeholder="Nhập giá tour"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Ngày khởi hành</Form.Label>
              <Form.Control
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Trạng thái</Form.Label>
              <Form.Select
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="Đang mở">Đang mở</option>
                <option value="Đã đóng">Đã đóng</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Ảnh điểm đến (URL)</Form.Label>
              <Form.Control
                name="image"
                type="url"
                value={form.image || ''}
                onChange={handleChange}
                placeholder="Dán link ảnh hoặc để trống"
              />
              <Form.Text className="text-muted">
                Ảnh sẽ hiển thị ở bảng quản lý. Nếu để trống sẽ dùng ảnh mặc định.
              </Form.Text>
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

export default TourManager;

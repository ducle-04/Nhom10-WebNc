import React, { useState } from 'react';
import { FaSearch, FaEye, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { Button, Modal, Form } from 'react-bootstrap';

const mockPlaces = [
  {
    id: 1,
    name: 'Sapa',
    description: 'Thị trấn vùng cao nổi tiếng với cảnh đẹp núi rừng.',
    status: 'active',
    tours: 12,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 2,
    name: 'Phú Quốc',
    description: 'Đảo ngọc với bãi biển đẹp và hải sản tươi ngon.',
    status: 'active',
    tours: 9,
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 3,
    name: 'Đà Lạt',
    description: 'Thành phố ngàn hoa với khí hậu mát mẻ quanh năm.',
    status: 'inactive',
    tours: 7,
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 4,
    name: 'Hạ Long',
    description: 'Vịnh di sản thiên nhiên thế giới với nhiều đảo đá vôi.',
    status: 'active',
    tours: 15,
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 5,
    name: 'Nha Trang',
    description: 'Thành phố biển nổi tiếng với bãi cát trắng và nước trong xanh.',
    status: 'active',
    tours: 11,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 6,
    name: 'Hội An',
    description: 'Phố cổ Hội An với kiến trúc cổ kính và đèn lồng rực rỡ.',
    status: 'inactive',
    tours: 8,
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3c8b?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 7,
    name: 'Huế',
    description: 'Cố đô Huế với nhiều di tích lịch sử và văn hóa.',
    status: 'active',
    tours: 10,
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 8,
    name: 'Cần Thơ',
    description: 'Thành phố miền Tây nổi tiếng với chợ nổi và sông nước.',
    status: 'active',
    tours: 6,
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 9,
    name: 'Sa Đéc',
    description: 'Làng hoa Sa Đéc rực rỡ sắc màu miền Tây.',
    status: 'inactive',
    tours: 4,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 10,
    name: 'Mộc Châu',
    description: 'Cao nguyên Mộc Châu với đồi chè xanh mướt và hoa cải trắng.',
    status: 'active',
    tours: 5,
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80'
  },
];

function PlacesManager() {
  const [places, setPlaces] = useState(mockPlaces);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add'); // 'add' | 'edit'
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [form, setForm] = useState({ name: '', description: '', status: 'active' });
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageToShow, setImageToShow] = useState(null);

  // Open modal for add/edit
  const handleOpenModal = (type, place = null) => {
    setModalType(type);
    setSelectedPlace(place);
    if (type === 'edit' && place) {
      setForm({
        name: place.name,
        description: place.description,
        status: place.status,
      });
    } else {
      setForm({ name: '', description: '', status: 'active' });
    }
    setShowModal(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPlace(null);
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

  // Add or Edit place (có thêm image)
  const handleSubmit = e => {
    e.preventDefault();
    if (modalType === 'add') {
      setPlaces(prev => [
        ...prev,
        {
          id: Date.now(),
          ...form,
          tours: 0,
          image: form.image || 'https://via.placeholder.com/80x60?text=No+Image'
        },
      ]);
    } else if (modalType === 'edit' && selectedPlace) {
      setPlaces(prev =>
        prev.map(p =>
          p.id === selectedPlace.id ? { ...p, ...form, image: form.image || p.image } : p
        )
      );
    }
    handleCloseModal();
  };

  // Delete place
  const handleDelete = id => {
    if (window.confirm('Bạn có chắc chắn muốn xóa địa điểm này?')) {
      setPlaces(prev => prev.filter(p => p.id !== id));
    }
  };

  // Filter places
  const filtered = places.filter(
    p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container-fluid py-3">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3 gap-2">
        <h3 className="fw-bold text-primary mb-0">Quản lý Địa điểm</h3>
        <div className="d-flex gap-2">
          <div className="input-group" style={{maxWidth: 320}}>
            <span className="input-group-text bg-white"><FaSearch /></span>
            <input
              type="text"
              className="form-control"
              placeholder="Tìm tên hoặc mô tả..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <Button variant="primary" onClick={() => handleOpenModal('add')}>
            <FaPlus className="me-2" /> Thêm địa điểm
          </Button>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-hover align-middle bg-white rounded shadow-sm">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Ảnh</th>
              <th>Tên địa điểm</th>
              <th>Mô tả</th>
              <th>Số tour</th>
              <th>Trạng thái</th>
              <th style={{width: 120}}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center text-muted">Không có địa điểm phù hợp</td>
              </tr>
            ) : (
              filtered.map((p, idx) => (
                <tr key={p.id}>
                  <td>{idx + 1}</td>
                  <td>
                    <img
                      src={p.image}
                      alt={p.name}
                      style={{ width: 60, height: 40, objectFit: 'cover', borderRadius: 6, cursor: 'pointer', border: '1px solid #eee' }}
                      onClick={() => handleShowImage(p.image)}
                      title="Xem ảnh lớn"
                    />
                  </td>
                  <td>{p.name}</td>
                  <td>{p.description}</td>
                  <td>{p.tours}</td>
                  <td>
                    <span className={`badge bg-${p.status === 'active' ? 'success' : 'secondary'}`}>
                      {p.status === 'active' ? 'Hoạt động' : 'Ngừng'}
                    </span>
                  </td>
                  <td>
                    <Button
                      variant="outline-info"
                      size="sm"
                      className="me-2"
                      onClick={() => handleOpenModal('edit', p)}
                      title="Chỉnh sửa"
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(p.id)}
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
      {/* Modal xem ảnh lớn */}
      <Modal show={showImageModal} onHide={handleCloseImageModal} centered size="xl" dialogClassName="modal-fullscreen">
        <Modal.Body className="p-0 bg-dark d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
          {imageToShow && (
            <img
              src={imageToShow}
              alt="Place"
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
            <Modal.Title>{modalType === 'add' ? 'Thêm địa điểm' : 'Chỉnh sửa địa điểm'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Tên địa điểm</Form.Label>
              <Form.Control
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Nhập tên địa điểm"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mô tả</Form.Label>
              <Form.Control
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                placeholder="Nhập mô tả"
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
            <Form.Group className="mb-3">
              <Form.Label>Ảnh địa điểm (URL)</Form.Label>
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

export default PlacesManager;

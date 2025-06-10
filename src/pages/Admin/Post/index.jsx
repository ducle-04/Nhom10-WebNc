import React, { useState } from 'react';
import { FaSearch, FaEye, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { Button, Modal, Form } from 'react-bootstrap';

const mockPosts = [
  {
    id: 1,
    title: 'Kinh nghiệm du lịch Sapa mùa hè',
    author: 'Admin',
    date: '2024-06-01',
    status: 'published',
    summary: 'Chia sẻ kinh nghiệm du lịch Sapa mùa hè, những điểm đến không thể bỏ qua.',
  },
  {
    id: 2,
    title: 'Top 5 bãi biển đẹp nhất Phú Quốc',
    author: 'Nguyễn Văn B',
    date: '2024-05-20',
    status: 'draft',
    summary: 'Danh sách các bãi biển đẹp, nước trong xanh, cát trắng ở Phú Quốc.',
  },
  {
    id: 3,
    title: 'Ẩm thực Đà Lạt: Những món ngon nên thử',
    author: 'Trần Thị C',
    date: '2024-04-15',
    status: 'published',
    summary: 'Khám phá các món ăn đặc sản hấp dẫn khi đến Đà Lạt.',
  },
];

function PostManager() {
  const [posts, setPosts] = useState(mockPosts);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add'); // 'add' | 'edit'
  const [selectedPost, setSelectedPost] = useState(null);
  const [form, setForm] = useState({ title: '', author: '', date: '', status: 'draft', summary: '' });

  // Open modal for add/edit
  const handleOpenModal = (type, post = null) => {
    setModalType(type);
    setSelectedPost(post);
    if (type === 'edit' && post) {
      setForm({
        title: post.title,
        author: post.author,
        date: post.date,
        status: post.status,
        summary: post.summary,
      });
    } else {
      setForm({ title: '', author: '', date: '', status: 'draft', summary: '' });
    }
    setShowModal(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPost(null);
  };

  // Handle form change
  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // Add or Edit post
  const handleSubmit = e => {
    e.preventDefault();
    if (modalType === 'add') {
      setPosts(prev => [
        ...prev,
        {
          id: Date.now(),
          ...form,
        },
      ]);
    } else if (modalType === 'edit' && selectedPost) {
      setPosts(prev =>
        prev.map(p =>
          p.id === selectedPost.id ? { ...p, ...form } : p
        )
      );
    }
    handleCloseModal();
  };

  // Delete post
  const handleDelete = id => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
      setPosts(prev => prev.filter(p => p.id !== id));
    }
  };

  // Filter posts
  const filtered = posts.filter(
    p =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container-fluid py-3">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3 gap-2">
        <h3 className="fw-bold text-primary mb-0">Quản lý Bài viết</h3>
        <div className="d-flex gap-2">
          <div className="input-group" style={{maxWidth: 320}}>
            <span className="input-group-text bg-white"><FaSearch /></span>
            <input
              type="text"
              className="form-control"
              placeholder="Tìm tiêu đề hoặc tác giả..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <Button variant="primary" onClick={() => handleOpenModal('add')}>
            <FaPlus className="me-2" /> Thêm bài viết
          </Button>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-hover align-middle bg-white rounded shadow-sm">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Tiêu đề</th>
              <th>Tác giả</th>
              <th>Ngày đăng</th>
              <th>Tóm tắt</th>
              <th>Trạng thái</th>
              <th style={{width: 120}}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center text-muted">Không có bài viết phù hợp</td>
              </tr>
            ) : (
              filtered.map((p, idx) => (
                <tr key={p.id}>
                  <td>{idx + 1}</td>
                  <td>{p.title}</td>
                  <td>{p.author}</td>
                  <td>{p.date}</td>
                  <td>{p.summary}</td>
                  <td>
                    <span className={`badge bg-${p.status === 'published' ? 'success' : 'secondary'}`}>
                      {p.status === 'published' ? 'Đã đăng' : 'Nháp'}
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

      {/* Modal add/edit */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>{modalType === 'add' ? 'Thêm bài viết' : 'Chỉnh sửa bài viết'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Tiêu đề</Form.Label>
              <Form.Control
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                placeholder="Nhập tiêu đề bài viết"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tác giả</Form.Label>
              <Form.Control
                name="author"
                value={form.author}
                onChange={handleChange}
                required
                placeholder="Nhập tên tác giả"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Ngày đăng</Form.Label>
              <Form.Control
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tóm tắt</Form.Label>
              <Form.Control
                name="summary"
                value={form.summary}
                onChange={handleChange}
                required
                placeholder="Nhập tóm tắt bài viết"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Trạng thái</Form.Label>
              <Form.Select
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="published">Đã đăng</option>
                <option value="draft">Nháp</option>
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

export default PostManager;

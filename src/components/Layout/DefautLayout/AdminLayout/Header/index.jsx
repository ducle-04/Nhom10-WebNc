import { FaUserCircle } from 'react-icons/fa';
import { useState } from 'react';

function AdminHeader() {
  // State để điều khiển hiển thị modal
  const [showModal, setShowModal] = useState(false);
  // State lưu thông tin cá nhân (giả lập)
  const [profile, setProfile] = useState({
    name: 'Quản trị viên',
    email: 'admin@example.com'
  });

  // Xử lý thay đổi form
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Xử lý submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Gửi dữ liệu lên server tại đây
    setShowModal(false);
  };

  return (
    <>
      <header
        className="admin-header bg-white border-bottom shadow-sm d-flex align-items-center justify-content-between px-4"
        style={{ height: 64, zIndex: 100, position: 'sticky', top: 0 }}
      >
        <div className="admin-header-left d-flex align-items-center gap-3">
          <span className="fw-bold fs-4 text-primary" style={{ letterSpacing: 1 }}>
            WildQuest <span className="text-dark" style={{ fontWeight: 400 }}>Admin</span>
          </span>
        </div>
        <div className="admin-header-right d-flex align-items-center gap-4">
          <div className="search-box d-none d-md-block">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Tìm kiếm..."
              style={{ minWidth: 180, borderRadius: 20, background: "#f5f6fa" }}
            />
          </div>
          <div className="d-flex align-items-center gap-2">
            <span className="text-secondary fw-semibold d-none d-md-inline">Xin chào, {profile.name}</span>
            <FaUserCircle
              size={32}
              className="text-primary"
              style={{ cursor: 'pointer' }}
              onClick={() => setShowModal(true)}
            />
          </div>
        </div>
      </header>
      {/* Modal chỉnh sửa thông tin cá nhân */}
      {showModal && (
        <div
          className="modal fade show"
          style={{
            display: 'block',
            background: 'rgba(0,0,0,0.3)'
          }}
          tabIndex="-1"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title">Chỉnh sửa thông tin cá nhân</h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Tên</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={profile.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={profile.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                    Hủy
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Lưu thay đổi
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AdminHeader;

import React, { useState } from 'react';
import { FaMapMarkedAlt, FaUsers, FaClipboardList, FaChartBar, FaStar, FaMountain, FaArrowUp, FaArrowDown, FaUserCircle } from 'react-icons/fa';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, ArcElement);

function AdminDashboard() {
  // State cho thông tin admin và modal chỉnh sửa
  const [admin, setAdmin] = useState({ name: 'Quản trị viên', email: 'admin@example.com' });
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileForm, setProfileForm] = useState(admin);

  // Demo số liệu, sau này lấy từ API/backend
  const stats = [
    { label: 'Tổng số tour', value: 128, icon: <FaMapMarkedAlt />, color: 'primary' },
    { label: 'Khách hàng', value: 542, icon: <FaUsers />, color: 'success' },
    { label: 'Đơn đặt chỗ', value: 320, icon: <FaClipboardList />, color: 'warning' },
    { label: 'Đánh giá', value: 4.8, icon: <FaStar />, color: 'info' },
    { label: 'Doanh thu (triệu)', value: 950, icon: <FaChartBar />, color: 'danger' },
  ];

  // Mock data cho biểu đồ doanh thu
  const revenueData = {
    labels: ['Th1', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6'],
    datasets: [
      {
        label: 'Doanh thu (triệu)',
        data: [120, 150, 180, 200, 170, 230],
        fill: false,
        borderColor: '#0d6efd',
        backgroundColor: '#0d6efd',
        tension: 0.3,
      },
    ],
  };

  // Dữ liệu biểu đồ tổng quan loại tour
  const tourTypeData = {
    labels: ['Sapa', 'Đà Lạt', 'Phú Quốc', 'Hạ Long', 'Khác'],
    datasets: [
      {
        label: 'Tỷ lệ loại tour',
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
          '#0d6efd', // Sapa
          '#198754', // Đà Lạt
          '#ffc107', // Phú Quốc
          '#dc3545', // Hạ Long
          '#6f42c1', // Khác
        ],
        borderWidth: 1,
      },
    ],
  };

  // Mock hoạt động gần đây
  const activities = [
    { type: 'Mới', color: 'primary', text: '1 khách hàng vừa đặt tour Sapa', time: '2 phút trước' },
    { type: 'Thành công', color: 'success', text: 'Tour Đà Lạt đã hoàn thành', time: '1 giờ trước' },
    { type: 'Chờ', color: 'warning text-dark', text: '2 booking đang chờ xác nhận', time: '3 giờ trước' },
    { type: 'Đánh giá', color: 'info text-dark', text: '1 khách hàng vừa gửi đánh giá', time: 'Hôm nay' },
    { type: 'Hủy', color: 'danger', text: '1 booking vừa bị hủy', time: 'Hôm qua' },
  ];

  // Mock top tour nổi bật
  const topTours = [
    { name: 'Tour Sapa 3N2Đ', bookings: 56, rating: 4.9 },
    { name: 'Tour Đà Lạt 4N3Đ', bookings: 48, rating: 4.8 },
    { name: 'Tour Phú Quốc 3N2Đ', bookings: 39, rating: 4.7 },
  ];

  // Thông tin tổng quan bổ sung
  const growthStats = [
    { label: 'Tăng trưởng doanh thu', value: '+12%', icon: <FaArrowUp />, color: 'success', desc: 'so với tháng trước' },
    { label: 'Tăng trưởng khách hàng', value: '+8%', icon: <FaArrowUp />, color: 'info', desc: 'so với tháng trước' },
    { label: 'Tăng trưởng booking', value: '-3%', icon: <FaArrowDown />, color: 'danger', desc: 'so với tháng trước' },
    { label: 'Tổng điểm đánh giá', value: 1280, icon: <FaStar />, color: 'warning', desc: 'từ khách hàng' },
  ];

  // Mock khách hàng hoạt động gần đây
  const recentCustomers = [
    { name: 'Nguyễn Văn A', email: 'nguyenvana@email.com', phone: '0901234567', tours: 3, spent: '12M', lastBooking: '2 ngày trước' },
    { name: 'Trần Thị B', email: 'tranthib@email.com', phone: '0907654321', tours: 1, spent: '4.5M', lastBooking: '1 tuần trước' },
    { name: 'Lê Văn C', email: 'levanc@email.com', phone: '0912345678', tours: 5, spent: '25M', lastBooking: '3 ngày trước' },
    { name: 'Phạm Thị D', email: 'phamthid@email.com', phone: '0934567890', tours: 2, spent: '8M', lastBooking: 'Hôm qua' }
  ];

  // Xử lý form chỉnh sửa thông tin cá nhân
  const handleProfileChange = (e) => {
    setProfileForm({ ...profileForm, [e.target.name]: e.target.value });
  };
  const handleProfileSubmit = (e) => {
    e.preventDefault();
    setAdmin(profileForm);
    setShowProfileModal(false);
  };

  return (
    <div className="container-fluid py-3">
      {/* Phần chào mừng admin */}
      <div
        className="d-flex align-items-center mb-4 p-4 rounded-4 shadow-sm"
        style={{
          background: 'linear-gradient(90deg, #e0eaff 0%, #f8f9fa 100%)',
          minHeight: 110,
        }}
      >
        <div className="me-3 position-relative" style={{ cursor: 'pointer' }} onClick={() => { setProfileForm(admin); setShowProfileModal(true); }}>
          <FaUserCircle size={64} className="text-primary" />
          <span className="position-absolute bottom-0 end-0 translate-middle badge rounded-pill bg-info" style={{ fontSize: 10, cursor: 'pointer' }}>Sửa</span>
        </div>
        <div>
          <h2 className="fw-bold mb-1 text-primary">Chào mừng trở lại, {admin.name}!</h2>
          <div className="text-muted">
            <span className="fw-semibold text-primary">WildQuest Dashboard</span> - {admin.email}
          </div>
        </div>
      </div>
      {/* Thông tin tổng quan bổ sung */}
      <div className="row g-3 mb-4">
        {growthStats.map((item, idx) => (
          <div className="col-6 col-md-3" key={item.label}>
            <div className="card border-0 shadow-sm h-100 rounded-4 hover-shadow" style={{transition: 'box-shadow 0.2s'}}>
              <div className="card-body d-flex align-items-center gap-3">
                <div className={`bg-${item.color} bg-opacity-10 text-${item.color} rounded-circle d-flex align-items-center justify-content-center`} style={{width: 44, height: 44, fontSize: 20}}>
                  {item.icon}
                </div>
                <div>
                  <div className="fw-bold fs-6">{item.value}</div>
                  <div className="small text-muted">{item.label}</div>
                  <div className="small text-secondary">{item.desc}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Các chỉ số chính */}
      <div className="row g-4 mb-4">
        {stats.map((item) => (
          <div className="col-12 col-sm-6 col-lg-3" key={item.label}>
            <div className="card shadow-sm border-0 h-100 rounded-4 hover-shadow" style={{transition: 'box-shadow 0.2s'}}>
              <div className="card-body d-flex align-items-center gap-3">
                <div className={`bg-${item.color} bg-opacity-10 text-${item.color} rounded-circle d-flex align-items-center justify-content-center`} style={{width: 52, height: 52, fontSize: 26}} title={item.label}>
                  {item.icon}
                </div>
                <div>
                  <div className="fw-bold fs-4" title={item.label}>{item.value}</div>
                  <div className="text-muted">{item.label}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Thống kê biểu đồ demo */}
      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card shadow-sm border-0 mb-4 rounded-4">
            <div className="card-header bg-white fw-semibold d-flex align-items-center rounded-top-4 border-bottom-0" style={{fontSize: 18}}>
              <span>Biểu đồ doanh thu 6 tháng gần nhất</span>
              <span className="badge bg-primary ms-2">Demo</span>
            </div>
            <div className="card-body">
              <Line data={revenueData} options={{ responsive: true, plugins: { legend: { display: false }, tooltip: { enabled: true } } }} height={120} />
            </div>
          </div>
          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-header bg-white fw-semibold rounded-top-4 border-bottom-0" style={{fontSize: 18}}>Top tour nổi bật</div>
            <div className="card-body p-0">
              <table className="table mb-0 align-middle">
                <thead className="table-light">
                  <tr>
                    <th className="text-primary">Tên tour</th>
                    <th className="text-primary">Lượt đặt</th>
                    <th className="text-primary">Đánh giá</th>
                  </tr>
                </thead>
                <tbody>
                  {topTours.map((tour, idx) => (
                    <tr key={tour.name} style={{background: idx === 0 ? "#f8fafc" : undefined}}>
                      <td>
                        <span className="d-flex align-items-center">
                          <FaMountain className="me-2 text-primary" />
                          <span className="fw-semibold">{tour.name}</span>
                        </span>
                      </td>
                      <td>
                        <span className="fw-semibold">{tour.bookings}</span>
                      </td>
                      <td>
                        <FaStar className="text-warning" /> <span className="fw-semibold">{tour.rating}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Biểu đồ tổng quan loại tour */}
          <div className="card shadow-sm border-0 rounded-4 mt-4">
            <div className="card-header bg-white fw-semibold rounded-top-4 border-bottom-0" style={{ fontSize: 18 }}>
              Tổng quan loại tour
            </div>
            <div className="card-body d-flex flex-column align-items-center">
              <div style={{ width: '100%', maxWidth: 260 }}>
                <Pie data={tourTypeData} options={{
                  plugins: {
                    legend: { display: true, position: 'bottom' },
                    tooltip: { enabled: true }
                  }
                }} />
              </div>
              <ul className="list-unstyled mt-3 mb-0 w-100">
                {tourTypeData.labels.map((label, idx) => (
                  <li key={label} className="d-flex align-items-center mb-1">
                    <span style={{
                      display: 'inline-block',
                      width: 14,
                      height: 14,
                      borderRadius: 3,
                      background: tourTypeData.datasets[0].backgroundColor[idx],
                      marginRight: 8,
                      border: '1px solid #dee2e6'
                    }}></span>
                    <span className="me-auto">{label}</span>
                    <span className="fw-bold">{tourTypeData.datasets[0].data[idx]}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card shadow-sm border-0 mb-4 rounded-4">
            <div className="card-header bg-white fw-semibold rounded-top-4 border-bottom-0" style={{fontSize: 18}}>Hoạt động gần đây</div>
            <div className="card-body">
              <ul className="list-unstyled mb-0">
                {activities.map((act, idx) => (
                  <li className="mb-3 d-flex align-items-center" key={idx}>
                    <span className={`badge bg-${act.color} me-2 px-3 py-2`} style={{minWidth: 70, fontSize: 14, borderRadius: 12}}>{act.type}</span>
                    <span>{act.text}</span>
                    <span className="ms-auto text-muted small">{act.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Thêm tổng quan nhanh */}
          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-header bg-white fw-semibold rounded-top-4 border-bottom-0" style={{fontSize: 18}}>Tổng quan nhanh</div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center border-0">
                  <span>Tổng số tour</span>
                  <span className="fw-bold text-primary">{stats[0].value}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center border-0">
                  <span>Tổng khách hàng</span>
                  <span className="fw-bold text-success">{stats[1].value}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center border-0">
                  <span>Tổng booking</span>
                  <span className="fw-bold text-warning">{stats[2].value}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center border-0">
                  <span>Điểm đánh giá</span>
                  <span className="fw-bold text-info">{growthStats[3].value}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center border-0">
                  <span>Doanh thu (triệu)</span>
                  <span className="fw-bold text-danger">{stats[4].value}</span>
                </li>
              </ul>
            </div>
          </div>
          {/* Thêm bảng khách hàng hoạt động gần đây */}
          <div className="card shadow-sm border-0 rounded-4 mt-4">
            <div className="card-header bg-white fw-semibold rounded-top-4 border-bottom-0" style={{ fontSize: 18 }}>Khách hàng hoạt động gần đây</div>
            <div className="card-body p-0">
              <table className="table mb-0 align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Tên</th>
                    <th>Email</th>
                    <th>Điện thoại</th>
                    <th>Tours</th>
                    <th>Chi tiêu</th>
                    <th>Lần đặt cuối</th>
                  </tr>
                </thead>
                <tbody>
                  {recentCustomers.map((c, idx) => (
                    <tr key={c.email} style={{ background: idx % 2 === 0 ? "#f8fafc" : undefined }}>
                      <td className="fw-semibold">{c.name}</td>
                      <td className="small">{c.email}</td>
                      <td className="small">{c.phone}</td>
                      <td>{c.tours}</td>
                      <td>{c.spent}</td>
                      <td className="small">{c.lastBooking}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* Modal chỉnh sửa thông tin cá nhân */}
      {showProfileModal && (
        <div className="modal fade show" style={{ display: 'block', background: 'rgba(0,0,0,0.3)' }} tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleProfileSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title">Chỉnh sửa thông tin cá nhân</h5>
                  <button type="button" className="btn-close" onClick={() => setShowProfileModal(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Tên</label>
                    <input type="text" className="form-control" name="name" value={profileForm.name} onChange={handleProfileChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" value={profileForm.email} onChange={handleProfileChange} />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowProfileModal(false)}>Hủy</button>
                  <button type="submit" className="btn btn-primary">Lưu thay đổi</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <style>{`
        .hover-shadow:hover {
          box-shadow: 0 4px 24px rgba(13,110,253,0.08), 0 1.5px 6px rgba(0,0,0,0.04) !important;
        }
        .table tr:hover { background: #e9f5ff !important; }
      `}</style>
    </div>
  );
}

export default AdminDashboard;
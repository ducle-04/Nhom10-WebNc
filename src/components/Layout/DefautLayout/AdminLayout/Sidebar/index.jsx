import { Link, useLocation } from 'react-router-dom';
import { FaTachometerAlt, FaMapMarkedAlt, FaUsers, FaChartBar, FaSignOutAlt, FaClipboardList } from 'react-icons/fa';

const menu = [
  { label: 'Dashboard', icon: <FaTachometerAlt />, path: '/admin' },
  { label: 'Quản lý Tour', icon: <FaMapMarkedAlt />, path: '/admin/tours' },
  { label: 'Quản lý Đặt Tour', icon: <FaClipboardList />, path: '/admin/bookings' },
  { label: 'Quản lý người dùng', icon: <FaUsers />, path: '/admin/customers' },
  // Thêm các chức năng quản trị khác
  { label: 'Quản lý Điểm đến', icon: <FaMapMarkedAlt />, path: '/admin/places' },
  { label: 'Quản lý Bài viết', icon: <FaClipboardList />, path: '/admin/posts' },
  { label: 'Quản lý Banner', icon: <FaChartBar />, path: '/admin/banners' },
  { label: 'Quản lý Nhân viên', icon: <FaUsers />, path: '/admin/staffs' },
  { label: 'Phản hồi/Đánh giá', icon: <FaClipboardList />, path: '/admin/feedbacks' },
  { label: 'Cài đặt hệ thống', icon: <FaTachometerAlt />, path: '/admin/settings' },
];

function Sidebar() {
  const location = useLocation();
  return (
    <aside className="admin-sidebar bg-dark text-light vh-100 d-flex flex-column p-0" style={{width: 230}}>
      <div className="sidebar-logo d-flex align-items-center justify-content-center py-4 border-bottom border-secondary">
        <span className="logo-text fw-bold fs-5 text-primary">WildQuest Admin</span>
      </div>
      <nav className="sidebar-menu flex-grow-1">
        <ul className="nav flex-column mt-3">
          {menu.map(item => (
            <li className="nav-item" key={item.path}>
              <Link
                to={item.path}
                className={`nav-link d-flex align-items-center px-4 py-2${location.pathname.startsWith(item.path) ? ' active bg-primary text-white' : ' text-light'}`}
                style={{fontWeight: 500, fontSize: 16}}
              >
                <span className="sidebar-icon me-2" style={{fontSize: 18}}>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="sidebar-bottom border-top border-secondary py-3 px-4">
        <Link to="/logout" className="nav-link d-flex align-items-center text-danger fw-bold">
          <span className="sidebar-icon me-2"><FaSignOutAlt /></span>
          <span>Đăng xuất</span>
        </Link>
      </div>
    </aside>
  );
}

export default Sidebar;

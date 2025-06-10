import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User } from 'lucide-react';

function Header() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Trạng thái đăng nhập
  const [userName, setUserName] = useState('');
  const [userTours, setUserTours] = useState([]);

  useEffect(() => {
    // Kiểm tra trạng thái đăng nhập từ localStorage khi component mount
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);

    // Lấy tên người dùng và tour đã đặt nếu đã đăng nhập
    if (loggedIn) {
      const name = localStorage.getItem('userName') || '';
      setUserName(name);

      // Lấy danh sách tour đã đặt từ localStorage (giả sử lưu dưới key 'bookedTours')
      let tours = [];
      try {
        const stored = localStorage.getItem('bookedTours');
        if (stored) {
          tours = JSON.parse(stored);
        }
      } catch {}
      setUserTours(Array.isArray(tours) ? tours : []);
    } else {
      setUserName('');
      setUserTours([]);
    }

    // Cập nhật trạng thái khi route thay đổi 
    if (window.$) {
      window.$('.navbar-toggler').off('click').on('click', function () {
        window.$('#mainNavbar').collapse('toggle');
      });
    }
    // Đầu trang khi route thay đổi thành '/'
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  const handleScroll = (id) => {
    if (location.pathname !== '/') {
      window.location.href = '/#' + id;
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Hàm đăng xuất
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top py-2">
      <div className="container">
        <Link
          className="navbar-brand d-flex align-items-center"
          to="/"
          style={{
            fontWeight: 900,
            fontSize: 28,
            color: '#1a2233',
            letterSpacing: 1,
            fontFamily: "'Montserrat', 'Segoe UI', Arial, sans-serif",
          }}
        >
          Wide Quest
        </Link>
        {/* Toggle button for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        {/* Menu */}
        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
            <li className="nav-item">
              <Link className="nav-link px-3" to="/" style={{ fontWeight: 600, fontSize: 17, color: '#1a2233' }}>Trang chủ</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link px-3 ${location.pathname === '/destination' ? 'active' : ''}`} to="/destination" style={{ fontWeight: 600, fontSize: 17, color: '#1a2233' }}>Điểm đến</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link px-3 ${location.pathname === '/tours' ? 'active' : ''}`} to="/tours" style={{ fontWeight: 600, fontSize: 17, color: '#1a2233' }}>Tour</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link px-3 ${location.pathname === '/blog' ? 'active' : ''}`} to="/blog" style={{ fontWeight: 600, fontSize: 17, color: '#1a2233' }}>Blog</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link px-3 ${location.pathname === '/about' ? 'active' : ''}`} to="/about" style={{ fontWeight: 600, fontSize: 17, color: '#1a2233' }}>Về chúng tôi</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link px-3 ${location.pathname === '/contact' ? 'active' : ''}`} to="/contact" style={{ fontWeight: 600, fontSize: 17, color: '#1a2233' }}>Liên hệ</Link>
            </li>
          </ul>
          {/* Auth buttons or User icon */}
          <div className="d-flex ms-lg-3 mt-3 mt-lg-0 align-items-center">
            {isLoggedIn ? (
              <div className="dropdown">
                <button
                  className="btn btn-outline-dark me-2 dropdown-toggle d-flex align-items-center"
                  style={{
                    fontWeight: 600,
                    fontSize: 16,
                    borderRadius: 24,
                    padding: '6px 12px',
                    borderWidth: 2,
                  }}
                  type="button"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <User size={20} className="me-2" />
                  <span>{userName}</span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown" style={{minWidth: 260}}>
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      <User size={16} className="me-2" />
                      Thông tin cá nhân
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/bookedtours">
                      <span className="fw-bold text-secondary" style={{fontSize: 15}}>Tour đã đặt</span>
                    </Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button
                      className="dropdown-item text-danger"
                      onClick={handleLogout}
                      style={{fontWeight: 600}}
                    >
                      Đăng xuất
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="btn btn-outline-dark me-2"
                  style={{
                    fontWeight: 600,
                    fontSize: 16,
                    borderRadius: 24,
                    padding: '6px 22px',
                    borderWidth: 2,
                  }}
                >
                  Đăng nhập
                </Link>
                <Link
                  to="/register"
                  className="btn btn-dark text-white"
                  style={{
                    fontWeight: 700,
                    fontSize: 16,
                    borderRadius: 24,
                    padding: '6px 22px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  }}
                >
                  Đăng ký
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      {/* Custom CSS */}
      <style>
        {`
          :root {
            --primary-color: #0e5d90;
            --secondary-color: #ff9d00;
            --text-color: #333;
            --light-color: #fff;
            --bg-light: #f8f9fa;
            --testimonial-bg: #eaf6fb;
            --transition: all 0.3s ease;
          }
          .navbar-nav .nav-link {
            transition: color 0.2s, background 0.2s;
            border-radius: 18px;
          }
          .navbar-nav .nav-link:hover, .navbar-nav .nav-link.active {
            background: #222;
            color: #fff !important;
          }
          .btn-dark, .btn-outline-dark {
            transition: background 0.2s, color 0.2s, border 0.2s;
          }
          .btn-dark:hover, .btn-outline-dark:hover {
            background: var(--primary-color) !important;
            color: white !important;
            border-color: rgb(248, 231, 178) !important;
          }
          .navbar {
            font-family: 'Montserrat', 'Segoe UI', Arial, sans-serif;
          }
        `}
      </style>
    </nav>
  );
}

export default Header;
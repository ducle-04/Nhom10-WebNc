import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  useEffect(() => {
    if (window.$) {
      window.$('.navbar-toggler').off('click').on('click', function () {
        window.$('#mainNavbar').collapse('toggle');
      });
    }
  }, []);

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
            fontFamily: "'Montserrat', 'Segoe UI', Arial, sans-serif"
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
              <Link className="nav-link px-3" to="/destinations" style={{ fontWeight: 600, fontSize: 17, color: '#1a2233' }}>Điểm đến</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-3" to="/tours" style={{ fontWeight: 600, fontSize: 17, color: '#1a2233' }}>Tour</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-3" to="/blog" style={{ fontWeight: 600, fontSize: 17, color: '#1a2233' }}>Blog</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-3" to="/about" style={{ fontWeight: 600, fontSize: 17, color: '#1a2233' }}>Về Wide Quest</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-3" to="/contact" style={{ fontWeight: 600, fontSize: 17, color: '#1a2233' }}>Liên hệ</Link>
            </li>
          </ul>
          {/* Auth buttons */}
          <div className="d-flex ms-lg-3 mt-3 mt-lg-0 align-items-center">
            <Link
              to="/login"
              className="btn btn-outline-dark me-2"
              style={{
                fontWeight: 600,
                fontSize: 16,
                borderRadius: 24,
                padding: '6px 22px',
                borderWidth: 2
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
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
              }}
            >
              Đăng ký
            </Link>
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
            --testimonial-bg: #eaf6fb; /* màu nền nhẹ cho testimonials */
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
            background:var(--primary-color) !important;
            color: white !important;
            border-color:rgb(248, 231, 178) !important;
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

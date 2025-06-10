import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  // Sử dụng ref để kiểm soát trạng thái đã animate chưa
  const animatedRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector('.footer-container');
      const elements = document.querySelectorAll('.footer-animate-item');

      if (footer) {
        const rect = footer.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100;

        if (isVisible) {
          if (!animatedRef.current) {
            footer.classList.add('footer-visible');
            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add('footer-item-visible');
              }, 150 * index);
            });
            animatedRef.current = true;
          }
        } else {
          // Khi footer ra khỏi viewport, reset animation để có thể chạy lại khi lướt tới
          footer.classList.remove('footer-visible');
          elements.forEach((el) => el.classList.remove('footer-item-visible'));
          animatedRef.current = false;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    setTimeout(handleScroll, 300);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Thêm Font Awesome vào <head> khi component mount (đảm bảo icon luôn hoạt động)
  useEffect(() => {
    const id = 'fa-link-cdn';
    if (!document.getElementById(id)) {
      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      // Sử dụng Font Awesome 4.7.0 để kiểm tra thử (icon brands luôn hoạt động)
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    }
  }, []);

  return (
    <footer className="footer-container bg-white text-dark pt-5 pb-4 mt-5 border-top">
      {/* Xóa <link rel="stylesheet" ... /> ở đây vì đã thêm vào <head> bằng JS */}
      <div className="container">
        <div className="row gy-4 mb-4">
          {/* Logo & Contact Info */}
          <div className="col-lg-4 col-md-6 footer-animate-item">

            <span className="footer-brand-text">Wild Quest</span>

            <p className="footer-slogan mt-2">Khám phá thế giới cùng chúng tôi</p>
            <div className="footer-contact mt-3">
              <div className="d-flex align-items-center mb-2">
                <i className="fa fa-phone me-2 footer-icon"></i>
                <span>0123 456 789</span>
              </div>
              <div className="d-flex align-items-center mb-2">
                <i className="fa fa-envelope me-2 footer-icon"></i>
                <span>info@widequest.com</span>
              </div>
              <div className="d-flex align-items-center">
                <i className="fa fa-map-marker me-2 footer-icon"></i>
                <span>123 Đường Du Lịch, Hà Nội</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-3 col-md-6 footer-animate-item">
            <h5 className="footer-heading mb-3">Liên kết nhanh</h5>
            <ul className="footer-links list-unstyled">
              <li><Link to="/tours">Tours</Link></li>
              <li><Link to="/destinations">Điểm đến</Link></li>
              <li><Link to="/about">Về chúng tôi</Link></li>
              <li><Link to="/contact">Liên hệ</Link></li>
              <li><Link to="/blog">Blog du lịch</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="col-lg-2 col-md-6 footer-animate-item">
            <h5 className="footer-heading mb-3">Dịch vụ</h5>
            <ul className="footer-links list-unstyled">
              <li><Link to="/booking">Đặt tour</Link></li>
              <li><Link to="/hotels">Khách sạn</Link></li>
              <li><Link to="/transfers">Đưa đón</Link></li>
              <li><Link to="/guides">Hướng dẫn viên</Link></li>
              <li><Link to="/support">Hỗ trợ</Link></li>
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div className="col-lg-3 col-md-6 footer-animate-item">
            <h5 className="footer-heading mb-3">Kết nối với chúng tôi</h5>
            <div className="footer-newsletter mb-3">
              <p className="mb-2">Đăng ký nhận thông tin mới nhất</p>
              <div className="input-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email của bạn"
                  aria-label="Email subscription"
                />
                <button className="btn btn-primary" type="button">
                  {/* Thay icon Font Awesome bằng emoji nếu FA vẫn không hiện */}
                  <span role="img" aria-label="send">✉️</span>
                </button>
              </div>
            </div>
            <div className="footer-social mt-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                {/* <i className="fa fa-facebook"></i> */}
                <span role="img" aria-label="Facebook">📘</span>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                {/* <i className="fa fa-instagram"></i> */}
                <span role="img" aria-label="Instagram">📸</span>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                {/* <i className="fa fa-youtube"></i> */}
                <span role="img" aria-label="YouTube">▶️</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                {/* <i className="fa fa-twitter"></i> */}
                <span role="img" aria-label="Twitter">🐦</span>
              </a>
            </div>
          </div>
        </div>

        <hr className="footer-divider" />

        <div className="footer-bottom row align-items-center footer-animate-item">
          <div className="col-md-6 text-center text-md-start">
            <p className="mb-0">© {new Date().getFullYear()} Wild Quest. All rights reserved.</p>
          </div>
          <div className="col-md-6 text-center text-md-end mt-3 mt-md-0">
            <Link to="/privacy" className="footer-bottom-link">Chính sách bảo mật</Link>
            <Link to="/terms" className="footer-bottom-link">Điều khoản sử dụng</Link>
          </div>
        </div>
      </div>

      {/* Custom CSS for footer */}
      <style>
        {`
          /* Base Footer Styles */
          .footer-container {
            position: relative;
            overflow: hidden;
            box-shadow: 0 -5px 20px rgba(0,0,0,0.05);
            transform: translateY(20px);
            opacity: 0;
            transition: transform 0.6s cubic-bezier(.4,2,.6,1), opacity 0.6s cubic-bezier(.4,2,.6,1);
            /* Animation */
            will-change: opacity, transform;
          }
          .footer-visible {
            transform: translateY(0);
            opacity: 1;
            animation: footerFadeIn 0.8s cubic-bezier(.4,2,.6,1) both;
          }
          @keyframes footerFadeIn {
            0% { opacity: 0; transform: translateY(40px);}
            100% { opacity: 1; transform: translateY(0);}
          }

          /* Footer item animation */
          .footer-animate-item {
            opacity: 0;
            transform: translateY(40px) scale(0.98);
            transition: opacity 0.6s cubic-bezier(.4,2,.6,1), transform 0.6s cubic-bezier(.4,2,.6,1);
            will-change: opacity, transform;
          }
          .footer-item-visible {
            opacity: 1;
            transform: translateY(0) scale(1);
            animation: footerItemFadeIn 0.7s cubic-bezier(.4,2,.6,1) both;
          }
          @keyframes footerItemFadeIn {
            0% { opacity: 0; transform: translateY(40px) scale(0.98);}
            60% { opacity: 0.7; transform: translateY(-8px) scale(1.01);}
            100% { opacity: 1; transform: translateY(0) scale(1);}
          }

          /* Logo Styles */
          .footer-logo {
            height: 45px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            transition: transform 0.3s ease;
          }
          
          .footer-logo:hover {
            transform: scale(1.05);
          }
          
          .footer-brand-text {
            font-weight: 800;
            font-size: 26px;
            letter-spacing: 1px;
            color: #333;
          }
          
          .footer-slogan {
            font-style: italic;
            opacity: 0.8;
            font-size: 15px;
          }
          
          /* Headings */
          .footer-heading {
            position: relative;
            font-weight: 700;
            color: #333;
            padding-bottom: 10px;
          }
          
          .footer-heading:after {
            content: '';
            position: absolute;
            left: 0;
            bottom: 0;
            height: 3px;
            width: 40px;
            background: linear-gradient(90deg, #3498db, #2ecc71);
            border-radius: 2px;
          }
          
          /* Links Styling */
          .footer-links li {
            margin-bottom: 10px;
            transition: transform 0.2s ease;
          }
          
          .footer-links li:hover {
            transform: translateX(5px);
          }
          
          .footer-links a {
            color: #555;
            text-decoration: none;
            transition: color 0.2s ease;
            display: inline-block;
            position: relative;
          }
          
          .footer-links a:before {
            content: '›';
            margin-right: 8px;
            color: #3498db;
            font-weight: bold;
          }
          
          .footer-links a:hover {
            color: #3498db;
          }
          
          /* Contact Info */
          .footer-icon {
            color: #3498db;
            width: 16px;
            text-align: center;
          }
          
          .footer-contact {
            font-size: 15px;
            color: #555;
          }
          
          /* Social Icons */
          .footer-social {
            display: flex;
            gap: 12px;
          }
          
          .social-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background-color: #f5f5f5;
            color: #555;
            transition: all 0.3s ease;
            text-decoration: none;
          }
          
          .social-icon:hover {
            transform: translateY(-3px);
            box-shadow: 0 5px 10px rgba(0,0,0,0.1);
            color: white;
          }
          
          .social-icon:nth-child(1):hover { background-color: #3b5998; }
          .social-icon:nth-child(2):hover { background-color: #e1306c; }
          .social-icon:nth-child(3):hover { background-color: #ff0000; }
          .social-icon:nth-child(4):hover { background-color: #1da1f2; }
          
          /* Newsletter */
          .footer-newsletter .form-control {
            border-radius: 4px 0 0 4px;
            border: 1px solid #ddd;
          }
          
          .footer-newsletter .btn {
            border-radius: 0 4px 4px 0;
            background: linear-gradient(135deg, #3498db, #2980b9);
            border: none;
          }
          
          /* Divider */
          .footer-divider {
            margin: 20px 0;
            opacity: 0.1;
          }
          
          /* Bottom Footer */
          .footer-bottom {
            font-size: 14px;
          }
          
          .footer-bottom-link {
            color: #555;
            text-decoration: none;
            margin-left: 20px;
            transition: color 0.2s ease;
          }
          
          .footer-bottom-link:hover {
            color: #3498db;
            text-decoration: underline;
          }
        `}
      </style>
    </footer>
  );
}

export default Footer;
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { destinationsData } from '../../../data/destinations';
import { toursData } from '../../../data/toursData';

function DestinationDetail() {
  const { destinationId } = useParams();
  const navigate = useNavigate();
  const destination = destinationsData.find((dest) => dest.id === destinationId);
  

  const sectionsRef = useRef([]);

  const addToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  useEffect(() => {
    // Hiệu ứng bằng jQuery cho các section khi cuộn vào viewport
    // eslint-disable-next-line
    const $ = window.$ || window.jQuery;
    if ($) {
      sectionsRef.current.forEach((section, idx) => {
        if (section) {
          $(section).removeClass('slide-up slide-left slide-right visible');
          if (idx % 3 === 0) $(section).addClass('slide-up');
          else if (idx % 3 === 1) $(section).addClass('slide-left');
          else $(section).addClass('slide-right');
        }
      });

      const onScroll = () => {
        sectionsRef.current.forEach((section) => {
          if (section && $(section).offset()) {
            const top = $(section).offset().top;
            const winTop = $(window).scrollTop();
            const winHeight = $(window).height();
            if (top < winTop + winHeight - 60) {
              $(section).addClass('visible');
            }
          }
        });
      };

      $(window).on('scroll resize', onScroll);
      setTimeout(onScroll, 100); // trigger on mount

      return () => {
        $(window).off('scroll resize', onScroll);
      };
    }
    // fallback nếu không có jQuery
    else {
      const observer = new window.IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
            }
          });
        },
        { threshold: 0.1 }
      );

      sectionsRef.current.forEach((section, idx) => {
        if (section) {
          section.classList.remove('slide-up', 'slide-left', 'slide-right');
          if (idx % 3 === 0) section.classList.add('slide-up');
          else if (idx % 3 === 1) section.classList.add('slide-left');
          else section.classList.add('slide-right');
          observer.observe(section);
        }
      });

      return () => {
        sectionsRef.current.forEach((section) => {
          if (section) observer.unobserve(section);
        });
      };
    }
  }, []);


  if (!destination) {
    return (
      <div className="error-container">
        <div className="error-content">
          <h2>Không tìm thấy điểm đến</h2>
          <p>Vui lòng kiểm tra lại hoặc quay về trang chủ.</p>
          <button className="btn-primary" onClick={() => navigate('/')}>
            Về trang chủ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="destination-detail-page">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;900&display=swap');
          body, .destination-detail-page {
            font-family: 'Montserrat', Arial, sans-serif;
            background: #f5f7fa;
            color: #23272f;
          }
          .hero-section {
            position: relative;
            width: 100vw;
            left: 50%;
            right: 50%;
            margin-left: -50vw;
            margin-right: -50vw;
            min-height: 60vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #222;
            overflow: hidden;
          }
          .hero-bg-img {
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            filter: brightness(0.65) blur(0px);
            z-index: 0;
            transition: filter 0.3s;
          }
          .hero-overlay {
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            // background: linear-gradient(120deg,rgba(24,27,32,0.45) 60%,rgba(24,27,32,0.15) 100%);
            z-index: 1;
          }
          .hero-content {
            position: absolute;
            margin-top: 120px;
            top: 48px;
            left: 48px;
            right: auto;
            bottom: auto;
            max-width: 600px;
            text-align: left;
            z-index: 2;
            padding: 0;
            color: #fff;
          }
          .hero-title {
            font-size: 2.8rem;
            font-weight: 900;
            margin-bottom: 12px;
            letter-spacing: 1.5px;
            text-shadow: 0 4px 24px rgba(24,27,32,0.25);
          }
          .hero-badge {
            display: inline-block;
            padding: 8px 22px;
            background: linear-gradient(90deg, #23272f 60%, #3b4256 100%);
            color: #fff;
            border-radius: 28px;
            font-size: 1.08rem;
            font-weight: 700;
            margin-left: 12px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.10);
            letter-spacing: 0.03em;
          }
          .hero-price {
            font-size: 1.18rem;
            color: #aaffc3;
            font-weight: 700;
            margin-top: 18px;
            margin-bottom: 0;
            letter-spacing: 0.03em;
          }
          .hero-description {
            font-size: 1.09rem;
            line-height: 1.7;
            color: #e6e6e6;
            margin-top: 12px;
            font-weight: 500;
            text-shadow: 0 1px 8px rgba(24,27,32,0.13);
          }
          .hero-btn {
            font-weight: 700;
            font-size: 17px;
            border-radius: 26px;
            padding: 12px 38px;
            box-shadow: 0 2px 12px rgba(0,0,0,0.10);
            letter-spacing: 1.5px;
            color: #fff;
            background: linear-gradient(90deg, #23272f 60%, #3b4256 100%);
            border: none;
            margin-top: 28px;
            transition: background 0.2s, color 0.2s;
          }
          .hero-btn:hover {
            background: linear-gradient(90deg, #1a2233 60%, #23272f 100%);
            color: #aaffc3;
          }
          .main-content {
            max-width: 1400px;
            margin: 0 auto;
            padding: 40px 16px 32px 16px;
          }
          .section {
            margin-bottom: 20px;
            background: #fff;
            box-shadow: 0 4px 24px rgba(30,58,138,0.07);
            padding: 40px 32px;
            border-radius: 0;
          }
          .section-title {
            font-size: 1.5rem;
            font-weight: 800;
            color: #1a2233;
            margin-bottom: 18px;
            letter-spacing: 0.5px;
            display: flex;
            align-items: center;
          }
          .section-title .icon {
            margin-right: 12px;
            font-size: 1.5rem;
          }
          .section-list {
            list-style: none;
            padding: 0;
            margin: 0;
          }
          .section-list li {
            padding: 10px 0;
            border-bottom: 1px solid #f0f0f0;
            font-size: 1.08rem;
            color: #444;
          }
          .section-list li:last-child {
            border-bottom: none;
          }
          .timeline {
            margin-left: 0;
            padding-left: 0;
          }
          .timeline-item {
            display: flex;
            align-items: flex-start;
            margin-bottom: 24px;
          }
          .timeline-marker {
            min-width: 38px;
            min-height: 38px;
            background: #23272f;
            color: #fff;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 1.1rem;
            margin-right: 18px;
            box-shadow: 0 2px 8px rgba(30,58,138,0.13);
          }
          .timeline-content {
            background: #f8fafc;
            border-left: 4px solid #23272f;
            padding: 18px 22px;
            font-size: 1.07rem;
            color: #23272f;
            width: 100%;
          }
          .review-list {
            margin: 0;
            padding: 0;
            list-style: none;
          }
          .review-item {
            background: #f8fafc;
            border-left: 4px solid #28a745;
            margin-bottom: 18px;
            padding: 18px 22px;
          }
          .review-header {
            display: flex;
            align-items: center;
            margin-bottom: 8px;
          }
          .review-avatar {
            width: 38px;
            height: 38px;
            background: #23272f;
            color: #fff;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 1.1rem;
            margin-right: 12px;
          }
          .review-user {
            font-weight: 700;
            color: #23272f;
          }
          .review-rating {
            color: #f6ad55;
            font-size: 1.1rem;
            margin-left: 8px;
          }
          @media (max-width: 991px) {
            .hero-content {
              padding: 32px 12px;
            }
            .main-content {
              padding: 24px 4px;
            }
            .section {
              padding: 18px 8px;
            }
          }
          @media (max-width: 600px) {
            .hero-title {
              font-size: 1.5rem;
            }
            .hero-content {
              padding: 16px 4px;
            }
            .main-content {
              padding: 8px 2px;
            }
            .section {
              padding: 10px 2px;
            }
          }
          .fade-in-section {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s cubic-bezier(.4,2,.6,1), transform 0.8s cubic-bezier(.4,2,.6,1);
          }
          .fade-in-section.visible {
            opacity: 1;
            transform: none;
          }
          .slide-up {
            transform: translateY(60px);
          }
          .slide-left {
            transform: translateX(-60px);
          }
          .slide-right {
            transform: translateX(60px);
          }
          .fade-in-section.visible.slide-up {
            animation: slideUpAnim 0.8s cubic-bezier(.4,2,.6,1) forwards;
          }
          .fade-in-section.visible.slide-left {
            animation: slideLeftAnim 0.8s cubic-bezier(.4,2,.6,1) forwards;
          }
          .fade-in-section.visible.slide-right {
            animation: slideRightAnim 0.8s cubic-bezier(.4,2,.6,1) forwards;
          }
          @keyframes slideUpAnim {
            from { opacity: 0; transform: translateY(60px);}
            to { opacity: 1; transform: none;}
          }
          @keyframes slideLeftAnim {
            from { opacity: 0; transform: translateX(-60px);}
            to { opacity: 1; transform: none;}
          }
          @keyframes slideRightAnim {
            from { opacity: 0; transform: translateX(60px);}
            to { opacity: 1; transform: none;}
          }
        `}
      </style>
      {/* Hero Section */}
      <section className="hero-section">
        <img
          className="hero-bg-img"
          src={destination.gallery && destination.gallery[0] ? destination.gallery[0] : ''}
          alt={destination.name}
        />
        <div className="hero-overlay"></div>
        <div
          className="hero-content"
          style={{
            position: 'absolute',
            top: 24,
            left: 24,
            right: 'auto',
            bottom: 'auto',
            maxWidth: 400,
            textAlign: 'left',
            zIndex: 2,
            padding: 0,
          }}
        >
          <h1 className="hero-title" style={{ fontSize: '2rem', marginBottom: 8 }}>{destination.name}</h1>
          <span className="hero-badge" style={{ fontSize: '1rem', padding: '6px 16px', marginLeft: 8 }}>{destination.badge}</span>
          <div className="hero-price" style={{ fontSize: '1rem', marginTop: 10 }}>Giá từ: {destination.price}</div>
          <p className="hero-description" style={{ fontSize: '0.98rem', marginTop: 8 }}>{destination.description}</p>
          <button className="hero-btn" style={{ fontSize: '1rem', padding: '8px 24px', marginTop: 18 }} onClick={() => navigate('/tours')}>
            Khám phá Tour
          </button>
        </div>
      </section>
      {/* Main Content */}
      <div className="main-content">
        <div className="row-sections equal-cols" style={{ display: 'flex', gap: 32, flexWrap: 'wrap', marginBottom: 32 }}>
          <div className="col-section">
            <div className="section fade-in-section" ref={addToRefs}>
              <div className="section-title"><span className="icon">📋</span>Thông tin chi tiết</div>
              <div style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#444' }}>
                {destination.detailedDescription}
              </div>
            </div>
          </div>
          <div className="col-section">
            <div className="section fade-in-section" ref={addToRefs}>
              <div className="section-title"><span className="icon">🏨</span>Khách sạn đề xuất</div>
              <ul className="section-list">
                {destination.hotels.map((hotel, index) => (
                  <li key={index}>{hotel}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="row-sections equal-cols" style={{ display: 'flex', gap: 32, flexWrap: 'wrap', marginBottom: 32 }}>
          <div className="col-section">
            <div className="section fade-in-section" ref={addToRefs}>
              <div className="section-title"><span className="icon">🌤️</span>Thời tiết</div>
              <div style={{ color: '#4a5568', fontSize: '1.05rem' }}>{destination.weather}</div>
            </div>
          </div>
          <div className="col-section">
            <div className="section fade-in-section" ref={addToRefs}>
              <div className="section-title"><span className="icon">💡</span>Mẹo du lịch</div>
              <ul className="section-list">
                {destination.travelTips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="section fade-in-section" ref={addToRefs}>
          <div className="section-title"><span className="icon">📚</span>Lịch trình mẫu</div>
          <div className="timeline">
            {destination.itinerary.map((day, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-marker">{day.day}</div>
                <div className="timeline-content">
                  <div className="timeline-day">Ngày {day.day}</div>
                  <div>{day.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="section fade-in-section" ref={addToRefs}>
          <div className="section-title"><span className="icon">⭐</span>Đánh giá từ khách hàng</div>
          <ul className="review-list">
            {destination.reviews.map((review, index) => (
              <li key={index} className="review-item">
                <div className="review-header">
                  <div className="review-avatar">{review.user.charAt(0).toUpperCase()}</div>
                  <div className="review-user">{review.user}</div>
                  <div className="review-rating" style={{ marginLeft: 8 }}>
                    {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                  </div>
                </div>
                <div>{review.comment}</div>
              </li>
            ))}
          </ul>
        </div>
        <div className="section fade-in-section" ref={addToRefs}>
          <div className="section-title"><span className="icon">🗺️</span>Tour liên quan</div>
          <ul className="section-list">
            {toursData.map((tour, index) => (
              <li key={tour.id || index}>
                <b>{tour.title}</b>
                {tour.price && (
                  <span style={{ color: "#28a745", marginLeft: 8 }}>
                    {tour.price.toLocaleString()} VNĐ
                  </span>
                )}
                {tour.duration && (
                  <span style={{ color: "#888", marginLeft: 8 }}>
                    {tour.duration} ngày
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <style>
        {`
          .equal-cols {
            align-items: stretch;
          }
          .col-section {
            flex: 1 1 0;
            min-width: 0;
            display: flex;
            flex-direction: column;
          }
          .col-section > .section {
            height: 100%;
            display: flex;
            flex-direction: column;
          }
          @media (max-width: 900px) {
            .row-sections {
              flex-direction: column !important;
              gap: 0 !important;
            }
            .col-section > .section {
              height: auto;
            }
          }
        `}
      </style>
    </div>
  );
}

export default DestinationDetail;
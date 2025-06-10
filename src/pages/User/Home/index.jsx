import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import slide1 from '../../../assets/images/slideShowup/slide1.jpg';
import slide2 from '../../../assets/images/slideShowup/slide2.jpg';
import slide3 from '../../../assets/images/slideShowup/slide3.jpg';
import video from '../../../assets/images/video.mp4';
import video1 from '../../../assets/images/video1.mp4';
import background from '../../../assets/images/background.jpg';
import phone from '../../../assets/images/phone.jpg';
import { destinationsData } from '../../../data/destinations';





function Home() {
  // Dữ liệu slider
  const sliderImages = [
    {
      src: slide2,
      title: 'Khám Phá Thiên Nhiên',
      description: 'Trải nghiệm vẻ đẹp hoang sơ tại những điểm đến tuyệt vời',
    },
    {
      src: slide1,
      title: 'Phiêu Lưu Mạo Hiểm',
      description: 'Thử thách bản thân với các hoạt động đầy kích thích',
    },
    {
      src: slide3,
      title: 'Văn Hóa Bản Địa',
      description: 'Gặp gỡ, giao lưu và khám phá nét văn hóa độc đáo',
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);

  // Hàm chuyển slide
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === sliderImages.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? sliderImages.length - 1 : prev - 1));
  };

  // tự đọng chuyển slide sau mỗi 5 giây
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Animation khi scroll
  useEffect(() => {
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const viewportHeight = window.innerHeight;

        // Nếu phần tử vào viewport (offset 100px)
        if (elementTop < viewportHeight - 100 && elementBottom > 100) {
          element.classList.add('animate-active');
        } else {
          element.classList.remove('animate-active');
        }
      });
    };

    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('resize', animateOnScroll);
    setTimeout(animateOnScroll, 400);

    return () => {
      window.removeEventListener('scroll', animateOnScroll);
      window.removeEventListener('resize', animateOnScroll);
    };
  }, []);

  // Thêm Font Awesome vào <head> khi component mount
  useEffect(() => {
    const id = 'fa-link-cdn';
    if (!document.getElementById(id)) {
      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css';
      link.crossOrigin = 'anonymous'; // Thêm dòng này để tránh lỗi CORS
      document.head.appendChild(link);
    }
  }, []);

  return (
    <div className="home-container">
      {/* Full-screen Slider */}
      <section className="hero-slider">
        <div className="slider-container">
          {sliderImages.map((slide, index) => (
            <div
              key={index}
              className={`slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${slide.src})` }}
            >
              <div className="slide-content">
                <h1 className="slide-title">{slide.title}</h1>
                <p className="slide-description">{slide.description}</p>
                <Link to="/tours" className="slide-button">
                  Khám phá ngay
                </Link>
              </div>
            </div>
          ))}

          <button className="slider-nav prev" onClick={prevSlide}>
            <ChevronLeft size={32} />
          </button>
          <button className="slider-nav next" onClick={nextSlide}>
            <ChevronRight size={32} />
          </button>

          <div className="slider-dots">
            {sliderImages.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              ></button>
            ))}
          </div>
        </div>
      </section>
      {/* Giới thiệu */}
      <section className="about-widequest animate-on-scroll" id="about" >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 about-image">
              <video
                src={video}
                className="img-fluid rounded"
                autoPlay
                muted
                loop
                playsInline
              />

            </div>
            <div className="col-md-6 about-content" >
              <h2 className="section-title">Về Wild Quest</h2>
              <p className="section-text">
                Wild Quest là nền tảng du lịch dành cho những người yêu thích khám phá, trải nghiệm và phiêu lưu.
                Chúng tôi mang đến các tour độc đáo, điểm đến hấp dẫn và dịch vụ tận tâm để mỗi chuyến đi của bạn trở nên đáng nhớ.
              </p>
              <Link to="/about" className="btn-custom">Tìm hiểu thêm</Link>
            </div>
          </div>
        </div>
      </section>
      <section className="about-reasons animate-on-scroll">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 about-content">
              <h2 className="section-title">Lý do nên chọn chúng tôi</h2>
              <p className="section-text">
                Với đội ngũ chuyên nghiệp, lịch trình linh hoạt và những hành trình được thiết kế đặc biệt cho từng cá nhân,
                Wild Quest là người bạn đồng hành lý tưởng trong mọi chuyến đi của bạn. Chúng tôi cam kết mang lại trải nghiệm
                an toàn, thú vị và đáng nhớ.
              </p>
            </div>

            <div className="col-md-6 about-image">
              <video
                src={video1}
                className="img-fluid rounded"
                autoPlay
                muted
                loop
                playsInline
              />

            </div>
          </div>
        </div>
      </section>
      {/* Topp */}
      <hr />
      <section className="top-destination-section">
        <div className="container">
          <h2 className="top-destination-title">Top Destination</h2>
          <div className="top-destination-underline"></div>
          <div className="top-destination-mosaic">
            {/* Large Card 1 */}
            <div className="top-destination-card large">
              <img src="/public/images/destination/dalat.jpg" alt="United Kingdom" />
              <div className="top-destination-overlay">
                <div className="top-destination-card-title">Đà Lạt</div>
                <div className="top-destination-card-underline"></div>
                <ul className="top-destination-info">
                  <li>30 Hotel</li>
                  <li>48 Tours</li>
                  <li>46 Activity</li>
                  <li>36 Yacht</li>
                </ul>
              </div>
            </div>
            {/* Large Card 2 */}
            <div className="top-destination-card large">
              <img src="/public/images/destination/phuquoc.jpg" alt="Turkey" />
              <div className="top-destination-overlay">
                <div className="top-destination-card-title">Phú Quốc</div>
                <div className="top-destination-card-underline"></div>
                <ul className="top-destination-info">
                  <li>25 Hotel</li>
                  <li>40 Tours</li>
                  <li>38 Activity</li>
                  <li>20 Yacht</li>
                </ul>
              </div>
            </div>
            {/* Small Cards */}
            <div className="top-destination-card small">
              <img src="/public/images/destination/sapa.jpeg" alt="United States" />
              <div className="top-destination-overlay">
                <div className="top-destination-card-title">Sapa</div>
                <div className="top-destination-card-underline"></div>
                <ul className="top-destination-info">
                  <li>18 Hotel</li>
                  <li>22 Tours</li>
                  <li>20 Activity</li>
                  <li>10 Yacht</li>
                </ul>
              </div>
            </div>
            <div className="top-destination-card small">
              <img src="/public/images/destination/dalat.jpg" alt="Ukraine" />
              <div className="top-destination-overlay">
                <div className="top-destination-card-title">Đà Lạt</div>
                <div className="top-destination-card-underline"></div>
                <ul className="top-destination-info">
                  <li>30 Hotel</li>
                  <li>48 Tours</li>
                  <li>46 Activity</li>
                  <li>36 Yacht</li>
                </ul>
              </div>
            </div>
            <div className="top-destination-card small">
              <img src="/public/images/destination/phuquoc.jpg" alt="France" />
              <div className="top-destination-overlay">
                <div className="top-destination-card-title">Phú Quốc</div>
                <div className="top-destination-card-underline"></div>
                <ul className="top-destination-info">
                  <li>25 Hotel</li>
                  <li>40 Tours</li>
                  <li>38 Activity</li>
                  <li>20 Yacht</li>
                </ul>
              </div>
            </div>
            <div className="top-destination-card small">
              <img src="/public/images/destination/sapa.jpeg" alt="India" />
              <div className="top-destination-overlay">
                <div className="top-destination-card-title">Sapa</div>
                <div className="top-destination-card-underline"></div>
                <ul className="top-destination-info">
                  <li>18 Hotel</li>
                  <li>22 Tours</li>
                  <li>20 Activity</li>
                  <li>10 Yacht</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <style>
          {`
          .top-destination-section {
            background: #fff;
            padding: 60px 0 40px 0;
            text-align: center;
          }
            .top-destination-title,
          .section-title.text-center {
            font-size: 2.2rem;
            font-weight: 700;
            color: #222;
            margin-bottom: 0.5rem;
            font-family: 'Be Vietnam Pro', 'Montserrat', Arial, sans-serif !important;
            letter-spacing: 0.5px;
          }
          .top-destination-underline,
          .section-title.text-center + .top-destination-underline,
          .section-title.text-center + hr {
            width: 60px;
            height: 4px;
            background: #1976d2;
            border-radius: 2px;
            margin: 0 auto 32px auto;
          }
          .top-destination-mosaic {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            grid-template-rows: repeat(2, 38vh);
            gap: 10px;
            justify-items: stretch;
            align-items: stretch;
            min-height: 76vh;
          }
          .top-destination-card {
            position: relative;
            border-radius: 2px;
            overflow: hidden;
            box-shadow: 0 8px 32px rgba(0,0,0,0.13);
            background: #eee;
            display: flex;
            align-items: stretch;
            min-height: 0;
            height: 100%;
            cursor: pointer;
            transition: box-shadow 0.2s;
          }
          .top-destination-card.large {
            grid-row: 1 / 2;
            grid-column: span 2;
            height: 100%;
          }
          .top-destination-card.small {
            grid-row: 2 / 3;
            height: 100%;
          }
          .top-destination-card img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            /* Đảm bảo ảnh không bị kéo méo */
            aspect-ratio: unset;
          }
          .top-destination-card:hover img {
            filter: brightness(1.08) contrast(1.08);
            transform: scale(1.04);
          }
          .top-destination-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(180deg,rgba(0,0,0,0.55) 70%,rgba(0,0,0,0.08) 100%);
            color: #fff;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
            padding: 32px 32px 20px 32px;
            z-index: 2;
            transition: background 0.3s;
          }
          .top-destination-card-title {
            font-size: 1.6rem;
            font-weight: 700;
            margin-bottom: 8px;
            letter-spacing: 0.2px;
            text-align: left;
          }
          .top-destination-card-underline {
            width: 44px;
            height: 4px;
            background: #fff;
            border-radius: 2px;
            margin-bottom: 14px;
          }
          .top-destination-info {
            list-style: none;
            padding: 0;
            margin: 0;
            font-size: 1.08rem;
            color: #fff;
            text-align: left;
            line-height: 1.7;
            opacity: 0;
            max-height: 0;
            transition: opacity 0.3s, max-height 0.3s;
            overflow: hidden;
          }
          .top-destination-card:hover .top-destination-info {
            opacity: 1;
            max-height: 200px;
            margin-top: 6px;
          }
          .top-destination-info li {
            margin-bottom: 2px;
          }
          .top-destination-section {
            background: #fff;
            padding: 0;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
          /* Responsive */
          @media (max-width: 1100px) {
            .top-destination-mosaic {
              grid-template-columns: repeat(2, 1fr);
              grid-template-rows: repeat(4, 32vh);
              gap: 20px;
              min-height: 128vh;
            }
            .top-destination-card.large {
              grid-column: span 2;
              height: 100%;
            }
            .top-destination-card.small {
              grid-column: span 1;
              height: 100%;
            }
          }
          @media (max-width: 700px) {
            .top-destination-section {
              min-height: unset;
            }
            .top-destination-mosaic {
              grid-template-columns: 1fr;
              grid-template-rows: repeat(6, 32vh);
              gap: 14px;
              min-height: unset;
            }
            .top-destination-card.large,
            .top-destination-card.small {
              grid-column: span 1;
              height: 32vh;
            }
            .top-destination-overlay {
              padding: 16px 12px 10px 12px;
            }
          }
          `}
        </style>
      </section>
      {/* Điểm đến nổi bật */}
      <section className="destinations-section animate-on-scroll" id="destinations">
        <hr />
        <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;600;700;800&display=swap" rel="stylesheet" />
        <div className="container">
          <h2 className="section-title text-center">Điểm đến nổi bật</h2>
          <div className="destination-slider-wrapper">
            <button
              className="destination-slider-nav prev"
              onClick={() => setSlideIndex((prev) => prev === 0 ? Math.ceil(destinationsData.length / 3) - 1 : prev - 1)}
              aria-label="Trước"
            >
              <ChevronLeft size={28} />
            </button>
            <div className="destination-slider">
              {Array.from({ length: Math.ceil(destinationsData.length / 3) }).map((_, slideIdx) => (
                <div
                  key={slideIdx}
                  className={`destination-slide${slideIdx === slideIndex ? ' active' : ''}`}
                >
                  <div className="row g-4">
                    {destinationsData.slice(slideIdx * 3, slideIdx * 3 + 3).map((destination) => (
                      <div className="col-md-4" key={destination.id}>
                        <div className="destination-card improved">
                          <div className="card-image">
                            <img src={destination.image} alt={destination.name} loading="lazy" />
                            <span
                              className={`destination-badge ${destination.badge === 'New' ? 'badge-new' : destination.badge === 'Best' ? 'badge-best' : ''
                                }`}
                            >
                              {destination.badge}
                            </span>
                            <div className="card-overlay">
                              <Link to={`/destinations/${destination.id}`} className="overlay-link">
                                Khám phá
                              </Link>
                            </div>
                          </div>
                          <div className="card-content">
                            <h3 className="card-title">{destination.name}</h3>
                            <p className="card-text">{destination.description}</p>
                            <div className="destination-price">
                              <b>Giá từ:</b> {destination.price}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button
              className="destination-slider-nav next"
              onClick={() => setSlideIndex((prev) => prev === Math.ceil(destinationsData.length / 3) - 1 ? 0 : prev + 1)}
              aria-label="Sau"
            >
              <ChevronRight size={28} />
            </button>
          </div>
          <div className="destination-slider-dots text-center mt-3">
            {Array.from({ length: Math.ceil(destinationsData.length / 3) }).map((_, idx) => (
              <button
                key={idx}
                className={`dot${idx === slideIndex ? ' active' : ''}`}
                onClick={() => setSlideIndex(idx)}
                aria-label={`Slide ${idx + 1}`}
              ></button>
            ))}
          </div>
        </div>
        <style>
          {`
          .destination-slider-wrapper {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 10px;
          }
          .destination-slider {
            width: 100%;
            overflow: hidden;
            position: relative;
          }
          .destination-slide {
            display: none;
            transition: opacity 0.5s;
          }
          .destination-slide.active {
            display: block;
            animation: fadeInSlide 0.7s;
          }
          @keyframes fadeInSlide {
            from { opacity: 0; transform: translateY(30px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .destination-slider-nav {
            background: #fff;
            border: 1.5px solid #e3eaf3;
            color: #0e5d90;
            border-radius: 50%;
            width: 44px;
            height: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            z-index: 10;
            box-shadow: 0 2px 8px rgba(14,93,144,0.07);
            cursor: pointer;
            transition: background 0.2s, box-shadow 0.2s;
          }
          .destination-slider-nav.prev {
            left: -22px;
          }
          .destination-slider-nav.next {
            right: -22px;
          }
          .destination-slider-nav:hover {
            background: #f5f8fa;
            box-shadow: 0 4px 16px rgba(14,93,144,0.13);
          }
          .destination-slider-dots .dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: #e3eaf3;
            margin: 0 5px;
            border: none;
            display: inline-block;
            transition: background 0.2s, transform 0.2s;
          }
          .destination-slider-dots .dot.active {
            background: #0e5d90;
            transform: scale(1.2);
          }
          `}
        </style>
      </section>
      {/* cmt khách hàng  */}
      <section className="testimonials-section animate-on-scroll">
        <div className="container">
          <h2 className="section-title text-center">Khách hàng nói gì về chúng tôi</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="testimonial-card improved">
                <div className="testimonial-avatar">
                  <img src="/images/avatar/avatar1.jpg" alt="Avatar" />
                </div>
                <div className="testimonial-content">
                  <div className="testimonial-quote">
                    <span>“</span>
                  </div>
                  <div className="testimonial-rating">
                    {/* Thay icon Font Awesome bằng emoji ngôi sao */}
                    <span role="img" aria-label="star">⭐</span>
                    <span role="img" aria-label="star">⭐</span>
                    <span role="img" aria-label="star">⭐</span>
                    <span role="img" aria-label="star">⭐</span>
                    <span role="img" aria-label="star">⭐</span>
                  </div>
                  <p className="testimonial-text">
                    Tour Fansipan của Wide Quest thực sự là trải nghiệm đáng nhớ. Hướng dẫn viên chuyên nghiệp, lịch trình hợp lý và dịch vụ tuyệt vời!
                  </p>
                  <h4 className="testimonial-name">Nguyễn Văn A</h4>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="testimonial-card improved">
                <div className="testimonial-avatar">
                  <img src="/images/avatar/avatar2.png" alt="Avatar" />
                </div>
                <div className="testimonial-content">
                  <div className="testimonial-quote">
                    <span>“</span>
                  </div>
                  <div className="testimonial-rating">
                    <span role="img" aria-label="star">⭐</span>
                    <span role="img" aria-label="star">⭐</span>
                    <span role="img" aria-label="star">⭐</span>
                    <span role="img" aria-label="star">⭐</span>
                    <span role="img" aria-label="star">⭐</span>
                  </div>
                  <p className="testimonial-text">
                    Đây là lần thứ 3 tôi đi tour cùng Wide Quest và vẫn rất hài lòng. Đặc biệt là các điểm đến luôn rất độc đáo và ít du khách.
                  </p>
                  <h4 className="testimonial-name">Trần Thanh B</h4>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="testimonial-card improved">
                <div className="testimonial-avatar">
                  <img src="/images/avatar/avatar3.jpg" alt="Avatar" />
                </div>
                <div className="testimonial-content">
                  <div className="testimonial-quote">
                    <span>“</span>
                  </div>
                  <div className="testimonial-rating">
                    <span role="img" aria-label="star">⭐</span>
                    <span role="img" aria-label="star">⭐</span>
                    <span role="img" aria-label="star">⭐</span>
                    <span role="img" aria-label="star">⭐</span>
                    <span role="img" aria-label="half-star">⭐️</span>
                  </div>
                  <p className="testimonial-text">
                    Tour Nam Du thật tuyệt vời! Cảnh đẹp, ăn ngon và chỗ ở sạch sẽ. Chắc chắn sẽ quay lại và trải nghiệm thêm nhiều tour khác của Wide Quest.
                  </p>
                  <h4 className="testimonial-name">Lê Thị C</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <style>
          {`
          .testimonial-card.improved {
            background: var(--light-color);
            border-radius: 18px;
            padding: 36px 28px 32px 28px;
            box-shadow: 0 10px 32px rgba(14,93,144,0.10), 0 1.5px 8px rgba(0,0,0,0.08);
            transition: box-shadow 0.35s cubic-bezier(.4,2,.6,1), transform 0.35s cubic-bezier(.4,2,.6,1);
            text-align: center;
            margin-bottom: 20px;
            height: 100%;
            position: relative;
            cursor: pointer;
            border: 2px solid #e3eaf3;
          }
          .testimonial-card.improved:hover {
            transform: translateY(-10px) scale(1.03);
            box-shadow: 0 18px 48px rgba(14,93,144,0.18), 0 4px 16px rgba(0,0,0,0.12);
            border-color: var(--primary-color);
          }
          .testimonial-avatar {
            margin: 0 auto 18px;
            width: 90px;
            height: 90px;
            border-radius: 50%;
            overflow: hidden;
            border: 4px solid var(--primary-color);
            transition: box-shadow 0.3s, transform 0.5s cubic-bezier(.4,2,.6,1);
            box-shadow: 0 4px 16px rgba(14,93,144,0.10);
          }
          .testimonial-card.improved:hover .testimonial-avatar {
            box-shadow: 0 8px 32px rgba(14,93,144,0.18);
            transform: rotate(-6deg) scale(1.07);
          }
          .testimonial-avatar img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
          }
          .testimonial-content {
            position: relative;
            padding-top: 8px;
          }
          .testimonial-quote {
            position: absolute;
            left: 0;
            top: -18px;
            font-size: 3.2rem;
            color: var(--secondary-color);
            opacity: 0.18;
            font-family: serif;
            pointer-events: none;
            user-select: none;
          }
          .testimonial-rating {
            color: var(--secondary-color);
            margin-bottom: 10px;
            font-size: 1.1rem;
          }
          .testimonial-text {
            color: #444;
            font-style: italic;
            margin-bottom: 15px;
            line-height: 1.7;
            font-size: 1.13rem;
            min-height: 70px;
          }
          .testimonial-name {
            color: var(--primary-color);
            font-weight: 700;
            font-size: 1.13rem;
            margin-top: 8px;
            letter-spacing: 0.2px;
          }
          @media (max-width: 992px) {
            .testimonial-card.improved {
              padding: 28px 12px 24px 12px;
            }
            .testimonial-avatar {
              width: 70px;
              height: 70px;
            }
            .testimonial-quote {
              font-size: 2.2rem;
              top: -10px;
            }
          }
          @media (max-width: 576px) {
            .testimonial-card.improved {
              padding: 18px 6px 16px 6px;
            }
            .testimonial-avatar {
              width: 54px;
              height: 54px;
            }
            .testimonial-quote {
              font-size: 1.5rem;
              top: -6px;
            }
            .testimonial-text {
              font-size: 1rem;
              min-height: 40px;
            }
          }
          `}
        </style>
      </section>
      {/*đăng ky*/}
      <section className="travel-section">
        <div className="container">
          <div className="travel-wrapper">
            <div className="travel-image">
              <img src={phone} alt="Ứng dụng Wide Quest" />
            </div>
            <div className="travel-text">
              <h1 className="section-title">
                Khám phá thế giới với Wide Quest
              </h1>
              <p className="description">
                Đăng ký ngay để nhận các ưu đãi, lời khuyên du lịch và cập nhật mới nhất từ chúng tôi.
              </p>
              <form className="email-form">
                <input type="email" placeholder="Nhập email của bạn" />
                <button type="submit">Đăng ký</button>
              </form>
              <p className="description">
                Có chuyến đi mơ ước của bạn trong tầm tay của bạn. Tải xuống ứng dụng.
              </p>
            </div>

          </div>
        </div>
      </section>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;600;700;800&display=swap');
          html, body, .home-container, * {
            font-family: 'Be Vietnam Pro', 'Montserrat', Arial, sans-serif !important;
          }
          /* Base Styles */
          :root {
            --primary-color: #0e5d90;
            --secondary-color: #ff9d00;
            --text-color: #333;
            --light-color: #fff;
            --bg-light: #f8f9fa;
            --testimonial-bg: #eaf6fb; /* màu nền nhẹ cho testimonials */
            --transition: all 0.3s ease;
          }

          body {
            font-family: 'Montserrat', sans-serif;
            color: var(--text-color);
            overflow-x: hidden;
          }

          /* Animation Classes */
          .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s cubic-bezier(0.23, 1, 0.32, 1), transform 0.8s cubic-bezier(0.23, 1, 0.32, 1);
            will-change: opacity, transform;
          }
          .animate-active {
            opacity: 1;
            transform: translateY(0);
          }

          /* Section-specific Animations */
          .about-section.animate-on-scroll.animate-active {
            animation: fadeInLeft 1s cubic-bezier(0.23, 1, 0.32, 1);
          }
          .destinations-section.animate-on-scroll.animate-active {
            animation: fadeInRight 1s cubic-bezier(0.23, 1, 0.32, 1);
          }
          .tours-section.animate-on-scroll.animate-active {
            animation: fadeInUp 1s cubic-bezier(0.23, 1, 0.32, 1);
          }
          .brand-section.animate-on-scroll.animate-active {
            animation: zoomIn 1s cubic-bezier(0.23, 1, 0.32, 1);
          }
          .cta-section.animate-on-scroll.animate-active {
            animation: fadeIn 1.2s cubic-bezier(0.23, 1, 0.32, 1);
          }
          .testimonials-section.animate-on-scroll.animate-active {
            animation: fadeInScale 1.2s cubic-bezier(0.23, 1, 0.32, 1);
            background: var(--testimonial-bg) !important;
          }

          /* Animation Keyframes */
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(40px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes fadeInLeft {
            from {
              opacity: 0;
              transform: translateX(-40px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          @keyframes fadeInRight {
            from {
              opacity: 0;
              transform: translateX(40px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          @keyframes zoomIn {
            from {
              opacity: 0;
              transform: scale(0.95);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          @keyframes fadeInScale {
            from { opacity: 0; transform: scale(0.96);}
            to { opacity: 1; transform: scale(1);}
          }

          /* Hero Slider */
          .hero-slider {
            position: relative;
            height: 100vh;
            overflow: hidden;
          }

          .slider-container {
            width: 100%;
            height: 100%;
            position: relative;
          }

          .slide {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-position: center;
            background-size: cover;
            opacity: 0;
            transform: scale(1.1);
            transition: opacity 1s ease, transform 1s ease;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .slide.active {
            opacity: 1;
            transform: scale(1);
            z-index: 1;
          }

          .slide-content {
            text-align: center;
            color: var(--light-color);
            max-width: 800px;
            padding: 0 20px;
            position: relative;
            z-index: 2;
          }

          .slide-title {
            font-size: 4rem;
            font-weight: 700;
            margin-bottom: 15px;
            text-shadow: 2px 2px 8px rgba(0,0,0,0.6);
            transform: translateY(30px);
            opacity: 0;
            animation: fadeInUp 0.8s forwards 0.5s;
          }

          .slide-description {
            font-size: 1.5rem;
            margin-bottom: 30px;
            text-shadow: 1px 1px 4px rgba(0,0,0,0.6);
            transform: translateY(30px);
            opacity: 0;
            animation: fadeInUp 0.8s forwards 0.8s;
          }

          .slide-button {
            display: inline-block;
            background: var(--primary-color);
            color: white;
            padding: 12px 30px;
            font-size: 1.1rem;
            font-weight: 600;
            border-radius: 50px;
            text-decoration: none;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            transition: var(--transition);
            transform: translateY(30px);
            opacity: 0;
            animation: fadeInUp 0.8s forwards 1.1s;
          }

          .slide-button:hover {
            background:rgb(255, 255, 255);
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.3);
            color: var(--primary-color);
          }

          .slider-nav {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            z-index: 10;
            background: rgba(255,255,255,0.2);
            color: var(--light-color);
            width: 50px;
            height: 50px;
            border: none;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: var(--transition);
          }

          .slider-nav:hover {
            background: rgba(255,255,255,0.4);
          }

          .slider-nav.prev {
            left: 20px;
          }

          .slider-nav.next {
            right: 20px;
          }

          .slider-dots {
            position: absolute;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            z-index: 10;
          }

          .dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: rgba(255,255,255,0.5);
            margin: 0 6px;
            border: none;
            cursor: pointer;
            transition: var(--transition);
          }

          .dot.active {
            background: var(--light-color);
            transform: scale(1.3);
          }
          /* About Section */
          .about-widequest {
            padding: 40px 0; /* Reduced padding */
            background: var(--bg-light);
          }

          .about-widequest .about-image video {
            width: 100%;
            height: auto;
            object-fit: cover;
            border-radius: 10px;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
            margin-left: -70px;
          }

          .about-widequest .about-content {
            padding: 15px; /* Reduced padding */
          }

          .about-widequest .section-title {
            font-size: 2rem;
            font-weight: 700;
            color: black;
            margin-bottom: 20px;
            position: relative;
            padding-bottom: 10px;
          }

          .about-widequest .section-title:after {
            content: "";
            position: absolute;
            left: 0;
            bottom: 0;
            width: 60px;
            height: 3px;
            background: var(--secondary-color);
          }

          .about-widequest .section-text {
            font-size: 1.1rem;
            line-height: 1.8;
            color: #555;
            margin-bottom: 20px;
          }

          .about-widequest .btn-custom {
            display: inline-block;
            padding: 10px 25px;
            background: var(--primary-color);
            color: var(--light-color);
            border-radius: 50px;
            text-decoration: none;
            font-weight: 600;
            transition: var(--transition);
          }

          .about-widequest .btn-custom:hover {
            background: #0b4a73;
            transform: translateY(-3px);
            box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
          }

          .about-reasons {
            padding: 40px 0; /* Reduced padding */
            background: var(--light-color);
          }

          .about-reasons .about-image video {
            width: 100%;
            height: auto;
            object-fit: cover;
            border-radius: 10px;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
            margin-left: 70px;
          }

          .about-reasons .about-content {
            padding: 15px; /* Reduced padding */
         
          }

          .about-reasons .section-title {
            font-size: 2rem;
            font-weight: 700;
            color: black;
            margin-bottom: 20px;
            position: relative;
            padding-bottom: 10px;
          }

          .about-reasons .section-title:after {
            content: "";
            position: absolute;
            left: 0;
            bottom: 0;
            width: 60px;
            height: 3px;
            background: var(--secondary-color);
          }

          .about-reasons .section-text {
            font-size: 1.1rem;
            line-height: 1.8;
            color: #555;
            margin-bottom: 20px;
          }

          /* Destinations Section */
          .destinations-section {
            padding: 60px 0;
            background: var(--light-color);
          }

          .destination-card {
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            transition: var(--transition);
            margin-bottom: 20px;
            height: 100%;
          }
          .destination-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.2);
          }
          .card-image {
            position: relative;
            overflow: hidden;
            height: 220px;
          }

          .card-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.8s ease;
          }

          .destination-card:hover .card-image img {
            transform: scale(1.1);
          }
          .card-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(14, 93, 144, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: var(--transition);
          }

          .destination-card:hover .card-overlay {
            opacity: 1;
          }

          .overlay-link {
            display: inline-block;
            padding: 10px 25px;
            background: var(--secondary-color);
            color: var(--text-color);
            border-radius: 50px;
            font-weight: 600;
            text-decoration: none;
            transform: translateY(20px);
            transition: var(--transition);
          }

          .destination-card:hover .overlay-link {
            transform: translateY(0);
          }

          .card-content {
            padding: 20px;
          }

          .card-title {
            font-size: 1.4rem;
            font-weight: 700;
            margin-bottom: 10px;
            color: var(--primary-color);
          }

          .card-text {
            color: #666;
            line-height: 1.6;
          }

        

          /* Testimonials Section */
          .testimonials-section {
          margin-top: 50px;
            padding-top: 10px;
            padding-bottom: 50px;
            background: var(--light-color);
            
          }
          .section-title {
           padding:20px;
           font-size: 2.5rem;
           color: black;
           font-family: 'Montserrat', Arial, sans-serif; 
          }
          .testimonial-card {
            background: var(--light-color);
            border-radius: 10px;
            padding: 30px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.08);
            transition: var(--transition);
            text-align: center;
            margin-bottom: 20px;
            height: 100%;
          }

          .testimonial-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 35px rgba(0,0,0,0.15);
          }

          .testimonial-avatar {
            margin: 0 auto 20px;
            width: 100px;
            height: 100px;
            border-radius: 50%;
            overflow: hidden;
            border: 5px solid var(--primary-color);
          }

          .testimonial-avatar img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .testimonial-rating {
            color: var(--secondary-color);
            margin-bottom: 15px;
          }

          .testimonial-text {
            color: #666;
            font-style: italic;
            margin-bottom: 15px;
            line-height: 1.7;
          }

          .testimonial-name {
            color: var(--primary-color);
            font-weight: 700;
            font-size: 1.1rem;
          }

          /* Travel Section */
          .travel-section {
            background-image: url(${background});
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            height: 500px;
            position: relative;
            color: #fff;
          }

          .travel-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;

            z-index: 0;
          }

          .travel-wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
            
            z-index: 1;
            gap: 30px;

        
          }

          .travel-text {
            flex: 1;
            max-width: 600px;
            transform: translateX(-170px);
          }

          .travel-text .section-title {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 20px;
            color: #fff;
          }

          .travel-text .description {
           
            font-size: 1.3rem;
            line-height: 1.6;
            margin-bottom: 20px;
          }

          .email-form {
           
            display: flex;
            margin-bottom: 20px;
            
          }

          .email-form input {
           
            flex: 1;
            padding: 10px 15px;
            border: none;
            border-radius: 5px 0 0 5px;
            font-size: 1rem;
          }

          .email-form button {
            padding: 10px 20px;
            background: var(--primary-color);
            color: #fff;
            border: none;
            border-radius: 0 5px 5px 0;
            font-size: 1rem;
            cursor: pointer;
            transition: background 0.3s ease;
          }

          .app-buttons img {
            width: 140px;
            height: auto;
            margin-right: 10px;
            cursor: pointer;
            transition: transform 0.3s ease;
          }

          .app-buttons img:hover {
            transform: scale(1.1);
          }

          .travel-image {
            flex: 1;
            text-align: center;
          }

          .travel-image img {
           margin-top: 65px;
            margin-left: 70px;
            width: 100%;
            max-width: 300px;
            border-radius: 10px;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
          }

          @media (max-width: 768px) {
            .travel-wrapper {
              flex-direction: column;
              text-align: center;
            }

            .travel-text {
              margin-bottom: 30px;
            }

            .travel-image img {
              max-width: 300px;
            }
          }
          @media (max-width: 992px) {
            .slide-title {
              font-size: 3rem;
            }
            .slide-description {
              font-size: 1.2rem;
            }
            .section-title {
              font-size: 1.8rem;
            }
            .cta-title {
              font-size: 2rem;
            }
          }

          @media (max-width: 768px) {
            .slide-title {
              font-size: 2.5rem;
            }
            .slide-description {
              font-size: 1rem;
            }
            .about-image {
              margin-bottom: 30px;
            }
            .section-title {
              font-size: 1.6rem;
            }
            .brand-tagline {
              font-size: 2rem;
            }
            .tour-card {
              height: auto;
            }
            .tour-image {
              height: 180px;
            }
          }

          @media (max-width: 576px) {
            .slide-title {
              font-size: 2rem;
            }
            .slider-nav {
              width: 40px;
              height: 40px;
            }
            .dot {
              width: 10px;
              height: 10px;
            }
            }
          }
          
        `}
      </style>
    </div>
  );
}

export default Home;
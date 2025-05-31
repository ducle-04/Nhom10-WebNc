import { useParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { destinationsData } from '../../../data/destinations';

function DestinationDetail() {
  const { destinationId } = useParams();
  const destination = destinationsData.find((dest) => dest.id === destinationId);

  const sectionsRef = useRef([]);

  const addToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionsRef.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  if (!destination) {
    console.log('Không tìm thấy destination với id:', destinationId);
    return (
      <div className="container text-center my-5">
        <h2>Không tìm thấy điểm đến</h2>
        <p>Vui lòng kiểm tra lại hoặc quay về trang chủ.</p>
      </div>
    );
  }

  return (
    <section className="destination-detail-section py-5">
      <div className="container">
        <div className="row mb-5">
          <div className="col-md-6">
            <div id="destinationCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3500">
              <div className="carousel-inner">
                {destination.gallery.map((image, index) => (
                  <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                    <img
                      src={image}
                      className="d-block w-100 rounded shadow-sm"
                      alt={`${destination.name} ${index + 1}`}
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#destinationCarousel" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#destinationCarousel" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
          <div className="col-md-6">
            <h1 className="destination-title">{destination.name}</h1>
            <span className="destination-badge">{destination.badge}</span>
            <p className="destination-price mt-3"><b>Giá từ:</b> {destination.price}</p>
            <p className="destination-description">{destination.description}</p>
          </div>
        </div>

        {/* Phần chi tiết */}
        <div className="row mb-5">
          <div className="col-12">
            <div className="destination-details mb-5 fade-in-section" ref={addToRefs}>
              <h2><span className="icon">📜</span> Chi tiết</h2>
              <div className="detail-card detail-card-wide p-4 rounded shadow-sm">
                <p>{destination.detailedDescription}</p> {/* Hiển thị toàn bộ chi tiết thay vì cắt ngắn */}
              </div>
            </div>
          </div>
        </div>

        {/* Phần Thời tiết và Khách sạn */}
        <div className="row mb-5">
          <div className="col-md-6 offset-md-0">
            <div className="destination-weather mb-5 fade-in-section" ref={addToRefs} style={{ transform: 'translateY(10px)' }}>
              <h3><span className="icon">🌤️</span> Thời tiết</h3>
              <div className="detail-card p-4 rounded shadow-sm">
                <p>{destination.weather}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="destination-hotels mb-5 fade-in-section" ref={addToRefs}>
              <h3><span className="icon">🏨</span> Khách sạn</h3>
              <div className="detail-card p-4 rounded shadow-sm">
                <ul>
                  {destination.hotels.map((hotel, index) => (
                    <li key={index}>{hotel}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Phần Mẹo du lịch và Tour liên quan */}
        <div className="row">
          <div className="col-md-6">
            <div className="destination-tips mb-5 fade-in-section" ref={addToRefs}>
              <h3><span className="icon">💡</span> Mẹo du lịch</h3>
              <div className="detail-card p-4 rounded shadow-sm">
                <ul>
                  {destination.travelTips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-6 offset-md-0" style={{ transform: 'translateY(10px)' }}>
            <div className="destination-tours mb-5 fade-in-section" ref={addToRefs}>
              <h3><span className="icon">🗺️</span> Tour liên quan</h3>
              <div className="detail-card p-4 rounded shadow-sm">
                <ul>
                  {destination.tours.map((tour, index) => (
                    <li key={index}>{tour}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Phần Lịch trình và Đánh giá */}
        <div className="destination-extras mt-5 fade-in-section" ref={addToRefs}>
          <h2>Thông tin bổ sung</h2>
          <div className="accordion" id="destinationAccordion">
            {/* Lịch trình */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingItinerary">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseItinerary"
                  aria-expanded="true"
                  aria-controls="collapseItinerary"
                >
                  Lịch trình mẫu
                </button>
              </h2>
              <div
                id="collapseItinerary"
                className="accordion-collapse collapse show"
                aria-labelledby="headingItinerary"
                data-bs-parent="#destinationAccordion"
              >
                <div className="accordion-body">
                  <div className="itinerary-timeline">
                    {destination.itinerary.map((day, index) => (
                      <div key={index} className="itinerary-day">
                        <div className="timeline-dot">
                          <span className="dot-icon">📅</span>
                        </div>
                        <div className="timeline-content p-3 rounded shadow-sm">
                          <h4>Ngày {day.day}</h4>
                          <p>{day.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Đánh giá */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingReviews">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseReviews"
                  aria-expanded="false"
                  aria-controls="collapseReviews"
                >
                  Đánh giá
                </button>
              </h2>
              <div
                id="collapseReviews"
                className="accordion-collapse collapse"
                aria-labelledby="headingReviews"
                data-bs-parent="#destinationAccordion"
              >
                <div className="accordion-body">
                  {destination.reviews.map((review, index) => (
                    <div key={index} className="review-item p-3 rounded shadow-sm">
                      <div className="d-flex align-items-center mb-2">
                        <div className="avatar me-2">
                          <span>{review.user.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="mb-0"><b>{review.user}</b> - {review.rating}/5 ⭐</p>
                        </div>
                      </div>
                      <p>{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>
        {`
          .destination-detail-section {
            font-family: 'Be Vietnam Pro', 'Montserrat', Arial, sans-serif;
            background-color: #f8f9fa;
            color: #333;
          }
          .destination-title {
            font-size: 2.5rem;
            font-weight: 700;
            color: #1e3a8a;
            margin-bottom: 15px;
          }
          .destination-badge {
            display: inline-block;
            padding: 8px 15px;
            background: linear-gradient(45deg, #ff9d00, #ffbf00);
            color: #fff;
            border-radius: 20px;
            font-size: 0.95rem;
            font-weight: 600;
            margin-left: 10px;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
          }
          .destination-price {
            font-size: 1.2rem;
            color: #28a745;
            font-weight: 600;
          }
          .destination-description {
            font-size: 1.05rem;
            line-height: 1.6;
            color: #555;
            margin-top: 15px;
          }
          h2, h3 {
            font-weight: 700;
            color: #1e3a8a;
            margin-bottom: 20px;
          }
          h2 .icon, h3 .icon {
            margin-right: 10px;
            font-size: 1.2rem;
          }
          p, ul {
            font-size: 0.95rem;
            color: #555;
            margin-bottom: 10px;
          }
          ul {
            list-style: none;
            padding: 0;
          }
          li {
            padding: 10px 0;
            border-bottom: 1px solid #eee;
            transition: color 0.3s ease;
          }
          li:hover {
            color: #1e3a8a;
          }
          .detail-card {
            background: #fff;
            border-left: 4px solid #1e3a8a;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .detail-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 16px rgba(30, 58, 138, 0.2);
          }
          .detail-card-wide {
            min-height: 100px; /* khung nội dung */
            padding: 20px;
          }
          /* Carousel */
          .carousel-item img {
            height: 400px;
            object-fit: cover;
            border-radius: 10px;
            transition: transform 0.5s ease;
          }
          .carousel-item.active img {
            transform: scale(1.02);
          }
          .carousel-control-prev, .carousel-control-next {
            width: 50px;
            height: 50px;
            background: rgba(0, 0, 0, 0.5);
            border-radius: 50%;
            top: 50%;
            transform: translateY(-50%);
            transition: background 0.3s ease;
          }
          .carousel-control-prev:hover, .carousel-control-next:hover {
            background: rgba(0, 0, 0, 0.8);
          }
          .carousel-control-prev-icon, .carousel-control-next-icon {
            width: 25px;
            height: 25px;
          }
          /* Lịch trình - Timeline */
          .itinerary-timeline {
            position: relative;
            max-width: 700px;
            margin: 0 auto;
            padding-left: 30px;
          }
          .itinerary-timeline::before {
            content: '';
            position: absolute;
            left: 15px;
            top: 0;
            bottom: 0;
            width: 2px;
            background: #1e3a8a;
          }
          .itinerary-day {
            position: relative;
            margin-bottom: 25px;
          }
          .timeline-dot {
            position: absolute;
            left: -35px;
            top: 0;
            width: 35px;
            height: 35px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .dot-icon {
            font-size: 1.3rem;
            color: #1e3a8a;
            background: #fff;
            border-radius: 50%;
            padding: 4px;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
          }
          .timeline-content {
            background: #fff;
            border-left: 4px solid #1e3a8a;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .timeline-content:hover {
            transform: translateX(8px);
            box-shadow: 0 4px 12px rgba(30, 58, 138, 0.2);
          }
          .itinerary-day h4 {
            font-size: 1.1rem;
            font-weight: 600;
            color: #333;
            margin-bottom: 10px;
          }
          /* Đánh giá */
          .review-item {
            margin-bottom: 15px;
            background: #fff;
            border-left: 4px solid #28a745;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .review-item:hover {
            transform: translateY(-3px);
            box-shadow: 0 4px 12px rgba(40, 167, 69, 0.2);
          }
          .avatar {
            width: 35px;
            height: 35px;
            background: #1e3a8a;
            color: #fff;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            font-size: 1.1rem;
          }
          /* Accordion */
          .accordion-button {
            font-weight: 600;
            color: #1e3a8a;
            background: #fff;
            box-shadow: none;
            transition: background 0.3s ease;
          }
          .accordion-button:not(.collapsed) {
            background: #e6f0fa;
            color: #1e3a8a;
          }
          .accordion-button:hover {
            background: #e6f0fa;
          }
          .accordion-body {
            background: #fff;
            border-radius: 5px;
            padding: 20px;
          }
          /* Hiệu ứng cuộn */
          .fade-in-section {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease-out, transform 0.8s ease-out;
          }
          .fade-in-section.visible {
            opacity: 1;
            transform: translateY(0);
          }
          /* Responsive */
          @media (max-width: 768px) {
            .carousel-item img {
              height: 300px;
            }
            .destination-title {
              font-size: 2rem;
            }
            .itinerary-timeline {
              padding-left: 25px;
            }
            .itinerary-timeline::before {
              left: 12px;
            }
            .timeline-dot {
              left: -30px;
            }
            .row > div {
              margin-bottom: 20px;
            }
            .detail-card-wide {
              min-height: 100px; /* Giảm min-height trên mobile */
            }
          }
        `}
      </style>
    </section>
  );
}

export default DestinationDetail;
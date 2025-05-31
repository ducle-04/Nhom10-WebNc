import { useParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { destinationsData } from '../../../data/destinations';

function DestinationDetail() {
  const { destinationId } = useParams();
  const destination = destinationsData.find((dest) => dest.id === destinationId);

  // Tạo refs cho từng section để theo dõi
  const sectionsRef = useRef([]);

  // Hàm thêm section vào refs
  const addToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  // Sử dụng Intersection Observer 
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
    <section className="destination-detail-section py-4">
      <div className="container">
        <div className="row mb-4">
          <div className="col-md-6">
            <div id="destinationCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3500">
              <div className="carousel-inner">
                {destination.gallery.map((image, index) => (
                  <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                    <img src={image} className="d-block w-100 rounded" alt={`${destination.name} ${index + 1}`} loading="lazy" />
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
            <p className="destination-price mt-2"><b>Giá từ:</b> {destination.price}</p>
            <p className="destination-description">{destination.description}</p>
            <button className="btn btn-primary mt-2">Đặt ngay</button>
          </div>
        </div>

        {/* Phần chi tiết và các mục khác */}
        <div className="row">
          <div className="col-md-6">
            <div className="destination-details mb-4 fade-in-section" ref={addToRefs}>
              <h2>Chi tiết</h2>
              <p>{destination.detailedDescription.slice(0, 150)}...</p>
            </div>

            <div className="destination-hotels mb-4 fade-in-section" ref={addToRefs}>
              <h3>Khách sạn</h3>
              <ul>
                {destination.hotels.map((hotel, index) => (
                  <li key={index}>{hotel}</li>
                ))}
              </ul>
            </div>

            <div className="destination-tours mb-4 fade-in-section" ref={addToRefs}>
              <h3>Tour liên quan</h3>
              <ul>
                {destination.tours.map((tour, index) => (
                  <li key={index}>{tour}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="col-md-6">
            <div className="destination-weather mb-6 fade-in-section" ref={addToRefs}>
              <h3>Thời tiết</h3>
              <p>{destination.weather}</p>
            </div>

            <div className="destination-tips mb-6 fade-in-section" ref={addToRefs}>
              <h3>Mẹo du lịch</h3>
              <ul>
                {destination.travelTips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Phần Lịch trình và Đánh giá: */}
        <div className="destination-extras mt-4 fade-in-section" ref={addToRefs}>
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
                  {destination.itinerary.map((day, index) => (
                    <div key={index} className="itinerary-day">
                      <h4>Ngày {day.day}</h4>
                      <p>{day.description}</p>
                    </div>
                  ))}
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
                    <div key={index} className="review-item">
                      <p><b>{review.user}</b> - {review.rating}/5 ⭐</p>
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
          }
          .destination-title {
            font-size: 2rem;
            font-weight: 700;
            color: #0e5d90;
            margin-bottom: 10px;
          }
          .destination-badge {
            display: inline-block;
            padding: 5px 10px;
            background: #ff9d00;
            color: #fff;
            border-radius: 5px;
            font-size: 0.9rem;
            margin-left: 10px;
          }
          .destination-price {
            font-size: 1.1rem;
            color: #333;
          }
          .destination-description {
            font-size: 1rem;
            color: #666;
            margin-top: 10px;
          }
          .btn-primary {
            background: #0e5d90;
            border: none;
            padding: 8px 16px;
            font-weight: 600;
            border-radius: 5px;
            transition: background 0.3s ease;
          }
          .btn-primary:hover {
            background: #0b4a73;
          }
          h2, h3 {
            font-weight: 700;
            color: #0e5d90;
            margin-bottom: 15px;
          }
          p, ul {
            font-size: 0.95rem;
            color: #333;
            margin-bottom: 10px;
          }
          ul {
            list-style: none;
            padding: 0;
          }
          li {
            padding: 8px 0;
            border-bottom: 1px solid #eee;
          }
          .itinerary-day, .review-item {
            margin-bottom: 15px;
          }
          .itinerary-day h4 {
            font-size: 1.1rem;
            font-weight: 600;
            color: #333;
          }
          .review-item {
            padding: 10px;
            background: #f8f9fa;
            border-radius: 5px;
          }
          .review-item p {
            margin: 0;
          }
          .carousel-item img {
            height: 350px;
            object-fit: cover;
            border-radius: 8px;
          }
          .accordion-button {
            font-weight: 600;
            color: #0e5d90;
          }
          .accordion-body {
            background: #f8f9fa;
            border-radius: 5px;
          }
          /* Hiệu ứng cuộn */
          .fade-in-section {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
          }
          .fade-in-section.visible {
            opacity: 1;
            transform: translateY(0);
          }
        `}
      </style>
    </section>
  );
}

export default DestinationDetail;
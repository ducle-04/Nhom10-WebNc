import React, { useEffect } from 'react';

function About() {
  useEffect(() => {
    // Hiệu ứng cuộn
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach((element, index) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const viewportHeight = window.innerHeight;

        if (elementTop < viewportHeight - 100 && elementBottom > 100) {
          setTimeout(() => {
            element.classList.add('animate-active');
          }, index * 100); // Stagger effect
        } else {
          element.classList.remove('animate-active');
        }
      });
    };

    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('resize', animateOnScroll);
    animateOnScroll();


    return () => {
      window.removeEventListener('scroll', animateOnScroll);
      window.removeEventListener('resize', animateOnScroll);
    };
  }, []);

  return (
    <div className="about-page">
      <section className="about-header animate-on-scroll">
        <div className="container">
          <div className="header-content">
            <h1 className="page-title">Về Wide Quest</h1>
            <p className="header-subtitle">Khám phá hành trình của chúng tôi trong việc tạo ra những chuyến đi đầy cảm hứng</p>
          </div>
        </div>
      </section>

      <section className="about-content">
        <div className="container">
          <div className="content-section animate-on-scroll">
            <div className="content-wrapper">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <h2 className="section-title">Sứ mệnh</h2>
                  <p className="section-text">
                    Wide Quest tự hào là người bạn đồng hành đáng tin cậy trên mỗi hành trình khám phá thế giới. Chúng tôi cam kết mang đến những trải nghiệm du lịch khác biệt — không chỉ an toàn, tiện nghi mà còn đong đầy cảm xúc và ý nghĩa. Mỗi chuyến đi là cơ hội để du khách mở rộng tầm nhìn, hòa mình vào thiên nhiên hoang sơ và văn hóa bản địa.
                  </p>
                </div>
                <div className="col-md-6">
                  <img
                    src="/images/about/mission.jpg"
                    alt="Sứ mệnh Wide Quest"
                    className="img-fluid rounded shadow-sm"
                    style={{ height: '300px', objectFit: 'cover' }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="content-section animate-on-scroll">
            <div className="content-wrapper">
              <div className="row align-items-center">
                <div className="col-md-6 order-md-2">
                  <h2 className="section-title">Đội ngũ</h2>
                  <p className="section-text">
                    Đội ngũ Wide Quest am hiểu sâu sắc từng điểm đến, mang đến trải nghiệm cá nhân hóa và đáng nhớ. Chúng tôi luôn lắng nghe, tư vấn và thiết kế hành trình phù hợp, từ phiêu lưu mạo hiểm đến thư giãn nhẹ nhàng, đảm bảo sự an tâm và hài lòng cho mọi du khách.
                  </p>
                </div>
                <div className="col-md-6 order-md-1">
                  <img
                    src="/images/about/team.png"
                    alt="Đội ngũ Wide Quest"
                    className="img-fluid rounded shadow-sm"
                    style={{ height: '300px', objectFit: 'cover' }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="content-section animate-on-scroll">
            <div className="content-wrapper">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <h2 className="section-title">Lịch sử thành lập</h2>
                  <p className="section-text">
                    Thành lập năm 2015, Wide Quest khởi nguồn từ đam mê tạo nên những chuyến đi ý nghĩa. Qua 10 năm, chúng tôi đã phục vụ hàng ngàn du khách, mở rộng mạng lưới đối tác và nâng cấp dịch vụ với công nghệ hiện đại. Sự tin tưởng của khách hàng là động lực để chúng tôi vươn xa.
                  </p>
                </div>
                <div className="col-md-6">
                  <img
                    src="/images/about/history.png"
                    alt="Lịch sử Wide Quest"
                    className="img-fluid rounded shadow-sm"
                    style={{ height: '300px', objectFit: 'cover' }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="content-section animate-on-scroll">
            <div className="content-wrapper">
              <h2 className="section-title text-center">Giá trị cốt lõi</h2>
              <div className="row">
                <div className="col-md-4 text-center">
                  <div className="value-card">
                    <h3 className="value-title">Chất lượng</h3>
                    <p className="value-text">Cung cấp dịch vụ hàng đầu cho mọi khách hàng.</p>
                  </div>
                </div>
                <div className="col-md-4 text-center">
                  <div className="value-card">
                    <h3 className="value-title">Bền vững</h3>
                    <p className="value-text">Bảo vệ thiên nhiên và cộng đồng địa phương.</p>
                  </div>
                </div>
                <div className="col-md-4 text-center">
                  <div className="value-card">
                    <h3 className="value-title">Đam mê</h3>
                    <p className="value-text">Lan tỏa tình yêu du lịch đến mọi người.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>
        {`
          .about-page {
            font-family: 'Be Vietnam Pro', 'Montserrat', Arial, sans-serif;
            color: #333;
            background-color: #f8f9fa;
          }
          .about-header {
            background: url('/images/about.jpg') no-repeat center/cover;
            height: 500px;
            display: flex;
            align-items: center;
            position: relative;
            overflow: hidden;
          }
          .about-header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.6);
          }
          .header-content {
            position: relative;
            z-index: 1;
            text-align: center;
            color: #fff;
          }
          .page-title {
            font-size: 3.5rem;
            font-weight: 700;
            margin-bottom: 20px;
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
          }
          .header-subtitle {
            font-size: 1.5rem;
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s;
          }
          .animate-on-scroll.animate-active .page-title,
          .animate-on-scroll.animate-active .header-subtitle {
            opacity: 1;
            transform: translateY(0);
          }
          .about-content {
            padding: 80px 0;
          }
          .content-section {
            margin-bottom: 60px;
            position: relative;
          }
          .content-wrapper {
            margin-top: 8px;
          }
          .section-title {
            font-size: 2.2rem;
            font-weight: 700;
            color: #1e3a8a;
            margin-bottom: 20px;
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
          }
          .section-text {
            font-size: 1.1rem;
            line-height: 1.8;
            color: #555;
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s;
          }
          .content-section img {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s;
          }
          .animate-on-scroll.animate-active .section-title,
          .animate-on-scroll.animate-active .section-text,
          .animate-on-scroll.animate-active img {
            opacity: 1;
            transform: translateY(0);
          }
          .value-card {
            background: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            min-height: 150px;
          }
          .value-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
          }
          .value-title {
            font-size: 1.5rem;
            font-weight: 600;
            color: #1e3a8a;
            margin-bottom: 10px;
          }
          .value-text {
            font-size: 1rem;
            color: #555;
          }
          @media (max-width: 768px) {
            .about-header {
              height: 300px;
            }
            .page-title {
              font-size: 2rem;
            }
            .header-subtitle {
              font-size: 1rem;
            }
            .section-title {
              font-size: 1.8rem;
            }
            .section-text {
              font-size: 1rem;
            }
            .content-section img {
              margin-bottom: 20px;
              height: 200px;
            }
            .value-card {
              margin-bottom: 20px;
            }
          }
        `}
      </style>
    </div>
  );
}

export default About;
import React, { useEffect } from 'react';

function About() {
    useEffect(() => {
        const animateOnScroll = () => {
            const elements = document.querySelectorAll('.animate-on-scroll');
            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementBottom = element.getBoundingClientRect().bottom;
                const viewportHeight = window.innerHeight;

                if (elementTop < viewportHeight - 100 && elementBottom > 100) {
                    element.classList.add('animate-active');
                } else {
                    element.classList.remove('animate-active');
                }
            });
        };

        window.addEventListener('scroll', animateOnScroll);
        window.addEventListener('resize', animateOnScroll);
        animateOnScroll(); // Kích hoạt ngay khi load

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
                    </div>
                </div>
            </section>

            <section className="about-content">
                <div className="container">
                    <div className="content-section animate-on-scroll">
                        <h2 className="section-subtitle">Sứ mệnh</h2>
                        <p className="section-text">
                            Wide Quest tự hào là người bạn đồng hành đáng tin cậy trên mỗi hành trình khám phá thế giới. Chúng tôi cam kết mang đến những trải nghiệm du lịch khác biệt — không chỉ an toàn, tiện nghi mà còn đong đầy cảm xúc và ý nghĩa. Mỗi chuyến đi cùng Wide Quest là cơ hội để du khách mở rộng tầm nhìn, hòa mình vào vẻ đẹp thiên nhiên hoang sơ, cảm nhận nét văn hóa bản địa đậm đà và lưu giữ những khoảnh khắc khó quên. Đồng thời, chúng tôi luôn đặt trách nhiệm bảo vệ môi trường và gìn giữ bản sắc văn hóa địa phương làm kim chỉ nam trong mọi hoạt động, nhằm hướng đến du lịch bền vững và đầy nhân văn.
                        </p>
                    </div>

                    <div className="content-section animate-on-scroll">
                        <h2 className="section-subtitle">Đội ngũ</h2>
                        <p className="section-text">
                            Với sự am hiểu sâu sắc về từng điểm đến và tinh thần phục vụ chuyên nghiệp, đội ngũ Wide Quest không chỉ mang đến cho bạn sự an tâm mà còn tạo nên những trải nghiệm cá nhân hóa, gần gũi và đáng nhớ. Dù bạn là người yêu thiên nhiên, đam mê khám phá hay tìm kiếm những hành trình thư giãn, chúng tôi luôn sẵn sàng lắng nghe, tư vấn và thiết kế hành trình phù hợp nhất — để mỗi chuyến đi cùng Wide Quest đều là một kỷ niệm khó quên.
                        </p>
                    </div>

                    <div className="content-section animate-on-scroll">
                        <h2 className="section-subtitle">Lịch sử thành lập</h2>
                        <p className="section-text">
                            Trải qua hành trình không ngừng đổi mới, Wide Quest đã phục vụ hàng ngàn lượt khách mỗi năm, mở rộng mạng lưới đối tác trong và ngoài nước, đồng thời liên tục nâng cao trải nghiệm người dùng qua công nghệ và dịch vụ cá nhân hóa. Chúng tôi tự hào là người bạn đồng hành đáng tin cậy của du khách trên mọi hành trình — từ những chuyến phiêu lưu mạo hiểm đến các kỳ nghỉ dưỡng thư giãn. Sự hài lòng và tin tưởng của khách hàng chính là động lực để Wide Quest tiếp tục vươn xa và khẳng định vị thế trong ngành du lịch hiện đại.
                        </p>
                    </div>

                    <div className="content-section animate-on-scroll">
                        <h2 className="section-subtitle">Giá trị cốt lõi</h2>
                        <p className="section-text">
                            - <strong>Chất lượng:</strong> Cung cấp dịch vụ hàng đầu cho mọi khách hàng.
                            - <strong>Bền vững:</strong> Bảo vệ thiên nhiên và cộng đồng địa phương.
                            - <strong>Đam mê:</strong> Lan tỏa tình yêu du lịch đến mọi người.
                        </p>
                    </div>
                </div>
            </section>

            <style>
                {`
        .about-page {
          font-family: 'Be Vietnam Pro', 'Montserrat', Arial, sans-serif !important;
          color: #333;
        }
        .about-header {
          background: url('/images/about.jpg') no-repeat center/cover;
          height: 400px;
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
          background: rgba(0, 0, 0, 0.5);
        }
        .header-content {
          position: relative;
          z-index: 1;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .page-title {
          font-size: 3rem;
          font-weight: 700;
          color: #fff;
          z-index: 1;
          text-align: center;
          width: 100%;
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .animate-on-scroll.animate-active .page-title {
          opacity: 1;
          transform: translateY(0);
        }
        .about-content {
          padding: 60px 0;
          background: #f8f9fa;
        }
        .content-section {
          margin-bottom: 40px;
        }
        .section-subtitle {
          font-size: 2rem;
          font-weight: 700;
          color: #0e5d90;
          margin-bottom: 20px;
          position: relative;
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .section-text {
          font-size: 1.1rem;
          line-height: 1.8;
          color: #555;
          margin-bottom: 30px;
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .animate-on-scroll.animate-active .section-subtitle,
        .animate-on-scroll.animate-active .section-text {
          opacity: 1;
          transform: translateY(0);
        }
        .section-subtitle::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 60px;
          height: 3px;
          background: #ff9d00;
        }
        @media (max-width: 768px) {
          .page-title {
            font-size: 2rem;
          }
          .section-subtitle {
            font-size: 1.5rem;
          }
          .section-text {
            font-size: 1rem;
          }
        }
        `}
            </style>
        </div>
    );
}

export default About;
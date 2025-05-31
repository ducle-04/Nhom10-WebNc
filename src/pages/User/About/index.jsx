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
                            Wide Quest cam kết mang đến những trải nghiệm du lịch độc đáo, giúp khách hàng khám phá thế giới với sự an toàn, tiện nghi và ý nghĩa. Chúng tôi nỗ lực bảo vệ môi trường và tôn vinh văn hóa địa phương trong mỗi hành trình.
                        </p>
                    </div>

                    <div className="content-section animate-on-scroll">
                        <h2 className="section-subtitle">Đội ngũ</h2>
                        <p className="section-text">
                            Đội ngũ Wide Quest gồm các chuyên gia du lịch giàu kinh nghiệm, hướng dẫn viên tận tâm và nhân viên hỗ trợ nhiệt tình. Chúng tôi luôn sẵn sàng đồng hành cùng bạn trên mọi chuyến đi.
                        </p>
                    </div>

                    <div className="content-section animate-on-scroll">
                        <h2 className="section-subtitle">Lịch sử thành lập</h2>
                        <p className="section-text">
                            Wide Quest được thành lập vào năm 2020 với mục tiêu tạo ra một nền tảng du lịch đột phá, kết nối đam mê khám phá với các dịch vụ chất lượng cao. Từ một đội ngũ nhỏ, chúng tôi đã phát triển thành một thương hiệu được tin tưởng.
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
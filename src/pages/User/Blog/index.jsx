import { useEffect, useRef } from 'react';

function Blog() {
    const blogPosts = [
        {
            id: 1,
            title: "Kinh nghiệm du lịch Sapa mùa lúa chín",
            excerpt: "Khám phá vẻ đẹp Sapa vào mùa lúa chín với những cung đường tuyệt đẹp uốn lượn quanh núi đồi vàng ươm, hòa mình vào không khí trong lành và yên bình. Bạn còn có cơ hội tìm hiểu văn hóa độc đáo của người dân tộc qua các bản làng truyền thống, thưởng thức ẩm thực đặc sản và tham gia các lễ hội địa phương đậm đà bản sắc. Đừng quên chụp lại những khoảnh khắc tuyệt vời và trải nghiệm hành trình trekking xuyên qua ruộng bậc thang ngoạn mục.",
            image: [
                '/images/blog/sapa.jpeg',
                '/images/blog/sapa-1.jpg',
                '/images/blog/sapa-2.jpg',
            ],
            date: "2025-05-20",
            author: "Nguyen Van A",
        },
        {
            id: 2,
            title: "Mẹo tiết kiệm khi du lịch Đà Lạt",
            excerpt: "Hướng dẫn chi tiết để bạn có chuyến đi Đà Lạt tiết kiệm mà vẫn đầy đủ trải nghiệm, bao gồm chọn thời điểm du lịch ngoài mùa cao điểm để tránh giá cả tăng cao, tận dụng các homestay và quán ăn địa phương giá rẻ nhưng chất lượng, di chuyển bằng xe máy hoặc xe bus thay vì taxi, và lên kế hoạch tham quan các điểm miễn phí hoặc giá vé thấp. Bên cạnh đó, săn vé máy bay, đặt phòng sớm và tham gia các tour nhóm cũng giúp bạn tiết kiệm đáng kể chi phí mà vẫn khám phá được trọn vẹn vẻ đẹp thành phố ngàn hoa.",
            image: [
                '/images/blog/dalat-1.jpg',
                '/images/blog/dalat-2.jpg',
                '/images/blog/dalat-3.jpg',
            ],
            date: "2025-05-15",
            author: "Tran Thi B",
        },
        {
            id: 3,
            title: "Hành trình 3 ngày khám phá Phú Quốc",
            excerpt: "Lịch trình chi tiết cho 3 ngày tại thiên đường biển Phú Quốc với các điểm đến nổi bật như bãi Sao với cát trắng mịn màng, làng chài Hàm Ninh truyền thống, công viên quốc gia Phú Quốc xanh mát, và các khu chợ đêm sầm uất. Bạn sẽ được tận hưởng những trải nghiệm tuyệt vời từ lặn biển ngắm san hô, thưởng thức hải sản tươi sống, đến khám phá văn hóa địa phương độc đáo, tất cả trong không gian biển trời bao la và yên bình.",
            image: [
                '/images/blog/phuquoc-1.jpg',
                '/images/blog/phuquoc-2.jpg',
                '/images/blog/phuquoc-3.jpg',
            ],
            date: "2025-05-10",
            author: "Le Van C",
        },
        {
            id: 4,
            title: "Khám phá Nha Trang – Thiên đường biển 4 ngày",
            excerpt: "Tham gia hành trình 4 ngày tại Nha Trang để tận hưởng vẻ đẹp của bãi biển cát vàng, nước trong xanh và các hòn đảo hoang sơ như Hòn Mun, Hòn Tằm. Trải nghiệm lặn ngắm san hô, thư giãn tại Vinpearl Land, và thưởng thức hải sản tươi ngon tại các nhà hàng ven biển. Đừng bỏ lỡ cơ hội khám phá viện Hải dương học và chợ Đầm để cảm nhận nhịp sống sôi động của thành phố biển. Một chuyến đi lý tưởng cho kỳ nghỉ thư giãn và khám phá!",
            image: [
                '/images/blog/nhatrang-1.jpg',
                '/images/blog/nhatrang-2.jpg',
                '/images/blog/nhatrang-3.jpg',
            ],
            date: "2025-05-05",
            author: "Pham Thi D",
        },
        {
            id: 5,
            title: "Hội An – Hành trình qua phố cổ đèn lồng",
            excerpt: "Khám phá phố cổ Hội An với những con phố lung linh ánh đèn lồng, kiến trúc cổ kính và văn hóa truyền thống đậm chất Việt. Dạo bước qua cầu Nhật Bản, thưởng thức cao lầu, mì Quảng, và tham quan Cù Lao Chàm để lặn ngắm san hô. Chuyến đi còn đưa bạn đến các làng nghề truyền thống, nơi bạn có thể tự tay làm đèn lồng. Một trải nghiệm tuyệt vời để cảm nhận sự bình yên và nét đẹp di sản của Hội An.",
            image: [
                '/images/blog/hoian-1.jpg',
                '/images/blog/hoian-2.jpg',
                '/images/blog/hoian-3.jpg',
            ],
            date: "2025-05-01",
            author: "Hoang Van E",
        },
    ];

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
            { threshold: 0.2 }
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

    return (
        <section className="blog-section py-5">
            <div className="container">
                <h1 className="text-center mb-5">Blog Du Lịch</h1>
                {blogPosts.map((post) => (
                    <div
                        key={post.id}
                        className="blog-post fade-in-section mb-4 rounded shadow"
                        ref={addToRefs}
                    >
                        <div className="row align-items-center">
                            <div className="col-md-3 image-container p-4">
                                {Array.isArray(post.image) && (
                                    <div className="d-flex gap-3">
                                        {post.image.map((img, index) => (
                                            <img
                                                key={index}
                                                src={img}
                                                alt={`${post.title} ${index + 1}`}
                                                className="img-fluid rounded"
                                                style={{ height: '200px', objectFit: 'cover' }}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="col-md-9 content p-4">
                                <h2 className="mb-3">{post.title}</h2>
                                <p className="text-muted mb-3">{post.excerpt}</p>
                                <div className="d-flex justify-content-between align-items-center">
                                    <small className="text-muted">Ngày đăng: {post.date}</small>
                                    <small className="author-text">Tác giả: {post.author}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <style>
                {`
                    .blog-section {
                        font-family: 'Be Vietnam Pro', 'Montserrat', Arial, sans-serif;
                        background-color: #f8f9fa;
                    }
                    .blog-section h1 {
                        font-size: 2.5rem;
                        font-weight: bold;
                        color: #1e3a8a;
                    }
                    .blog-post {
                        background: #fff;
                        transition: transform 0.3s ease, box-shadow 0.3s ease;
                    }
                    .blog-post:hover {
                        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
                        transform: scale(1.1);
                    }
                    .image-container {
                        width: 100%;
                        overflow: hidden;
                    }
                    .image-container .d-flex img {
                        flex-grow: 1;
                        max-width: 33.33%;
                    }
                    .content h2 {
                        font-size: 1.25rem;
                        font-weight: 600;
                        color: #1e3a8a;
                    }
                    .content p {
                        font-size: 0.9rem;
                        line-height: 1.5;
                    }
                    .fade-in-section {
                        opacity: 0;
                        transform: translateY(30px);
                        transition: opacity 0.8s ease-out, transform 0.8s ease-out;
                    }
                    .fade-in-section.visible {
                        opacity: 1;
                        transform: translateY(0);
                    }
                    .author-text {
                        color: #1e3a8a;
                        font-weight: 600;
                        font-size: 0.9rem;
                    }
                    @media (max-width: 767px) {
                        .image-container .d-flex img {
                            max-width: 100%;
                            height: 200px;
                        }
                    }
                `}
            </style>
        </section>
    );
}

export default Blog;
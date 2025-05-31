import { useEffect, useRef } from 'react';

function Blog() {
    const blogPosts = [
        {
            id: 1,
            title: "Kinh nghiệm du lịch Sapa mùa lúa chín",
            excerpt: "Khám phá vẻ đẹp Sapa vào mùa lúa chín với những cung đường tuyệt đẹp và văn hóa độc đáo của người dân tộc.",
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
            excerpt: "Hướng dẫn chi tiết để bạn có chuyến đi Đà Lạt tiết kiệm mà vẫn đầy đủ trải nghiệm.",
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
            excerpt: "Lịch trình chi tiết cho 3 ngày tại thiên đường biển Phú Quốc với các điểm đến nổi bật.",
            image: [
                '/images/blog/phuquoc-1.jpg',
                '/images/blog/phuquoc-2.jpg',
                '/images/blog/phuquoc-3.jpg',
            ],
            date: "2025-05-10",
            author: "Le Van C",
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
                            <div className="col-md-4 image-container p-4">
                                {Array.isArray(post.image) ? (
                                    <div className="d-flex gap-3">
                                        {post.image.map((img, index) => (
                                            <img
                                                key={index}
                                                src={img}
                                                alt={`${post.title} ${index + 1}`}
                                                className="img-fluid rounded transition-transform duration-300"
                                                style={{ height: '200px', objectFit: 'cover' }}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="img-fluid rounded transition-transform duration-300"
                                        style={{ width: '100%', height: '250px', objectFit: 'cover' }}
                                    />
                                )}
                            </div>
                            <div className="col-md-8 content p-4">
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
            transform: scale(1.05);
          }
          .image-container {
            width: 100%;
            overflow: hidden;
          }
          .image-container .d-flex img {
            flex-grow: 1;
            max-width: 33.33%; /* Chia đều 3 ảnh */
            transition: transform 0.3s ease;
          }
          .blog-post:hover .image-container .d-flex img {
            transform: scale(1.1);
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
            color: #1e3a8a; /* Màu xanh đậm, tương tự tiêu đề */
            font-weight: 600; /* Font đậm hơn */
            font-size: 0.9rem; /* Giữ kích thước giống ngày đăng */
          }
          /* Responsive layout */
          @media (max-width: 767px) {
            .image-container .d-flex img {
              max-width: 100%; /* Trên mobile, mỗi ảnh chiếm toàn bộ chiều rộng */
              height: 200px;
            }
          }
        `}
            </style>
        </section>
    );
}

export default Blog;
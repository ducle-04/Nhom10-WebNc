import React, { useState } from 'react';

function Contact() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSuccess(true);
        setForm({ name: '', email: '', message: '' });
    };

    return (
        <div
            className="contact-page-custom d-flex align-items-center justify-content-center"
            style={{
                minHeight: '100vh',
                background: `url('/images/destination/phuquoc-1.jpg') center center / cover no-repeat`,
            }}
        >
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap');
                .contact-page-custom {
                    min-height: 100vh;
                    width: 100vw;
                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;
                    font-family: 'Montserrat', Arial, sans-serif;
                }
                .contact-card {
                    background: rgba(255,255,255,0.97);
                    border-radius: 12px;
                    box-shadow: 0 8px 32px rgba(30,58,138,0.13), 0 1.5px 6px rgba(0,0,0,0.04);
                    padding: 48px 36px 36px 36px;
                    max-width: 650px;
                    width: 100%;
                    opacity: 0.95;
                    margin: 32px 0;
                    position: relative;
                    animation: fadeInContact 0.7s cubic-bezier(.4,2,.6,1);
                }
                @keyframes fadeInContact {
                    from { opacity: 0; transform: translateY(40px);}
                    to { opacity: 1; transform: none;}
                }
                .contact-title {
                    font-size: 2rem;
                    font-weight: 700;
                    color: #1e40af;
                    margin-bottom: 18px;
                    letter-spacing: 1px;
                    text-align: center;
                }
                .contact-desc {
                    color: #444;
                    font-size: 1.08rem;
                    text-align: center;
                    margin-bottom: 32px;
                }
                .form-label {
                    font-weight: 600;
                    color: #1e293b;
                    margin-bottom: 6px;
                }
                .form-control {
                    border-radius: 8px;
                    border: 1.5px solid #e0e7ef;
                    font-size: 1.07rem;
                    padding: 12px 18px;
                    transition: border-color 0.2s, box-shadow 0.2s;
                }
                .form-control:focus {
                    border-color: #1e40af;
                    box-shadow: 0 0 0 0.12rem rgba(30,64,175,0.13);
                }
                textarea.form-control {
                    min-height: 120px;
                    resize: vertical;
                }
                .btn-contact {
                    background: linear-gradient(90deg, #1e40af 60%, #60a5fa 100%);
                    color: #fff;
                    font-weight: 700;
                    font-size: 1.1rem;
                    border: none;
                    border-radius: 8px;
                    padding: 12px 0;
                    box-shadow: 0 2px 8px rgba(30,64,175,0.08);
                    transition: background 0.2s, color 0.2s;
                    width: 100%;
                    margin-top: 12px;
                }
                .btn-contact:hover {
                    background: linear-gradient(90deg, #1e293b 60%, #1e40af 100%);
                    color: #a5b4fc;
                }
                .alert-success {
                    border-radius: 8px;
                    font-size: 1.08rem;
                    margin-bottom: 18px;
                    background: #e0f7e9;
                    color: #15803d;
                    border: 1px solid #bbf7d0;
                }
                @media (max-width: 600px) {
                    .contact-card {
                        padding: 18px 4px 14px 4px;
                        border-radius: 6px;
                    }
                    .contact-title {
                        font-size: 1.3rem;
                    }
                }
                `}
            </style>
            <div className="contact-card">
                <div className="contact-title">Liên hệ với chúng tôi</div>
                <div className="contact-desc">
                    Nếu bạn có bất kỳ câu hỏi, góp ý hoặc cần hỗ trợ, hãy gửi thông tin cho chúng tôi. Chúng tôi sẽ phản hồi sớm nhất!
                </div>
                {success && <div className="alert alert-success text-center">Đã gửi thành công! Chúng tôi sẽ liên hệ lại bạn sớm nhất.</div>}
                <form onSubmit={handleSubmit} autoComplete="off">
                    <div className="mb-3">
                        <label className="form-label">Họ và tên</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Nhập họ và tên"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Nhập email của bạn"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Nội dung</label>
                        <textarea
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            className="form-control"
                            rows={5}
                            placeholder="Nhập nội dung bạn muốn gửi..."
                            required
                        />
                    </div>
                    <button type="submit" className="btn-contact">
                        Gửi liên hệ
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Contact;

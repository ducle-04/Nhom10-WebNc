import React, { useState } from 'react';

function Contact() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', form);
        setSuccess(true);
        setForm({ name: '', email: '', message: '' });
    };

    return (
        <div className="contact-page container py-5 d-flex justify-content-center">
            <div className="form-wrapper shadow p-4 p-md-5 bg-white rounded-4" style={{ width: '100%', maxWidth: 700 }}>
                <h2 className="mb-4 fw-bold text-center" style={{ color: '#1e40af' }}>Liên hệ với chúng tôi</h2>
                {success && <div className="alert alert-success text-center">Đã gửi thành công!</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="form-label fw-semibold">Họ và tên</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="form-control rounded-pill px-4 py-2"
                            placeholder="Nhập họ và tên"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="form-label fw-semibold">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="form-control rounded-pill px-4 py-2"
                            placeholder="Nhập email của bạn"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="form-label fw-semibold">Nội dung</label>
                        <textarea
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            className="form-control rounded-4 px-4 py-3"
                            rows="5"
                            placeholder="Nhập nội dung bạn muốn gửi..."
                            required
                        />
                    </div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary btn-lg rounded-pill fw-semibold shadow-sm">
                            Gửi liên hệ
                        </button>
                    </div>
                </form>
            </div>

            {/* Custom CSS */}
            <style>
                {`
                .contact-page {
                    background: linear-gradient(to right, #eaf6fb, #f9f9f9);
                    min-height: 100vh;
                }

                .form-wrapper input:focus,
                .form-wrapper textarea:focus {
                    border-color: #1e40af;
                    box-shadow: 0 0 0 0.15rem rgba(14, 93, 144, 0.25);
                }

                .btn-primary {
                    background-color: #0e5d90;
                    border-color: #0e5d90;
                }

                .btn-primary:hover {
                    background-color: #094a73;
                    border-color: #094a73;
                }
                `}
            </style>
        </div>
    );
}

export default Contact;

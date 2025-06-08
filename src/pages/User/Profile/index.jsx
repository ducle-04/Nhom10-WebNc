import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, Mail, Phone, Edit, Save } from 'lucide-react';
import defaultAvatar from '../../../assets/images/avatar/avatar1.jpg';

function Profile() {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        fullName: 'Nguyen Van A',
        email: 'nguyenvana@example.com',
        phone: '0901234567',
        password: '********',
        avatar: null,
    });
    const [previewAvatar, setPreviewAvatar] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prevState) => ({
                ...prevState,
                avatar: file,
            }));
            setPreviewAvatar(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Updated Profile:', formData); // Mô phỏng lưu thông tin
        setIsEditing(false); // Tắt chế độ chỉnh sửa sau khi lưu
        // Thêm logic lưu dữ liệu (ví dụ: API call) tại đây
    };

    const handleCancel = () => {
        setIsEditing(false);

        setFormData({
            fullName: 'Nguyen Van A',
            email: 'nguyenvana@example.com',
            phone: '0901234567',
            password: '********',
            avatar: null,
        });
        setPreviewAvatar(null);
    };

    return (
        <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #ffffff 0%, #4facfe 100%)' }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-10 col-md-8 col-lg-6">
                        <div className="card p-4" style={{ background: 'rgba(255, 255, 255, 0.95)', borderRadius: '20px', boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)' }}>
                            <h2 className="text-center fw-bold text-dark mb-4">Profile</h2>
                            <div className="text-center mb-4">
                                <div style={{ position: 'relative', display: 'inline-block' }}>
                                    <img
                                        src={previewAvatar || defaultAvatar}
                                        alt="Avatar"
                                        className="rounded-circle"
                                        style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                    />
                                    {isEditing && (
                                        <label htmlFor="avatarInput" style={{ position: 'absolute', bottom: '10px', right: '10px', cursor: 'pointer' }}>
                                            <Edit size={20} color="#ffffff" style={{ background: '#667eea', borderRadius: '50%', padding: '5px' }} />
                                            <input
                                                id="avatarInput"
                                                type="file"
                                                accept="image/*"
                                                onChange={handleAvatarChange}
                                                style={{ display: 'none' }}
                                            />
                                        </label>
                                    )}
                                </div>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold text-dark">Họ và tên</label>
                                    <div style={{ position: 'relative' }}>
                                        <User size={20} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#6c757d' }} />
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            className="form-control form-control-lg"
                                            style={{ paddingLeft: '45px', borderRadius: '12px', border: '2px solid #e9ecef' }}
                                            disabled={!isEditing}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold text-dark">Email</label>
                                    <div style={{ position: 'relative' }}>
                                        <Mail size={20} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#6c757d' }} />
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="form-control form-control-lg"
                                            style={{ paddingLeft: '45px', borderRadius: '12px', border: '2px solid #e9ecef' }}
                                            disabled={!isEditing}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold text-dark">Số điện thoại</label>
                                    <div style={{ position: 'relative' }}>
                                        <Phone size={20} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#6c757d' }} />
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="form-control form-control-lg"
                                            style={{ paddingLeft: '45px', borderRadius: '12px', border: '2px solid #e9ecef' }}
                                            disabled={!isEditing}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold text-dark">Mật khẩu</label>
                                    <div style={{ position: 'relative' }}>
                                        <Lock size={20} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#6c757d' }} />
                                        <input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="form-control form-control-lg"
                                            style={{ paddingLeft: '45px', borderRadius: '12px', border: '2px solid #e9ecef' }}
                                            disabled={!isEditing}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="text-center">
                                    {!isEditing ? (
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', border: 'none', borderRadius: '12px', padding: '10px 30px' }}
                                            onClick={() => setIsEditing(true)}
                                        >
                                            <Edit size={20} /> Chỉnh sửa
                                        </button>
                                    ) : (
                                        <>
                                            <button
                                                type="submit"
                                                className="btn btn-success me-2"
                                                style={{ background: 'linear-gradient(135deg, #28a745 0%, #218838 100%)', border: 'none', borderRadius: '12px', padding: '10px 30px' }}
                                            >
                                                <Save size={20} /> Lưu
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-danger"
                                                style={{ background: 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)', border: 'none', borderRadius: '12px', padding: '10px 30px' }}
                                                onClick={handleCancel}
                                            >
                                                Hủy
                                            </button>
                                        </>
                                    )}
                                </div>
                            </form>
                            <div className="text-center mt-3">
                                <button
                                    type="button"
                                    className="btn btn-outline-dark"
                                    style={{ borderRadius: '12px', padding: '8px 20px' }}
                                    onClick={() => navigate('/')}
                                >
                                    Quay lại trang chủ
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
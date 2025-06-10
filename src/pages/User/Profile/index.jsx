import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, Mail, Phone, Edit, Save, Upload, KeyRound } from 'lucide-react';
import defaultAvatar from '../../../assets/images/avatar/avatar1.jpg';

function Profile() {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        avatar: null,
    });
    const [previewAvatar, setPreviewAvatar] = useState(null);
    const [showChangePass, setShowChangePass] = useState(false);

    useEffect(() => {
        let userName = localStorage.getItem('userName');
        let users = [];
        const stored = localStorage.getItem('users');
        if (stored) {
            try {
                users = JSON.parse(stored);
            } catch {}
        }
        let user = users.find(u => u.name === userName || u.username === userName);
        if (!user) {
            user = {
                name: userName || '',
                email: '',
                phone: '',
                password: '',
            };
        }
        setFormData({
            fullName: user.name || '',
            email: user.email || '',
            phone: user.phone || '',
            password: user.password ? user.password : '',
            avatar: null,
        });
        setPreviewAvatar(null);
    }, []);

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
        let users = [];
        const stored = localStorage.getItem('users');
        if (stored) {
            try {
                users = JSON.parse(stored);
            } catch {}
        }
        let userName = localStorage.getItem('userName');
        const idx = users.findIndex(u => u.name === userName || u.username === userName);
        if (idx !== -1) {
            users[idx] = {
                ...users[idx],
                name: formData.fullName,
                username: users[idx].username,
                email: formData.email,
                phone: formData.phone,
                password: formData.password,
            };
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('userName', formData.fullName);
        }
        setIsEditing(false);
        alert('Cập nhật thông tin thành công!');
    };

    const handleCancel = () => {
        setIsEditing(false);
        let userName = localStorage.getItem('userName');
        let users = [];
        const stored = localStorage.getItem('users');
        if (stored) {
            try {
                users = JSON.parse(stored);
            } catch {}
        }
        let user = users.find(u => u.name === userName || u.username === userName);
        if (!user) {
            user = {
                name: userName || '',
                email: '',
                phone: '',
                password: '',
            };
        }
        setFormData({
            fullName: user.name || '',
            email: user.email || '',
            phone: user.phone || '',
            password: user.password ? user.password : '',
            avatar: null,
        });
        setPreviewAvatar(null);
    };

    // Đổi mật khẩu
    const handleChangePassword = (e) => {
        e.preventDefault();
        let users = [];
        const stored = localStorage.getItem('users');
        if (stored) {
            try {
                users = JSON.parse(stored);
            } catch {}
        }
        let userName = localStorage.getItem('userName');
        const idx = users.findIndex(u => u.name === userName || u.username === userName);
        const oldPass = $('#oldPassword').val();
        const newPass = $('#newPassword').val();
        const confirmPass = $('#confirmNewPassword').val();
        if (!oldPass || !newPass || !confirmPass) {
            $('#changePassMsg').text('Vui lòng nhập đầy đủ thông tin');
            return;
        }
        if (users[idx].password !== oldPass) {
            $('#changePassMsg').text('Mật khẩu cũ không đúng');
            return;
        }
        if (newPass !== confirmPass) {
            $('#changePassMsg').text('Mật khẩu xác nhận không khớp');
            return;
        }
        users[idx].password = newPass;
        localStorage.setItem('users', JSON.stringify(users));
        setFormData(prev => ({ ...prev, password: newPass }));
        setShowChangePass(false);
        $('#changePassMsg').text('');
        alert('Đổi mật khẩu thành công!');
    };

    return (
        <div className="profile-bg d-flex align-items-center justify-content-center py-5">
            <div className="profile-container-horizontal mx-auto">
                <div className="profile-card-horizontal shadow-lg rounded-4 p-4 p-md-5 d-flex flex-column flex-md-row align-items-stretch">
                    {/* Avatar section */}
                    <div className="profile-avatar-section d-flex flex-column align-items-center justify-content-center me-md-5 mb-4 mb-md-0">
                        <div className="profile-avatar-wrap-horizontal mb-3">
                            <img
                                src={previewAvatar || defaultAvatar}
                                alt="Avatar"
                                className="profile-avatar-horizontal"
                            />
                            {isEditing && (
                                <label htmlFor="avatarInput" className="profile-avatar-edit-horizontal">
                                    <Upload size={20} />
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
                        <div className="text-center">
                            <span className="fw-bold">{formData.fullName}</span>
                        </div>
                    </div>
                    {/* Info section */}
                    <div className="flex-grow-1">
                        <h2 className="fw-bold mb-4 profile-title-horizontal text-center text-md-start">Thông tin cá nhân</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-semibold">Họ và tên</label>
                                    <div className="profile-input-wrap-horizontal">
                                        <User size={20} className="profile-input-icon-horizontal" />
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            className="form-control profile-input-horizontal"
                                            disabled={!isEditing ? false : false}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-semibold">Email</label>
                                    <div className="profile-input-wrap-horizontal">
                                        <Mail size={20} className="profile-input-icon-horizontal" />
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="form-control profile-input-horizontal"
                                            disabled={!isEditing ? false : false}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-semibold">Số điện thoại</label>
                                    <div className="profile-input-wrap-horizontal">
                                        <Phone size={20} className="profile-input-icon-horizontal" />
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="form-control profile-input-horizontal"
                                            disabled={!isEditing ? false : false}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-semibold">Mật khẩu</label>
                                    <div className="profile-input-wrap-horizontal">
                                        <Lock size={20} className="profile-input-icon-horizontal" />
                                        <input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="form-control profile-input-horizontal"
                                            disabled
                                            required
                                            id="password"
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        className="btn btn-link px-0 mt-2"
                                        style={{ fontSize: 15, color: "#1e40af" }}
                                        onClick={() => setShowChangePass(true)}
                                    >
                                        <KeyRound size={18} /> Đổi mật khẩu
                                    </button>
                                </div>
                            </div>
                            <div className="text-center text-md-end mt-4">
                                {!isEditing ? (
                                    <button
                                        type="button"
                                        className="btn btn-primary profile-btn-horizontal"
                                        onClick={() => setIsEditing(true)}
                                    >
                                        <Edit size={20} /> Chỉnh sửa
                                    </button>
                                ) : (
                                    <>
                                        <button
                                            type="submit"
                                            className="btn btn-success profile-btn-horizontal me-2"
                                        >
                                            <Save size={20} /> Lưu
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-danger profile-btn-horizontal"
                                            onClick={handleCancel}
                                        >
                                            Hủy
                                        </button>
                                    </>
                                )}
                            </div>
                        </form>
                        <div className="text-center text-md-end mt-4">
                            <button
                                type="button"
                                className="btn btn-outline-dark profile-btn-horizontal"
                                onClick={() => navigate('/')}
                            >
                                Quay lại trang chủ
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal đổi mật khẩu */}
            {showChangePass && (
                <div className="modal-backdrop-profile">
                    <div className="modal-profile">
                        <h5 className="mb-3">Đổi mật khẩu</h5>
                        <form onSubmit={handleChangePassword}>
                            <div className="mb-2">
                                <label className="form-label">Mật khẩu cũ</label>
                                <input type="password" id="oldPassword" className="form-control" autoFocus />
                            </div>
                            <div className="mb-2">
                                <label className="form-label">Mật khẩu mới</label>
                                <input type="password" id="newPassword" className="form-control" />
                            </div>
                            <div className="mb-2">
                                <label className="form-label">Xác nhận mật khẩu mới</label>
                                <input type="password" id="confirmNewPassword" className="form-control" />
                                <span id="changePassMsg" style={{ color: 'red', fontSize: 13 }}></span>
                            </div>
                            <div className="d-flex justify-content-end mt-3">
                                <button type="button" className="btn btn-secondary me-2" onClick={() => { setShowChangePass(false); $('#changePassMsg').text(''); }}>Hủy</button>
                                <button type="submit" className="btn btn-success">Lưu</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {/* jQuery & script xác nhận mật khẩu mới */}
            <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
            <script dangerouslySetInnerHTML={{
                __html: `
                $(document).off('input.changePass').on('input.changePass', '#confirmNewPassword', function() {
                    var newPass = $('#newPassword').val();
                    var confirm = $(this).val();
                    if (confirm && newPass !== confirm) {
                        $('#changePassMsg').text('Mật khẩu xác nhận không khớp');
                    } else {
                        $('#changePassMsg').text('');
                    }
                });
                `
            }} />
            <style>
                {`
                .profile-bg {
                    min-height: 100vh;
                    background: linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%);
                }
                .profile-container-horizontal {
                    max-width: 900px;
                    width: 100%;
                }
                .profile-card-horizontal {
                    background: #fff;
                    border-radius: 24px;
                    box-shadow: 0 8px 32px rgba(30,58,138,0.09);
                    display: flex;
                    flex-direction: column;
                }
                @media (min-width: 768px) {
                    .profile-card-horizontal {
                        flex-direction: row;
                        align-items: stretch;
                    }
                }
                .profile-avatar-section {
                    min-width: 220px;
                    max-width: 260px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }
                .profile-avatar-wrap-horizontal {
                    position: relative;
                    display: inline-block;
                }
                .profile-avatar-horizontal {
                    width: 120px;
                    height: 120px;
                    object-fit: cover;
                    border-radius: 50%;
                    border: 4px solid #3b82f6;
                    box-shadow: 0 2px 12px rgba(59,130,246,0.13);
                }
                .profile-avatar-edit-horizontal {
                    position: absolute;
                    right: 0;
                    bottom: 0;
                    background: #3b82f6;
                    color: #fff;
                    border-radius: 50%;
                    padding: 7px;
                    cursor: pointer;
                    border: 2px solid #fff;
                    box-shadow: 0 2px 8px rgba(59,130,246,0.13);
                    transition: background 0.2s;
                }
                .profile-avatar-edit-horizontal:hover {
                    background: #6366f1;
                }
                .profile-title-horizontal {
                    color: #1e3a8a;
                    letter-spacing: 1px;
                }
                .profile-input-wrap-horizontal {
                    position: relative;
                }
                .profile-input-icon-horizontal {
                    position: absolute;
                    left: 15px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: #6c757d;
                }
                .profile-input-horizontal {
                    padding-left: 45px;
                    border-radius: 12px;
                    border: 2px solid #e9ecef;
                    font-size: 1.08rem;
                    min-height: 48px;
                }
                .profile-input-horizontal:disabled {
                    background: #f3f4f6;
                    color: #888;
                }
                .profile-btn-horizontal {
                    border-radius: 12px;
                    padding: 10px 30px;
                    font-weight: 600;
                    font-size: 1.08rem;
                    letter-spacing: 0.5px;
                    box-shadow: 0 2px 8px rgba(30,58,138,0.07);
                    transition: background 0.2s, color 0.2s, box-shadow 0.2s;
                }
                .profile-btn-horizontal:active {
                    box-shadow: none;
                }
                /* Modal đổi mật khẩu */
                .modal-backdrop-profile {
                    position: fixed;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background: rgba(0,0,0,0.25);
                    z-index: 1050;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .modal-profile {
                    background: #fff;
                    border-radius: 16px;
                    padding: 2rem 2.5rem;
                    min-width: 340px;
                    max-width: 95vw;
                    box-shadow: 0 8px 32px rgba(30,58,138,0.13);
                    animation: modalShow 0.2s;
                }
                @keyframes modalShow {
                    from { transform: translateY(-30px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                @media (max-width: 991px) {
                    .profile-container-horizontal {
                        max-width: 100%;
                        padding: 0 8px;
                    }
                    .profile-card-horizontal {
                        padding: 18px 6px;
                    }
                    .modal-profile {
                        padding: 1.2rem 0.7rem;
                        min-width: 90vw;
                    }
                }
                `}
            </style>
        </div>
    );
}

export default Profile;
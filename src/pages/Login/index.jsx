import React, { useState } from 'react';
import { Eye, EyeOff, Lock, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate(); // Hook để điều hướng
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        rememberMe: false,
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    // Trong Login.js
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login:', formData); // Mô phỏng đăng nhập
        // Giả sử đăng nhập thành công, lưu trạng thái và chuyển hướng
        localStorage.setItem('isLoggedIn', 'true');
        navigate('/');
    };

    const customStyles = {
        background: 'linear-gradient(135deg, #ffffff 0%, #4facfe 100%)',
        minHeight: '100vh',
    };

    const cardStyle = {
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        border: 'none',
        boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
        borderRadius: '20px',
    };

    const inputGroupStyle = {
        position: 'relative',
    };

    const inputIconStyle = {
        position: 'absolute',
        left: '15px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: '10',
        color: '#6c757d',
    };

    const inputStyle = {
        paddingLeft: '45px',
        borderRadius: '12px',
        border: '2px solid #e9ecef',
        transition: 'all 0.3s ease',
        backgroundColor: '#f8f9fa',
    };

    const buttonStyle = {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        border: 'none',
        borderRadius: '12px',
        padding: '12px 0',
        fontSize: '16px',
        fontWeight: '600',
        transition: 'all 0.3s ease',
    };

    const socialButtonStyle = {
        width: '50px',
        height: '50px',
        borderRadius: '12px',
        border: '2px solid #e9ecef',
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s ease',
    };

    return (
        <div style={customStyles} className="d-flex align-items-center justify-content-center p-4">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-10 col-md-8 col-lg-5">
                        <div className="card" style={cardStyle}>
                            <div className="card-body p-5">
                                {/* Header */}
                                <div className="text-center mb-4">
                                    <h2 className="card-title fw-bold text-dark mb-2">Welcome Back</h2>
                                    <p className="text-muted">Sign in to your account to continue</p>
                                </div>

                                {/* Username Field */}
                                <div className="mb-3">
                                    <label className="form-label fw-semibold text-dark">Username</label>
                                    <div style={inputGroupStyle}>
                                        <User size={20} style={inputIconStyle} />
                                        <input
                                            type="text"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleChange}
                                            className="form-control form-control-lg"
                                            style={inputStyle}
                                            placeholder="Enter your username"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Password Field */}
                                <div className="mb-3">
                                    <label className="form-label fw-semibold text-dark">Password</label>
                                    <div style={inputGroupStyle}>
                                        <Lock size={20} style={inputIconStyle} />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="form-control form-control-lg"
                                            style={{ ...inputStyle, paddingRight: '45px' }}
                                            placeholder="Enter your password"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            style={{
                                                position: 'absolute',
                                                right: '15px',
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                background: 'none',
                                                border: 'none',
                                                color: '#6c757d',
                                                zIndex: '10',
                                            }}
                                        >
                                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                </div>

                                {/* Remember Me & Forgot Password */}
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            name="rememberMe"
                                            checked={formData.rememberMe}
                                            onChange={handleChange}
                                            className="form-check-input"
                                            id="rememberMe"
                                        />
                                        <label className="form-check-label text-dark" htmlFor="rememberMe">
                                            Remember me
                                        </label>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => console.log('Forgot password clicked')}
                                        className="btn btn-link p-0 text-decoration-none fw-semibold"
                                        style={{ color: '#667eea' }}
                                    >
                                        Forgot password?
                                    </button>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    className="btn btn-primary w-100 mb-4"
                                    style={buttonStyle}
                                    onMouseOver={(e) => {
                                        e.target.style.transform = 'translateY(-2px)';
                                        e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
                                    }}
                                    onMouseOut={(e) => {
                                        e.target.style.transform = 'translateY(0)';
                                        e.target.style.boxShadow = 'none';
                                    }}
                                >
                                    Sign In
                                </button>

                                {/* Divider */}
                                <div className="position-relative text-center mb-4">
                                    <hr className="border-top" />
                                    <span
                                        className="position-absolute top-50 start-50 translate-middle bg-white px-3 text-muted"
                                        style={{ fontSize: '14px' }}
                                    >
                                        Or continue with
                                    </span>
                                </div>

                                {/* Social Login */}
                                <div className="d-flex justify-content-center gap-3 mb-4">
                                    <button
                                        type="button"
                                        onClick={() => console.log('Facebook login')}
                                        className="btn"
                                        style={socialButtonStyle}
                                        onMouseOver={(e) => {
                                            e.target.style.transform = 'scale(1.05)';
                                            e.target.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
                                        }}
                                        onMouseOut={(e) => {
                                            e.target.style.transform = 'scale(1)';
                                            e.target.style.boxShadow = 'none';
                                        }}
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877f2">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                        </svg>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => console.log('Google login')}
                                        className="btn"
                                        style={socialButtonStyle}
                                        onMouseOver={(e) => {
                                            e.target.style.transform = 'scale(1.05)';
                                            e.target.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
                                        }}
                                        onMouseOut={(e) => {
                                            e.target.style.transform = 'scale(1)';
                                            e.target.style.boxShadow = 'none';
                                        }}
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24">
                                            <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                            <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                            <path fill="#fbbc04" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                            <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                        </svg>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => console.log('GitHub login')}
                                        className="btn"
                                        style={socialButtonStyle}
                                        onMouseOver={(e) => {
                                            e.target.style.transform = 'scale(1.05)';
                                            e.target.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
                                        }}
                                        onMouseOut={(e) => {
                                            e.target.style.transform = 'scale(1)';
                                            e.target.style.boxShadow = 'none';
                                        }}
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="#333">
                                            <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174.557-.085.769-.241.769-.538v-1.889c-3.123.681-3.78-1.505-3.78-1.505-.507-1.287-1.239-1.628-1.239-1.628-1.012-.693.077-.678.077-.678 1.121.078 1.711 1.151 1.711 1.151.994 1.703 2.606 1.211 3.241.926.102-.719.389-1.211.709-1.489-2.475-.281-5.078-1.237-5.078-5.513 0-1.218.436-2.213 1.151-2.992-.115-.282-.499-1.416.108-2.951 0 0 .938-.3 3.071 1.145 2.219-.617 4.596-.617 6.814 0 2.132-1.446 3.069-1.145 3.069-1.145.608 1.535.224 2.669.109 2.951.716.779 1.15 1.774 1.15 2.992 0 4.287-2.606 5.227-5.088 5.502.401.344.757 1.024.757 2.064v3.056c0 .299.211.457.775.379C20.88 21.4 24.038 17.062 24.038 11.987 24.038 5.367 18.671.001 12.017.001z" />
                                        </svg>
                                    </button>
                                </div>

                                <p className="text-center text-muted mb-0">
                                    Don't have an account?{' '}
                                    <Link to="/register" className="btn btn-link p-0 text-decoration-none fw-semibold" style={{ color: '#667eea' }}>
                                        Create one now
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
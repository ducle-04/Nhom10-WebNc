import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Phone } from 'lucide-react';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    phone: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Register:', formData); // Mô phỏng gửi dữ liệu đăng ký
    // Sau khi đăng ký thành công, chuyển hướng đến trang đăng nhập
    navigate('/login');
  };

  return (
    <div className="d-flex align-items-center justify-content-center p-4" style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e6f0fa 0%, #b3d4fc 100%)' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-5">
            <div className="card p-4" style={{ background: 'rgba(255, 255, 255, 0.9)', borderRadius: '15px', boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)' }}>
              <h2 className="text-center fw-bold text-dark mb-3">Create Your Account</h2>
              <p className="text-center text-muted mb-4">Fill in the details to sign up</p>
              {/* Form đăng ký */}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold text-dark">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="form-control form-control-lg"
                    placeholder="Enter your full name"
                    style={{ background: '#f0f5fa', border: '1px solid #dee2e6', borderRadius: '10px' }}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold text-dark">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="form-control form-control-lg"
                    placeholder="Enter your username"
                    style={{ background: '#f0f5fa', border: '1px solid #dee2e6', borderRadius: '10px' }}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold text-dark">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control form-control-lg"
                    placeholder="Enter your email"
                    style={{ background: '#f0f5fa', border: '1px solid #dee2e6', borderRadius: '10px' }}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold text-dark">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-control form-control-lg"
                    placeholder="Enter your phone number"
                    style={{ background: '#f0f5fa', border: '1px solid #dee2e6', borderRadius: '10px' }}
                    required
                  />
                </div>
                <div className="mb-3 position-relative">
                  <label className="form-label fw-semibold text-dark">Password</label>
                  <div className="input-group">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="form-control form-control-lg"
                      placeholder="Enter your password"
                      style={{ background: '#f0f5fa', border: '1px solid #dee2e6', borderRadius: '10px 0 0 10px', paddingRight: '40px' }}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="btn btn-outline-secondary"
                      style={{
                        border: '1px solid #dee2e6',
                        borderLeft: 'none',
                        borderRadius: '0 10px 10px 0',
                        background: '#f0f5fa',
                        padding: '8px 12px',
                        color: '#6c757d',
                        transition: 'color 0.3s ease',
                      }}
                      onMouseOver={(e) => (e.target.style.color = '#4facfe')}
                      onMouseOut={(e) => (e.target.style.color = '#6c757d')}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  style={{ background: 'linear-gradient(135deg, #6b48ff 0%, #a856ff 100%)', border: 'none', borderRadius: '10px', padding: '12px 0', fontWeight: '600' }}
                >
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
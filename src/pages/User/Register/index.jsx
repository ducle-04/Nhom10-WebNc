import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate(); // Hook để điều hướng
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

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
    <div className="d-flex align-items-center justify-content-center p-4" style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #ffffff 0%, #4facfe 100%)' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-5">
            <div className="card p-5" style={{ background: 'rgba(255, 255, 255, 0.95)', borderRadius: '20px', boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)' }}>
              <h2 className="text-center fw-bold text-dark mb-4">Create Your Account</h2>
              <p className="text-center text-muted mb-4">Fill in the details to sign up</p>
              {/* Form đăng ký */}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold text-dark">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="form-control form-control-lg"
                    placeholder="Enter your username"
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
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold text-dark">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="form-control form-control-lg"
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', border: 'none', borderRadius: '12px', padding: '12px 0' }}
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
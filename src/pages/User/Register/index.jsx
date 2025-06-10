import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Đăng ký sự kiện submit và kiểm tra hợp lệ bằng jQuery
    window.$(document).ready(function () {
      // Kiểm tra hợp lệ realtime
      $('#fullName').on('input', function () {
        if (!$(this).val().trim()) {
          $(this).addClass('is-invalid');
          $('#fullNameError').text('Vui lòng nhập họ và tên!');
        } else {
          $(this).removeClass('is-invalid');
          $('#fullNameError').text('');
        }
      });
      $('#username').on('input', function () {
        if (!$(this).val().trim()) {
          $(this).addClass('is-invalid');
          $('#usernameError').text('Vui lòng nhập tên đăng nhập!');
        } else {
          $(this).removeClass('is-invalid');
          $('#usernameError').text('');
        }
      });
      $('#email').on('input', function () {
        var val = $(this).val();
        var re = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!val.trim() || !re.test(val)) {
          $(this).addClass('is-invalid');
          $('#emailError').text('Email không hợp lệ!');
        } else {
          $(this).removeClass('is-invalid');
          $('#emailError').text('');
        }
      });
      $('#phone').on('input', function () {
        var val = $(this).val();
        var re = /^[0-9]{9,12}$/;
        if (!val.trim() || !re.test(val)) {
          $(this).addClass('is-invalid');
          $('#phoneError').text('Số điện thoại không hợp lệ!');
        } else {
          $(this).removeClass('is-invalid');
          $('#phoneError').text('');
        }
      });
      $('#password').on('input', function () {
        var val = $(this).val();
        if (!val || val.length < 6) {
          $(this).addClass('is-invalid');
          $('#passwordError').text('Mật khẩu phải có ít nhất 6 ký tự!');
        } else {
          $(this).removeClass('is-invalid');
          $('#passwordError').text('');
        }
      });

      // Submit form
      $('#registerForm').on('submit', function (e) {
        e.preventDefault();
        let valid = true;
        // Kiểm tra lại tất cả trường
        if (!$('#fullName').val().trim()) {
          $('#fullName').addClass('is-invalid');
          $('#fullNameError').text('Vui lòng nhập họ và tên!');
          valid = false;
        }
        if (!$('#username').val().trim()) {
          $('#username').addClass('is-invalid');
          $('#usernameError').text('Vui lòng nhập tên đăng nhập!');
          valid = false;
        }
        var emailVal = $('#email').val();
        var emailRe = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!emailVal.trim() || !emailRe.test(emailVal)) {
          $('#email').addClass('is-invalid');
          $('#emailError').text('Email không hợp lệ!');
          valid = false;
        }
        var phoneVal = $('#phone').val();
        var phoneRe = /^[0-9]{9,12}$/;
        if (!phoneVal.trim() || !phoneRe.test(phoneVal)) {
          $('#phone').addClass('is-invalid');
          $('#phoneError').text('Số điện thoại không hợp lệ!');
          valid = false;
        }
        var passVal = $('#password').val();
        if (!passVal || passVal.length < 6) {
          $('#password').addClass('is-invalid');
          $('#passwordError').text('Mật khẩu phải có ít nhất 6 ký tự!');
          valid = false;
        }
        if (!valid) return;

        // Lưu user vào localStorage
        let users = [];
        const stored = window.localStorage.getItem('users');
        if (stored) {
          try { users = JSON.parse(stored); } catch {}
        }
        users.push({
          username: $('#username').val(),
          password: $('#password').val(),
          role: 'user',
          name: $('#fullName').val(),
          email: $('#email').val(),
          phone: $('#phone').val(),
        });
        window.localStorage.setItem('users', JSON.stringify(users));
        window.location.href = '/login';
      });
    });
  }, []);

  return (
    <div className="d-flex align-items-center justify-content-center p-4" style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e6f0fa 0%, #b3d4fc 100%)' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-5">
            <div className="card p-4" style={{ background: 'rgba(255, 255, 255, 0.9)', borderRadius: '15px', boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)' }}>
              <h2 className="text-center fw-bold text-dark mb-3">Đăng ký tài khoản</h2>
              <p className="text-center text-muted mb-4">Vui lòng điền đầy đủ thông tin để đăng ký</p>
              {/* Form đăng ký */}
              <form id="registerForm">
                <div className="mb-3">
                  <label className="form-label fw-semibold text-dark">Họ và tên</label>
                  <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    className="form-control form-control-lg"
                    placeholder="Nhập họ và tên"
                    style={{ background: '#f0f5fa', border: '1px solid #dee2e6', borderRadius: '10px' }}
                    required
                  />
                  <div id="fullNameError" className="invalid-feedback d-block"></div>
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold text-dark">Tên đăng nhập</label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="form-control form-control-lg"
                    placeholder="Nhập tên đăng nhập"
                    style={{ background: '#f0f5fa', border: '1px solid #dee2e6', borderRadius: '10px' }}
                    required
                  />
                  <div id="usernameError" className="invalid-feedback d-block"></div>
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold text-dark">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="form-control form-control-lg"
                    placeholder="Nhập email"
                    style={{ background: '#f0f5fa', border: '1px solid #dee2e6', borderRadius: '10px' }}
                    required
                  />
                  <div id="emailError" className="invalid-feedback d-block"></div>
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold text-dark">Số điện thoại</label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    className="form-control form-control-lg"
                    placeholder="Nhập số điện thoại"
                    style={{ background: '#f0f5fa', border: '1px solid #dee2e6', borderRadius: '10px' }}
                    required
                  />
                  <div id="phoneError" className="invalid-feedback d-block"></div>
                </div>
                <div className="mb-3 position-relative">
                  <label className="form-label fw-semibold text-dark">Mật khẩu</label>
                  <div className="input-group">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      id="password"
                      className="form-control form-control-lg"
                      placeholder="Nhập mật khẩu"
                      style={{ background: '#f0f5fa', border: '1px solid #dee2e6', borderRadius: '10px 0 0 10px', paddingRight: '40px' }}
                      required
                    />
                    <button
                      type="button"
                      tabIndex={-1}
                      onClick={() => setShowPassword((v) => !v)}
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
                  <div id="passwordError" className="invalid-feedback d-block"></div>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  style={{ background: 'linear-gradient(135deg, #6b48ff 0%, #a856ff 100%)', border: 'none', borderRadius: '10px', padding: '12px 0', fontWeight: '600' }}
                >
                  Đăng ký
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Thêm jQuery */}
      <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    </div>
  );
}

export default Register;
import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';

function SettingsPage() {
  const [form, setForm] = useState({
    siteName: 'WildQuest',
    email: 'admin@wildquest.vn',
    hotline: '1900 1234',
    address: 'Hà Nội, Việt Nam',
    logo: '',
    theme: 'default',
  });
  const [success, setSuccess] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  return (
    <div className="container-fluid py-3">
      <h3 className="fw-bold text-primary mb-4">Cài đặt hệ thống</h3>
      {success && <Alert variant="success">Lưu cài đặt thành công!</Alert>}
      <Form onSubmit={handleSubmit} style={{maxWidth: 600}}>
        <Form.Group className="mb-3">
          <Form.Label>Tên website</Form.Label>
          <Form.Control
            name="siteName"
            value={form.siteName}
            onChange={handleChange}
            required
            placeholder="Nhập tên website"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email liên hệ</Form.Label>
          <Form.Control
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="Nhập email liên hệ"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Hotline</Form.Label>
          <Form.Control
            name="hotline"
            value={form.hotline}
            onChange={handleChange}
            required
            placeholder="Nhập số hotline"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Địa chỉ</Form.Label>
          <Form.Control
            name="address"
            value={form.address}
            onChange={handleChange}
            required
            placeholder="Nhập địa chỉ"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Logo (URL)</Form.Label>
          <Form.Control
            name="logo"
            value={form.logo}
            onChange={handleChange}
            placeholder="Dán link logo"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Giao diện</Form.Label>
          <Form.Select
            name="theme"
            value={form.theme}
            onChange={handleChange}
          >
            <option value="default">Mặc định</option>
            <option value="light">Sáng</option>
            <option value="dark">Tối</option>
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit">
          Lưu cài đặt
        </Button>
      </Form>
    </div>
  );
}

export default SettingsPage;

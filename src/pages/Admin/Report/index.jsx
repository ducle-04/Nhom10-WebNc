import React from 'react';
import { FaChartBar, FaUsers, FaMapMarkedAlt, FaClipboardList, FaStar } from 'react-icons/fa';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, ArcElement);

const mockStats = [
  { label: 'Tổng số khách hàng', value: 1200, icon: <FaUsers />, color: 'primary' },
  { label: 'Tổng số tour', value: 85, icon: <FaMapMarkedAlt />, color: 'success' },
  { label: 'Tổng số booking', value: 430, icon: <FaClipboardList />, color: 'warning' },
  { label: 'Doanh thu (triệu VNĐ)', value: 1500, icon: <FaChartBar />, color: 'danger' },
];

// Dữ liệu demo cho biểu đồ doanh thu
const revenueData = {
  labels: ['Th1', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6', 'Th7', 'Th8', 'Th9', 'Th10', 'Th11', 'Th12'],
  datasets: [
    {
      label: 'Doanh thu (triệu VNĐ)',
      data: [120, 150, 180, 200, 170, 230, 210, 250, 270, 300, 320, 350],
      fill: true,
      borderColor: '#0d6efd',
      backgroundColor: 'rgba(13,110,253,0.08)',
      tension: 0.3,
      pointRadius: 4,
      pointBackgroundColor: '#0d6efd'
    },
  ],
};

// Dữ liệu demo cho biểu đồ loại tour
const tourTypeData = {
  labels: ['Sapa', 'Đà Lạt', 'Phú Quốc', 'Hạ Long', 'Khác'],
  datasets: [
    {
      label: 'Tỷ lệ loại tour',
      data: [35, 25, 20, 15, 5],
      backgroundColor: [
        '#0d6efd', // Sapa
        '#198754', // Đà Lạt
        '#ffc107', // Phú Quốc
        '#dc3545', // Hạ Long
        '#6f42c1', // Khác
      ],
      borderWidth: 1,
    },
  ],
};

const topTours = [
  { name: 'Tour Sapa 3N2Đ', bookings: 120, rating: 4.9 },
  { name: 'Tour Phú Quốc 4N3Đ', bookings: 98, rating: 4.8 },
  { name: 'Tour Đà Lạt 2N1Đ', bookings: 85, rating: 4.7 },
];

function AdminReport() {
  return (
    <div className="container-fluid py-3">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h3 className="fw-bold text-primary mb-0">Thống kê & Báo cáo</h3>
        <span className="badge bg-info text-dark fs-6 px-3 py-2">Báo cáo tổng hợp năm 2024</span>
      </div>
      {/* Thống kê tổng quan */}
      <div className="row g-4 mb-4">
        {mockStats.map((item, idx) => (
          <div className="col-12 col-sm-6 col-lg-3" key={item.label}>
            <div className="card shadow-sm border-0 h-100 rounded-4 hover-shadow" style={{ transition: 'box-shadow 0.2s' }}>
              <div className="card-body d-flex align-items-center gap-3">
                <div className={`bg-${item.color} bg-opacity-10 text-${item.color} rounded-circle d-flex align-items-center justify-content-center`} style={{ width: 48, height: 48, fontSize: 24 }}>
                  {item.icon}
                </div>
                <div>
                  <div className="fw-bold fs-5">{item.value}</div>
                  <div className="text-muted">{item.label}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Biểu đồ và bảng */}
      <div className="row g-4">
        <div className="col-lg-8">
          {/* Biểu đồ doanh thu */}
          <div className="card shadow-sm border-0 mb-4 rounded-4">
            <div className="card-header bg-white fw-semibold rounded-top-4 border-bottom-0" style={{ fontSize: 18 }}>
              Biểu đồ doanh thu theo tháng
            </div>
            <div className="card-body">
              <Line
                data={revenueData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { display: false },
                    tooltip: { enabled: true }
                  },
                  scales: {
                    y: { beginAtZero: true, ticks: { stepSize: 50 } }
                  }
                }}
                height={120}
              />
            </div>
          </div>
          {/* Bảng top tour */}
          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-header bg-white fw-semibold rounded-top-4 border-bottom-0" style={{ fontSize: 18 }}>
              Top tour được đặt nhiều nhất
            </div>
            <div className="card-body p-0">
              <table className="table mb-0 align-middle">
                <thead className="table-light">
                  <tr>
                    <th className="text-primary">Tên tour</th>
                    <th className="text-primary">Lượt đặt</th>
                    <th className="text-primary">Đánh giá</th>
                  </tr>
                </thead>
                <tbody>
                  {topTours.map((tour, idx) => (
                    <tr key={tour.name} style={{ background: idx === 0 ? "#f8fafc" : undefined }}>
                      <td className="fw-semibold">{tour.name}</td>
                      <td>
                        <span className="fw-bold">{tour.bookings}</span>
                      </td>
                      <td>
                        <FaStar className="text-warning" /> <span className="fw-semibold">{tour.rating}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* Biểu đồ loại tour */}
        <div className="col-lg-4">
          <div className="card shadow-sm border-0 mb-4 rounded-4">
            <div className="card-header bg-white fw-semibold rounded-top-4 border-bottom-0" style={{ fontSize: 18 }}>
              Tỷ lệ các loại tour
            </div>
            <div className="card-body d-flex flex-column align-items-center">
              <div style={{ width: '100%', maxWidth: 260 }}>
                <Pie data={tourTypeData} options={{
                  plugins: {
                    legend: { display: true, position: 'bottom' },
                    tooltip: { enabled: true }
                  }
                }} />
              </div>
              <ul className="list-unstyled mt-3 mb-0 w-100">
                {tourTypeData.labels.map((label, idx) => (
                  <li key={label} className="d-flex align-items-center mb-1">
                    <span style={{
                      display: 'inline-block',
                      width: 14,
                      height: 14,
                      borderRadius: 3,
                      background: tourTypeData.datasets[0].backgroundColor[idx],
                      marginRight: 8,
                      border: '1px solid #dee2e6'
                    }}></span>
                    <span className="me-auto">{label}</span>
                    <span className="fw-bold">{tourTypeData.datasets[0].data[idx]}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Thông tin phụ khác nếu cần */}
        </div>
      </div>
      <style>{`
        .hover-shadow:hover {
          box-shadow: 0 4px 24px rgba(13,110,253,0.08), 0 1.5px 6px rgba(0,0,0,0.04) !important;
        }
        .table tr:hover { background: #e9f5ff !important; }
      `}</style>
    </div>
  );
}

export default AdminReport;

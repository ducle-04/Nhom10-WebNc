//src/data/destinationsData
export const destinationsData = [
    {
        id: 'sapa',
        name: 'Sapa',
        image: '/images/destination/sapa.jpeg',
        badge: 'Hot',
        description: 'Khám phá núi rừng Tây Bắc, bản sắc dân tộc và cảnh sắc tuyệt đẹp.',
        price: '2.500.000đ',
        detailedDescription: 'Khám phá Sapa – nơi núi rừng hùng vĩ hòa quyện cùng văn hóa đặc sắc, với ruộng bậc thang, đỉnh Fansipan, bản làng truyền thống và ẩm thực độc đáo, là hành trình lý tưởng để trốn khỏi phố thị và hòa mình vào thiên nhiên nguyên sơ. Đặt tour ngay để trải nghiệm!',

        hotels: ['Sapa Horizon Hotel', 'Topas Ecolodge'],
        tours: ['Tour 2N1D Sapa - Fansipan', 'Tour 3N2D Sapa - Bản Cát Cát'],
        itinerary: [
            { day: 1, description: 'Đến Sapa, nhận phòng khách sạn và tham quan bản Cát Cát.' },
            { day: 2, description: 'Leo núi Fansipan, ngắm cảnh từ đỉnh núi cao nhất Đông Dương.' },
            { day: 3, description: 'Tham quan chợ Sapa, mua đặc sản và trở về.' },
        ],
        reviews: [
            { user: 'Nguyễn Văn A', rating: 4.5, comment: 'Phong cảnh rất đẹp, nhưng đường đi hơi khó khăn.' },
            { user: 'Trần Thị B', rating: 5, comment: 'Hướng dẫn viên rất nhiệt tình, đồ ăn ngon!' },
        ],
        weather: 'Khí hậu mát mẻ quanh năm, nhiệt độ trung bình 15-20°C. Mùa đông có thể có sương mù và lạnh.',
        travelTips: [
            'Mang áo ấm vào mùa đông, đặc biệt nếu leo Fansipan.',
            'Thử các món ăn địa phương như thắng cố, lợn cắp nách.',
            'Đi giày thể thao thoải mái để khám phá các bản làng.',
        ],
        gallery: [
            '/images/destination/sapa.jpeg',
            '/images/destination/sapa-1.jpg',
            '/images/destination/sapa-2.jpg',
        ],
    },
    {
        id: 'phu-quoc',
        name: 'Phú Quốc',
        image: '/images/destination/phuquoc.jpg',
        badge: 'New',
        description: 'Thiên đường biển đảo với bãi cát trắng, nước biển trong xanh và hải sản tươi ngon.',
        price: '3.200.000đ',
        detailedDescription: 'Phú Quốc – thiên đường biển đảo nổi tiếng với bãi cát trắng trải dài mịn màng, làn nước biển trong xanh như ngọc bích, cùng nguồn hải sản tươi ngon đa dạng, nơi bạn có thể tận hưởng kỳ nghỉ thư giãn tuyệt vời, khám phá thiên nhiên hoang sơ và văn hóa địa phương đặc sắc.',
        activities: ['Lặn ngắm san hô', 'Tham quan làng chài Hàm Ninh', 'Thưởng thức hải sản'],
        hotels: ['Vinpearl Resort & Spa', 'Sunset Beach Resort'],
        tours: ['Tour 3N2D Phú Quốc - Bãi Sao', 'Tour 4N3D Phú Quốc - VinWonders'],
        itinerary: [
            { day: 1, description: 'Đến Phú Quốc, check-in khách sạn và thư giãn tại Bãi Sao.' },
            { day: 2, description: 'Lặn ngắm san hô và tham quan làng chài Hàm Ninh.' },
            { day: 3, description: 'Tham quan VinWonders và mua sắm đặc sản.' },
        ],
        reviews: [
            { user: 'Lê Văn C', rating: 4.8, comment: 'Biển rất đẹp, nước trong xanh, rất đáng để ghé thăm!' },
            { user: 'Phạm Thị D', rating: 4, comment: 'Khách sạn hơi đắt, nhưng dịch vụ tốt.' },
        ],
        weather: 'Nắng ấm quanh năm, nhiệt độ trung bình 25-30°C. Mùa mưa từ tháng 5 đến tháng 10.',
        travelTips: [
            'Mang kem chống nắng và đồ bơi.',
            'Thử gỏi cá trích và nước mắm Phú Quốc chính gốc.',
            'Tránh đi vào mùa mưa nếu không thích thời tiết ẩm ướt.',
        ],
        gallery: [
            '/images/destination/phuquoc-1.jpg',
            '/images/destination/phuquoc-2.jpg',
            '/images/destination/phuquoc-3.jpg',
        ],
    },
    {
        id: 'da-lat',
        name: 'Đà Lạt',
        image: '/images/destination/dalat.jpg',
        badge: 'Best',
        description: 'Thành phố ngàn hoa, khí hậu mát mẻ và những trải nghiệm lãng mạn.',
        price: '2.800.000đ',
        detailedDescription: 'Đà Lạt – thành phố ngàn hoa rực rỡ với khí hậu mát mẻ quanh năm, nơi lý tưởng để tận hưởng không gian lãng mạn, khám phá những đồi thông xanh ngát, hồ nước trong veo và thưởng thức ẩm thực độc đáo giữa khung cảnh thơ mộng.',
        activities: ['Tham quan Thung Lũng Tình Yêu', 'Chèo thuyền trên Hồ Xuân Hương', 'Khám phá Thác Datanla'],
        hotels: ['Ana Mandara Villas', 'Dalat Palace Hotel'],
        tours: ['Tour 2N1D Đà Lạt - Thác Datanla', 'Tour 3N2D Đà Lạt - Hồ Xuân Hương'],
        itinerary: [
            { day: 1, description: 'Đến Đà Lạt, tham quan Hồ Xuân Hương và chợ đêm.' },
            { day: 2, description: 'Khám phá Thung Lũng Tình Yêu và Thác Datanla.' },
            { day: 3, description: 'Tham quan các vườn hoa và trở về.' },
        ],
        reviews: [
            { user: 'Hoàng Văn E', rating: 4.7, comment: 'Khí hậu rất dễ chịu, cảnh đẹp, thích hợp để thư giãn.' },
            { user: 'Ngô Thị F', rating: 4.2, comment: 'Đường đi hơi quanh co, nhưng view rất đáng!' },
        ],
        weather: 'Mát mẻ quanh năm, nhiệt độ trung bình 18-22°C. Mùa mưa từ tháng 4 đến tháng 10.',
        travelTips: [
            'Mang áo khoác nhẹ vì buổi tối se lạnh.',
            'Thử bánh tráng nướng và cafe Đà Lạt.',
            'Đi sớm để tránh đông khách tại các điểm tham quan.',
        ],
        gallery: [
            '/images/destination/dalat-1.jpg',
            '/images/destination/dalat-2.jpg',
            '/images/destination/dalat-3.jpg',
        ],
    },
];
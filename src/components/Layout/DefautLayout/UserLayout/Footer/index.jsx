 function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <div className="container text-center">
        <p className="mb-2">© {new Date().getFullYear()} TravelGo. All rights reserved.</p>
        <div>
          <a href="/privacy" className="text-light mx-2">Chính sách</a>
          <a href="/terms" className="text-light mx-2">Điều khoản</a>
          <a href="/contact" className="text-light mx-2">Liên hệ</a>
        </div>
      </div>
    </footer>
  );
}
export default Footer;

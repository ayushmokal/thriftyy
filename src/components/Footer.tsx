const Footer = () => {
  return (
    <footer className="bg-background border-t border-border mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">About Us</h3>
            <p className="text-muted-foreground">
              We are committed to providing quality thrift fashion while promoting sustainable shopping.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-muted-foreground hover:text-primary">Home</a></li>
              <li><a href="/thrift" className="text-muted-foreground hover:text-primary">Shop</a></li>
              <li><a href="/about" className="text-muted-foreground hover:text-primary">About</a></li>
              <li><a href="/contact" className="text-muted-foreground hover:text-primary">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><a href="/thrift" className="text-muted-foreground hover:text-primary">Jeans</a></li>
              <li><a href="/thrift" className="text-muted-foreground hover:text-primary">Shirts</a></li>
              <li><a href="/thrift" className="text-muted-foreground hover:text-primary">T-Shirts</a></li>
              <li><a href="/thrift" className="text-muted-foreground hover:text-primary">Shoes</a></li>
              <li><a href="/thrift" className="text-muted-foreground hover:text-primary">Watches</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>Email: info@thrifty.com</li>
              <li>Phone: (555) 123-4567</li>
              <li>Address: 123 Thrift Street</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Thrifty. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
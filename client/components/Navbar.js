import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-gray-800 hover:text-gray-600">Home</Link>
            <Link href="/about" className="text-gray-800 hover:text-gray-600">About</Link>
            <Link href="/portfolio" className="text-gray-800 hover:text-gray-600">Portfolio</Link>
          </div>
          <div>
            <a href="mailto:polis.srikanth@gmail.com" className="text-gray-600">polis.srikanth@gmail.com</a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
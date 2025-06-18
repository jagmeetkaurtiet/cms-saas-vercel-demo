export default function YTHeader(){
    return (
        <header className="bg-white shadow sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
      <div className="text-2xl font-bold text-red-700">MyBrand</div>
      <nav className="hidden md:flex gap-6 font-medium">
        <a href="#" className="hover:text-red-700">Home</a>
        <a href="#" className="hover:text-red-700">Features</a>
        <a href="#" className="hover:text-red-700">Pricing</a>
        <a href="#" className="hover:text-red-700">Contact</a>
      </nav>
      <button className="md:hidden text-gray-800" id="menuBtn">☰</button>
    </div>
    <div className="hidden md:hidden px-4 pb-4 space-y-2" id="mobileMenu">
      <a href="#" className="block hover:text-red-700">Home</a>
      <a href="#" className="block hover:text-red-700">Features</a>
      <a href="#" className="block hover:text-red-700">Pricing</a>
      <a href="#" className="block hover:text-red-700">Contact</a>
    </div>
  </header>
    )
}
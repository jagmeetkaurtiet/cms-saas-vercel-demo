export default function YTFooter()
{
    return (<footer className="bg-gray-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">MyBrand</h3>
            <p>Modern solutions for modern developers.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Links</h4>
            <ul className="space-y-1">
              <li><a href="#" className="hover:underline">About</a></li>
              <li><a href="#" className="hover:underline">Blog</a></li>
              <li><a href="#" className="hover:underline">Support</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Subscribe</h4>
            <form className="flex flex-col sm:flex-row gap-2">
              <input type="email" placeholder="Your email" className="px-4 py-2 rounded text-gray-800"/>
              <button className="bg-red-700 px-4 py-2 rounded hover:bg-red-800 text-white">Join</button>
            </form>
          </div>
        </div>
        <div className="text-center mt-8 text-sm text-gray-400">© 2025 MyBrand. All rights reserved.</div>
      </footer>)
}
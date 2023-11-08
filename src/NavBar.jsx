import logo from './assets/movie-logo.jpg'
export default function NavBar() {
    return (
        <div className="container-xl">
            <nav className="flex items-center justify-center flex-wrap bg-blue-950 p-6">
                <div className="flex items-center flex-shrink-0 text-white mr-8 gap-4">
                    {/* <img src={logo} alt='my logo' width={50}/> */}
                    <span className="font-semibold text-xl tracking-tight">My Movie app</span>
                </div>
                {/* <div className="block lg:hidden">
                    <button className="flex items-center px-3 py-2 border rounded text-teal-600 border-teal-400 hover:text-white hover:border-white">
                        <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
                    </button>
                </div> */}
            </nav>
        </div>
    )
}   
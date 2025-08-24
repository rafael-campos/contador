
// components/Navbar.tsx
import Link from 'next/link';

const Navbar = () => {

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-lg p-4">
            <div className="container mx-auto flex justify-center items-center">
                <ul className="flex items-center gap-x-6">
                    <li>
                        <Link href="/timeline" className="text-white font-medium hover:bg-white/20 rounded-md px-4 py-2 transition-all duration-300">
                            Linha do Tempo
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;

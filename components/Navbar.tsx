
// components/Navbar.tsx
const Navbar = () => {

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-lg p-4">
            <div className="container mx-auto flex justify-center items-center">
                <ul className="flex items-center gap-x-6">
                    <li>
                        <span className="text-white font-medium">Linha do Tempo</span>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;

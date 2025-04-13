"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function Header() {
  const pathname = usePathname();
  const [navs, setNavs] = useState<{ name: string; slug: string }[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (pathname.includes("/admin")) {
    return null;
  }

  useEffect(() => {
    const fetchSettings = async () => {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setNavs(data);
    };

    fetchSettings();
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="text-white shadow-md p-4 fixed w-full z-50 top-0"
    >
      <div className="container mx-auto flex justify-between items-center">
        <button
          className="md:hidden"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <motion.div
            animate={{ rotate: isSidebarOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isSidebarOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </motion.div>
        </button>
        <div className="text-xl font-bold">
          <img src="/logo.jpg" alt="لوگو" className="size-10 rounded-4xl"/>
        </div>

        <nav className="hidden md:flex space-x-6">
          <Link
            href="/"
            className={`text-lg ${
              pathname === "/" ? "text-black" : "text-stone-50"
            } hover:text-stone-50`}
          >
            خانه
          </Link>
          {navs.map((item, index) => (
            <Link
              key={index}
              href={`/category/${item.slug}`}
              className={`text-lg ${
                pathname === `/category/${item.slug}`
                  ? "text-black"
                  : "text-stone-50"
              } hover:text-stone-50`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Shop Cart */}
        <div className="flex items-center space-x-4">
          <ShoppingCart className="w-6 h-6 cursor-pointer" />
        </div>
      </div>
      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-opacity-50 z-50"
            onClick={() => setIsSidebarOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
              className="bg-white w-64 h-full p-5 fixed right-0 top-0 shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="mb-5" onClick={() => setIsSidebarOpen(false)}>
                <X className="w-6 h-6" />
              </button>
              <nav className="flex flex-col space-y-4">
                <Link
                  href="/"
                  className="text-lg text-gray-800 hover:text-gray-500"
                >
                  خانه
                </Link>
                {navs.map((item, index) => (
                  <Link
                    key={index}
                    href={`/category/${item.slug}`}
                    className="text-lg text-gray-800 hover:text-gray-500"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Header;

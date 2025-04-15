import Link from "next/link";
import "@/app/admin/style.css";
import { GiSonicShoes } from "react-icons/gi";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";


export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br  flex items-center justify-center p-6 relative ">
      <div className=" border border-white/20 shadow-lg rounded-3xl p-8 w-full max-w-md flex flex-col items-stretch justify-around  main_contain">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center text-white mb-8 store_heading">
            پنل مدیریت فروشگاه
        </h1>

        <ul className="space-y-8">
        <li>
            <Link
              href="/admin/shoes"
              className="flex items-center justify-between border border-3 border-indigo-950 text-white py-4 px-6 rounded-xl hover:bg-blue-900 transition-all group"
            >
              <span className="text-lg font-medium group-hover:translate-x-1 transition ">
                مدیریت کفش‌ها
              </span>
              <GiSonicShoes className="text-white admin_icons"/>
            </Link>
          </li>
          <li>
            <Link
              href="/admin/categories"
              className="flex items-center justify-between border border-3 border-indigo-950 text-white py-4 px-6 rounded-xl hover:bg-blue-900 transition-all group"
            >
              <span className="text-lg font-medium group-hover:translate-x-1 transition">
                مدیریت دسته‌بندی‌ها
              </span>
              <BiSolidCategoryAlt className="text-white admin_icons" />
            </Link>
          </li>

          <li>
          <Link
            href="/admin/settings"
            className="flex items-center justify-between border border-3 border-indigo-950 text-white py-4 px-6 rounded-xl hover:bg-blue-900 transition-all group"
          >
            <span className="text-lg font-medium group-hover:translate-x-1 transition">تنظیمات سایت</span>
            <IoMdSettings className="text-white admin_icons" />
          </Link>
        </li>

        </ul>
      </div>
    </div>
  );
}

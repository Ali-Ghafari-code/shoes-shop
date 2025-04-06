import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800">مدیریت فروشگاه</h1>
        <ul className="mt-6 space-y-4">
          <li>
            <Link
              href="/admin/shoes"
              className="flex items-center justify-between bg-blue-600 text-white py-3 px-5 rounded-lg shadow-md hover:bg-blue-700 transition-all"
            >
              <span>👟 مدیریت کفش‌ها</span>
              <span>➡</span>
            </Link>
          </li>
          <li>
            <Link
              href="/admin/categories"
              className="flex items-center justify-between bg-green-600 text-white py-3 px-5 rounded-lg shadow-md hover:bg-green-700 transition-all"
            >
              <span>📂 مدیریت دسته‌بندی‌ها</span>
              <span>➡</span>
            </Link>
          </li>
          <li>
            <Link
              href="/admin/settings"
              className="flex items-center justify-between bg-gray-800 text-white py-3 px-5 rounded-lg shadow-md hover:bg-gray-900 transition-all"
            >
              <span>⚙ تنظیمات سایت</span>
              <span>➡</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

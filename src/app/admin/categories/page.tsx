"use client";
import { useEffect, useState } from "react";
import "@/app/admin/style.css";
import { IoCloseSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";


export default function ManageCategories() {
  const [categories, setCategories] = useState<
    { id: string; name: string; slug: string }[]
  >([]);
  const [newCategory, setNewCategory] = useState("");
  const [slug, setSlug] = useState("");

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.trim()) return alert("نام دسته‌بندی را وارد کنید!");

    const response = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newCategory, slug }),
    });

    if (response.ok) {
      const addedCategory = await response.json();
      setCategories([...categories, addedCategory]);
      setNewCategory("");
      setSlug("");
      alert("✅ دسته‌بندی جدید اضافه شد!");
    } else {
      alert("❌ خطا در اضافه کردن دسته‌بندی");
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br p-6">
      <div className="backdrop-blur-lg bg-white/10 shadow-lg rounded-2xl p-6 w-full max-w-lg space-y-4">
        <h1 className="text-3xl font-bold text-center text-white">
          مدیریت دسته‌بندی‌ها
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-4">
          <input
            type="text"
            placeholder="نام دسته‌بندی جدید"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="w-full bg-gray-400 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
            required
          />
          <input
            type="text"
            placeholder="اسلاگ (اختیاری)"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full bg-gray-400 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
          />
          <button
            type="submit"
            className="w-full bg-indigo-700 text-white py-3 rounded-lg hover:bg-blue-700 transition new_head transition-all"
          >
            <FaPlus/>
            افزودن
          </button>
        </form>
        <ul className="mt-4 space-y-2">
          {categories.map((category) => (
            <li
              key={category.id}
              className="border p-2 rounded-lg bg-gray-50 flex justify-between items-center shadow"
            >
              <span className="text-gray-800 cat_namaes">
                {category.name} ({category.slug})
              </span>
              <span><IoCloseSharp className="text-red-900"/></span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

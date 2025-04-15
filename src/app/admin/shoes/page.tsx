"use client";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Shoe } from "@/types/shoe";
import { MdDelete , MdEdit } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import "@/app/admin/style.css";

export default function ManageShoes() {
  const [shoes, setShoes] = useState<Shoe[]>([]);

  useEffect(() => {
    fetch("/api/shoes")
      .then((res) => res.json())
      .then((data) => setShoes(data));
  }, []);

  const deleteShoe = async (id: string) => {
    const confirmDelete = window.confirm(
      "آیا مطمئن هستید که می‌خواهید این کفش را حذف کنید؟"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/shoes`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        setShoes(shoes.filter((shoe) => shoe.id !== id));
        toast.success("✅ کفش با موفقیت حذف شد");
      } else {
        toast.error("❌ خطا در حذف کفش");
      }
    } catch (error) {
      console.error("❌ خطا در حذف کفش:", error);
      toast.error("❌ خطا در حذف کفش");
    }
  };

  return (
    <div className="relative h-[100vh] flex flex-col items-center bg-gray-100 p-6 justify-center backdrop-blur-lg bg-white/10 border border-white/20 shadow-lg overflow-y-clip">
      <Toaster position="top-center" reverseOrder={false} />{" "}
      {/* اضافه شدن Toaster */}
      <div className="backdrop-blur-lg bg-white/10 shadow-lg rounded-2xl p-6 w-full max-w-lg ">
        <h1 className="text-4xl font-bold text-center text-gray-800 store_heading text-white">
          مدیریت کفش‌ها
        </h1>
        <div className="flex justify-center mt-4">
          <a
            href="/admin/shoes/new"
            className="bg-purple-950 text-white px-5 py-3 rounded-full shadow-md transition-all insert_btn">
          <FaPlus />
        </a>
        </div>
        <ul className="mt-6 space-y-4 w-full max-h-96 overflow-y-auto"> {/* تغییرات اینجا انجام شد */}
          {shoes.map((shoe) => (
            <li
              key={shoe.id}
              className="border rounded-lg p-4 flex flex-col sm:flex-row sm:justify-between items-center shadow backdrop-blur-lg bg-white/10"
            >
              <span className="text-md font-medium item_list">
                {shoe.name} - {shoe.price} تومان ({shoe.category.name})
              </span>
              <div className="flex gap-4 mt-2 sm:mt-0">
                <a
                  href={`/admin/shoes/edit/${shoe.id}`}
                  className="text-green-800 hover:text-green-700 transition-all item_list flex flex-row"
                >
                  <MdEdit />
                   ویرایش
                </a>
                <button
                  onClick={() => deleteShoe(shoe.id)}
                  className="text-red-600 hover:text-red-700 transition-all item_list flex flex-row"
                >
                  <MdDelete />
                  حذف
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

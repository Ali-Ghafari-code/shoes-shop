"use client";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function AddShoePage() {
  const [shoe, setShoe] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
    categorySlug: "",
    sizes: "",
    mainColor: "#000000", // مقدار پیش‌فرض مشکی
    secondaryColor: "#ffffff", // مقدار پیش‌فرض سفید
    existing: true,
  });

  const [image, setImage] = useState<File | null>(null);
  const [categories, setCategories] = useState<
    { id: string; name: string; slug: string }[] 
  >([]);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data: { id: string; name: string; slug: string }[]) =>
        setCategories(
          data.map((cat) => ({ id: cat.id, name: cat.name, slug: cat.slug }))
        )
      );
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      extractColors(e.target.files[0]); // فراخوانی برای استخراج رنگ‌ها از تصویر
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = categories.find(
      (cat) => cat.id === e.target.value
    );
    if (selectedCategory) {
      setShoe({
        ...shoe,
        categoryId: selectedCategory.id,
        categorySlug: selectedCategory.slug,
      });
    }
  };

  const extractColors = async (imageFile: File) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    const res = await fetch("/api/extract-colors", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.colors) {
      setShoe({
        ...shoe,
        mainColor: data.colors[0] || "#000000",  // رنگ اصلی
        secondaryColor: data.colors[1] || "#ffffff",  // رنگ فرعی
      });
    } else {
      toast.error("❌ مشکل در استخراج رنگ‌ها");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", shoe.name);
    formData.append("description", shoe.description);
    formData.append("price", shoe.price);
    formData.append("categoryId", shoe.categoryId);
    formData.append("categorySlug", shoe.categorySlug);
    formData.append("sizes", shoe.sizes);
    formData.append("mainColor", shoe.mainColor);
    formData.append("secondaryColor", shoe.secondaryColor);
    formData.append("existing", String(shoe.existing));

    if (image) {
      formData.append("image", image);
    }

    const response = await fetch("/api/shoes", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      toast.success("✅ کفش جدید با موفقیت اضافه شد!");
      setShoe({
        name: "",
        description: "",
        price: "",
        categoryId: "",
        categorySlug: "",
        sizes: "",
        mainColor: "#000000",
        secondaryColor: "#ffffff",
        existing: true,
      });
      setImage(null);
    } else {
      toast.error("❌ خطا در اضافه کردن کفش");
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <Toaster position="top-center" reverseOrder={false} />
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg space-y-4"
      >
        <h1 className="text-3xl font-bold text-center text-gray-800">
          ➕ افزودن کفش جدید
        </h1>
        <input
          type="text"
          placeholder="نام کفش"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={shoe.name}
          onChange={(e) => setShoe({ ...shoe, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="توضیحات"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={shoe.description}
          onChange={(e) => setShoe({ ...shoe, description: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="قیمت"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={shoe.price}
          onChange={(e) => setShoe({ ...shoe, price: e.target.value })}
          required
        />
        <select
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={shoe.categoryId}
          onChange={handleCategoryChange}
          required
        >
          <option value="">انتخاب دسته‌بندی</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="سایزها (مثلاً: 41,42,43)"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={shoe.sizes}
          onChange={(e) => setShoe({ ...shoe, sizes: e.target.value })}
          required
        />
        
        {/* انتخاب رنگ اصلی */}
        <div className="flex items-center justify-between">
          <label>🎨 رنگ اصلی:</label>
          <input
            type="color"
            value={shoe.mainColor}
            onChange={(e) => setShoe({ ...shoe, mainColor: e.target.value })}
            className="w-12 h-12 rounded-full border-2"
          />
          <div
            className="w-12 h-12 rounded-full border-2"
            style={{ backgroundColor: shoe.mainColor }}
          ></div>
        </div>

        {/* انتخاب رنگ فرعی */}
        <div className="flex items-center justify-between">
          <label>🎨 رنگ فرعی:</label>
          <input
            type="color"
            value={shoe.secondaryColor}
            onChange={(e) =>
              setShoe({ ...shoe, secondaryColor: e.target.value })
            }
            className="w-12 h-12 rounded-full border-2"
          />
          <div
            className="w-12 h-12 rounded-full border-2"
            style={{ backgroundColor: shoe.secondaryColor }}
          ></div>
        </div>

        <input
          type="file"
          accept="image/*"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleFileChange}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all"
        >
          ➕ افزودن کفش
        </button>
      </form>
    </div>
  );
}

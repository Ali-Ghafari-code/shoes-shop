"use client"
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
    mainColor: "#000000",
    secondaryColor: "#ffffff",
    existing: true,
  });

  const [images, setImages] = useState<File[]>([]);
  const [categories, setCategories] = useState<
    { id: string; name: string; slug: string }[]
  >([]);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) =>
        setCategories(
          data.map((cat) => ({
            id: cat.id,
            name: cat.name,
            slug: cat.slug,
          }))
        )
      );
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const newImages = [...images, ...files];
      setImages(newImages);

      // فقط از اولین عکس جدید رنگ بگیر
      if (files[0]) extractColors(files[0]);
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
      setShoe((prev) => ({
        ...prev,
        mainColor: data.colors[0] || "#000000",
        secondaryColor: data.colors[1] || "#ffffff",
      }));
    } else {
      toast.error("❌ مشکل در استخراج رنگ‌ها");
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

    images.forEach((image) => {
      formData.append("images", image);
    });

    const response = await fetch("/api/shoes", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      toast.success("✅ کفش با موفقیت اضافه شد!");
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
      setImages([]);
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
          value={shoe.name}
          onChange={(e) => setShoe({ ...shoe, name: e.target.value })}
          required
          className="w-full px-4 py-2 border rounded-lg"
        />

        <input
          type="text"
          placeholder="توضیحات"
          value={shoe.description}
          onChange={(e) => setShoe({ ...shoe, description: e.target.value })}
          required
          className="w-full px-4 py-2 border rounded-lg"
        />

        <input
          type="number"
          placeholder="قیمت"
          value={shoe.price}
          onChange={(e) => setShoe({ ...shoe, price: e.target.value })}
          required
          className="w-full px-4 py-2 border rounded-lg"
        />

        <select
          value={shoe.categoryId}
          onChange={handleCategoryChange}
          required
          className="w-full px-4 py-2 border rounded-lg"
        >
          <option value="">انتخاب دسته‌بندی</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="سایزها (مثلاً: 41,42,43)"
          value={shoe.sizes}
          onChange={(e) => setShoe({ ...shoe, sizes: e.target.value })}
          required
          className="w-full px-4 py-2 border rounded-lg"
        />

        {/* رنگ اصلی */}
        <div className="flex items-center justify-between">
          <label>🎨 رنگ اصلی:</label>
          <input
            type="color"
            value={shoe.mainColor}
            onChange={(e) => setShoe({ ...shoe, mainColor: e.target.value })}
            className="w-12 h-12 rounded-full border-2"
          />
        </div>

        {/* رنگ فرعی */}
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
        </div>

        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}  // اتصال درست handleFileChange به onChange
          className="w-full px-4 py-2 border rounded-lg"
          required
        />

        {images.length > 0 && (
          <div className="grid grid-cols-3 gap-4">
            {images.map((img, index) => (
              <div key={index} className="relative group">
                <img
                  src={URL.createObjectURL(img)}
                  alt={`preview-${index}`}
                  className="w-full h-28 object-cover rounded-lg shadow-md"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImages(images.filter((_, i) => i !== index));
                  }}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs opacity-80 group-hover:opacity-100"
                >
                  ❌
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          ➕ افزودن کفش
        </button>
      </form>
    </div>
  );
}

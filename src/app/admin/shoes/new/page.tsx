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
    mainColor: "#000000",
    secondaryColor: "#ffffff",
    existing: true,
  });

  const [images, setImages] = useState<File[]>([]);
  const [categories, setCategories] = useState<
    { id: string; name: string; slug: string }[]
  >([]);

  const [colorTarget, setColorTarget] = useState<"main" | "secondary">("main");

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
    images.forEach((image) => formData.append("images", image));

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

  // رسم عکس روی canvas وقتی عکس اضافه شد
  useEffect(() => {
    if (images.length === 0) return;

    const canvas = document.getElementById("colorCanvas") as HTMLCanvasElement;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.src = URL.createObjectURL(images[0]);
    img.onload = () => {
      const scale = 300 / img.width; // محدودیت اندازه
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  }, [images]);

  const handleCanvasClick = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    const canvas = e.currentTarget;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
  
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
  
    // نسبت ابعاد واقعی به ابعاد canvas
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
  
    // مختصات واقعی
    const realX = Math.floor(x * scaleX);
    const realY = Math.floor(y * scaleY);
  
    const pixel = ctx.getImageData(realX, realY, 1, 1).data;
    const hex = `#${[pixel[0], pixel[1], pixel[2]]
      .map((v) => v.toString(16).padStart(2, "0"))
      .join("")}`;
  
    if (colorTarget === "main") {
      setShoe((prev) => ({ ...prev, mainColor: hex }));
      toast.success(`🎨 رنگ اصلی انتخاب شد: ${hex}`);
    } else {
      setShoe((prev) => ({ ...prev, secondaryColor: hex }));
      toast.success(`🎨 رنگ فرعی انتخاب شد: ${hex}`);
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

        {/* رنگ‌ها */}
        <div className="flex items-center justify-between">
          <label>🎨 رنگ اصلی:</label>
          <input
            type="color"
            value={shoe.mainColor}
            onChange={(e) =>
              setShoe({ ...shoe, mainColor: e.target.value })
            }
            className="w-12 h-12 rounded-full border-2"
          />
        </div>
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

        {/* فایل */}
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />

        {/* پیش‌نمایش عکس‌ها */}
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
                  onClick={() =>
                    setImages(images.filter((_, i) => i !== index))
                  }
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs opacity-80 group-hover:opacity-100"
                >
                  ❌
                </button>
              </div>
            ))}
          </div>
        )}

        {/* canvas برای انتخاب رنگ از عکس */}
        {images.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <label>🌈 انتخاب رنگ برای:</label>
              <select
                value={colorTarget}
                onChange={(e) =>
                  setColorTarget(e.target.value as "main" | "secondary")
                }
                className="border px-2 py-1 rounded"
              >
                <option value="main">رنگ اصلی</option>
                <option value="secondary">رنگ فرعی</option>
              </select>
            </div>
            <canvas
              id="colorCanvas"
              className="w-full max-w-sm border rounded-lg cursor-crosshair"
              onClick={handleCanvasClick}
            ></canvas>
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

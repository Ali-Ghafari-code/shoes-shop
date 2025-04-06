import Products from "./components/porducts/products";

export default function Home() {
  return (
    <div className="relative text-center mt-20  w-full">
      <div className="relative flex z-10"> 
        <Products />
      </div>
    </div>
  );
}

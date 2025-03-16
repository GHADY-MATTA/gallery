import ProductCard from "../components/ProductCard";

const products = [
  {
    id: 1,
    name: "iPhone 12",
    price: 400,
  },
  {
    id: 2,
    name: "iPhone 13",
    price: 500,
  },
  {
    id: 3,
    name: "iPhone 14",
    price: 600,
  },
];

const Products = () => {
  return (
    <div className="products">
      {products.map((product) => (
        <ProductCard
          name={product.name}
          price={product.price}
          key={product.id}
        />
      ))}
    </div>
  );
};

export default Products;

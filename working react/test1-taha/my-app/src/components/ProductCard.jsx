import phone from "../assets/phone.jpg";

const ProductCard = ({ name, price }) => {
  return (
    <div className="card">
      <div className="product-img">
        <img src={phone} alt="" />
      </div>
      <div className="divider"></div>
      <div className="product-details">
        <p>{name}</p>
        <p>${price}</p>
      </div>

      <button>Add to Cart</button>
    </div>
  );
};

export default ProductCard;

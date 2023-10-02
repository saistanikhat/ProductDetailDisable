import { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";

export default function App() {
  const baseUrl = "https://dummyjson.com/products";
  const [products, setProducts] = useState([]);
  const [productDetail, setProductDetail] = useState({});
  const [disabledProducts, setDisabledProducts] = useState(new Set());

  useEffect(() => {
    axios.get(baseUrl).then((res) => {
      setProducts(res.data.products);
    });
  }, []);

  const toggleDisableProduct = (id) => {
    setDisabledProducts((prevDisabledProducts) => {
      const updatedDisabledProducts = new Set(prevDisabledProducts);
      if (updatedDisabledProducts.has(id)) {
        updatedDisabledProducts.delete(id);
      } else {
        updatedDisabledProducts.add(id);
      }
      return updatedDisabledProducts;
    });
  };

  const isProductDisabled = (id) => disabledProducts.has(id);

  const toggleProductDetail = (id) => {
    if (!isProductDisabled(id)) {
      if (productDetail.id === id) {
        setProductDetail({});
      } else {
        axios.get(`${baseUrl}/${id}`).then((res) => {
          setProductDetail(res.data);
        });
      }
    }
  };

  return (
    <div className="App">
      {products.map((item) => (
        <ul key={item.id}>
          <li>
            <span>{item.id}</span>
            <span> </span>
            <span
              onClick={() => toggleProductDetail(item.id)}
              style={{
                cursor: isProductDisabled(item.id) ? "not-allowed" : "pointer"
              }}
            >
              {item.title}
            </span>
            <span>
              <button
                className="btn"
                onClick={() => toggleDisableProduct(item.id)}
              >
                {isProductDisabled(item.id) ? "Enable" : "Disable"}
              </button>
            </span>
            {item.id === productDetail.id && !isProductDisabled(item.id) ? (
              <div>{productDetail.description}</div>
            ) : null}
          </li>
        </ul>
      ))}
    </div>
  );
}

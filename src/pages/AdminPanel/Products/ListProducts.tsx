import  { useEffect, useState } from "react";

const ListProducts = () => {
    const [products, setProducts] = useState<string[]>([]);

    useEffect(() => {
        // Simulate fetching products from an API
        setProducts(["Product 1", "Product 2", "Product 3"]);
    }, []);

    return (
        <div className="container">
            <h1>تمامی محصولات</h1>
    <ul>
    {products.map((product, index) => (
            <li key={index}>{product}</li>
        ))}
    </ul>
    </div>
);
};

export default ListProducts;

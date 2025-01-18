import  { useState } from "react";

const DeleteProduct = () => {
    const [productName, setProductName] = useState("");

    const handleDelete = () => {
        console.log("Deleting product:", productName);
        // Add product deletion logic here
    };

    return (
        <div className="container">
            <h1>حذف محصول</h1>
            <div>
                <label>نام محصول</label>
                <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    required
                />
            </div>
            <button onClick={handleDelete}>حذف محصول</button>
        </div>
    );
};

export default DeleteProduct;

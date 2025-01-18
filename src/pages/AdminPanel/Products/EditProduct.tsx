import React, { useState, useEffect } from "react";

const EditProduct = () => {
    const [productName, setProductName] = useState("");

    // Simulate fetching product data
    useEffect(() => {
        setProductName("Existing Product");
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Editing product:", productName);
        // Add product update logic here
    };

    return (
        <div className="container">
            <h1>تغییر محصول</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>نام محصول</label>
                    <input
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">تغییر محصول</button>
            </form>
        </div>
    );
};

export default EditProduct;

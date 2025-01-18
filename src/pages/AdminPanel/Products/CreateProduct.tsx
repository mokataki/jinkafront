import React, { useState } from "react";

const CreateProduct = () => {
    const [productName, setProductName] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Creating product:", productName);
        // Add product creation logic here
    };

    return (
        <div className="container">
            <h1>ایجاد محصول</h1>
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
                <button type="submit">ایجاد محصول</button>
            </form>
        </div>
    );
};

export default CreateProduct;

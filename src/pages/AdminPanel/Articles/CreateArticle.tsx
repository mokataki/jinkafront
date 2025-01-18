import React, { useState } from "react";

const CreateArticle = () => {
    const [articleTitle, setArticleTitle] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Creating article:", articleTitle);
        // Add article creation logic here
    };

    return (
        <div className="container">
            <h1>ایجاد مقاله</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>عنوان مقاله</label>
                    <input
                        type="text"
                        value={articleTitle}
                        onChange={(e) => setArticleTitle(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">ایجاد مقاله</button>
            </form>
        </div>
    );
};

export default CreateArticle;

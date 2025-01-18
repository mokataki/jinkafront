import React, { useState, useEffect } from "react";

const EditArticle = () => {
    const [articleTitle, setArticleTitle] = useState("");

    useEffect(() => {
        setArticleTitle("Existing Article");
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Editing article:", articleTitle);
        // Add article update logic here
    };

    return (
        <div className="container">
            <h1>تغییر مقاله</h1>
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
                <button type="submit">تغییر مقاله</button>
            </form>
        </div>
    );
};

export default EditArticle;

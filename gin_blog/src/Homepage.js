// 在 HomePage.js 中
import React from 'react';
import './App.css'; // 假设你的样式文件叫 App.css

function HomePage() {
    return (
        <header className="app-header">
            <h1>Gin_Blog</h1>
            <img src="https://images.pexels.com/photos/18254876/pexels-photo-18254876.jpeg" alt="Welcome"/>
            <p>在这里，你可以发现无限可能。阅读最新的博客，分享你的故事，与世界连接。</p>
        </header>
    );
}

export default HomePage;

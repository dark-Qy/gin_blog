import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './User/Login';
import Register from './User/Register';
import Logout from "./User/Logout";
import CreateBlog from "./Blog/CreateBlog";

function App() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/login">登录</Link>
                        </li>
                        <li>
                            <Link to="/register">注册</Link>
                        </li>
                        <li>
                            <Link to="/logout">注销</Link>
                        </li>
                        <li>
                            <Link to="/create">新建博客</Link>
                        </li>
                    </ul>
                </nav>
                {/* 使用Routes代替Switch */}
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/create" element={<CreateBlog />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

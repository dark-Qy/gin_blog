import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './User/Login';
import Register from './User/Register';
import Logout from "./User/Logout";
import CreateBlog from "./Blog/CreateBlog";
import BlogList from "./Blog/BlogList";
import BlogDetail from "./Blog/BlogDetail";
import EditBlog from "./Blog/EditBlog";
import "./App.css"
import HomePage from "./Homepage";

function App() {
    return (
        <Router>
            <div className="app-container">
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
                        <li>
                            <Link to="/listAll">查看所有博客</Link>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/logout" element={<Logout/>}/>
                    <Route path="/create" element={<CreateBlog/>}/>
                    <Route path="/listAll" element={<BlogList/>}/>
                    <Route path="/blog/:id" element={<BlogDetail/>}/>
                    <Route path="/blog/edit/:id" element={<EditBlog/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;

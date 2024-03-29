import React, { useState } from 'react';
import './LoginForm.css';

function Register() {
    const [user, setUser] = useState({
        userName: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 检查用户输入是否为空
        if (!user.userName || !user.password) {
            alert("用户名和密码不能为空");
            return;
        }
        // 检查密码长度是否大于8位
        if (user.password.length < 8) {
            alert("密码长度必须大于8位");
            return;
        }

        // 注册逻辑
        try {
            // 发送 POST 请求到后端，传递用户信息
            const response = await fetch('/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });

            // 检查响应状态
            if (response.ok) {
                // 获取后端返回的数据（如果有）
                const data = await response.json();
                if (data.status === 0) {
                    // 使用alert函数显示成功信息
                    alert(`注册成功！用户${data.userName}你好`);
                }else {
                    alert(`注册失败！${data.error}`);
                }
            } else {
                // 如果请求失败，输出错误信息
                alert(`注册失败:${response.statusText}`);
            }
        } catch (error) {
            // 捕获异常，输出错误信息
            console.error('发生错误:', error);
        }
        console.log('注册信息', user);
    };

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <h2>注册</h2>
            <div className="form-group">
                <label>用户名:</label>
                <input type="text" name="userName" value={user.userName} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>密码:</label>
                <input type="password" name="password" value={user.password} onChange={handleChange} />
            </div>
            <button type="submit" className="login-button">注册</button>
        </form>
    );
}

export default Register;

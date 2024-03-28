import React, { useState } from 'react';

function Login(message) {
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

        // 这里添加登录逻辑
        try {
            // 发送 POST 请求到后端，传递用户信息
            const response = await fetch('/user/login', {
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
                    alert(`登录成功！用户${data.user.userName}你好`);
                }else {
                    alert(`登录失败！${data.error}`);
                }
                console.log(data)
            } else {
                // 如果请求失败，输出错误信息
                alert(`登录失败:${response.statusText}`);
            }
        } catch (error) {
            // 捕获异常，输出错误信息
            console.error('发生错误:', error);
        }
        console.log('登录信息', user);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>登录</h2>
            <div>
                <label>用户名:</label>
                <input type="text" name="userName" value={user.userName} onChange={handleChange} />
            </div>
            <div>
                <label>密码:</label>
                <input type="password" name="password" value={user.password} onChange={handleChange} />
            </div>
            <button type="submit">登录</button>
        </form>
    );
}

export default Login;

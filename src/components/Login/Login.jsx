import { useState } from 'react';
import './Login.css';
import Footer from '../Footer/Footer';
import axios from 'axios';

function Login() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Enviar dados para o backend
        axios.post('http://localhost:8000/api/login/', formData)
            .then(response => {
                setMessage(response.data.message);
                setLoading(false);
            })
            .catch(error => {
                setMessage(error.response?.data?.message || 'Erro ao fazer login');
                setLoading(false);
            });
    };

    return (
        <div id="root">
            <div className="main-content">
                <div className="form-container">
                    <h2>Entrar</h2>
                    {message && <div className="alert alert-info">{message}</div>}
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            className="form-control"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Username"
                            required
                        />
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            required
                        />
                         
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            required
                        />
                         
                        <div className="btn-container">
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? 'Carregando...' : 'Login'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>  
            <Footer />          
        </div>
    );
}

export default Login;

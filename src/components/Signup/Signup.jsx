import { useState } from 'react';
import './Signup.css';
import Footer from '../Footer/Footer';
import axios from 'axios';

function Signup() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
    });

    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Enviar dados para o backend
        axios.post('http://localhost:8000/api/signup/', formData)
            .then(response => {
                setMessage(response.data.message);
                setLoading(false);
            })
            .catch(error => {
                setMessage(error.response?.data?.message || 'Erro ao registrar');
                setLoading(false);
            });
    };

    return (
        <div id="root">
            <div className="main-content">
                <div className="form-container">
                    <h2>Registro</h2>
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
                            type="tel"
                            className="form-control"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Phone (123-456-7890)"
                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
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
                        <input
                            type="password"
                            className="form-control"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm Password"
                            required
                        />
                        <div className="btn-container">
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? 'Carregando...' : 'Registrar'}
                            </button>
                        </div>
                    </form>
                </div>
            </div> 
 
            <Footer />          
        </div>
    );
}

export default Signup;

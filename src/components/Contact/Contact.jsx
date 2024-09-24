import { useState, useEffect } from 'react';
import './Contact.css';
import Footer from '../Footer/Footer';
import axios from 'axios';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    const [team, setTeam] = useState([]);
    const [loading, setLoading] = useState(true);

    // Requisição para buscar os dados da equipe no Django
    useEffect(() => {
        axios.get('http://localhost:8000/api/contact/')
            .then(response => {
                setTeam(response.data.team);
                setLoading(false);
            })
            .catch(error => {
                console.error('Erro ao buscar dados:', error);
                setLoading(false);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica para enviar o formulário
        console.log(formData);
    };

    if (loading) {
        return <div className="loading">Carregando...</div>;
    }

    return (
        <div className="container mt-5">
            <h2>Formulario de Contato</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Nome
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Digite seu nome"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Digite seu email"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">
                        Telefone
                    </label>
                    <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="Digite seu telefone"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="message" className="form-label">
                        Mensagem
                    </label>
                    <textarea
                        className="form-control"
                        id="message"
                        name="message"
                        rows="4"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder="Escreva sua mensagem"
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                    Enviar
                </button>
            </form>
            <br />

            {/* Seção da equipe */}
            <section id="staff" className="py-5 text-center bg-dark text-white">
                <div className="container-fluid">
                    <h1>Nossa equipe</h1>
                    <hr className="my-4" />
                    <div className="row justify-content-center">
                        {team.map((member, index) => (
                            <div key={index} className="col-12 col-md-3 d-flex flex-column align-items-center">
                                <img
                                    src={`http://localhost:8000${member.image}`}
                                    alt={member.name}
                                    className="img-fluid rounded-circle mb-3"
                                />
                                <h4>{member.name}</h4>
                                <small>{member.role}</small>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default Contact;

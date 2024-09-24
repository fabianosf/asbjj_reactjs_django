import { useState, useEffect } from 'react';
import axios from 'axios';
import FAQItem from "../FaqItem/FaqItem";
import Footer from '../Footer/Footer';

function Service() {
    const [services, setServices] = useState([]);
    const [faqs, setFaqs] = useState([]);
    const [loading, setLoading] = useState(true);

    // Requisição para buscar os dados do Service no Django
    useEffect(() => {
        axios.get('http://localhost:8000/api/service/')
            .then(response => {
                setServices(response.data.services);
                setFaqs(response.data.faq);
                setLoading(false);
            })
            .catch(error => {
                console.error('Erro ao buscar dados:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="loading">Carregando...</div>;
    }

    return (
        <div>
            <section id="servicos" className="py-5">
                <div className="container">
                    <div className="row">
                        {services.map((service, index) => (
                            <div key={index} className="col-md-4">
                                <div className="card text-center">
                                    <div className="card-header bg-dark text-white">
                                        <h3>{service.name}</h3>
                                    </div>
                                    <div className="card-body">
                                        <h4 className="card-title">
                                            <i className="fa fa-star" aria-hidden="true"></i>
                                        </h4>
                                        <p>Benefícios do {service.name}</p>
                                        <ul className="list-group">
                                            {service.benefits.map((benefit, benefitIndex) => (
                                                <li key={benefitIndex} className="list-group-item">
                                                    <i className="fas fa-check"></i> {benefit}
                                                </li>
                                            ))}
                                        </ul>
                                        <a href={service.cta} className="btn btn-primary btn-block mt-3">Obter Serviço</a>
                                    </div>
                                    <div className="card-footer text-muted">
                                        Consulte a gente
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="faq" className="p-5 bg-dark text-white">
                <div className="container">
                    <h1 className="text-center">Perguntas mais frequentes</h1>
                    <hr />
                    <div className="row">
                        <div className="col-md-6">
                            {faqs.slice(0, 3).map((faq, index) => (
                                <FAQItem
                                    key={index}
                                    id={faq.id}
                                    question={faq.question}
                                    answer={faq.answer}
                                />
                            ))}
                        </div>
                        <div className="col-md-6">
                            {faqs.slice(3, 6).map((faq, index) => (
                                <FAQItem
                                    key={index}
                                    id={faq.id}
                                    question={faq.question}
                                    answer={faq.answer}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default Service;

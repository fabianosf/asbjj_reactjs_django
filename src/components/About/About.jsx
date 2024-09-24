import { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../Footer/Footer';
import './About.css';

function About() {
    const [aboutData, setAboutData] = useState({
        image: '',
        description: '',
        schedule: [],
        testimonials: []
    });
    const [loading, setLoading] = useState(true);  // Estado de carregamento

    // Requisição para buscar os dados do About no Django
    useEffect(() => {
        axios.get('http://localhost:8000/api/about/')
            .then(response => {
                setAboutData({
                    image: response.data.image,
                    description: response.data.description,
                    schedule: response.data.schedule,
                    testimonials: response.data.testimonials
                });
                setLoading(false);  // Defina como 'false' após os dados serem carregados
            })
            .catch(error => {
                console.error('Erro ao buscar dados:', error);
                setLoading(false);  // Mesmo em caso de erro, devemos parar o estado de carregamento
            });
    }, []);

    // Dias da semana padrão
    const weekDays = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"];

    // Renderize uma mensagem de carregamento enquanto os dados são buscados
    if (loading) {
        return <div className="loading">Carregando...</div>;
    }

    // Função para encontrar horários de um dia específico
    const getDaySchedule = (day) => {
        const daySchedule = aboutData.schedule.find(s => s.day === day);
        return daySchedule ? daySchedule.times : [];
    };

    // Número máximo de horários (4 no exemplo)
    const maxSlots = 4;

    return (
        <div>
            {/* Seção sobre */}
            <section id="sobre" className="py-3">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="sobre-img-container">
                                <img
                                    src={`http://localhost:8000${aboutData.image}`} // Carregando imagem da API
                                    alt="Professores"
                                    className="sobre-img rounded-circle"
                                />
                            </div>
                            <div className="texto">
                                <h1>O que nós fazemos?</h1>
                                <p className="paragrafo">{aboutData.description || 'Descrição não disponível no momento'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Seção com tabela de horários */}
            <section id="weekdays-multiple-schedule-table" className="p-5">
                <div className="container">
                    <div className="row mb-4">
                        <div className="col text-center">
                            <h2>Horários da Semana</h2>
                        </div>
                    </div>
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr className="text-center">
                                {weekDays.map((day, index) => (
                                    <th key={index} className="custom-blue">{day}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {Array.from({ length: maxSlots }).map((_, rowIndex) => (
                                <tr key={rowIndex} className="text-center">
                                    {weekDays.map((day, dayIndex) => {
                                        const daySchedule = getDaySchedule(day);
                                        if (daySchedule[rowIndex]) {
                                            return (
                                                <td key={dayIndex} className="bg-dark text-white">
                                                    <h5>{daySchedule[rowIndex].time}</h5>
                                                    <p>{daySchedule[rowIndex].class}</p>
                                                </td>
                                            );
                                        } else {
                                            return (
                                                <td key={dayIndex} className="bg-dark text-white">
                                                    <p>-</p> {/* Colocar traço se não houver horário */}
                                                </td>
                                            );
                                        }
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Seção de depoimentos */}
            <section id="testimonials" className="p-4 bg-dark text-white">
                <div className="container">
                    <h2 className="text-center">O que nossos alunos acham?</h2>
                    <div className="row text-center">
                        {aboutData.testimonials.map((testimonial, index) => (
                            <div key={index} className="col-md-4">
                                <blockquote className="blockquote">
                                    <p className="mb-0">{testimonial.text}</p>
                                    <footer className="blockquote-footer">
                                        {testimonial.name}
                                    </footer>
                                </blockquote>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default About;

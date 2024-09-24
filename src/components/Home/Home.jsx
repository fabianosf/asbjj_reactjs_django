import { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../Footer/Footer';
import './Home.css';

function Home() {
    const [carouselItems, setCarouselItems] = useState([]);
    const [galleryImages, setGalleryImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    // Requisição para buscar os dados da Home no Django
    useEffect(() => {
        axios.get('http://localhost:8000/api/home/')
            .then(response => {
                setCarouselItems(response.data.carousel);
                setGalleryImages(response.data.gallery);
            })
            .catch(error => {
                console.error('Erro ao buscar dados:', error);
            });
    }, []);

    // Função para abrir o modal com a imagem selecionada
    const openModal = (image) => {
        setSelectedImage(image);
    };

    // Função para fechar o modal
    const closeModal = () => {
        setSelectedImage(null);
    };

    return (
        <div>
            {/* Carousel */}
            <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
                <div className="carousel-inner">
                    {carouselItems.map((item, index) => (
                        <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                            <img src={`http://localhost:8000${item.img}`} className="d-block w-100" alt={item.title} />
                            <div className="carousel-caption d-none d-md-block">
                                <h5>{item.title}</h5>
                                <p>{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Galeria de fotos */}
            <section id="gallery" className="py-5">
                <div className="container">
                    <h1 className="text-center">Galeria de Fotos</h1>
                    <p className="text-center">Clique em nossas imagens</p>
                    <div className="row mb-4">
                        {galleryImages.map((image, index) => (
                            <div className="col-md-4" key={index}>
                                <div className="card mb-4">
                                    <img
                                        src={`http://localhost:8000${image}`}
                                        alt={`Imagem ${index + 1}`}
                                        className="card-img-top img-fluid"
                                        onClick={() => openModal(`http://localhost:8000${image}`)}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Modal para exibir a imagem selecionada */}
                {selectedImage && (
                    <div className="modal fade show d-block" role="dialog" style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-body p-0">
                                    <img src={selectedImage} alt="Imagem Selecionada" className="img-fluid rounded" />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={closeModal}>
                                        Fechar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </section>

            <Footer />
        </div>
    );
}

export default Home;

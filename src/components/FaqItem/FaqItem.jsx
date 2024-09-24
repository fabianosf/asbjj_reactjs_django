import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './FaqItem.css'

function FAQItem({ question, answer, id }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        let timer;
        if (isOpen) {
            timer = setTimeout(() => {
                setIsOpen(false);
            }, 5000); // 5 segundos
        }
        return () => clearTimeout(timer);
    }, [isOpen]);

    return (
        <div className="card">
            <div className="card-header faq-question" onClick={toggleAccordion} style={{ cursor: 'pointer' }}>
                <h5 className="mb-0">
                    <a
                        href={`#${id}`}
                        aria-expanded={isOpen}
                        aria-controls={id}
                    >
                        {question}
                    </a>
                </h5>
            </div>
            {isOpen && (
                <div id={id} className="collapse show">
                    <div className="card-body faq-answer">
                        {answer}
                    </div>
                </div>
            )}
        </div>
    );
}

FAQItem.propTypes = {
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
};

export default FAQItem;

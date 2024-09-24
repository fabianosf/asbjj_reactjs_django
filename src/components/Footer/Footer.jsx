import './Footer.css'


function Footer() {
    return (           
        <footer id="main-footer" className="text-center p-4">
            <div className="container">
                <div className="copyright-text">
                    <p>
                        Copyright &copy;
                        <script>document.write(new Date().getFullYear());</script> Todos os direitos reservado | Este
                        site
                        é desenvolvido com <i className="fa fa-heart" aria-hidden="true"></i> por <a
                            href="https://fabianosf.github.io/fabianosf_/" target="_blank">Fabiano Freitas</a>
                    </p>
                </div>
            </div>
        </footer>
        
        
    )
}

export default Footer;
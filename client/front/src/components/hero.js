class Hero extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.data = {}
  }

  async connectedCallback () {
    await this.loadData()
    await this.render()
  }

  loadData () {
    this.data = {
      title: 'En Pura Vida estamos deseando compartir este momento contigo ofreciéndote una de las vistas más espectaculares de la costa Mallorquina',
      description: 'Abrimos todos los días de 9:30 AM a 22:00 PM. Ven y disfruta de nuestro servicio con la suave brisa del mar acompañándote desde el primer momento. Revisa nuestra docs/carta-es.pdf" carta y reserva ya tu momento especial con nosotros.',
      buttonText: '<a class="reserve-btn" href="tel: +34633142469" aria-label="Llamar para reservar">Reservar mi sitio</a>'
    }
  }

  render () {
    this.shadow.innerHTML =
    /* html */`
    <style>
      *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body{
        font-family: 'Manrope', sans-serif;
        margin:0;
        color: #fff;
        overflow-x: hidden;
      }

      button{
        background-color: transparent;
        border: none;
        cursor: pointer;
        outline: none;
        padding: 0;
      }

      html{
        scroll-behavior: smooth;
      }

      h1, h2, h3, h4, h5, h6{
        font-family: "Croissant One", cursive;
        font-optical-sizing: auto;
        margin: 0;

      }

      img{
        object-fit: cover;
        width: 100%;
      }

      .hero-container {
        align-items: center;
        display: flex;
        gap: clamp(20px, 4vw, 60px);
        justify-content: space-between;
        width: 100%;
        max-width: 1200px;
        padding: clamp(24px, 6vw, 70px);
        margin: 0 auto;
      }

      .hero-title {
          color: #1a1a1a;
          font-size: 1.2rem;
          font-weight: 300;
          line-height: 1.3;
          margin-bottom: 30px;
      }

      .hero-text {
          color: #5e5e5e;
          font-size: 1rem;
      }

      .menu-btn {
          color:#0F5F6E;
          text-decoration: none;
          font-weight: 600;
          letter-spacing: 0.5px;
      }

      .reserve-btn:hover {
          color:#0F5F6E;
      }

      .reserve-btn:hover {
          color:#0F5F6E;
      }


      .reserve-btn {
          color:#1a1a1a;
          display: inline-block;
          text-decoration: none;
          font-weight: 600;
          letter-spacing: 0.5px;
      }

      .reserve-btn:hover {
          color:#0F5F6E;
      }

      .hero-image{
          flex: 0 1 560px;
          min-width: 320px;
          aspect-ratio: 4 / 3;
      }

      .hero-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          box-shadow:hsla(0, 0%, 100%, 0.212);
      }

      @media (max-width: 820px){
          .hero-container{flex-direction: column;}
          .hero-image, .hero-copy{width: 100%; flex-basis: auto; }
      }


    </style>

    <section class="hero-container">
      <div class="hero-content">
        <div class="hero-title">
          <p>${this.data.title}</p>
        </div>
        <div class="hero-description">
          <p>
            ${this.data.description}
          </p>
        </div>
        <div class="hero-button">
          <button>${this.data.buttonText}</button>
        </div>
      </div>
      <div class="hero-image">
        <picture>
          <source srcset="./images/hero.jpg" media="(min-width: 1920px)">
          <source srcset="./images/hero.jpg" media="(min-width: 1024px)">
          <source srcset="./images/hero.jpg" media="(min-width: 768px)">
          <source srcset="./images/hero.jpg" media="(min-width: 480px)">
          <img src="./images/hero.jpg" alt="Vista al mar desde Pura Vida">
        </picture>
      </div>
    </section>
    `
  }
}

customElements.define('hero-component', Hero)

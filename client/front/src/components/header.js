class HeaderComponent extends HTMLElement {
  static get observedAttributes () {
    return ['video', 'title', 'time', 'days', 'reserve', 'active']
  }

  constructor () {
    super()
    this._onScroll = this._onScroll.bind(this)
    this._onKeyDown = this._onKeyDown.bind(this)
  }

  connectedCallback () {
    this.render()
    this.cacheEls()
    this.bindEvents()
    this.applyStateFromAttrs()
    this._onScroll()
  }

  disconnectedCallback () {
    window.removeEventListener('scroll', this._onScroll)
    window.removeEventListener('keydown', this._onKeyDown)
  }

  attributeChangedCallback () {
    if (this.isConnected) {
      this.render()
      this.cacheEls()
      this.bindEvents()
      this.applyStateFromAttrs()
      this._onScroll()
    }
  }

  getAttr (name, fallback = '') {
    const v = this.getAttribute(name)
    return (v === null || v === undefined) ? fallback : v
  }

  getBoolAttr (name, fallback = false) {
    const v = this.getAttribute(name)
    if (v === null) return fallback
    return v === 'true' || v === '' // permite <header-component reserve>
  }

  render () {
    // Defaults razonables
    const video = this.getAttr('video', 'videos/header-video.mp4')
    const title = this.getAttr('title', '')
    const time = this.getAttr('time', '')
    const days = this.getAttr('days', '')
    const reserve = this.getBoolAttr('reserve', false)

    // Nota: links ahora deberían ir a HTML separados (no #hash) porque vas multipágina
    this.innerHTML = /* html */`
      <header class="site-header" role="banner">
        <div class="header-video">
          <video autoplay muted loop playsinline>
            <source src="${video}" type="video/mp4">
          </video>
          <div class="header-video-overlay"></div>
        </div>

        <div class="nav-center-container">
          <div class="logo"><a href="home.html">PURA VIDA</a></div>

          ${title ? `<div class="sublogo"><h2>${title}</h2></div>` : ''}

          ${(time || days) ? `
            <div class="header-schedule">
              ${time ? `<h5 class="schedule-time">${time}</h5>` : ''}
              ${days ? `<h6 class="schedule-week">${days}</h6>` : ''}
            </div>
          ` : ''}

          ${reserve ? `
            <div class="button-reservation">
              <a class="reserve-btn" href="#reservas">RESERVAR</a>
            </div>
          ` : ''}
        </div>

        <nav class="nav-container">
          <div class="nav-left-container">
            <button class="hamburguer-menu" aria-label="Menú" aria-controls="menu-panel" aria-expanded="false">
              <svg width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 8h24M4 16h24M4 24h24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>

          <div class="nav-right-container">
            <div class="language-selector">
              <ul class="nav-lenguage-menu" aria-label="Seleccionar idioma">
                <li class="nav-lenguage-item"><a href="#es" class="lang-link active">ES</a></li>
                <li class="nav-lenguage-item"><a href="#cat" class="lang-link">CAT</a></li>
                <li class="nav-lenguage-item"><a href="#en" class="lang-link">EN</a></li>
                <li class="nav-lenguage-item"><a href="#de" class="lang-link">DE</a></li>
              </ul>
            </div>

            <div class="social-media">
              <ul class="social-media-menu" aria-label="Redes sociales">
                <li class="social-media-item"><a href="#instagram" class="socialmedia-link">IG</a></li>
                <li class="social-media-item"><a href="#whatsapp" class="socialmedia-link">WP</a></li>
              </ul>
            </div>
          </div>
        </nav>

        <div class="menu-panel" id="menu-panel" aria-hidden="true">
          <ul class="nav-menu" aria-label="Navegación principal">
            <li class="nav-item"><a href="home.html" class="nav-link" data-key="home" data-preview="images/home.jpg">Home</a></li>
            <li class="nav-item"><a href="restaurant.html" class="nav-link" data-key="restaurant" data-preview="images/restaurant.jpg">Restaurante</a></li>
            <li class="nav-item"><a href="bistro.html" class="nav-link" data-key="bistro" data-preview="images/bistro.jpg">Bistró</a></li>
            <li class="nav-item"><a href="eventos.html" class="nav-link" data-key="eventos" data-preview="images/events.jpg">Eventos</a></li>
            <li class="nav-item"><a href="contacta.html" class="nav-link" data-key="contacta" data-preview="images/contact.jpg">Contacto/Empleo</a></li>
            <li class="nav-item"><a href="ubicacion.html" class="nav-link" data-key="ubicacion" data-preview="images/ubication.jpg">Ubicación</a></li>
            <li class="nav-item"><a href="quienes-somos.html" class="nav-link" data-key="about" data-preview="images/info.jpg">Quiénes somos</a></li>
          </ul>
        </div>

        <div class="menu-preview" aria-hidden="true"></div>
        <div class="shade" aria-hidden="true"></div>
      </header>
    `
  }

  cacheEls () {
    this.$header = this.querySelector('.site-header')
    this.$nav = this.querySelector('.nav-container')
    this.$btn = this.querySelector('.hamburguer-menu')
    this.$panel = this.querySelector('.menu-panel')
    this.$shade = this.querySelector('.shade')
    this.$preview = this.querySelector('.menu-preview')
    this.$links = Array.from(this.querySelectorAll('.nav-link'))
  }

  bindEvents () {
    window.addEventListener('scroll', this._onScroll)
    window.addEventListener('keydown', this._onKeyDown)

    this.$btn?.addEventListener('click', () => this.toggleMenu())

    // Click en shade cierra
    this.$shade?.addEventListener('click', () => this.closeMenu())

    // Hover / focus en links para preview
    this.$links.forEach(link => {
      link.addEventListener('mouseenter', () => this.setPreview(link))
      link.addEventListener('focus', () => this.setPreview(link))

      // Al clicar un link, cierra el menú
      link.addEventListener('click', () => this.closeMenu())
    })
  }

  applyStateFromAttrs () {
    // Marcar activo
    const activeKey = this.getAttr('active', '')
    if (activeKey) {
      this.$links.forEach(a => {
        a.classList.toggle('is-active', a.dataset.key === activeKey)
      })
    }

    // Preview inicial si hay link activo
    const activeLink = this.$links.find(a => a.dataset.key === activeKey)
    if (activeLink) this.setPreview(activeLink)
  }

  _onScroll () {
    const scrolled = window.scrollY > 10
    this.$nav?.classList.toggle('is-scrolled', scrolled)
  }

  _onKeyDown (e) {
    if (e.key === 'Escape') this.closeMenu()
  }

  setPreview (link) {
    const src = link.getAttribute('data-preview')
    if (!src || !this.$preview) return
    this.$preview.style.backgroundImage = `url('${src}')`
  }

  toggleMenu () {
    const isOpen = this.$panel?.classList.contains('is-open')
    if (isOpen) this.closeMenu()
    else this.openMenu()
  }

  openMenu () {
    if (!this.$panel || !this.$shade || !this.$header || !this.$btn) return
    this.$panel.classList.add('is-open')
    this.$shade.classList.add('is-visible')
    this.$header.classList.add('menu-open')
    this.$panel.setAttribute('aria-hidden', 'false')
    this.$btn.setAttribute('aria-expanded', 'true')
  }

  closeMenu () {
    if (!this.$panel || !this.$shade || !this.$header || !this.$btn) return
    this.$panel.classList.remove('is-open')
    this.$shade.classList.remove('is-visible')
    this.$header.classList.remove('menu-open')
    this.$panel.setAttribute('aria-hidden', 'true')
    this.$btn.setAttribute('aria-expanded', 'false')
  }
}

customElements.define('header-component', HeaderComponent)

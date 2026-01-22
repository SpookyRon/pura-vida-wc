class FontLoader extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })

    const font = document.createElement('link')
    const secondaryfont = document.createElement('link')
    font.href = 'https://fonts.googleapis.com/css2?family=Croissant+One&display=swap'
    font.href = 'https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap'
    font.rel = 'stylesheet'
    secondaryfont.rel = 'stylesheet'
    document.head.appendChild(font)
    document.head.appendChild(secondaryfont)
    
  }
}

customElements.define('font-loader-component', FontLoader)
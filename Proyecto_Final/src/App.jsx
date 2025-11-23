import React, { useState, useEffect } from 'react'
import './App.css'

// Simulación de Web3
class MockWeb3 {
  constructor() {
    this.connected = false
    this.account = null
    this.balance = '0'
  }

  async connectWallet() {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.connected = true
        this.account = '0x742d35Cc6634C0532925a3b8D'
        this.balance = '2.45 ETH'
        resolve(true)
      }, 1000)
    })
  }

  async disconnectWallet() {
    this.connected = false
    this.account = null
    this.balance = '0'
  }
}

function App() {
  const [activeTab, setActiveTab] = useState('adoptar')
  const [pets, setPets] = useState([])
  const [filteredPets, setFilteredPets] = useState([])
  const [filters, setFilters] = useState({
    type: 'all',
    size: 'all',
    age: 'all',
    gender: 'all'
  })
  const [adoptionForm, setAdoptionForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    experience: '',
    petId: null
  })
  const [showAdoptionModal, setShowAdoptionModal] = useState(false)
  const [showWalletModal, setShowWalletModal] = useState(false)
  const [wallet, setWallet] = useState(new MockWeb3())
  const [transactionStatus, setTransactionStatus] = useState(null)

  // Datos de mascotas de ejemplo
  useEffect(() => {
    const samplePets = [
      {
        id: 1,
        name: "Max",
        type: "dog",
        breed: "Labrador",
        age: "2 años",
        size: "grande",
        gender: "macho",
        description: "Max es un perro juguetón y cariñoso. Le encanta correr en el parque y es muy bueno con los niños.",
        image: "🐕",
        vaccinated: true,
        trained: true,
        location: "Ciudad de México"
      },
      {
        id: 2,
        name: "Luna",
        type: "cat",
        breed: "Siamés",
        age: "1 año",
        size: "mediano",
        gender: "hembra",
        description: "Luna es una gata tranquila y curiosa. Le gusta observar desde las ventanas y es muy limpia.",
        image: "🐈",
        vaccinated: true,
        trained: true,
        location: "Guadalajara"
      },
      {
        id: 3,
        name: "Rocky",
        type: "dog",
        breed: "Bulldog",
        age: "3 años",
        size: "mediano",
        gender: "macho",
        description: "Rocky es calmado y leal. Perfecto para familias que buscan un compañero tranquilo.",
        image: "🐕",
        vaccinated: true,
        trained: false,
        location: "Monterrey"
      },
      {
        id: 4,
        name: "Mimi",
        type: "cat",
        breed: "Mestizo",
        age: "6 meses",
        size: "pequeño",
        gender: "hembra",
        description: "Mimi es una gatita energética y juguetona. Le encanta explorar y hacer travesuras.",
        image: "🐈",
        vaccinated: false,
        trained: false,
        location: "Puebla"
      },
      {
        id: 5,
        name: "Toby",
        type: "dog",
        breed: "Chihuahua",
        age: "4 años",
        size: "pequeño",
        gender: "macho",
        description: "Toby es pequeño pero con gran personalidad. Muy protector y cariñoso con su familia.",
        image: "🐕",
        vaccinated: true,
        trained: true,
        location: "Ciudad de México"
      },
      {
        id: 6,
        name: "Bella",
        type: "other",
        breed: "Conejo",
        age: "1 año",
        size: "pequeño",
        gender: "hembra",
        description: "Bella es un conejo tranquilo y adorable. Perfecta para apartamentos pequeños.",
        image: "🐇",
        vaccinated: true,
        trained: true,
        location: "Querétaro"
      }
    ]
    setPets(samplePets)
    setFilteredPets(samplePets)
  }, [])

  // Filtrar mascotas
  useEffect(() => {
    let filtered = pets
    
    if (filters.type !== 'all') {
      filtered = filtered.filter(pet => pet.type === filters.type)
    }
    
    if (filters.size !== 'all') {
      filtered = filtered.filter(pet => pet.size === filters.size)
    }
    
    if (filters.age !== 'all') {
      filtered = filtered.filter(pet => {
        if (filters.age === 'cachorro') return pet.age.includes('meses') || parseInt(pet.age) < 1
        if (filters.age === 'joven') return parseInt(pet.age) >= 1 && parseInt(pet.age) < 3
        if (filters.age === 'adulto') return parseInt(pet.age) >= 3
        return true
      })
    }
    
    if (filters.gender !== 'all') {
      filtered = filtered.filter(pet => pet.gender === filters.gender)
    }
    
    setFilteredPets(filtered)
  }, [filters, pets])

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }))
  }

  const handleAdoptionClick = (petId) => {
    if (!wallet.connected) {
      setShowWalletModal(true)
      return
    }
    setAdoptionForm(prev => ({ ...prev, petId }))
    setShowAdoptionModal(true)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    alert(`¡Gracias ${adoptionForm.name}! Hemos recibido tu solicitud de adopción. Nos pondremos en contacto contigo pronto.`)
    setShowAdoptionModal(false)
    setAdoptionForm({
      name: '',
      email: '',
      phone: '',
      address: '',
      experience: '',
      petId: null
    })
  }

  const connectWallet = async () => {
    setTransactionStatus({ type: 'processing', message: 'Conectando wallet...' })
    
    try {
      const success = await wallet.connectWallet()
      if (success) {
        setTransactionStatus({ 
          type: 'success', 
          message: 'Wallet conectada exitosamente!' 
        })
        setShowWalletModal(false)
        
        setTimeout(() => {
          setTransactionStatus(null)
        }, 3000)
      }
    } catch (error) {
      setTransactionStatus({ 
        type: 'error', 
        message: 'Error conectando wallet' 
      })
    }
  }

  const disconnectWallet = async () => {
    await wallet.disconnectWallet()
    setWallet(new MockWeb3())
    setTransactionStatus({ 
      type: 'info', 
      message: 'Wallet desconectada' 
    })
    
    setTimeout(() => {
      setTransactionStatus(null)
    }, 3000)
  }

  const getPetIcon = (type) => {
    switch(type) {
      case 'dog': return '🐕'
      case 'cat': return '🐈'
      case 'other': return '🐇'
      default: return '🐾'
    }
  }

  return (
    <div className="petconnect-container">
      {/* Header con Wallet */}
      <header className="petconnect-header">
        <div className="header-content">
          <div className="logo">
            <i className="fas fa-paw"></i>
            <h1>PetConnect</h1>
          </div>
          <nav className="main-nav">
            <button 
              className={`nav-btn ${activeTab === 'adoptar' ? 'active' : ''}`}
              onClick={() => setActiveTab('adoptar')}
            >
              <i className="fas fa-home"></i> Adoptar
            </button>
            <button 
              className={`nav-btn ${activeTab === 'donar' ? 'active' : ''}`}
              onClick={() => setActiveTab('donar')}
            >
              <i className="fas fa-heart"></i> Donar
            </button>
            <button 
              className={`nav-btn ${activeTab === 'voluntariado' ? 'active' : ''}`}
              onClick={() => setActiveTab('voluntariado')}
            >
              <i className="fas fa-hands-helping"></i> Voluntariado
            </button>
            <button 
              className={`nav-btn ${activeTab === 'blog' ? 'active' : ''}`}
              onClick={() => setActiveTab('blog')}
            >
              <i className="fas fa-book"></i> Blog
            </button>
          </nav>

          {/* Wallet Connection */}
          <div className="wallet-section">
            {!wallet.connected ? (
              <button 
                className="wallet-connect-btn"
                onClick={() => setShowWalletModal(true)}
              >
                <i className="fas fa-wallet"></i>
                Conectar Wallet
              </button>
            ) : (
              <div className="wallet-info">
                <div className="wallet-address">
                  <i className="fas fa-check-circle"></i>
                  {wallet.account?.substring(0, 8)}...{wallet.account?.substring(wallet.account.length - 6)}
                </div>
                <div className="wallet-balance">{wallet.balance}</div>
                <button 
                  className="wallet-disconnect-btn"
                  onClick={disconnectWallet}
                >
                  <i className="fas fa-power-off"></i>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Status de Transacción */}
      {transactionStatus && (
        <div className={`transaction-status ${transactionStatus.type}`}>
          <div className="status-content">
            <i className={`fas ${
              transactionStatus.type === 'processing' ? 'fa-spinner fa-spin' :
              transactionStatus.type === 'success' ? 'fa-check-circle' :
              transactionStatus.type === 'error' ? 'fa-exclamation-circle' :
              'fa-info-circle'
            }`}></i>
            <span>{transactionStatus.message}</span>
          </div>
        </div>
      )}

      <main className="petconnect-main">
        {/* Hero Section */}
        {activeTab === 'adoptar' && (
          <section className="hero-section">
            <div className="hero-content">
              <h2>Encuentra a tu compañero perfecto</h2>
              <p>Miles de animales esperan un hogar lleno de amor. ¡Haz la diferencia hoy!</p>
              <div className="hero-stats">
                <div className="stat">
                  <span className="stat-number">1,247</span>
                  <span className="stat-label">Adopciones exitosas</span>
                </div>
                <div className="stat">
                  <span className="stat-number">356</span>
                  <span className="stat-label">Animales disponibles</span>
                </div>
                <div className="stat">
                  <span className="stat-number">89%</span>
                  <span className="stat-label">Tasa de éxito</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Filtros */}
        {activeTab === 'adoptar' && (
          <section className="filters-section">
            <h3>Filtrar mascotas</h3>
            <div className="filters-grid">
              <div className="filter-group">
                <label>Tipo:</label>
                <select 
                  value={filters.type} 
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                >
                  <option value="all">Todos</option>
                  <option value="dog">Perros</option>
                  <option value="cat">Gatos</option>
                  <option value="other">Otros</option>
                </select>
              </div>
              
              <div className="filter-group">
                <label>Tamaño:</label>
                <select 
                  value={filters.size} 
                  onChange={(e) => handleFilterChange('size', e.target.value)}
                >
                  <option value="all">Todos</option>
                  <option value="pequeño">Pequeño</option>
                  <option value="mediano">Mediano</option>
                  <option value="grande">Grande</option>
                </select>
              </div>
              
              <div className="filter-group">
                <label>Edad:</label>
                <select 
                  value={filters.age} 
                  onChange={(e) => handleFilterChange('age', e.target.value)}
                >
                  <option value="all">Todas</option>
                  <option value="cachorro">Cachorro</option>
                  <option value="joven">Joven</option>
                  <option value="adulto">Adulto</option>
                </select>
              </div>
              
              <div className="filter-group">
                <label>Género:</label>
                <select 
                  value={filters.gender} 
                  onChange={(e) => handleFilterChange('gender', e.target.value)}
                >
                  <option value="all">Todos</option>
                  <option value="macho">Macho</option>
                  <option value="hembra">Hembra</option>
                </select>
              </div>
            </div>
          </section>
        )}

        {/* Grid de Mascotas */}
        {activeTab === 'adoptar' && (
          <section className="pets-grid-section">
            <h3>Mascotas disponibles ({filteredPets.length})</h3>
            <div className="pets-grid">
              {filteredPets.map(pet => (
                <div key={pet.id} className="pet-card">
                  <div className="pet-image">
                    <span className="pet-emoji">{pet.image}</span>
                    <div className="pet-badges">
                      {pet.vaccinated && <span className="badge vaccinated">Vacunado</span>}
                      {pet.trained && <span className="badge trained">Entrenado</span>}
                      {wallet.connected && <span className="badge crypto">Web3 Ready</span>}
                    </div>
                  </div>
                  
                  <div className="pet-info">
                    <h4>{pet.name}</h4>
                    <div className="pet-details">
                      <span><i className="fas fa-paw"></i> {pet.breed}</span>
                      <span><i className="fas fa-birthday-cake"></i> {pet.age}</span>
                      <span><i className="fas fa-venus-mars"></i> {pet.gender}</span>
                      <span><i className="fas fa-map-marker-alt"></i> {pet.location}</span>
                    </div>
                    <p className="pet-description">{pet.description}</p>
                    
                    <div className="pet-actions">
                      <button 
                        className="btn-primary"
                        onClick={() => handleAdoptionClick(pet.id)}
                      >
                        {!wallet.connected ? (
                          <>
                            <i className="fas fa-wallet"></i> Conectar para Adoptar
                          </>
                        ) : (
                          <>
                            <i className="fas fa-heart"></i> Adoptar
                          </>
                        )}
                      </button>
                      <button className="btn-secondary">
                        <i className="fas fa-share-alt"></i> Compartir
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Otras secciones */}
        {activeTab === 'donar' && (
          <section className="content-section">
            <h2>Apoya nuestra causa</h2>
            <div className="donation-options">
              <div className="donation-card">
                <i className="fas fa-hand-holding-usd"></i>
                <h3>Donación única</h3>
                <p>Contribuye con cualquier cantidad para ayudar a los animales</p>
                <button 
                  className="btn-primary"
                  onClick={() => !wallet.connected && setShowWalletModal(true)}
                >
                  {wallet.connected ? 'Donar ahora' : 'Conectar Wallet'}
                </button>
              </div>
              
              <div className="donation-card">
                <i className="fas fa-calendar-check"></i>
                <h3>Donación mensual</h3>
                <p>Conviértete en padrino/madrina con una donación recurrente</p>
                <button 
                  className="btn-primary"
                  onClick={() => !wallet.connected && setShowWalletModal(true)}
                >
                  {wallet.connected ? 'Ser padrino' : 'Conectar Wallet'}
                </button>
              </div>
              
              <div className="donation-card">
                <i className="fas fa-shopping-cart"></i>
                <h3>Donación en especie</h3>
                <p>Alimentos, medicinas, juguetes y otros suministros</p>
                <button className="btn-primary">Ver necesidades</button>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'voluntariado' && (
          <section className="content-section">
            <h2>Únete como voluntario</h2>
            <div className="volunteer-info">
              <div className="volunteer-role">
                <h3><i className="fas fa-dog"></i> Cuidado de animales</h3>
                <p>Ayuda con paseos, alimentación y cuidado básico</p>
              </div>
              
              <div className="volunteer-role">
                <h3><i className="fas fa-camera"></i> Fotografía</h3>
                <p>Toma fotos profesionales para aumentar las adopciones</p>
              </div>
              
              <div className="volunteer-role">
                <h3><i className="fas fa-hands"></i> Eventos</h3>
                <p>Participa en ferias de adopción y eventos especiales</p>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'blog' && (
          <section className="content-section">
            <h2>Blog y consejos</h2>
            <div className="blog-posts">
              <div className="blog-card">
                <h3>Guía para nuevos dueños de mascotas</h3>
                <p>Aprende todo lo necesario para recibir a tu nueva mascota en casa</p>
              </div>
              
              <div className="blog-card">
                <h3>Beneficios de adoptar</h3>
                <p>Descubre por qué adoptar cambia vidas (incluida la tuya)</p>
              </div>
              
              <div className="blog-card">
                <h3>Cuidados básicos para gatos</h3>
                <p>Todo lo que necesitas saber sobre el cuidado felino</p>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Modal de Wallet */}
      {showWalletModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Conectar Wallet</h3>
              <button 
                className="close-btn"
                onClick={() => setShowWalletModal(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className="wallet-options">
              <div className="wallet-option">
                <div className="wallet-icon">
                  <i className="fab fa-ethereum"></i>
                </div>
                <div className="wallet-info">
                  <h4>MetaMask</h4>
                  <p>Conecta tu wallet de Ethereum</p>
                </div>
                <button className="connect-btn" onClick={connectWallet}>
                  Conectar
                </button>
              </div>
              
              <div className="wallet-option">
                <div className="wallet-icon">
                  <i className="fas fa-wallet"></i>
                </div>
                <div className="wallet-info">
                  <h4>WalletConnect</h4>
                  <p>Conecta con múltiples wallets</p>
                </div>
                <button className="connect-btn" onClick={connectWallet}>
                  Conectar
                </button>
              </div>
              
              <div className="wallet-option">
                <div className="wallet-icon">
                  <i className="fab fa-bitcoin"></i>
                </div>
                <div className="wallet-info">
                  <h4>Coinbase Wallet</h4>
                  <p>Wallet de Coinbase</p>
                </div>
                <button className="connect-btn" onClick={connectWallet}>
                  Conectar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Adopción */}
      {showAdoptionModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Solicitud de Adopción</h3>
              <button 
                className="close-btn"
                onClick={() => setShowAdoptionModal(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <form onSubmit={handleFormSubmit} className="adoption-form">
              <div className="form-group">
                <label>Nombre completo *</label>
                <input 
                  type="text" 
                  value={adoptionForm.name}
                  onChange={(e) => setAdoptionForm(prev => ({ ...prev, name: e.target.value }))}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label>Email *</label>
                <input 
                  type="email" 
                  value={adoptionForm.email}
                  onChange={(e) => setAdoptionForm(prev => ({ ...prev, email: e.target.value }))}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label>Teléfono *</label>
                <input 
                  type="tel" 
                  value={adoptionForm.phone}
                  onChange={(e) => setAdoptionForm(prev => ({ ...prev, phone: e.target.value }))}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label>Dirección *</label>
                <input 
                  type="text" 
                  value={adoptionForm.address}
                  onChange={(e) => setAdoptionForm(prev => ({ ...prev, address: e.target.value }))}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label>Experiencia previa con mascotas</label>
                <textarea 
                  value={adoptionForm.experience}
                  onChange={(e) => setAdoptionForm(prev => ({ ...prev, experience: e.target.value }))}
                  placeholder="Cuéntanos sobre tu experiencia con mascotas..."
                />
              </div>

              {wallet.connected && (
                <div className="wallet-connected-info">
                  <div className="wallet-status">
                    <i className="fas fa-check-circle"></i>
                    <span>Wallet conectada: {wallet.account?.substring(0, 8)}...{wallet.account?.substring(wallet.account.length - 6)}</span>
                  </div>
                  <div className="wallet-balance-info">
                    Balance disponible: {wallet.balance}
                  </div>
                </div>
              )}
              
              <button type="submit" className="btn-primary submit-btn">
                {wallet.connected ? (
                  <>
                    <i className="fas fa-check"></i>
                    Confirmar Adopción
                  </>
                ) : (
                  'Enviar solicitud de adopción'
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      <footer className="petconnect-footer">
        <p>&copy; 2024 PetConnect. Todos los derechos reservados.</p>
        <p>¡Juntos podemos hacer la diferencia en la vida de los animales!</p>
      </footer>
    </div>
  )
}

export default App
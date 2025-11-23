import { useState } from "react"

function ShelterForm({ ClientCall, estado, setRefugioCreado }) {
    const funcion = "crear_empresa"
    const [nombre, cambiarNombre] = useState("")

    function enviar() {
        if (!nombre.trim()) {
            alert("Por favor ingresa el nombre del refugio");
            return;
        }
        ClientCall({
            funcion,
            args: [nombre]
        })
    }
    
    return(
        <div className="hero-section">
            <h1 className="hero-title">Crear Nuevo Refugio</h1>
            <p className="hero-subtitle">
                Registra tu refugio de animales en el sistema para comenzar a gestionar 
                adopciones de forma segura y transparente.
            </p>
            
            <div style={{maxWidth: '500px', margin: '0 auto'}}>
                <div className="form-group">
                    <label className="form-label">Nombre del Refugio</label>
                    <input 
                        type="text" 
                        placeholder="Ej: Refugio Patitas Felices"
                        className="form-input"
                        value={nombre}
                        onChange={(e) => cambiarNombre(e.target.value)}
                    />
                </div>

                <button 
                    className="btn-primary"
                    type="button"
                    disabled={estado}
                    onClick={enviar}
                    style={{marginBottom: '1rem'}}
                >
                    {estado ? (
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'}}>
                            <div className="loading-spinner"></div>
                            Creando refugio...
                        </div>
                    ) : (
                        "🐾 Crear Refugio"
                    )}
                </button>

                <p style={{textAlign: 'center', color: '#64748b', fontSize: '0.9rem'}}>
                    ¿Ya tienes un refugio registrado?{' '}
                    <span 
                        style={{ color: "#10b981", cursor: "pointer", textDecoration: "underline", fontWeight: "600" }}
                        onClick={() => setRefugioCreado(true)}
                    >
                        Acceder al sistema existente
                    </span>
                </p>
            </div>
        </div>
    )
}

export default ShelterForm
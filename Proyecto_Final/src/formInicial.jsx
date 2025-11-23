import { useState } from 'react';

export default function FormInicial({ ClientCall, estado, setRefugioCreado }) {
    const [nombreRefugio, setNombreRefugio] = useState('');

    const crearRefugio = (e) => {
        e.preventDefault();
        if (!nombreRefugio.trim()) {
            alert("Por favor ingresa un nombre para el refugio");
            return;
        }

        ClientCall({
            funcion: "crear_empresa",
            args: [nombreRefugio],
            soloLectura: false
        });
    };

    return (
        <div className="hero-section">
            <h1 className="hero-title">Crear Refugio de Animales</h1>
            <p className="hero-subtitle">
                Para comenzar, crea tu refugio de animales en la blockchain
            </p>
            
            <form onSubmit={crearRefugio} style={{maxWidth: '400px', margin: '0 auto'}}>
                <div className="form-group">
                    <label className="form-label">Nombre del Refugio</label>
                    <input 
                        type="text" 
                        placeholder="Ej: Refugio Amor Animal"
                        className="form-input"
                        value={nombreRefugio}
                        onChange={(e) => setNombreRefugio(e.target.value)}
                        disabled={estado}
                    />
                </div>
                
                <button 
                    type="submit" 
                    className="btn-primary"
                    disabled={estado || !nombreRefugio.trim()}
                >
                    {estado ? "Creando Refugio..." : "Crear Refugio"}
                </button>
            </form>
        </div>
    );
}
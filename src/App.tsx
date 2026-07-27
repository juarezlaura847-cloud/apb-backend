import React, { useEffect, useMemo, useState } from 'react';
import './styles.css';
import type { Equipo, EquipoEstado } from './types';

type EquipoForm = {
  nombreEquipo: string;
  marca: string;
  hospital: string;
  estado: EquipoEstado;
  falla: string;
  observaciones: string;
};

const initialForm: EquipoForm = {
  nombreEquipo: '',
  marca: '',
  hospital: '',
  estado: 'recepcion',
  falla: '',
  observaciones: ''
};

export default function App() {
  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const [form, setForm] = useState<EquipoForm>(initialForm);
  const [status, setStatus] = useState('Cargando...');
  const [loading, setLoading] = useState(true);

  const totalActivos = useMemo(() => equipos.filter((eq) => eq.estado !== 'entregado').length, [equipos]);

  const persistLocal = (next: Equipo[]) => {
    setEquipos(next);
    localStorage.setItem('apb_local_equipos', JSON.stringify(next));
  };

  const syncToBackend = async (next: Equipo[]) => {
    try {
      await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apb_equipos: next, updatedAt: Date.now() })
      });
    } catch (error) {
      console.warn('No se pudo sincronizar con el backend', error);
    }
  };

  const loadData = async () => {
    setLoading(true);
    setStatus('Cargando datos...');

    try {
      const response = await fetch('/api/data');
      if (!response.ok) throw new Error('No se pudo cargar');

      const data = await response.json();
      const list = Array.isArray(data.apb_equipos)
        ? data.apb_equipos
        : Array.isArray(data)
          ? data
          : [];

      const mapped: Equipo[] = list.map((item: any, index: number) => ({
        id: String(item.id ?? `eq-${Date.now()}-${index}`),
        nombreEquipo: item.nombreEquipo || item.nombre || 'Sin nombre',
        numeroSerie: item.numeroSerie || item.numero_serie || '',
        fechaLlegada: item.fechaLlegada || new Date().toISOString().slice(0, 10),
        fechaInicioRevision: item.fechaInicioRevision || null,
        fechaTermino: item.fechaTermino || null,
        estado: (item.estado || 'recepcion') as EquipoEstado,
        ubicacion: item.ubicacion || 'planta_baja',
        falla: item.falla || item.fallaReportada || 'Sin falla reportada',
        accesorios: item.accesorios || '',
        colaborador: item.colaborador || '',
        recibidoPor: item.recibidoPor || '',
        hospital: item.hospital || '',
        observaciones: item.observaciones || '',
        costoServicio: Number(item.costoServicio || 0),
        cobrado: Boolean(item.cobrado),
        marca: item.marca || ''
      }));

      persistLocal(mapped);
      setStatus('Conectado al backend');
    } catch (error) {
      const saved = localStorage.getItem('apb_local_equipos');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          persistLocal(parsed);
        } catch {
          persistLocal([]);
        }
      }
      setStatus('Usando almacenamiento local');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const nuevo: Equipo = {
      id: `eq-${Date.now()}`,
      nombreEquipo: form.nombreEquipo.trim() || 'Equipo nuevo',
      numeroSerie: '',
      fechaLlegada: new Date().toISOString().slice(0, 10),
      fechaInicioRevision: null,
      fechaTermino: null,
      estado: form.estado,
      ubicacion: 'planta_baja',
      falla: form.falla.trim() || 'Sin falla reportada',
      accesorios: '',
      colaborador: '',
      recibidoPor: '',
      hospital: form.hospital.trim(),
      observaciones: form.observaciones.trim(),
      costoServicio: 0,
      cobrado: false,
      marca: form.marca.trim()
    };

    const next = [nuevo, ...equipos];
    persistLocal(next);
    await syncToBackend(next);
    setForm(initialForm);
    setStatus('Equipo agregado correctamente');
  };

  const handleDelete = async (id: string) => {
    const next = equipos.filter((eq) => eq.id !== id);
    persistLocal(next);
    await syncToBackend(next);
    setStatus('Equipo eliminado');
  };

  return (
    <div className="app-shell">
      <header className="hero-card">
        <div>
          <p className="eyebrow">APB Intelligence</p>
          <h1>Panel de control operativo</h1>
          <p>Tu app ya está conectada al backend y lista para registrar equipos y seguir estados.</p>
        </div>
        <div className="status-pill">{status}</div>
      </header>

      <main className="dashboard-grid">
        <section className="card">
          <h2>Agregar equipo</h2>
          <form onSubmit={handleSubmit} className="form-grid">
            <input value={form.nombreEquipo} onChange={(e) => setForm({ ...form, nombreEquipo: e.target.value })} placeholder="Nombre del equipo" />
            <input value={form.marca} onChange={(e) => setForm({ ...form, marca: e.target.value })} placeholder="Marca" />
            <input value={form.hospital} onChange={(e) => setForm({ ...form, hospital: e.target.value })} placeholder="Hospital" />
            <select value={form.estado} onChange={(e) => setForm({ ...form, estado: e.target.value as EquipoEstado })}>
              <option value="recepcion">Recepción</option>
              <option value="espera">Espera</option>
              <option value="terminado">Terminado</option>
              <option value="entregado">Entregado</option>
            </select>
            <textarea value={form.falla} onChange={(e) => setForm({ ...form, falla: e.target.value })} placeholder="Falla reportada" rows={3} />
            <textarea value={form.observaciones} onChange={(e) => setForm({ ...form, observaciones: e.target.value })} placeholder="Observaciones" rows={2} />
            <button type="submit">Guardar equipo</button>
          </form>
        </section>

        <section className="card">
          <div className="card-header">
            <h2>Equipos registrados</h2>
            <span>{totalActivos} activos</span>
          </div>

          {loading ? (
            <p className="empty">Cargando...</p>
          ) : equipos.length === 0 ? (
            <p className="empty">Aún no hay equipos registrados.</p>
          ) : (
            <div className="equipos-list">
              {equipos.map((equipo) => (
                <article key={equipo.id} className="equipment-item">
                  <div>
                    <strong>{equipo.nombreEquipo}</strong>
                    <p>{equipo.hospital}</p>
                    <small>{equipo.falla}</small>
                  </div>
                  <div className="equipment-actions">
                    <span className="chip">{equipo.estado}</span>
                    <button onClick={() => handleDelete(equipo.id)}>Eliminar</button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

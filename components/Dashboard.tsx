import React from 'react';
import type { Equipo, EquipoEstado, PlantaUbicacion } from '../types';

type DashboardProps = {
  equipos: Equipo[];
  onAddEquipment: () => void;
  onEditEquipment: (equipo: Equipo) => void;
  onDeleteEquipment: (id: string) => void;
  onQuickStatusChange: (id: string, nextStatus: EquipoEstado) => void;
  onQuickLocationChange: (id: string, nextLocation: PlantaUbicacion) => void;
  onQuickPaymentToggle: (id: string) => void;
  onShowQr: (equipo: Equipo) => void;
};

export default function Dashboard({ equipos, onAddEquipment, onEditEquipment, onDeleteEquipment, onQuickStatusChange, onQuickLocationChange, onQuickPaymentToggle, onShowQr }: DashboardProps) {
  return (
    <section className="bg-white rounded-3xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Seguimiento de equipos</h2>
        <button onClick={onAddEquipment} className="rounded-full bg-slate-900 text-white px-4 py-2 text-sm">Agregar equipo</button>
      </div>
      {equipos.length === 0 ? (
        <p className="text-slate-500">No hay equipos cargados.</p>
      ) : (
        <div className="space-y-3">
          {equipos.map((equipo) => (
            <article key={equipo.id} className="border border-slate-200 rounded-2xl p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-semibold">{equipo.nombreEquipo}</p>
                  <p className="text-sm text-slate-500">{equipo.hospital}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => onShowQr(equipo)} className="text-blue-600 text-sm">QR</button>
                  <button onClick={() => onEditEquipment(equipo)} className="text-amber-700 text-sm">Editar</button>
                  <button onClick={() => onDeleteEquipment(equipo.id)} className="text-red-600 text-sm">Eliminar</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}}

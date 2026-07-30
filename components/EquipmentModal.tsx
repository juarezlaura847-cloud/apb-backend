import React from 'react';
import type { Equipo } from '../types';

type EquipmentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (equipo: Omit<Equipo, 'id'> & { id?: string }) => void;
  equipoToEdit: Equipo | null;
  colaboradores: string[];
  recibidos: string[];
};

export default function EquipmentModal({ isOpen, onClose, onSave, equipoToEdit, colaboradores, recibidos }: EquipmentModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 w-full max-w-xl">
        <h2 className="text-xl font-bold mb-3">{equipoToEdit ? 'Editar equipo' : 'Nuevo equipo'}</h2>
        <p className="text-sm text-slate-600">Formulario simplificado de ejemplo.</p>
        <div className="mt-4 flex justify-end gap-2">
          <button onClick={onClose} className="rounded-xl border px-4 py-2 text-sm">Cerrar</button>
          <button type="button" onClick={() => onSave({
            nombreEquipo: equipoToEdit?.nombreEquipo || 'Equipo ejemplo',
            numeroSerie: equipoToEdit?.numeroSerie || '000',
            fechaLlegada: equipoToEdit?.fechaLlegada || new Date().toISOString().slice(0, 10),
            fechaInicioRevision: equipoToEdit?.fechaInicioRevision || null,
            fechaTermino: equipoToEdit?.fechaTermino || null,
            estado: equipoToEdit?.estado || 'recepcion',
            ubicacion: equipoToEdit?.ubicacion || 'planta_baja',
            falla: equipoToEdit?.falla || 'Sin falla',
            accesorios: equipoToEdit?.accesorios || '',
            colaborador: equipoToEdit?.colaborador || colaboradores[0] || '',
            recibidoPor: equipoToEdit?.recibidoPor || recibidos[0] || '',
            hospital: equipoToEdit?.hospital || '',
            observaciones: equipoToEdit?.observaciones || '',
            costoServicio: equipoToEdit?.costoServicio || 0,
            cobrado: equipoToEdit?.cobrado || false,
            marca: equipoToEdit?.marca || ''
          })} className="rounded-xl bg-slate-900 text-white px-4 py-2 text-sm">Guardar</button>
        </div>
      </div>
    </div>
  );
}}

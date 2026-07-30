import React from 'react';
import type { Equipo } from '../types';

type StatsViewProps = {
  equipos: Equipo[];
};

export default function StatsView({ equipos }: StatsViewProps) {
  return (
    <section className="bg-white rounded-3xl p-6 shadow-sm">
      <h2 className="text-xl font-bold mb-3">Estadísticas</h2>
      <p className="text-slate-600">Equipos totales: {equipos.length}</p>
    </section>
  );
}}

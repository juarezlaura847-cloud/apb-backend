import React from 'react';
import type { EquipoEstado, PlantaUbicacion } from '../types';

type HeaderProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isUnlocked: boolean;
  lockFinances: () => void;
  totalActiveCount: number;
  totalDelayedCount: number;
  isConfigUnlocked: boolean;
  lockConfig: () => void;
  isOnline: boolean;
};

export default function Header({ activeTab, setActiveTab, isUnlocked, lockFinances, totalActiveCount, totalDelayedCount, isConfigUnlocked, lockConfig, isOnline }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm rounded-2xl p-4 mb-6 flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-500">APB Intelligence</p>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard de Equipos</h1>
        </div>
        <div className="flex items-center gap-3 text-sm text-slate-600">
          <span>{isOnline ? 'Online' : 'Offline'}</span>
          <span>{totalActiveCount} activos</span>
          <span>{totalDelayedCount} retrasados</span>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {['seguimiento', 'showroom', 'estadisticas', 'ubicacion', 'espera', 'finanzas', 'config'].map((tab) => (
          <button
            key={tab}
            type="button"
            className={`rounded-full px-4 py-2 text-xs font-semibold ${activeTab === tab ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        <button onClick={lockFinances} className="rounded-full bg-slate-100 px-3 py-2 text-sm">{isUnlocked ? 'Bloquear Finanzas' : 'Finanzas cerradas'}</button>
        <button onClick={lockConfig} className="rounded-full bg-slate-100 px-3 py-2 text-sm">{isConfigUnlocked ? 'Bloquear Config' : 'Config cerrada'}</button>
      </div>
    </header>
  );
}}

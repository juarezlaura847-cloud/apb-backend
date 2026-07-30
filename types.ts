export type EquipoEstado = 'recepcion' | 'espera' | 'revision' | 'prueba' | 'terminado' | 'entregado';

export type PlantaUbicacion = 'planta_alta' | 'planta_baja';

export interface Equipo {
  id: string;
  nombreEquipo: string;
  numeroSerie: string;
  fechaLlegada: string;
  fechaInicioRevision?: string | null;
  fechaTermino: string | null;
  estado: EquipoEstado;
  ubicacion: PlantaUbicacion;
  falla: string;
  accesorios: string;
  colaborador: string;
  recibidoPor: string;
  hospital: string;
  observaciones: string;
  costoServicio: number;
  cobrado: boolean;
  marca?: string;
}

export type ShowroomEstado = 'disponible' | 'vendido' | 'prestado';

export interface ShowroomEquipo {
  id: string;
  nombreEquipo: string;
  marca: string;
  modelo?: string;
  numeroSerie: string;
  precioDistribuidor: number;
  precioPublico: number;
  accesorios: string;
  fichaTecnicaUrl: string;
  vendidoA: string;
  vendido: boolean;
  fechaVenta?: string;
  prestadoA?: string;
  fechaPrestamo?: string;
  estado?: ShowroomEstado;
  fotos: string[];
  observaciones?: string;
}

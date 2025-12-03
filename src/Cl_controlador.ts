import Cl_mDCYT from "./Cl_mDCYT.js";
import Cl_vDCYT from "./Cl_vDCYT.js";
import Cl_mAporte, { iAporte } from "./Cl_mAporte.js";
import { opcionFicha } from "./tools/core.tools.js";

export default class Cl_controlador {
  public modelo: Cl_mDCYT;
  public vista: Cl_vDCYT;

  constructor(modelo: Cl_mDCYT, vista: Cl_vDCYT) {
    this.modelo = modelo;
    this.vista = vista;
  }

  // --- CRUD ---
  addAporte({
    dtAporte,
    callback,
  }: {
    dtAporte: iAporte;
    callback: (error: string | false) => void;
  }): void {
    this.modelo.addAporte({ dtAporte, callback });
  }

  editAporte({
    dtAporte,
    callback,
  }: {
    dtAporte: iAporte;
    callback: (error: string | boolean) => void;
  }): void {
    this.modelo.editAporte({ dtAporte, callback });
  }

  deleteAporte({
    idAporte,
    callback,
  }: {
    idAporte: string;
    callback: (error: string | boolean) => void;
  }): void {
    this.modelo.deleteAporte({ idAporte, callback });
  }

  // --- CONSULTAS ---
  aporte(idAporte: string): Cl_mAporte | null {
    return this.modelo.buscarAporte(idAporte);
  }

  // --- CORRECCIÓN DE ORDENAMIENTO ---
  get dtAportes(): iAporte[] {
    let dtAportes = this.modelo.dtAportes();

    dtAportes.sort((a, b) => {
      // 1. PRIMER CRITERIO: ID (Numérico)
      // Usamos { numeric: true } para que ordene "1, 2, 10" y no "1, 10, 2"
      const comparacionId = a.idAporte.localeCompare(b.idAporte, undefined, { numeric: true });
      
      // Si las IDs son diferentes, retornamos el resultado numérico
      if (comparacionId !== 0) {
        return comparacionId;
      }

      // 2. SEGUNDO CRITERIO: Tipo (Efectivo antes que Especie)
      if (a.tipo === "Efectivo" && b.tipo === "Especie") return -1; // Efectivo gana (va primero)
      if (a.tipo === "Especie" && b.tipo === "Efectivo") return 1;  // Especie pierde (va después)

      // Si todo es igual
      return 0;
    });
    return dtAportes;
  }

  activarVista({
    vista,
    opcion,
    objeto,
  }: {
    vista: string;
    opcion?: opcionFicha;
    objeto?: Cl_mAporte;
  }): void {
    this.vista.activarVista({ vista, opcion, objeto });
  }
}
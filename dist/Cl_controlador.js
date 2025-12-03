export default class Cl_controlador {
    constructor(modelo, vista) {
        this.modelo = modelo;
        this.vista = vista;
    }
    // --- CRUD ---
    addAporte({ dtAporte, callback, }) {
        this.modelo.addAporte({ dtAporte, callback });
    }
    editAporte({ dtAporte, callback, }) {
        this.modelo.editAporte({ dtAporte, callback });
    }
    deleteAporte({ idAporte, callback, }) {
        this.modelo.deleteAporte({ idAporte, callback });
    }
    // --- CONSULTAS ---
    aporte(idAporte) {
        return this.modelo.buscarAporte(idAporte);
    }
    // --- CORRECCIÓN DE ORDENAMIENTO ---
    get dtAportes() {
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
            if (a.tipo === "Efectivo" && b.tipo === "Especie")
                return -1; // Efectivo gana (va primero)
            if (a.tipo === "Especie" && b.tipo === "Efectivo")
                return 1; // Especie pierde (va después)
            // Si todo es igual
            return 0;
        });
        return dtAportes;
    }
    activarVista({ vista, opcion, objeto, }) {
        this.vista.activarVista({ vista, opcion, objeto });
    }
}

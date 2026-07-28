const express = require("express");
const router = express.Router();
const supabase = require("../config/supabase");

// Registrar un equipo
router.post("/", async (req, res) => {
    try {

        const {
            nombre_equipo,
            marca,
            modelo,
            numero_serie,
            hospital,
            falla_reportada,
            estado,
            colaborador_asignado,
            fecha_ingreso,
            fecha_entrega
        } = req.body;

        const { data, error } = await supabase
            .from("equipos")
            .insert([
                {
                    nombre_equipo,
                    marca,
                    modelo,
                    numero_serie,
                    hospital,
                    falla_reportada,
                    estado,
                    colaborador_asignado,
                    fecha_ingreso,
                    fecha_entrega
                }
            ])
            .select();

        if (error) {
            return res.status(500).json(error);
        }

        res.status(201).json(data);

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

module.exports = router;
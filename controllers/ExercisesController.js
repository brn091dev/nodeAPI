'use strict'
import db from '../config/database'

class ExercisesController {
    static identificaciones(req, res){
        var sql = "select id_tipo_identificacion,descripcion from tipos_identificaciones"
        db.all(sql, (err, exercises) => {
            if (err) {
              res.status(500).json({'error': err.message});
              return;
            }
            res.json(exercises)
          });
    }

    static index(req, res){
        var sql = "select ti.descripcion as tipo_identificacion,p.identificacion,p.nombres,p.apellidos,p.email,p.fecha_ingreso from personas p inner join tipos_identificaciones ti on ti.id_tipo_identificacion = p.id_tipo_identificacion"
        db.all(sql, (err, exercises) => {
            if (err) {
              res.status(500).json({'error': err.message});
              return;
            }
            res.json(exercises)
        });
    }

    static store(req, res){
        const { id_tipo_identificacion,identificacion, nombres, apellidos, email, fecha_ingreso} = req.body
        const SQL = 'INSERT INTO personas (id_tipo_identificacion, identificacion, nombres, apellidos, email, fecha_ingreso) VALUES (?,?,?,?,?,?)'
        const params = [id_tipo_identificacion,identificacion, nombres, apellidos, email, fecha_ingreso]        
        db.run(SQL, params, function (err) {
            if (err){
                res.status(500).json({'error': err.message})
                return;
            }
            req.body.id = this.lastID
            res.json({
                'exercise': req.body
            })
        })
    }
}

export default ExercisesController

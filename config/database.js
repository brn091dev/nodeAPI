import sqlite from 'sqlite3'

const DBSOURCE = `db_${process.env.NODE_ENV}.sqlite`

let db = new sqlite.Database(DBSOURCE, (err) => {
    if(err) {
        console.log(err.message)
        throw err
    } else {
        console.log('Connected to SQLite')

        db.run(`CREATE TABLE tipos_identificaciones (
            id_tipo_identificacion INTEGER PRIMARY KEY AUTOINCREMENT,
            codigo text,
            descripcion text
            )`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                var insert = 'INSERT INTO tipos_identificaciones (codigo,descripcion) VALUES (?,?)'
                db.run(insert, ["1","Cédula de ciudadanía"])
                db.run(insert, ["2","Cédula de Extranjería"])                
            }
        });

        //db.run(`DROP TABLE personas`);

        db.run(`CREATE TABLE personas (
            id_persona INTEGER PRIMARY KEY AUTOINCREMENT,
            id_tipo_identificacion text not null, 
            identificacion text, 
            email text not null, 
            nombres text not null,
            apellidos text not null,
            fecha_ingreso text not null,
            foreign key(id_tipo_identificacion) references tipos_identificaciones (id_tipo_identificacion)
            )`,
        (err) => {
            if (err) {
                console.log(err.message)
                //db.run('drop table personas',null,null)
                // Table already created
            }else{
                console.log('Connected insert')
                // Table just created, creating some rows
                var insert = 'INSERT INTO personas (id_tipo_identificacion, identificacion, email, nombres, apellidos,fecha_ingreso) VALUES (?,?,?,?,?,?)'
                db.run(insert, ["1","12345","prueba@correo.com","Sherlock","Holmes","2020-10-09 11:50:47"])
                db.run(insert, ["2","23456","correo@correo.com","Agatha","Christie","2020-10-09 11:41:47"])
                db.run(insert, ["1","34567","gmail@correo.com","JK","Rowling","2020-10-09 10:41:47"])
                db.run(insert, ["1","45678","pombo@correo.com","Rafael","Pombo","2020-10-09 8:41:47"])
                db.run(insert, ["1","56789","blabla@correo.com","Harry","Potter","2020-10-09 5:41:47"])
                db.run(insert, ["2","67890","email@correo.com","Albus","Dumbledore","2020-10-09 8:41:47"])
                db.run(insert, ["1","78901","kansd@correo.com","Albus","Percival","2020-09-09 6:41:47"])
                db.run(insert, ["2","89012","naruto@correo.com","Severus","Snape","2020-08-09 8:41:47"])
                db.run(insert, ["2","90123","deathnote@correo.com","Rinrin","Renacuajo","2020-07-09 4:41:47"])
                db.run(insert, ["1","40412","lol@correo.com","Suan","fonson","2019-10-09 8:41:47"])
                db.run(insert, ["1","21504","jajajaja@correo.com","Reposa","ito","2020-10-09 8:41:47"])
            }
        });
    }
})

export default db
const express = require('express');
var mysql = require('mysql');
const app = express();
const port = 3000;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'Aaron',
    password:"",
    database:"compañia"
})

app.use(express.json());

app.get("/usuario",(res)=>{
db.query("SELECT * FROM usuarios", function (rows){
    res.send(rows)}
    )})


app.post("/ingresar",(req,res)=>{
const {Nombre, Edad, Email} = req.body

if(!Nombre){res.status(500).send("El campo Nombre es obligatorio")}else{

const query = `INSERT INTO usuarios (Nombre,Edad,Email) VALUES (?,?,?)`;
db.query(query, [Nombre,Edad,Email], (err,result)=>{

    if(err){console.log("Error al ingresar datos a la base: " + err.message)
     res.status(500).send("Error al ingresar datos a la base ver consola ")}

     else{console.log("Datos ingresados con exito")
      res.status(200).send("Datos guardados con exito")}
  })}
  })

app.delete("/eliminar/:id",(req,res)=>{
    const userid = req.params.id;
    const query = "DELETE FROM usuarios WHERE ID = ?";

    db.query(query,[userid],(err,result) => {
       if(err){
        console.log("Error al eliminar datos de la base" + err.message)
        return res.status(500).send("Error al eliminar el usuario, ver consola para mas detalles")}
        else{
            if (result.affectedRows > 0) {
                console.log("Usuario eliminado");
                return res.status(200).send("Usuario eliminado con éxito");
            } else {
                console.log("Usuario no encontrado");
                return res.status(404).send("Usuario no encontrado");
            }}
    })
})  

app.listen(port,()=>{
    console.log(`Servidor iniciado ${port}`)
})



//Paquetes
import express from "express";
import {pool} from "./conexion.js"
//variable
const app = express();

//configuraciones
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false })) // envio de post
app.use(express.json()) // envío de post


//Rutas
app.get("/",(req, res)=>{
    res.render("index");
});




app.post("/login", async (req, res)=>{
    try{
        const resultado = await pool.query("SELECT * FROM usuarios WHERE email = $1 and password = $2",
        [req.body.email, req.body.password]);
        if(resultado.rows.length >0){
            res.status(201).json(resultado.rows)
        } else {
            res.sendStatus(400);
        }      
    }catch(err){
        res.sendStatus(500);
    }
    pool.release;
});

app.post("/usuario", async(req,res)=>{
    try{
        await pool.query("insert into usuarios (email, password) values ($1,$2)",
        [req.body.email, req.body.password]);
        res.sendStatus(201);
    }catch(err){
        res.sendStatus(400);
    }
    pool.release;
})

app.get("/getUsuarios", async (req, res)=>{
    try {
      const resultado =  await pool.query("select * from usuarios");
      if(resultado.rows.length > 0){
        res.status(201).json(resultado.rows)
    } else {
        res.sendStatus(400);
    }
    } catch {
        res.sendStatus(500)
    }
    pool.release;
 
  
});




//Servicio
app.listen(3000, ()=>console.log("servidor puerto 3000"));
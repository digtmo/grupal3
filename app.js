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
    console.log(req.body);
    try{
        const resultado = await pool.query("SELECT * FROM usuarios WHERE email = $1 and password = $2",
        [req.body.email, req.body.password]);
        if(resultado.rows.length >0){
            console.log(resultado)
            res.status(201).json(resultado.rows)
        } else {
            console.log(resultado)
            res.sendStatus(400);
        }      
    }catch(err){
        console.log(resultado)
        res.sendStatus(500);
    }
   /*  const resultado = await pool.query("select * from usuarios");
    pool.release;
    //console.log(resultado.rows);
    res.json(resultado.rows); */
});

app.post("/usuario", async(req,res)=>{
    console.log(req.body);
    try{
        await pool.query("insert into usuarios (email, password) values ($1,$2)",
        [req.body.email, req.body.password]);
        res.sendStatus(201);
    }catch(err){
        res.sendStatus(400);
    }
})

app.get("/getUsuarios", async (req, res)=>{
    const resultado = await pool.query("select * from usuarios");
    pool.release;
    //console.log(resultado.rows);
    res.json(resultado.rows);
});




//Servicio
app.listen(3000, ()=>console.log("servidor puerto 3000"));
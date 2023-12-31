const express = require("express");
const path=require("path");
const app = express();
const hbs=require("hbs");

require("./db/conn");
const Register=require("./models/registers");
const { log } = require("console");

const port= process.env.PORT || 4000;

const static_path = path.join(__dirname,"../public");
const templates_path = path.join(__dirname,"../templates/views"); 
const partials_path = path.join(__dirname,"../templates/partials"); 

// console.log(path.join(__dirname));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path))
app.set("view engine", "hbs");
app.set("views", templates_path);
hbs.registerPartials(partials_path);

app.get("/", (req, res)=>  {
    res.render("index")
});

app.get("/register", (req, res)=>  {
    res.render("register")
});

app.post("/register", async(req, res)=>  {
   try {
    // console.log(req.body.username);
    // res.send(req.body.username);

    const registerEmploy= new Register({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })

   const registered= await registerEmploy.save();
   res.status(201).render("index");

   } catch (error) {
    res.status(404).send(error);
   }
});

//login check 
app.get("/login", (req, res)=>  {
    res.render("login");
}); 

app.post("/login", async(req, res)=>  {
    try {
        // res.send(req.body.login);
        const user=req.body.username;
        const password=req.body.password;

        // console.log(`${email} and passowrd is ${password}`);

        //Will give data
       const useremail= await Register.findOne({ username: user });
    //    res.send(useremail);
    //    res.send(useremail.password );
    //    console.log(useremail);

        if (useremail.password ===password) {
            res.status(201).render("index");
        }else{
            res.send("Invalid Login Details"); 
        }
    }catch (error) {
        res.status(404).send("Invalid Login Details");
       }
    });

app.listen(port, ()=> {
console.log(`server running on ${port}`);
})
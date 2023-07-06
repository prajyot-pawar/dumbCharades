import express from  "express"
import mysql from  "mysql"
import cors from  "cors"

const app = express()

const db = mysql.createConnection({
     host : "localhost",
     user : "root",
     password : "",
     database : "test2"
})

// const db = mysql.createConnection({
//      host : "sql12.freesqldatabase.com",
//      user : "sql12630135",
//      password : "bSMLSsK7n7",
//      password : "bSMLSsK7n7",
//      database : "sql12630135"
// })

app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
     res.json("Hello welcome to backend")
})

app.get ("/user",(req,res)=>{
     const q = "SELECT * FROM users"
     db.query(q,(err,data)=>{
          if(err) return res.json(err)
          return res.json(data)
     })
})


app.get ("/movie",(req,res)=>{
     const q = "SELECT * FROM movies"
     db.query(q,(err,data)=>{
          if(err) return res.json(err)
          return res.json(data)
     })
})

app.get("/movie/count", (req, res) => {
     const q = "SELECT COUNT(*) as total FROM movies";
     const getLastIdQuery = "SELECT id FROM movies as totalItems ORDER BY id DESC LIMIT 1";

   
     db.query(getLastIdQuery, (err, lastIdData) => {
       if (err) {
         return res.json(err);
       } else {
          const lastId = lastIdData.length > 0 ? lastIdData[0].id : 0;
      const totalItems = lastId;
      console.log(totalItems);

      return res.json(totalItems );
       }
     });
   });
   

app.get("/movie/:movieId",(req,res)=>{
     var id = req.params.movieId;
     console.log(id);
     const q = "SELECT movie_name FROM movies WHERE id = ?"

     
     db.query(q,[id],(err,data)=>{
          if(err) return res.json(err);
          if (data.length === 0) {
               return res.json("No movie found with the given ID.");
             } else {
               const movieName = data[0].movie_name;
               return res.json( movieName);
             }
     })
})





app.post("/user", (req,res)=>{
     const q = "INSERT INTO users(`userid`,`fname`,`sname`,`tag`,`imageUrl`, `friendslist`,`email`, `gamer_id`) VALUES (?)"
     // const values = ["userId2", "Prashant", "Nane", "expert", "https://picsum.photos/200/300"]
     const values = [
          req.body.userid,
          req.body.fname,
          req.body.sname,
          req.body.tag,
          req.body.imageUrl,
          req.body.friendslist,
          req.body.email,
          req.body.gamer_id,
     ]

     db.query(q,[values],(err,data)=>{
          if(err) return res.json(err)
          return res.json("User have been added successfully")
     })
})

app.delete("/user/:userId",(req,res)=>{
     var userid = req.params.userId;
     const q = "DELETE FROM users WHERE userid = ?"
     
     db.query(q,[userid],(err,data)=>{
          if(err) return res.json(err);
          return res.json("User have been Deleted successfully");
     })
})


app.get("/user/:Email",(req,res)=>{
     var email =  req.params.Email;
     console.log(email);
     // const q = "SELECT userid FROM users WHERE email = ?"
     
  const q = "SELECT COUNT(*) as count, gamer_id , tag FROM users WHERE email = ?";


  db.query(q,[email],(err,data)=>{
     if(err) return res.json(err);     
    const count = data[0].count;
    const userExists = count > 0;    
    const gamerId = userExists ? data[0].gamer_id : null;
    const tag = userExists ? data[0].tag : null;
    return res.json({ exists: userExists, gamerId: gamerId , tag: tag });
     // if (data.length === 0) {
     //      return res.json("No movie found with the given ID.");
     //    } else {
     //      const users = data[2].userid;
     //      return res.json( users);
     //    }
})
})

app.put("/user/:email/gamer_id/tag", async (req, res) => {
     const email = req.params.email;
     const newGamerId = req.body.gamer_id;
     const newTag = req.body.tag;
   
     const q = "UPDATE users SET gamer_id = ? WHERE email = ?";
     const q2 = "UPDATE users SET tag = ? WHERE email = ?";
     
     await new Promise((resolve, reject) => {
          db.query(q, [newGamerId, email], (err, data) => {
            if (err) return reject(err);
            resolve();
          });
        });
    
        await new Promise((resolve, reject) => {
          db.query(q2, [newTag, email], (err, data) => {
            if (err) return reject(err);
            resolve();
          });
          
    res.json("Gamer ID and Tag updated successfully");
        });
        
   });


app.listen(8800,()=>{
console.log("connected to backend!3")
}
)
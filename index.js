import express from "express";
import axios from "axios";
import bodyParser from "body-parser";


const PORT = 3000;
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
// try{
//     const response = await axios.get("https://opentdb.com/api.php",{params: {
//         "amount": 1,
//         "category": 25,
//         "difficulty": "medium",
//         "type": "multiple"
//     }});
//     console.log(response.data);
//     const result = JSON.stringify(response.data);
// }
// catch(error){
//     console.log(JSON.stringify(error.response.data));
// }


app.get("/", (req, res)=>{
    res.render(
        "index.ejs"
    );
})

app.post("/trivia", async (req, res) =>{
    try{
        const response = await axios.get("https://opentdb.com/api.php",{params: {
            "amount": 1,
            "category": req.body.category,
            "difficulty": req.body.diff,
            "type": "boolean"
        }});
        
        const result = response.data.results;
        console.log(result[0]);
        res.render("index.ejs", {question: result[0].question, answer: result[0].correct_answer});
    }
    catch(error){
        res.render("index.ejs", {question: "No questions for this difficulty & category."});
    }
})

app.listen(PORT, () =>{
    console.log("Server is now hosted on port: " + PORT);
})
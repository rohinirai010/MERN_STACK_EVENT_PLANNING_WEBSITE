import app from "./app.js";

app.listen(process.env.PORT, ()=>{
    console.log(`Listening at port ${process.env.PORT}`);
})

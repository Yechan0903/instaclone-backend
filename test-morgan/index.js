import express from 'express';
import morgan from 'morgan';
const app=express();
app.listen(3000,()=>{
console.log('Listening on port 3000...')
})
import express, { urlencoded } from 'express'
import cors from 'cors'
import path from 'path'
import mongoose from 'mongoose'
import router from './router'

//Conection database
mongoose.Promise = global.Promise;
const dbUrl = "mongodb://localhost:27017/databaseoppa";
mongoose.connect(
    dbUrl , {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(mongoose => console.log("Connect database 27017"))
.catch(err => console.log(err));

const app =  express()
app.use(cors());

app.use(express.json());
app.use(urlencoded({extends:true}));
app.use(express.static(path.join(__dirname,'public')));
app.use('/api/',router);

app.set('port',process.env.PORT || 3000);

app.listen(app.get('port'), ()=>{
    console.log("Se ejecuto correcto en el port 3000")
})
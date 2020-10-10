import express from 'express'
import bodyParser from 'body-parser'
import routes from './config/routes'
import config from './config/config'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import exercisesController from './controllers/ExercisesController'

const app = express()
const corsOptions = {
    origin: '*'
}

app.set('llave', config.llave);

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/api',cors(corsOptions))

app.get('/', (req, res) =>  res.send('Welcome'))    

const server = app.listen(process.env.PORT || 8000, () => {
    console.log(`http://localhost:${server.address().port}`)
})




app.post('/api/autenticar', (req, res) => {
    console.log(req.body.usuario)
    const payload = {
        check:  true
        };
            const token = jwt.sign(payload, app.get('llave'), {
            expiresIn: 1440
        });
        res.json({
            mensaje: 'Autenticación correcta',
            token: token}
        )
})

const rutasProtegidas = express.Router(); 
rutasProtegidas.use((req, res, next) => {
    const token = req.headers['apikey'];
 
    if (token) {
      jwt.verify(token, app.get('llave'), (err, decoded) => {      
        if (err) {
          return res.json({ mensaje: 'Token inválida' });    
        } else {
          req.decoded = decoded;    
          next();
        }
      });
    } else {
      res.send({ 
          mensaje: 'Token no proveída.' 
      });
    }
 });

app.get('/api/identificaciones',rutasProtegidas,exercisesController.identificaciones)

app.get('/api/exercises',rutasProtegidas,exercisesController.index)

app.post('/api/iperson',rutasProtegidas,exercisesController.store)

export default app
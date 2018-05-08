const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex')
const image = require('./controllers/image')
const register = require('./controllers/register')
const profile = require('./controllers/profile')
const bcrypt = require('bcrypt-nodejs');
const postgres = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'deadspaceoo',
    database : 'brainbase'
  }
});

const app = express();

app.use(bodyParser.json());
app.use(cors()); 
app.get('/', (req, res)=> {
	res.send(database.users);
})
app.post('/signin', (req, res)=> { 
	postgres.select('email', 'hash').from('login')
	.where('email', '=', req.body.email )
	.then(data => {
		const isValid = bcrypt.compareSync(req.body.password, data[0].hash);

		if (isValid) {
			return postgres.select('*').from('users')
			.where('email', '=', req.body.email)
			.then(user => {
				res.json(user[0])
			})
			.catch(err => res.status(400).json('unable to get user'))
		}else {
			res.status(400).json('Wrong Credentials')
		}
	})
	.catch(err => res.status(400).json('Wrong Credentials'))
})

app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, postgres)})
app.put('/image', (req, res) => {image.handleImage(req, res, postgres)})
app.post('/register', (req, res) => { register.handleRegister(req, res, postgres, bcrypt) })
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})
app.listen(3000, ()=> {
	console.log('app is running on port 3000');
})

/*

API endpoints --> 

/--> res = this is working
/sign in --> POST = success /fail
/resgister --> POST = user
/profile/:user ID(optional parametet, so each user have homescreen) --> GET = user 
/image --> PUT--> user 


*/
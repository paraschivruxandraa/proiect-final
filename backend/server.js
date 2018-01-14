var express = require("express")
var bodyParser = require('body-parser')
var Sequelize = require('sequelize')
//var nodeadmin = require("nodeadmin")

//conectare la baza de date
var sequelize = new Sequelize('FormulareInregistrare','root','',{
    dialect:'mysql',
    host:'localhost',
   
})

sequelize.authenticate().then(function(){
    console.log('Success')
})



const saves = sequelize.define('save',
{
    idsaves:Sequelize.INTEGER,
    denumireLocatie:Sequelize.STRING,
    denumireServiciu:Sequelize.STRING,
    denumireFurnizor:Sequelize.STRING, 
    data:Sequelize.STRING,
    ora:Sequelize.INTEGER,

})  

const Feedback = sequelize.define('feedback',
{
    
    idFeedback:Sequelize.INTEGER,
    descriere:Sequelize.STRING,
    idsaves:Sequelize.INTEGER,
    
})

saves.hasOne(Feedback,{foreignKey:'cheie_feedback'})

const app = express()
var router = express.Router();
router.use(bodyParser.json() );       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use('/', router);
//app.use(express.json())
//app.use(express.urlencoded())
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.header("Access-Control-Allow-Methods","POST, GET, OPTIONS, PUT, DELETE")
    next()
})
app.use(express.static('../frontend/build'))

//creare tabele
app.get('/creare', (req, res) => {
  sequelize.sync({force : true})
    .then(() => res.status(201).send('tabelele au fost create cu succes'))
    .catch(() => res.status(500).send('EROARE'))
})


//find
//afiseaza toate rezultatele din tabela locatii
app.get('/feedback', function(request, response) {
    Feedback.findAll().then(function(feedback){
        response.status(200).send(feedback)
    })
})

// selectam o locatie dupa id 
app.get('/feedback/:id', function(request, response) {
    Feedback.findOne({where: {id:request.params.id}}).then(function(feedback) {
        if(feedback) {
            response.status(200).send(feedback)
        } else {
            response.status(404).send()
        }
    })
})

//creare inregistrare noua in tabela Feedback
app.post('/feedback', function(req,res) 
{
  Feedback.create(req.body).then(function(feedback) {
     res.status(201).send(feedback)
  })
  .catch(() => res.status(500).send('error '))
})

 app.put('/feedback/:id', function(request, response){
    Feedback.findById(request.params.id).then(function(feedback){
         if(feedback){
             feedback.update(request.body).then(function(feedback){
                 response.status(201).send(feedback)
             }).catch(function(error){
                 response.status(200).send(error)
             })
         }else{
             response.status(404).send('Not found')
         }
     })
 })
 
 app.delete('/feedback/:id', (req,res)=>{
    Feedback.findById(req.params.id).then(function(feedback){
        if(feedback){
            return feedback.destroy()
        }
        else{
            res.status(404).send("Nu am gasit inregistare!")
        }
    }).then(()=>res.status(201).send('Destroyed')).catch(()=>res.status(500).send("Eroare tabela locatii"))
})




// TABELA salvari 


//afisare rezultate tabela salvare
app.get('saves', (req,res)=>{
    saves.findAll()
    .then((save)=>res.status(200).send(save))
    .catch(() => res.status(500).send('EROARE'))
})

app.get('/saves', function(request, response) {
    saves.findAll().then(
            function(founder) {
                response.status(200).send(founder)
            }
        )
})


// selectam o salvare  dupa id 
app.get('/saves/:id', function(request, response) {
    saves.findOne({where: {id:request.params.id}}).then(function(saves) {
        if(saves) {
            response.status(200).send(saves)
        } else {
            response.status(404).send()
        }
    })
})


//creare inregistrai in tabela salvari
app.post('/saves', function(req, res) {
    saves.create(req.body).then(function(saves){
        res.status(201).send(saves)
    })
     .catch(() => res.status(500).send('error'))
})


app.put('/saves/:id', function(request, response) {
    saves.findById(request.params.id).then(function(saves) {
        if(saves) {
            saves.update(request.body).then(function(saves){ // din body citesc continutul trimis de client
                response.status(201).send(saves)
            }).catch(function(error) {
                response.status(200).send(error)
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})


app.delete('/saves/:id', (req,res)=>{
    saves.findById(req.params.id).then(function(saves){
        if(saves){
             saves.destroy().then(function(){
                 res.status(204).send()
             })
        }
        else{
            res.status(404).send("Nu am gasit inregistare!")
        }
    })
})


app.listen(8081);
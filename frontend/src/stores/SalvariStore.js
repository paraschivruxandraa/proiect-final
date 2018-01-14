import axios from 'axios'

const SERVER = 'http://proiect-final-paraschivruxandra.c9users.io:8081'

//clasa care ma ajuta sa maschez operatiile cu serverul
class SalvariStore{
    
    constructor(ee){
        this.emitter = ee
        this.content = []
    }
    getAll(){
        axios(SERVER + '/saves')
        .then((response) => {
                 this.content = response.data
                 this.emitter.emit('SALVARI_INCARCARE')
            })
            .catch((error) => console.warn(error))
    }
            

    getOne(id){}
    addOne(save){
        axios({
            method : 'post',
            url : SERVER + '/saves',
            headers : {'Content-Type' : 'application/json'},
            data : save
            })
            .then(() => this.getAll())
            .catch((error) => console.warn(error))
    }
    saveOne(id, save){}
    deleteOne(id){}
    
    
    
}

export default SalvariStore
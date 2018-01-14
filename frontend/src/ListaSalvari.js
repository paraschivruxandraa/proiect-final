import React, { Component } from 'react'
import {EventEmitter} from 'fbemitter'
import SalvariStore from './stores/SalvariStore'

const emitter = new EventEmitter()
const store = new SalvariStore(emitter)

const addSave = (save) => {
    store.addOne(save)
    console.log(save);
}


class ListaSalvari extends Component {

    constructor(props){
        super(props)
        this.state = {
            saves : [],
            savesLocatie: '',
            savesServiciu: '',
            savesFurnizor : '',
            savesData: '',
            savesOra: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    componentDidMount(){
        store.getAll()
        emitter.addListener('SALVARI_INCARCARE' , () => {
            this.setState({
                saves: store.content
            })
        })
    }
    handleInputChange(e){
        e.preventDefault()
        let value = e.target.value
        let name = e.target.name
        this.setState({
            [name] : value
        })
    }

    render() {
        return (
            <div>
               
                    <form>
                    
                    
                    <label htmlFor="nume">Locatie </label>
                     <input type="text" onChange={this.handleInputChange} name="savesLocatie" />
                    
                    <label htmlFor="nume">Serviciu</label>
                    <input type="text" onChange={this.handleInputChange} name="savesServiciu" />
                    
                    <label htmlFor="nume">Furnizor serviciu </label>
                    <input type="text" onChange={this.handleInputChange} name="savesFurnizor" />
                
                    <label htmlFor="nume">Data </label>
                    <input type="text" onChange={this.handleInputChange} name="savesData" />
                    
                    <label htmlFor="nume">Ora</label>
                    <input type="text" onChange={this.handleInputChange} name="savesOra" />
                    
                    <label >  -  </label>
                    <input type="button" value="Add" onClick={ 
                        () => addSave({
                        denumireLocatie : this.state.savesLocatie,
                        denumireServiciu : this.state.savesServiciu, 
                        denumireFurnizor: this.state.savesFurnizor,
                        data : this.state.savesData, 
                        ora: this.state.savesOra})} />
                    </form>
                
                
                <h1><strong>Jurnal de Activitati </strong></h1>
        
                <div id="tbdata">
                    <table>
                            <caption> Rezervari </caption> 
                        <thead>
                            <tr>
                                <th> Locatie </th>
                                <th> Serviciu </th>
                                <th> Furnizor </th>
                                <th> Data </th>
                                <th> Ora </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.saves.map((e) =>
                            <tr>
                                <td>
                                {e.denumireLocatie  + ' '}
                                </td>
                                <td>
                                {e.denumireServiciu + ' '}
                                </td>
                                <td>
                                {e.denumireFurnizor + ' '}
                                </td>
                                <td>
                                {e.data+ ' '}
                                </td>
                                <td>
                                {e.ora + ' '}
                                </td>
                    
                            </tr> 
                        )}
                        </tbody>
            
                    </table>
        
                </div>
            </div>
        )
    }
}

export default ListaSalvari

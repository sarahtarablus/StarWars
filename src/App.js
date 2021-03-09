import React, {Component} from 'react';
import Input from './Input.js';
import Table from './Table.js';
import axios from 'axios';
import ButtonPageChange from './ButtonPageChange.js';



class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
     input : '',
     characters: [],
     newCharacters: [],
     isLoaded: false
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.sendSearchRequest = this.sendSearchRequest.bind(this);
    this.changePageCount = this.changePageCount.bind(this);
    this.showPage = this.showPage.bind(this);
    this.searchCharacter = this.searchCharacter.bind(this);
    this.resetInputValue = this.resetInputValue.bind(this);
    
  }

  
  
  componentDidMount () {
    this.showPage(1)
  } 



    
  showPage(value) {
    try {
     const url = `https://swapi.dev/api/people/?page=${value}`
      ;(async () => {
      const page = await axios.get(url).then(res => res.data.results)

       for(const character of page){
         const homeworldURL = character.homeworld
         const newHomeworldURL = homeworldURL.replace("http", "https")
         const homeworldRes = await axios.get(newHomeworldURL).then(res => res.data.name)
         character.homeworld = [homeworldRes]
         if(character.species.length !== 0){
          const speciesURL = character.species;
          const speciesURLstring = speciesURL.toString()
          const newSpeciesURL = speciesURLstring.replace("http", "https")
          const speciesRes = await axios.get(newSpeciesURL).then(res => res.data.name)
          character.species = [speciesRes]
         }else{
           character.species = 'Human'
         }
       }
       this.setState({characters: [...page],
                      isLoaded: true})
      })() 
    } catch (err) {
    console.error(err);
    }
  }



  handleInputChange (e) {
    e.preventDefault();
    this.setState({input: e.target.value}) 
  }


  searchCharacter (e) {
    e.preventDefault();
    if(this.state.input === ''){
      this.showPage(1)
    }else{
      if(this.state.isLoaded){
        this.setState({isLoaded: false})
      }
      this.sendSearchRequest()  
    }
  }




 sendSearchRequest = 
  async () => {
      try{
        const page1 = await axios.get('https://swapi.dev/api/people/?page=1').then(res => res.data.results)
        const page2 = await axios.get('https://swapi.dev/api/people/?page=2').then(res => res.data.results)
        const page3 = await axios.get('https://swapi.dev/api/people/?page=3').then(res => res.data.results)
        const page4 = await axios.get('https://swapi.dev/api/people/?page=4').then(res => res.data.results)
        const page5 = await axios.get('https://swapi.dev/api/people/?page=5').then(res => res.data.results)
        const page6 = await axios.get('https://swapi.dev/api/people/?page=6').then(res => res.data.results)
        const page7 = await axios.get('https://swapi.dev/api/people/?page=7').then(res => res.data.results)
        const page8 = await axios.get('https://swapi.dev/api/people/?page=8').then(res => res.data.results)
        const page9 = await axios.get('https://swapi.dev/api/people/?page=9').then(res => res.data.results)
        
    
        const pages = page1.concat(page2, page3, page4, page5, page6, page7, page8, page9)
  
  
        for(const character of pages) {
          const homeworldURL = character.homeworld
          const newHomeworldURL = homeworldURL.replace("http", "https")
          const homeworldRes = await axios.get(newHomeworldURL).then(res => res.data.name)
          character.homeworld = [homeworldRes]
          if(character.species.length !== 0){
            const speciesURL = character.species;
            const speciesURLstring = speciesURL.toString()
            const newSpeciesURL = speciesURLstring.replace("http", "https")
            const speciesRes = await axios.get(newSpeciesURL).then(res => res.data.name)
            character.species = [speciesRes]
          }else{
            character.species = 'Human'
          }
           
          if(character.name.toLowerCase().startsWith((this.state.input).toLowerCase()) == true && this.state.input !== ''){
          let newCharacters = this.state.newCharacters;
          newCharacters.unshift(character);
          if(newCharacters.length > 10){
            newCharacters.pop()
          }
          this.setState({characters: [...newCharacters]})
        }
      }   
        this.setState({isLoaded: true})
      }catch(err) {
        console.error(err)
      }
 }




  changePageCount(e) {
    e.preventDefault();
    if(this.state.isLoaded){
      this.setState({isLoaded: false})
    }
    this.showPage(e.target.value)
  }




  resetInputValue (e) {
   e.preventDefault();
   e.target.value = ''
  }




  render () {
    const {isLoaded} = this.state;
     return (
      <div>
        <div className='text-warning mt-5 w-75 border border-white rounded mx-auto'>
          <h1 className='d-flex justify-content-center display-3'>STAR WARS</h1>
          <form className='form'>
           <Input searchInput={this.state.input} handleInputChange={this.handleInputChange} resetInputValue={this.resetInputValue}/>
           <div className='d-flex justify-content-center m-3'>
             <button onClick={this.searchCharacter} className='btn btn-warning text-white'>Search</button>
            </div>
          </form>
        </div>
        <div className='text-white'>
          {isLoaded ? <Table characters={this.state.characters}
        /> : <div className='d-flex justify-content-center m-5'>Loading...</div>} 
       </div>
       <div>
         <ButtonPageChange changePageCount={this.changePageCount} />
       </div>
      </div>
    )
  }
 }  

  
export default App;
import React, {Component} from 'react';
import Input from './Input.js';
import SearchButton from './SearchButton.js';
import Table from './Table.js';
import axios from 'axios';
import ButtonPageChange from './ButtonPageChange.js';



class StarWarsPage extends Component {
  constructor (props) {
    super(props);

    this.state = {
     input : '',
     characters: [],
     newCharacters: []
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.changePageCount = this.changePageCount.bind(this);
    this.showPage = this.showPage.bind(this);
    this.searchCharacter = this.searchCharacter.bind(this);
    this.resetInputValue = this.resetInputValue.bind(this);
  }

  
  
  componentDidMount () {
    this.showPage(1)
  } 


 
  getNewCharacters = async () => {
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

      for(const character of pages){
        const homeworldURL = character.homeworld
        const homeworldRes = await axios.get(homeworldURL).then(res => res.data.name)
        character.homeworld = [homeworldRes]
        if(character.species.length !== 0){
         const speciesURL = character.species;
         const speciesRes = await axios.get(speciesURL).then(res => res.data.name)
         character.species = [speciesRes]
        }else{
          character.species = 'Human'
        }
        
        if(character.name.toLowerCase().indexOf(this.state.input) !== -1){
              console.log(character)
              let char = this.state.newCharacters;
              char.unshift(character)
              if(char.length > 10){
                char.pop()
              }
              this.setState({newCharacters : char,
                            characters : this.state.newCharacters})
              return;     
        }  
      }
    } catch(err) {
      console.error(err)
    }
  } 




  searchCharacter (e) {
    e.preventDefault();
    let input = this.state.input;
    if(input === ''){
      console.log('ops')
    }else{
      this.getNewCharacters()
    }
  }
    
  

  handleInputChange (e) {
    e.preventDefault();
    let inputValue = e.target.value;
    this.setState({
      input : inputValue 
    })
  }



  resetInputValue (e) {
   e.preventDefault();
   e.target.value = ''
  }



  changePageCount(e) {
    e.preventDefault();
    this.showPage(e.target.value)
  }


  
  showPage(value) {
    try {
     const url = `https://swapi.dev/api/people/?page=${value}`
      ;(async () => {
      const page = await axios.get(url).then(res => res.data.results)

       for(const character of page){
         const homeworldURL = character.homeworld
         const homeworldRes = await axios.get(homeworldURL).then(res => res.data.name)
         character.homeworld = [homeworldRes]
         if(character.species.length !== 0){
          const speciesURL = character.species;
          const speciesRes = await axios.get(speciesURL).then(res => res.data.name)
          character.species = [speciesRes]
         }else{
           character.species = 'Human'
         }
       }
       this.setState({characters: [...page]})
      })() 
    } catch (err) {
    console.error(err);
    }
  }



  render () {
     return (
      <div>
        <div className='text-warning mt-5 w-75 border border-white rounded mx-auto'>
          <h1 className='d-flex justify-content-center display-3'>STAR WARS</h1>
          <form className='form' onSubmit={this.searchCharacter}>
           <Input onChange={this.handleInputChange} onClick={this.resetInputValue}/>
           <SearchButton />
          </form>
        </div>
        <div className='text-white'>
         <Table data={this.state.characters.map((char, i) => {
            return(
              <tr key={i}>
                <td>{char.name}</td>
                <td>{char.birth_year}</td>
                <td>{char.height}</td>
                <td>{char.mass}</td>
                <td>{char.homeworld}</td>
                <td>{char.species}</td>
              </tr>
         )})}/>
       </div>
       <div>
         <ButtonPageChange onClick={this.changePageCount} ></ButtonPageChange>
       </div>
      </div>
    )
  }
 }  



export default StarWarsPage;
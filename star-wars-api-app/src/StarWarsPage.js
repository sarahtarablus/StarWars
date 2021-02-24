import React, {Component} from 'react';
import Input from './Input.js';
import SearchButton from './SearchButton.js';
import Table from './Table.js';
import axios from 'axios';



class StarWarsPage extends Component {
  constructor (props) {
    super(props);

    this.state = {
     input : '',
     characters: [],
     newCharacters: [],
     inputClear: false
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.searchCharacter = this.searchCharacter.bind(this);
    this.limitNumberOfCharactersDisplayed = this.limitNumberOfCharactersDisplayed.bind(this);
    //this.resetInput = this.resetInput.bind(this);
  }

  componentDidMount () {
    this.getPageLoadedCharacters()
  } 



  getPageLoadedCharacters = async () => {
    try{
      const res = await axios.get('https://swapi.dev/api/people/');
      let results = res.data.results.slice(7)

      for(let i = 0; i < results.length; i++){
        if(results[i].species.length !== 0){
          const resp = await axios.get(results[i].species);
          results[i].species = [resp.data.name]
        }else{
          results[i].species = ['human']
        }
      }

      for(let j = 0; j < results.length; j++){
          const resp = await axios.get(results[j].homeworld);
          results[j].homeworld = [resp.data.name]
      }
    
       this.setState({
         characters: results
       })
    } catch(err) {
      console.error(err)
    } 
  }



  getNewCharacters = async () => {
    try{
      const res = await axios.all([
        axios.get('https://swapi.dev/api/people/?page=1'),
        axios.get('https://swapi.dev/api/people/?page=2'),
        axios.get('https://swapi.dev/api/people/?page=3'),
        axios.get('https://swapi.dev/api/people/?page=4'),
        axios.get('https://swapi.dev/api/people/?page=5'),
        axios.get('https://swapi.dev/api/people/?page=6'),
        axios.get('https://swapi.dev/api/people/?page=7'),
        axios.get('https://swapi.dev/api/people/?page=8'),
        axios.get('https://swapi.dev/api/people/?page=9')
      ])
      let dataResults;
      for(let i = 0; i < res.length; i++){
        dataResults = res[0].data.results.concat(res[1].data.results, res[2].data.results, res[3].data.results, res[4].data.results, res[5].data.results, res[6].data.results, res[7].data.results, res[8].data.results);
      }

      dataResults.map((char) => {
          if(char.name.toLowerCase().indexOf(this.state.input) !== -1){
            if(char.species.length !== 0){
               ;(async () => {
                 const resp = await axios.get(char.species);
                 char.species = [resp.data.name]
               })()
            }else{
              char.species = ['Human']
            }
     
            ;(async () => {
              const response = await axios.get(char.homeworld);
              char.homeworld = [response.data.name]
            })()
           
            let characters = this.state.characters;
            characters.unshift(char)      
            this.setState({characters: characters})

         }
        })
     this.limitNumberOfCharactersDisplayed();
     
    } catch(err) {
      console.error(err)
    } 
  } 





  limitNumberOfCharactersDisplayed () {
    if(this.state.characters.length > 9){
      let characters = this.state.characters;
      characters.pop()
    }
  }
    
  

  handleInputChange (e) {
    e.preventDefault();
    let inputValue = e.target.value;
    this.setState({
      input : inputValue 
    })
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



  // resetInput () {
  //   this.setState({
  //     input: ''
  //   })
  // }



  // componentDidUpdate (prevProps, prevState) {
  //   if(prevState.inputClear !== this.state.inputClear){
  //     this.resetInput()
  //   }
  // }
  


  render () {
    return (
      <div>
        <div className='text-warning mt-5 w-75 border border-white rounded mx-auto'>
          <h1 className='d-flex justify-content-center display-3'>STAR WARS</h1>
          <form className='form' onSubmit={this.searchCharacter}>
           <Input onChange={this.handleInputChange}/>
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
      </div>
    )
  }
}


export default StarWarsPage;
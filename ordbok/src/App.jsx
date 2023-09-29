import { useState } from 'react'
import './App.css'

function App() {
  const [word, setWord] = useState()
  const [info, setInfo] = useState()
  const [error, setError] = useState()
  
 // hämtar data från api

  async function postWord() {
    setInfo('')
    if(!word){
      setError("Skriv ett ord för att få ett svar")
    }else{
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`

    const response = await fetch(url)
    const data = await response.json()

   console.log(data.message);
    
    if (data.message) {
      setError(data.message)
    }else{  
      setError("")   
    setInfo(data[0]);
    console.log(data[0]);
 
  }}}
  console.log(info);


// function för ljud
function audio(audioUrl){
  const audio = new Audio(audioUrl)
  audio.play()
}



  return (
    <div>
      <h1>Ord Bok</h1>
      <br />
      <input type="text" placeholder='Skriv ett ord' value={word} onChange={(event)=>{
       setWord(event.target.value)}}/>
      <br />
      <button onClick={postWord}>Sök ord</button>
      <br />
     <p>{error}</p>
     <h1>{info?.word}</h1>
{info && <details>
<summary>Phonetics</summary>

     {info?.phonetics.map((phonetic)=>(
      <div>
        <div> {phonetic?.text} </div> 
         {phonetic.audio &&  <button onClick={()=> {audio(phonetic?.audio)}}>Play Audio</button > 
 }


        
      </div>
      ))}
      <br />
      </details>}
      
    { info && <details> <summary>meanings</summary>
     {info?.meanings.map((meanings)=> (
       
          <div>
           {meanings?.antonyms.join(", ") }
           <br />
            {meanings?.partOfSpeech }
            
          </div>

     ))}
     </details>   }  

      {info && <details> <summary> Synonyms</summary>
     {info?.meanings.map((meanings)=> (
       
       <div>
         <p >{meanings?.synonyms.join(", ") }</p> 
       </div>

  ))}
  </details>}

  {info && <details> <summary> definitions</summary>
     {info?.meanings.map((meanings)=> (
       
       <div>
         <p >{meanings?.definitions.map((defintions)=> (
              defintions.definition
         )) }</p>
       </div>

  ))}
  </details>}
    </div>
  )
}

export default App

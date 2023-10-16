import { useState } from 'react'
import './App.css'
const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

function App() {
  const [currentImage, setCurrentImage] = useState("")
  const [currentTitle, setCurrentTitle] = useState("")
  const [currentDate, setCurrentDate] = useState("")
  const [copyright, setCopyright] = useState("")
  

  const [prevBans, setBans] = useState([])


  const callAPI = async (query)=>{
    query = `https://api.nasa.gov/planetary/apod?api_key=${ACCESS_KEY}&count=1`
    const response = await fetch(query);
    const json = await response.json();
    if (json[0].date in prevBans || json[0].title in prevBans || json[0].copyright in prevBans || !(json[0].copyright)){
      callAPI();
    }else{
      setCurrentTitle(json[0].title)
      setCurrentImage(json[0].url)
      setCurrentDate(json[0].date)
      setCopyright(json[0].copyright)
    }
  };
  const discover = (query)=>{
    callAPI(query).catch(console.error);
  };
  const addDate = () => {
    setBans((bans) => [...bans, currentDate]);
  }
  const addCopyright = () => {
    setBans((bans) => [...bans, copyright]);
  }
  const addTitle = () => {
    setBans((bans) => [...bans, currentTitle]);
  }

  return (
    <div className='display-container' >
      <div className='discover-container'>
      <h2>Want a sneak peak into NASA's Mars Rover Exploration? </h2>
      <h4>Here We Go!!!</h4>
      {currentImage ? (
        <div>
        <h3>{currentTitle}</h3>
        <button onClick={addDate}>{currentDate}</button>
        <button onClick={addCopyright}>{copyright}</button>
        <button onClick={addTitle}>{currentTitle}</button><br />
        <img
          className="image"
          src={currentImage}
          alt="Image"
          width={'500px'}
          height={'300px'}
        />
        </div>
      ) : (
        <div> </div>
      )}
      <button className='Discover' onClick={discover} >Discover</button>
      </div>
      <div className='banlist'>
        <h2>Ban List</h2>
        <h4>click on an attribute to ban it.</h4>
        {
          prevBans && prevBans.length > 0 ? (
            console.log(prevBans),
            prevBans.map((button, index) => 
                <button className='banned-buttons' key={index}>{button}</button> 
            )
          ) : (
                <div>
                  <h5>You haven't made a ban yet!</h5>
                </div>
          )
        }
      </div>
    </div>
  )
}

export default App;

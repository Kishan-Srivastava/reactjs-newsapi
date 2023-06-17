//import {  useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { useState } from "react";
import LoadingBar from 'react-top-loading-bar'

function App() {
  // function sleep(ms) {
  //   return new Promise((resolve) => setTimeout(resolve, ms));
  // }
  // const handlingQuery = (value) => {
  //   console.log("Handling Query: " + value);
  //   // sleep(4000).then(() => {
  //   //   setQuery(value);
  //   // });
  //   setQuery(value);
  // }
  // const toggleSelectedCategory = (category) =>{
  //   setSelectedCategory(category);
  // }
  // const [query, setQuery] = useState("in");
  // const [selectedCategory,setSelectedCategory] = useState("country");
  // const category_type = ["country","sources"]
  //<Navbar handleSearch={handlingQuery} query={query} category_type={category_type} handleSelectedCategory={toggleSelectedCategory}/>
  const [progress,setProgress] = useState(0);
  const setProgressFromChild = (p)=>{
    setProgress(progress+p);
  }
  return (
    <Router>
      <LoadingBar
        color='#FF7B05'
        height={3}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
    <Navbar />
      <Routes>
        
        <Route exact path="/" element={<News setProgress={setProgressFromChild} category="business" />} />
        {/* <Route exact path="/business" element={<News setProgress={setProgressFromChild} category="business" />} /> */}
        <Route exact path="/entertainment" element={<News setProgress={setProgressFromChild} category="entertainment" />} />
        <Route exact path="/generalhealth" element={<News setProgress={setProgressFromChild} category="generalhealth" />} />
        <Route exact path="/science" element={<News setProgress={setProgressFromChild} category="science" />} />
        <Route exact path="/sports" element={<News setProgress={setProgressFromChild} category="sports" />} />
        <Route exact path="/technology" element={<News setProgress={setProgressFromChild} category="technology" />} />
      
      
      </Routes>
      </Router>
  );
}

export default App;

import react from 'react';
import { useState, useEffect} from 'react';
import { Rating } from "react-simple-star-rating";
import axios from "axios";

function Courses({courses, user}){
  
    const [courseRatings, setCourseRatings]= useState([]);

    useEffect(()=>{
        axios
            .get("http://localhost:8000/api/courses/ratings")
            .then((res)=>setCourseRatings(res.data))
            .catch((err)=> console.error(err))
    },[])



    return(
        <></>
    
    
    
    
    
    
    
    
    
    )
}

export default Courses;
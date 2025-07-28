import react from 'react';



function Courses({courses}){
  
   console.log(courses) 
    return (
        <>
        { courses.map((course)=>(
            <div>
                <p>{course.code}</p>
                <p>{course.name}</p>
            </div>
        ))}
        </>
    )
}

export default Courses;
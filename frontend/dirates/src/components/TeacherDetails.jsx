import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function TeacherDetails({
  teachers,
  user,
  teacherRatings,
  darkMode,
}) {
  const { id } = useParams();
  const teacher = teachers.find((t) => t.id == id);
    useEffect(()=> {
        document.title= `DiRates | ${teacher? teacher.last_name : "not found"}`
    },[teacher])

  if (!teacher) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "1rem",
          fontFamily: "Times New Roman",
        }}
      >
        <h2>
          <i>404</i> Teacher Not Found
        </h2>
      </div>
    );
  }

  return <> </>;
}

import React, { useContext, useEffect, useState } from "react";

// CONTEXT
import UserContext from "context/UserContext";

// UTILS
import { getAllFromCollection } from "utils/DB";

// COMPONENTS
import Layout from "components/app/Layout/Layout";

// VIEWS
import Home from "views/App/home/home";

const Init = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [coursesTaken, setCoursesTaken] = useState<Course[]>([]);
  const [search, setSearch] = useState<string>("");

  // CONTEXT
  const userCtx = useContext(UserContext);
  const { user } = userCtx;

  useEffect(() => {
    // OBTENER TODOS LO CURSOS
    getAllFromCollection<Course>("Courses").then((res: Course[]) => {
      let tmpCS: Course[] = [];
      const userCTken: string[] = user?.courses_taken || [];

      for (let i: number = 0; i <= userCTken.length; i++) {
        res.forEach((c: Course) => {
          if (userCTken[i] === c._id) {
            tmpCS.push(c);
          }
        });
      }
      // console.log("Entrada CourseTaken:", userCTken, tmpCS);

      // GUARDAMOS TODOS LOS CURSOS TOMADOS
      setCourses(res);
      setCoursesTaken(tmpCS);
    });
    console.log("indexHome");
  }, [user?.courses_taken]);

  useEffect(() => {
    let tmpCS: Course[] = [];
    const userCTken: string[] = user?.courses_taken || [];

    for (let i: number = 0; i <= userCTken.length; i++) {
      courses.forEach((c: Course) => {
        if (userCTken[i] === c._id) {
          tmpCS.push(c);
        }
      });
    }

    // console.log("Entrada CtxUser:", userCTken, tmpCS);
    setCoursesTaken(tmpCS);
  }, [courses]);

  return (
    <Layout onSearch={setSearch}>
      <Home courses={courses} coursesTaken={coursesTaken} search={search} />
    </Layout>
  );
};

export default Init;

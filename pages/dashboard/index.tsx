import React, { useContext, useEffect, useState } from "react";

// COMPONENTS
import Layout from "components/app/Layout/Layout";
import Dashboard from "views/App/dashboard/dashboard";
import { getAllFromCollection } from "utils/DB";
import UserContext from "context/UserContext";

const Init = () => {
  // STATE
  const [courses, setCourses] = useState<Course[]>([]);

  // CONTEXT
  const userCTX = useContext(UserContext);
  const { user } = userCTX;

  useEffect(() => {
    const tmpC: Course[] = [];
    if (user)
      getAllFromCollection<Course>("Courses").then((res: Course[]) => {
        res.forEach((r: Course) => {
          if (r.user_id === user.uid) tmpC.push(r);
        });
        setCourses(tmpC);
      });
  }, []);

  return (
    <>
      <Layout>
        <Dashboard courses={courses}></Dashboard>
      </Layout>
    </>
  );
};

export default Init;

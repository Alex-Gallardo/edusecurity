import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getFromCollection } from "../../utils/DB";
import DashboardView2 from "./../../views/App/dashboard/fragments/dash2";
import Layout from "components/app/Layout/Layout";

interface Resource {
  id: string;
  title: string;
  description: string;
  resourceUrl: string;
  comments: [];
}

const Init = () => {
  const [course, setCourse] = useState<Course | null>(null);
  const router = useRouter();
  const {
    query: { cid },
  } = router;

  useEffect(() => {
    console.log("courseID:", cid);

    // @ts-ignore
    getFromCollection<Course>(cid, "Courses").then((res) => setCourse(res));
    console.log("Curso obtenido", course);
  }, [cid]);

  if (course) {
    return (
      <Layout>
        <DashboardView2 course={course} />;
      </Layout>
    );
  } else {
    return <h1>Nada aun</h1>;
  }
};

export default Init;

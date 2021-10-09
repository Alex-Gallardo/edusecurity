import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

// UTILS
import { getFromCollection } from "utils/DB";

// COMPONENTS
import Layout from "components/app/Layout/Layout";

// VIEWS
import DashboardView2 from "views/App/dashboard/fragments/dash2";

// @MATERIAL
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

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
    if (cid) {
      // @ts-ignore
      getFromCollection<Course>(cid, "Courses").then((res) => setCourse(res));
      console.log("Curso obtenido", course);
    }
  }, [cid]);

  if (course) {
    return (
      <Layout>
        <DashboardView2 course={course} />;
      </Layout>
    );
  } else {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }
};

export default Init;

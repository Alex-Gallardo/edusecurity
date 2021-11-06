import React, { useEffect, useState } from "react";
import Head from "next/head";
import Router from "next/router";
import Image from "next/image";

// UTILS
import { getAllFromCollection } from "utils/DB";

// STYLES
import Styles from "./dash2.module.scss";

// COMPONENTS
import NewResource from "components/app/NewResource/NewResource";
import TableDat from "components/app/TableDat/Tabledat";
import ResourceCmp from "../components/resource";

// @MATERIAL
import Button from "@mui/material/Button";
import ArrowBack from "@material-ui/icons/ArrowBack";

// PROPS
interface DashboardProps {
  course: Course;
}

const DashboardView2 = ({ course }: DashboardProps) => {
  // STATE
  const [resources, setResourses] = useState<Resource[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const tmpR: Resource[] = [];
    getAllFromCollection<Resource>("Resources").then((res: Resource[]) => {
      res.forEach((r: Resource) => {
        if (r.course_id === course._id) tmpR.push(r);
      });
      setResourses(tmpR);
    });

    getAllFromCollection<User>("users")
      .then((res) => setUsers(res))
      .catch((err) => console.log("getAllUsers-dash2:", err));
  }, []);

  const sendBack = () => {
    Router.push("/dashboard");
  };

  return (
    <div className={Styles.container}>
      <Head>
        <title>EduSegurity - Dashboard</title>
      </Head>

      {/* 1R -------- */}
      <section className={Styles.cont_}>
        {/* INFORMACION COURSE */}
        <section className={Styles.cont_info_}>
          <div className={Styles.cont_back}>
            <Button
              variant="contained"
              startIcon={<ArrowBack />}
              onClick={sendBack}
            >
              Regresar
            </Button>
            {/* <h2>Información:</h2> */}
          </div>

          {/* DAT-COURSE */}
          <div className={Styles.info_dat_}>
            <div className={Styles.cont_img}>
              <Image
                src={course.cover}
                alt={course.title}
                className={Styles.img}
                unoptimized
                height="250px"
                width="300px"
              />
            </div>
            <div className={Styles.info_dat}>
              <h2>{course.title}</h2>
              <p style={{ marginBottom: "24px" }}>{course.description}</p>
              <TableDat course={course} />
            </div>
          </div>
        </section>

        {/* UPDATE NEW-RESOURCE */}
        <section className={Styles.add_resource}>
          <h2>Publica un nuevo video:</h2>
          <NewResource
            courseID={course._id}
            resourcesIDS={course.resources_id}
          />
        </section>
      </section>

      {/* RECURSOS */}
      <section className={Styles.courses}>
        <h2>{resources.length} recursos:</h2>
        <div className={Styles.cont_resources}>
          {resources.map((r: Resource, i: number) => (
            <ResourceCmp resource={r} users={users} key={`${r._id}_${i}`} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default DashboardView2;

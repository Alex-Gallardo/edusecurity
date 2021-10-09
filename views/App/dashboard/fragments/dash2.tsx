import React, { useState } from "react";
import Head from "next/head";

// UTILS
import { getAllFromCollection } from "utils/DB";

// STYLES
import Styles from "./dash2.module.scss";

// COMPONENTS
import NewResource from "components/app/NewResource/NewResource";
import TableDat from "./../../../../components/app/TableDat/Tabledat";

// @MATERIAL

// PROPS
interface DashboardProps {
  course: Course;
}

const DashboardView2 = ({ course }: DashboardProps) => {
  // STATE
  const [resources, setResourses] = useState<Resource[]>([]);

  useState(() => {
    const tmpR: Resource[] = [];
    getAllFromCollection<Resource>("Resources").then((res: Resource[]) => {
      res.forEach((r: Resource) => {
        if (r.course_id === course._id) tmpR.push(r);
      });
      setResourses(tmpR);
    });
    // @ts-ignore
  }, []);

  return (
    <div className={Styles.container}>
      <Head>
        <title>EduSegurity - Dashboard</title>
      </Head>
      {/* INFORMACION */}
      <section className={Styles.info}>
        {/* DAT-COURSE */}
        <section className={Styles.info_dat}>
          <h2>Informacion:</h2>
          <div className={Styles.info_dat_info}>
            <img src={course.cover} alt={course.title} />
            <h2>{course.title}</h2>
            <p style={{marginBottom: '24px'}}>{course.description}</p>
            <TableDat course={course} />
          </div>
        </section>

        {/* UPDATE NEW-RESOURCE */}
        <section className={Styles.info_dat}>
          <h2>Publica un nuevo video</h2>
          <NewResource courseID={course._id} />
        </section>
      </section>

      {/* RECURSOS */}
      <section className={Styles.courses}>
        <h2>{resources.length} recursos:</h2>
        <div className={Styles.cont_resources}>
          {resources.map((r: Resource, i: number) => {
            return (
              <div className={Styles.resource} key={`${r._id}_${i}`}>
                <h3>{r.title}</h3>
                <p>{r.description}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default DashboardView2;

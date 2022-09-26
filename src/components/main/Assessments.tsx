/* eslint-disable react/jsx-key */
import React from "react";
import styles from './styles.module.scss';
import { UsersList } from "./UsersAssessments";

export function Carousel() { 
  return (
    <>
        <article className={styles.hereAssesments}>
          <div className={styles.ContainerHere}>
            <div className={styles.users}>
              <UsersList />
            </div>

            <div aria-hidden="true" className={styles.users}>
             <UsersList />
            </div>
          </div>
          </article>
    </>
  )
}

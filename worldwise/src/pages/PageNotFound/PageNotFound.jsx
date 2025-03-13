import styles from "./PageNotFound.module.css";

const NotFound = () => {
  return (
    <>
      <PageNav />
      <div className={styles.container}>
        <div className={styles.errorCode}>404</div>
        <div className={styles.errorMessage}>Not Found</div>
      </div>
    </>
  );
};

export default NotFound;

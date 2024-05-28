import styles from "./Spinner.module.css";

function Spinner() {
  return (
    <>
      <div className={styles.spinnerContainer}>
        <div className={styles.spinner}></div>
        <p className="ml-10 text-white text-2xl ">Etl is Loading...</p>
      </div>
    </>
  );
}

export default Spinner;

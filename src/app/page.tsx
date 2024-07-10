import Image from "next/image";
import styles from "./page.module.css";
import App from "./component/App";
import Form from "./component/Form";

export default function Home() {
  return (
       <>
       <App />
       <Form />
       </>
  );
}

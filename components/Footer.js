import { FaEnvelope, FaGithubSquare } from "react-icons/fa";
export default function Footer() {
  return (
    <p
      style={{
        fontWeight: "600",
        textAlign: "center",
        marginTop: "15px",
        paddingTop: "5px",
        minWidth: "350px",
        borderTop: "2px var(--color-sub) solid",
        backgroundColor: "var(--color-bgd2)",
        display: "flex",
        justifyContent: "center",
      }}
    >
      Designed and coded by Adelinked{" "}
      <a
        style={{
          fontSize: "22px",
          margin: "0 5px",
        }}
        href="https://github.com/Adelinked"
        title="Git hub"
        target="_blank"
        rel="noreferrer"
      >
        <FaGithubSquare />
      </a>
      <a
        style={{ fontSize: "22px", marginRight: "5px" }}
        href="mailto:boulfekhar.adelaziz@gmail.com"
        title="Send an email"
        target="_blank"
        rel="noreferrer"
      >
        <FaEnvelope />
      </a>
    </p>
  );
}

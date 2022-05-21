import "font-awesome/css/font-awesome.min.css";

export default function Footer() {
  return (
    <p
      style={{
        fontWeight: "600",
        textAlign: "center",
        marginTop: "15px",
        minWidth: "350px",
        borderTop: "2px var(--color-sub) solid",
        backgroundColor: "var(--color-bgd2)",
      }}
    >
      Designed and coded by Adelinked{" "}
      <a
        style={{ fontSize: "22px", marginRight: "5px" }}
        href="https://github.com/Adelinked"
        title="Git hub"
        target="_blank"
      >
        <i className="fa fa-github"></i>
      </a>
      <a
        style={{ fontSize: "22px", marginRight: "5px" }}
        href="mailto:boulfekhar.adelaziz@gmail.com"
        title="Send an email"
        target="_blank"
      >
        <i className="fa fa-envelope"></i>
      </a>
    </p>
  );
}

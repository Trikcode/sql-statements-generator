import React from "react";

function Footer() {
  const [year, setYear] = React.useState(new Date().getFullYear());

  return (
    <div className="footer">
      <p>
        © {year} - Made with ❤️ by{" "}
        <a href="https://twitter.com/Trikerl">Nobert Patrick</a>
      </p>
    </div>
  );
}

export default Footer;

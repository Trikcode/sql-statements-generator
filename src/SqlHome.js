import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Loader from "./Loader";

function SqlHome() {
  const [sqlStatement, setSqlStatement] = React.useState({
    response: "",
  });
  const [sqlerror, setSqlError] = React.useState("");
  const [copySuccess, setCopySuccess] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const onFormSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    const formData = new FormData(event.target);
    const formDataObj = Object.fromEntries(formData.entries());
    const { Configuration, OpenAIApi } = require("openai");
    const configuration = new Configuration({
      apiKey: "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",
    });

    const openai = new OpenAIApi(configuration);
    await openai
      .createCompletion({
        model: "text-curie-001",
        prompt: `${formDataObj.sqlquery}`,
        temperature: 0.7,
        max_tokens: 302,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop: ["#", ";"],
      })
      .then((response) => {
        setSqlStatement({ response: response.data.choices[0].text });
        setIsLoading(false);
      })
      .catch((error) => {
        setSqlError("Hey there buddy! Seems you typed something wrong!");
      });
    event.target.reset();
  };
  const copyToClipboard = (e) => {
    navigator.clipboard.writeText(sqlStatement.response);
    setCopySuccess("Copied!");
    setTimeout(() => {
      setCopySuccess("");
      setSqlStatement({ response: "" });
    }, 3000);
  };

  return (
    <div className="sql-container">
      <div className="clipboard-icon">
        <i className="far fa-clipboard"></i>
        <h1>SQL Statements Generator</h1>
      </div>
      <p className="desc">
        Enter your english statement and get the SQL statement in return!
      </p>
      <div className="form-container">
        <Form onSubmit={onFormSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="text"
              name="sqlquery"
              placeholder="Enter English Statement here include 'sql' in the statement"
              required
            />
          </Form.Group>

          <p>
            Example:
            <span>
              "A sql query to select all the records from the table named
              employee"
            </span>
          </p>
          <Button variant="primary" type="submit" className="btn">
            Generate
          </Button>
        </Form>
      </div>

      {sqlStatement.response.length > 0 ? (
        <div>
          <p style={{ color: "green", textAlign: "center" }}>{copySuccess}</p>
          <div className="result-container">
            <p style={{ paddingTop: 10 }}>{sqlStatement.response}</p>
            <button onClick={copyToClipboard}>Copy</button>
          </div>
        </div>
      ) : (
        <div className="loading-container">
          {isLoading ? <Loader /> : <p>{sqlerror}</p>}
        </div>
      )}
    </div>
  );
}

export default SqlHome;

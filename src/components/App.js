import React, { useState, useEffect } from "react";
import Editor from "./Editor";
import useLocalStorage from "./../hooks/useLocalStorage";

function App() {
  const [html, setHTML] = useLocalStorage("html", "");
  const [css, setCSS] = useLocalStorage("css", "");
  const [js, setJS] = useLocalStorage("js", "");
  const [srcDoc, setsrcDoc] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      setsrcDoc(`
        <html>
        <body>${html}</body>
        <style>${css}</style>
        <script>${js}</script>
        </html>
        `);
    }, 250);
    return () => clearTimeout(timer);
  }, [html, css, js]);
  return (
    <React.Fragment>
      <div className="pane top-pane">
        <Editor
          langauge="xml"
          displayName="HTML"
          value={html}
          onChange={setHTML}
        />
        <Editor
          langauge="css"
          displayName="CSS"
          value={css}
          onChange={setCSS}
        />
        <Editor
          langauge="javascript"
          displayName="JS"
          value={js}
          onChange={setJS}
        />
      </div>
      <div className="pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          height="100%"
          width="100%"
        />
      </div>
    </React.Fragment>
  );
}

export default App;

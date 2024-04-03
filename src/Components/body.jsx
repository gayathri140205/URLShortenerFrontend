import "./page.css";
import { useContext, useState } from "react";
import axios from "axios";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ToastContext from "./context/ToastContext";
const API = "https://urlshortenerbackend-j39w.onrender.com";

const Body = () => {
  const { toast } = useContext(ToastContext);
  const [shortLink, setShortLink] = useState("");
  const [longLink, setLongLink] = useState("");

  const handleApi = () => {
    axios
      .post(`${API}/api/V8/urlshortner`, { longURL: longLink })
      .then((res) => {
        toast.success("Link Shorted Successfully");
        setShortLink(res.data.url.shortURL);
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  };

  const handleCopy = () => {
    toast.success("Link Copied");
  };

  return (
    <>
      <div className="main">
        <input
          placeholder="Enter Url"
          value={longLink}
          onChange={(e) => setLongLink(e.target.value)}
        />
        <button onClick={handleApi} title="Short Url">
          Brief
        </button>
      </div>
      <div className="result main" style={{ marginTop: "5%" }}>
        {shortLink ? (
          <>
            <h2
              style={{
                color: "white",
                backgroundColor: "rgba(0,0,0,0.7)",
                padding: "1%",
                borderRadius: "10px",
              }}
            >
              Compact URL
            </h2>
            <input value={shortLink} />
            <CopyToClipboard text={shortLink} onCopy={handleCopy}>
              <button style={{ width: "10vw" }} title="Copy">
                <i className="search-icon fa fa-copy"></i>
              </button>
            </CopyToClipboard>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Body;

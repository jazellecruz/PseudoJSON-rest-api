
const fetchBtn = document.getElementById("fetch-btn");
const copyBtn = document.getElementById("copy-btn");
const codeOutput = document.getElementById("code-output")
const exampleCode = document.getElementById("example-code").innerText;

const fetchData = () => {
  fetch("/quotes/1")
  .then(res => res.json())
  .then(json => {
    json = json.pop();
    json = JSON.stringify(json, null, 2)
    codeOutput.innerHTML = hljs.highlightAuto(json).value;
    fetchBtn.innerText = "Run Code 🏃";
  });
}

const copyCode = () => {
  navigator.clipboard.writeText(exampleCode);
  copyBtn.innerText = "Copied!"
}

const handleCopyReq = () => {
  copyBtn.innerText = "Copying..."
  setTimeout(copyCode, 500);
}

const handleFetchReq = async() => {
  fetchBtn.innerText = "Fetching..."
  setTimeout(fetchData, 500);
}
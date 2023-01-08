
console.log("Hello from jsScript!")

const navBtn = document.getElementById("responsive-toggle-btn");
const navLinks= document.getElementsByClassName("navlinks-container")[0]
const fetchBtn = document.getElementById("fetch-btn");
const copyBtn = document.getElementById("copy-btn");
const codeOutput = document.getElementById("code-output")
const exampleCode = document.getElementById("example-code").innerText;

navBtn.addEventListener("click", () => {
    navBtn.classList.toggle("active");
    navLinks.classList.toggle("active");
  }
)

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
  setTimeout(fetchData, 1000);
}
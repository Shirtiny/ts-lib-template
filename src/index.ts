import { add } from "./main";
import "./style/index.scss";

const div = document.createElement("div");
div.classList.add("example");
div.textContent = "this is an scss example, open the console";
document.querySelector("#root")!.appendChild(div);

console.log("hello world", ", env is dev,  test add: ", add(1, 0));

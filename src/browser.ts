import { add } from "./main";

console.log("Hello World", add(2, 3), "product esm");

const instance = { add };

(window as any).instance = instance;

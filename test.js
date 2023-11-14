import Cookies from "js-cookie";

const user = { id: "ti1565265363563", token: "sdqhjkfhvgbqsjd;hbvksdjqvhkj" };
const userStr = JSON.stringify(user);

Cookies.set("user", userStr, { expires: 15 });

const cookie = Cookies.get("user");

console.log(JSON.stringify(user));

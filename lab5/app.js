const express = require("express");
const axios = require("axios");
const { Observable } = require("rxjs");

const app = express();

//hide framework name from header
app.set("x-power-by", false);
//enable strict routing (trailing slashes)
app.set("strict routing", true);
//enable case sensitive routing
app.enable("case sensitive routing");

app.get("/users", (req, res) => {
  fetchPromise(res);
  fetchAsync(res);
  fetchObservable(res);
}).listen(8000);

//Promise
function fetchPromise(res) {
  axios
    .get("http://jsonplaceholder.typicode.com/users/")
    .then(({ data }) => res.write(renderUsers(data, 'Using Promise')))
    .catch(error => console.log(error));
}

//async/await
async function fetchAsync(res) {
  try {
    const users = await axios.get("http://jsonplaceholder.typicode.com/users/");
    res.write(renderUsers(users.data, 'Using async/await'));
  } catch (err) {
    console.log(err);
  }
}

//Observable
function fetchObservable(res) {
  const observable = Observable.create(observer => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then(({ data }) => {
        observer.next(data);
        observer.complete();
      })
      .catch(error => {
        observer.error(error);
      });
  });

  observable.subscribe({
    next: data => res.write(renderUsers(data, 'Using Observable'))
  });
}

//Helper function for rendering users data
function renderUsers(data, methodName) {
  const html = data.map(
    user => `<tr><td>${user.name}</td><td>${user.email}</td></tr>`
  );
  return `<table><tr><h2>${methodName}</h2></tr>${html}</table>`;
}

declare let module: any

function greeter(person: string) {
  return "Hello, " + person;
}

let user = "Sally User";

document.body.innerHTML = greeter(user);

if (module.hot) {
  module.hot.accept();
}

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const port = 3000;
const app = express();
const contact = require("./utils/contacts");

app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index", {
    layout: "layout/main-layout",
    title: "home",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    layout: "layout/main-layout",
    title: "about",
  });
});

app.get("/contact", (req, res) => {
  const contacts = contact.listData();
  res.render("contact", {
    layout: "layout/main-layout",
    title: "contact",
    contacts,
  });
});

app.get("/contact/find/:nama", (req, res) => {
  const data = contact.detaildata(req.params.nama);
  if (!data) {
    res.render("detail", {
      layout: "layout/main-layout",
      title: "detail contact",
      data: "false",
    });
  }
  res.render("detail", {
    layout: "layout/main-layout",
    title: "contact",
    data,
  });
});

app.get("/contact/add", (req, res) => {
  res.render("add", {
    layout: "layout/main-layout",
    title: "tambah contact",
  });
});

app.post("/contact/add", (req, res) => {
  contact.addData(req.body);
  res.redirect("/contact");
});

app.get("/contact/remove/:nama", (req, res) => {
  contact.removedata(req.params.nama);
  res.redirect("/contact");
});

app.get("/contact/ubah/:nama", (req, res) => {
  const data = contact.detaildata(req.params.nama);
  if (!data) {
    res.render("ubah", {
      layout: "layout/main-layout",
      title: "ubah contact",
      data: "false",
    });
  }
  res.render("ubah", {
    layout: "layout/main-layout",
    title: "contact",
    data,
  });
});

app.post("/contact/update/:nama", (req, res) => {
  contact.removedata(req.params.nama);
  const data = req.body;
  contact.addData(data);
  res.redirect("/contact");
});

app.use("/", (req, res) => {
  res.status(404);
  res.send("<center><h1>404</h1><a href='../'>kembali</a></center>");
});

app.listen(port, () => {
  console.log(`server start in http://localhost:${port}/`);
});

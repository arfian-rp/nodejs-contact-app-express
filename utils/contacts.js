const fs = require("fs");
const validator = require("validator");

const dirpath = "./data";
if (!fs.existsSync(dirpath)) {
  fs.mkdirSync(dirpath);
}

const datapath = "./data/contacts.json";
if (!fs.existsSync(datapath)) {
  fs.writeFileSync(datapath, "[]", "utf-8");
}
module.exports.addData = (data) => {
  var contacts = JSON.parse(fs.readFileSync(datapath, "utf-8"));
  if (!validator.isMobilePhone(data.nohp, "id-ID")) {
    return false;
  }

  if (data.email) {
    if (!validator.isEmail(data.email)) {
      return false;
    }
  }

  const duplicate = contacts.find((contact) => contact.nama === data.nama);
  if (duplicate) {
    return false;
  }

  contacts.push(data);
  fs.writeFileSync(datapath, JSON.stringify(contacts));
  return true;
};

module.exports.listData = () => {
  return JSON.parse(fs.readFileSync(datapath, "utf-8"));
};

module.exports.detaildata = (nama) => {
  const contacts = JSON.parse(fs.readFileSync(datapath, "utf-8"));
  const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());
  if (!contact) {
    return false;
  }
  return contact;
};

module.exports.removedata = (nama) => {
  const contacts = JSON.parse(fs.readFileSync(datapath, "utf-8"));
  const newContacts = contacts.filter((contact) => contact.nama.toLowerCase() !== nama.toLowerCase());

  if (contacts.length === newContacts.length) {
    return false;
  }
  fs.writeFileSync(datapath, JSON.stringify(newContacts));
  return true;
};

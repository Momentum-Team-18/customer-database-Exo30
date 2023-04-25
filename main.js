//let body = document.body;
let data = document.getElementById("data");

let addCustomerDiv = function (customer) {
  //----------create div for customer profile---------
  let customerDiv = document.createElement("div");
  customerDiv.classList.add("customer");
  //create img for customer picture and add class-------------
  let img = document.createElement("img");
  img.setAttribute("src", customer.picture.medium);
  img.classList.add("customerPicture");

  //Helper function to capitalize any first letter that should be capitalized i.e. names -------
  let capitalize = function (name) {
    let remainingLetters = name.substring(1);
    let firstLetter = name.charAt(0);
    return firstLetter.toUpperCase() + remainingLetters;
  };

  //append the name to the div after capitalizing name---------------------------------
  let formatName = function (nameObject) {
    let nameDiv = document.createElement("div");
    nameDiv.classList.add("customerName");
    let result = "";
    if (nameObject.title) {
      nameObject.title = capitalize(nameObject.title);
      result += nameObject.title + ". ";
    }
    nameObject.first = capitalize(nameObject.first);
    nameObject.last = capitalize(nameObject.last);
    result += nameObject.first + " " + nameObject.last + " ";
    nameDiv.append(result);
    customerDiv.appendChild(nameDiv);
  };
  //append address to data div, use function from states.js to abbreviate any state name---------------
  let formatAddress = function (addressObject) {
    let addressLineOne = document.createElement("div");
    let addressLineTwo = document.createElement("div");
    addressLineOne.classList.add("customerAddress");
    addressLineTwo.classList.add("customerAddress");
    let street = addressObject.street.number + " " + addressObject.street.name;
    let city = addressObject.city;
    let state = nameToAbbr(addressObject.state);
    let zip = addressObject.postcode;
    let lineTwo = city + ", " + state + " " + zip;

    addressLineOne.append(street);
    addressLineTwo.append(lineTwo);
    customerDiv.appendChild(addressLineOne);
    customerDiv.appendChild(addressLineTwo);
  };
  //-----------takes in DOB or registered timestamp and turns it into a readable date then appends-------
  let formatDate = function (dateObject, need) {
    dateObject = moment(dateObject).format("MM/DD/YYYY");
    if (need === "dob") {
      let dob = document.createElement("div");
      dob.classList.add("customerDob");
      dob.append("DOB: " + dateObject);
      customerDiv.appendChild(dob);
    } else if ((need = "registered")) {
      let registered = document.createElement("div");
      registered.classList.add("customerRegistered");
      registered.append("Registered: " + dateObject);
      customerDiv.appendChild(registered);
    } else {
      console.log("error in date format");
    }
  };

  //----------create customer phone number div------------------------
  let customerPhone = document.createElement("div");
  customerPhone.classList.add("customerPhone");
  customerPhone.append(customer.phone);

  //----------create customer email div---------------------------------

  let customerEmail = document.createElement("div");
  customerEmail.classList.add("customerEmail");
  customerEmail.append(customer.email);

  //-----------------------assembly---------------------------------
  //Now put it all together to create our div, and append that div to the data div in HTML-----------
  //appends in order: profile picture, name, address, phone number, email, date of birth,
  customerDiv.appendChild(img);
  formatName(customer.name);
  formatAddress(customer.location);
  customerDiv.appendChild(customerPhone);
  customerDiv.appendChild(customerEmail);
  formatDate(customer.dob.date, "dob");
  formatDate(customer.registered.date, "registered");

  data.appendChild(customerDiv);
};

customers.forEach((customer) => addCustomerDiv(customer));

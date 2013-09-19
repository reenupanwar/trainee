// Validation Code
var test = localStorage.test ? localStorage.test : [];
var re = new RegExp("[A-z]");
var re1 = new RegExp("[0-9]");
showData();
function insertrow(value) {
    var tr = '<tr><td>' + value.firstname + '</td><td>'
        + value.lastname + '</td><td>' + value.email + '</td><td>'
        + value.password + '</td><td>' + value.gender + '</td><td>'
        + value.phone + '</td><td>' + value.dob + '</td></tr>'
    return tr;
}
function showData() {
    if (localStorage.test) {
        var data = JSON.parse(localStorage.test);
        for (var i = 0; i < data.length; i++) {
            var value = data[i];
            /* var txt = value.firstname + " " +
             value.lastname + " " + value.email + " " + value.password + " "
             + value.gender + " " + value.phone + " " + value.dob + "<br>";  */
            var table = document.getElementById("tableBody");
            var html = insertrow(value);
            table.innerHTML += html;
        }
    }
}
function valid(e) {
    e.preventDefault();
    var myform = document.forms['myform'];
    var ary = [checkfname, checklname, checkemail, checkpassword, checkphone, checkdob, getGender];
    var rtn = true;
    var i = 0;
    for (var i = 0; i < ary.length; i++) {
        if (!ary[i](myform)) {
            rtn = false;
        }
    }
    return rtn;


}


function checkfname(myform) {
    var eobj = document.getElementById('fnameerr');
    eobj.innerHTML = '';
    var msg;
    var x = document.forms["myform"]["fname"].value;
    var error = false;
    if (x == null || x == "") {
         msg = 'Error: Field name must be filled out.';
        error=true;

    }
    else if (re.test(document.forms["myform"]["fname"].value) != true) {
        msg = "First name must contain Character.";
        error=true;

    }
    if (error) {
        myform.fname.focus();
        eobj.innerHTML = msg;
        return false;
    }
    else
    return true;
}

function checklname(myform) {
    var eobj = document.getElementById('lnameerr');
    var y = document.forms["myform"]["lname"].value;
    eobj.innerHTML = '';
    var error = false;
    if (y == null || y == "") {
        error = 'Error:Last name must be filled out.';
        myform.lname.focus();
    }
    else if (re.test(document.forms["myform"]["lname"].value) != true) {
        error = "Last name must contain Character.";
    }
    if (error) {
        myform.lname.focus();
        eobj.innerHTML = error;
        return false;
    }
    return true;
}

function checkemail(myform) {
    var eobj = document.getElementById('emailerr');
    eobj.innerHTML = '';
    var error = false;
    var z = document.forms["myform"]["email"].value;
    var atpos = z.indexOf("@");
    var dotpos = z.lastIndexOf(".");

    if (z == null || z == "") {
        error = "Error: Email-Id must be field out";
        myform.email.focus();

    }
    else if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= z.length) {
        error = 'Error:Not a valid e-mail address';
    }
    if (error) {
        myform.email.focus();
        eobj.innerHTML = error;
        return false;
    }
    return true;
}

function checkpassword(myform) {
    var eobj = document.getElementById('passworderr');

    var minLength = 6;
    JSON.stringify('minLength');
    var space = ' ';
    var error = false;
    eobj.innerHTML = '';
    var b = document.forms["myform"]["password"].value;

    if (b.length < 1) {
        error = 'Please enter your password.';
    }
    else if (b.length < minLength) {
        error = 'Your password must be at least ' + minLength + ' characters long. Try again.';
    }
    else if (b.indexOf(space) > -1) {
        error = 'Sorry, spaces are not allowed.';
    }
    if (error) {
        myform.password.focus();
        eobj.innerHTML = error;
        return false
    }

    return true;
}

function getGenderValue() {
    var radio = document.getElementsByName("gender");
    for (var i = 0; i < radio.length; i++) {
        if (radio[i].checked) {
            return radio[i].value;
        }
    }
}

function getGender() {
    var eobj = document.getElementById('gendererr');
    eobj.innerHTML = '';
    var error = false;
    if (!getGenderValue()) {
        eobj.innerHTML = "Error:Please Select your gender!";
        return false;
    }
    return true;
}

function checkphone() {
    var eobj = document.getElementById('phoneerr');
    eobj.innerHTML = '';
    var error = false;
    var a = document.forms["myform"]["phone"].value;
    if (a == null || a == "") {
        error = "Error:Phone No. must be field out";
        myform.phone.focus();
    }
    else if (re1.test(document.forms["myform"]['phone'].value) != true) {
        error = "Error:Enter digits in Phone no.";
    }
    else if (a.length < 10) {
        error = "Error: Phone no Must have 10 digits! ";
    }
    if (error) {
        eobj.innerHTML = error;
        myform.phone.focus();
        return false;
    }
    return true;
}

function checkdob(myform) {
    var eobj = document.getElementById('doberr');
    eobj.innerHTML = '';
    var error = false;
    var p = document.forms["myform"]['Day'].value;
    var q = document.forms["myform"]['Month'].value;
    var r = document.forms["myform"]['Year'].value;
    if (p == "0") {
        error = "Error: select ur date of birth";
        myform.Day.focus();
    }

    else if (q == "0") {
        error = "Error: select ur date of birth";
        myform.Month.focus();
    }

    else if (r == "0") {
        error = "Error: select ur date of birth";
        myform.Year.focus();
    }
    if (error) {
        eobj.innerHTML = error;
        return false;
    }
    return true;



}

/* if(rtn)
 {
 var data = {};
 data.firstname = x;
 data.lastname = y;
 data.email = z;
 data.password = b;
 data.gender = getGenderValue();
 data.phone = a;
 data.dob = (p + "-" + q + "-" + r );
 if (typeof test == "string") {
 test = JSON.parse(test);
 console.log(test);
 console.log(typeof (test));
 }
 test.push(data);
 localStorage.test = JSON.stringify(test);

 showData();

 }
 */











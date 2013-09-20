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
function valid() {

    var form = document.forms['myform'];
    var ary = [checkfname, checklname, checkemail, checkpassword, checkphone, checkdob, getGender];
    var rtn = true;
    var i = 0;
    for (var i = 0; i < ary.length; i++) {
        if (!ary[i](myform)) {
            rtn = false;
        }
    }
    if (rtn) {
         var data = {};
        data.firstname = document.forms["myform"]["fname"].value;
        //console.log(data.firstname);

        data.lastname = document.forms["myform"]["lname"].value;
        data.email = document.forms["myform"]["email"].value;
        data.password = document.forms["myform"]["password"].value;

        data.gender = getGenderValue();
        data.phone = document.forms["myform"]["phone"].value;

        data.dob = (document.forms["myform"]['Day'].value
            + "-" + document.forms["myform"]['Month'].value + "-"
            + document.forms["myform"]['Year'].value );
        //console.log(data.dob);
       // console.log(typeof (test));
        if (typeof test == "string") {
            test = JSON.parse(test);
            console.log(typeof (test));
        }
        test.push(data);
        console.log(test);

        localStorage.test = JSON.stringify(test);

        showData();
    }
    return rtn;
}


function checkfname() {
    var eobj = document.getElementById('fnameerr');
    eobj.innerHTML = '';
    var msg;
    var x = document.forms["myform"]["fname"].value;
    var error = false;
    if (x == null || x == "") {
        msg = 'Error: Field name must be filled out.';
        error = true;

    }
    else if (re.test(document.forms["myform"]["fname"].value) != true) {
        msg = "First name must contain Character.";
        error = true;

    }
    if (error) {
        myform.fname.focus();
        eobj.innerHTML = msg;
        return false;
    }
    else
        return true;
}

function checklname() {
    var eobj = document.getElementById('lnameerr');
    var y = document.forms["myform"]["lname"].value;
    eobj.innerHTML = '';
    var error = false;
    var msg;
    if (y == null || y == "") {
        msg = 'Error:Last name must be filled out.';
        error= true;
    }
    else if (re.test(document.forms["myform"]["lname"].value) != true) {
        msg = "Last name must contain Character.";
        error= true;
    }
    if (error) {
        myform.lname.focus();
        eobj.innerHTML = msg;
        return false;
    }
    return true;
}

function checkemail() {
    var eobj = document.getElementById('emailerr');
    eobj.innerHTML = '';
    var error = false;
    var msg;
    var z = document.forms["myform"]["email"].value;
    var atpos = z.indexOf("@");
    var dotpos = z.lastIndexOf(".");

    if (z == null || z == "") {
        msg = "Error: Email-Id must be field out";
       error = true;

    }
    else if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= z.length) {
        msg = 'Error:Not a valid e-mail address';
        error = true;
    }
    if (error) {
        myform.email.focus();
        eobj.innerHTML = msg;
        return false;
    }
    return true;
}

function checkpassword() {
    var eobj = document.getElementById('passworderr');

    var minLength = 6;
    JSON.stringify('minLength');
    var space = ' ';
    var msg;
    var error = false;
    eobj.innerHTML = '';
    var b = document.forms["myform"]["password"].value;

    if (b.length < 1) {
        msg = 'Please enter your password.';
        error = true;
    }
    else if (b.length < minLength) {
        msg = 'Your password must be at least ' + minLength + ' characters long. Try again.';
        error = true;
    }
    else if (b.indexOf(space) > -1) {
        msg = 'Sorry, spaces are not allowed.';
        error = true;
    }
    if (error) {
        myform.password.focus();
        eobj.innerHTML = msg;
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
    var msg;
    var a = document.forms["myform"]["phone"].value;
    if (a == null || a == "") {
        msg = "Error:Phone No. must be field out";
        error= true;
    }
    else if (re1.test(document.forms["myform"]['phone'].value) != true) {
        msg = "Error:Enter digits in Phone no.";
        error = true;
    }
    else if (a.length < 10) {
        msg = "Error: Phone no Must have 10 digits! ";
        error = true;
    }
    else if (a.length > 10) {
        msg = "Error: Phone no Must have 10 digits! ";
        error = true;
    }
    if (error) {
        eobj.innerHTML = msg;
        myform.phone.focus();
        return false;
    }
    return true;
}

function checkdob() {
    var eobj = document.getElementById('doberr');
    eobj.innerHTML = '';
    var error = false;
    var msg;
    var p = document.forms["myform"]['Day'].value;
    var q = document.forms["myform"]['Month'].value;
    var r = document.forms["myform"]['Year'].value;
    if (p == "0") {
        msg = "Error: select ur date of birth";
        myform.Day.focus();
        error = true;
    }

    else if (q == "0") {
        msg = "Error: select ur date of birth";
        myform.Month.focus();
        error = true;
    }

    else if (r == "0") {
        msg = "Error: select ur date of birth";
        myform.Year.focus();
        error = true;
    }
    if (error) {
        eobj.innerHTML = msg;
        return false;
    }
    return true;


}













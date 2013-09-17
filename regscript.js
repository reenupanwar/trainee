// validation code
var re = new RegExp("[A-z]");
var re1 = new RegExp("[0-9]");
var re2 = new RegExp("[\s]")
function valid() {
    var x = document.forms["myform"]["fname"].value;
    if (x == null || x == "") {
        alert("First name must be filled out");
        fname.focus();
        return false;
    }
    checkfname();
    var y = document.forms["myform"]["lname"].value;
    if (y == null || y == "") {
        alert("Last name must be filled out");
        lname.focus();
        return false;

    }
    checklname();
    var z = document.forms["myform"]["email"].value;
    if (z == null || z == "") {
        alert("Email-Id must be field out");
        email.focus();
        return false;
    }
    checkemail();
    /*if ((document.forms["myform"]["gender"].checked == false) &&
        (document.forms["myform"]["female"].checked == false)) {
        alert("Please Select your gender!")
        return false;
    }*/


    function getGender() {
        var radio = document.getElementsByName("gender");

        for (var i = 0; i < radio.length; i++) {
            if (radio[i].checked) {
                return radio[i].value;
            }
        }
    }

    if (!getGender()) {
        alert("Please Select your gender!")
        return false;
    }
    var b = document.forms["myform"]["password"].value;
    if (b == null || b == "") {
        alert("Please Enter ur Password");
        password.focus();
        return false;

    }
    checkpassword();
    function checkpassword() {
        if (re.test(document.forms["myform"]["password"].value) != true) {
            alert("Dont Enter space in password");
            password.focus();
            return false;
        }
    }

    var a = document.forms["myform"]["phone"].value
    if (a == null || a == "") {
        alert("Phone No. must be field out");
        phone.focus();
        return false;

    }
    checkphone();
    var p = document.forms["myform"]['Day'].value
    if (p == "0") {
        alert("select ur date of birth");
        Day.focus();
        return false;
    }
    var q = document.forms["myform"]['Month'].value
    if (q== "0") {
        alert("select ur date of birth");
        Month.focus();
        return false;
    }
    var r= document.forms["myform"]['Year'].value
    if (r == "0") {
        alert("select ur date of birth");
        Year.focus();
        return false;
    }
    function checkphone() {
        if (re1.test(document.forms["myform"]['phone'].value) != true) {
            alert("Enter numbers in Phone no.");
        }
        else {
            if (a.length < 10) {
                alert(" Phone no Must have 10 digits! ")
            }
        }
    }

    function checkemail() {
        var z = document.forms["myform"]["email"].value;

        var atpos = z.indexOf("@");
        var dotpos = z.lastIndexOf(".");
        if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= z.length) {
            alert("Not a valid e-mail address");
            return false;
        }
    }

    function checkfname() {
        if (re.test(document.forms["myform"]["fname"].value) != true) {
            alert("First name must contain Character.");
            fname.focus();
            return false;
        }
    }

    function checklname() {
        if (re.test(document.forms["myform"]["lname"].value) != true) {
            alert("Last name must contain Character.");
            lname.focus();
            return false;
        }
    }
    if(r)
    {   var txt = "Your registration has been completed.   To login click on Login button. ";

        alert (txt);
    }
    if(r)
    {document.getElementById("msg").innerHTML = "<input type='button' value='Login' class='submit' onclick='login()'> ";
    }
    console.log('z========', x);
    if (true) {
        localStorage.firstname = x;
        localStorage.lastname = y;
        localStorage.email = z;
        localStorage.password= b;
        localStorage.gender =  getGender();
        localStorage.phone= a;
        localStorage.dob = (p +"-"+ q  + "-" + r );

        document.getElementById("result").innerHTML = "First name: " + localStorage.firstname +"<br>"
        + "Last Name: " + localStorage.lastname +"<br>"
            + "Email_id: " + localStorage.email +"<br>"
            + "Password: " + localStorage.password +"<br>"
            + "Gender: " + localStorage.gender  +"<br>"
            + "Phone No: " + localStorage.phone  +"<br>"
            + "Dob: " + localStorage.dob + "<br>"
            ;
    }

    return false;



}


function login(){
    window.location.href = "login.html";
}




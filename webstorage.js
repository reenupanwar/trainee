
var db = openDatabase('regdb', '1.0', 'trialdb', 200000000);
db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS regtb(id INTEGER PRIMARY KEY   AUTOINCREMENT  ,firstname TEXT, lastname TEXT,email TEXT,password TEXT,gender TEXT,phone INTEGER,date_of_birth BLOB)', []);

});
function droptable()
{
    db.transaction(function (tx)
    {
        tx.executeSql('DROP TABLE regtb');

    });
}
function insert()
{
    var firstname= document.forms["myform"]["fname"].value;
    var lastname = document.forms["myform"]["lname"].value;
    var email = document.forms["myform"]["email"].value;
    var password = document.forms["myform"]["password"].value;
    var gender = getGenderValue();
    var phone = document.forms["myform"]["phone"].value;
    var dob = document.forms["myform"]["bday"].value;
    db.transaction(function (tx) {
        tx.executeSql("INSERT INTO regtb(firstname,lastname,email,password,gender,phone,date_of_birth)" +
            "VALUES(?, ? ,?,?,?,?,?)",
            [firstname, lastname, email, password, gender, phone, dob]);
    },function()
    {
        console.log("in error callback");
    });

}
function getGenderValue() {
    var radio = document.getElementsByName("gender");
    for (var i = 0; i < radio.length; i++) {
        if (radio[i].checked) {
            return radio[i].value;
        }
    }

}
function show(event) {
    event.preventDefault();
    document.getElementById('tablebody').innerHTML = "";
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM regtb', [], function (tx, results) {
            var newrow = '';
            //console.log(results.rows.length);
            if(results.rows.length>0)
            {
                for(var i= 0,item=null;i<results.rows.length;i++)
                {
                    item = results.rows.item(i);
                    var newrow = newrow+ "<tr><td>" + item['id'] +
                        "</td><td>" + item['firstname'] +"</td><td>"
                        + item['lastname'] +"</td><td>" + item['email'] +"</td><td>"
                        + item['password'] +"</td><td>" + item['gender'] +"</td><td>"
                        + item['phone'] + "</td><td>" + item['date_of_birth']
                        + "</td><td>" + "<input type='button' onclick='edit("+ item['id'] +");' value= Edit> " +
                        "</td><td>" +  "<input type='button' onclick='deleterow("+ item['id']+");' value= Delete> " + "</td></tr>"
                    // console.log(newrow);
                }
            }
            document.getElementById('tablebody').innerHTML +=newrow;

        }, function() {
            console.log("in error callback");
        });
    });

}

function edit(id)
{     db.transaction(
        function(tx){
            tx.executeSql('SELECT * FROM regtb WHERE id=?', [id],function(tx , result)
            {
                //console.log(result.rows.length);
                if(result.rows.length>0)
                {
                    for(var i= 0,item=null;i<1;i++)
                    {
                        item = result.rows.item(i);
                        document.forms["myform"]["fname"].value= item['firstname'];
                        document.forms["myform"]["lname"].value = item['lastname'];
                        document.forms["myform"]["email"].value = item['email'];
                        document.forms["myform"]["password"].value = item['password'] ;
                        document.forms["myform"]["hidden"].value = item['id'] ;
                        var radio = document.getElementsByName("gender");
                         if ( item['gender']== "male")
                        { radio[0].checked = true;

                        }
                        else if(item['gender']== "female")
                        { radio[1].checked = true;
                        }
                        document.forms["myform"]["phone"].value = item['phone'];
                        document.forms["myform"]["bday"].value = item['date_of_birth'];

                    }
                }

             }, function()
            {
                console.log("in error Callback");
            });
        });

}

function deleterow (id)
{ db.transaction(
    function (tx) {
        tx.executeSql('DELETE FROM regtb WHERE id=?', [id], function(tx)
        {
            alert("Row deleted");
        },function()
        { console.log("in error callback");

        });
    });
}

function update(event){
    event.preventDefault();

    var id = document.forms["myform"]["hidden"].value;
    var firstname =  document.forms["myform"]["fname"].value;
    var lastname= document.forms["myform"]["lname"].value;
    var email= document.forms["myform"]["email"].value;
    var password= document.forms["myform"]["password"].value;
    var gender = getGenderValue();
    var phone= document.forms["myform"]["phone"].value;
    var date_of_birth= document.forms["myform"]["bday"].value;

    console.log(id);

    if(id==0)
    {
        alert("no record is selected!")
    }
    else
    {
        db.transaction(
            function(tx){
                console.log('hello');
                tx.executeSql('UPDATE regtb SET firstname=?, lastname=?, email= ?,password=?,gender=?, phone=?,date_of_birth=? WHERE id=?',[firstname,lastname,email,password,gender,phone,date_of_birth,id],showandreset(event)
                    ,function()
                    { console.log("in error callback");

                    });
            });
    }
}
function showandreset(event)
{
    show(event);
    reset();
}
function reset()
{     //event.preventDefault();
    document.forms["myform"]["hidden"].value= "";
    document.forms["myform"]["fname"].value="";
    document.forms["myform"]["lname"].value="";
    document.forms["myform"]["email"].value="";
    document.forms["myform"]["password"].value="";
    var radio = document.getElementsByName("gender");
    for(var i=0;i<radio.length;i++)
    { radio[i].checked = false;

    }
    document.forms["myform"]["phone"].value="";
    document.forms["myform"]["bday"].value="";

}
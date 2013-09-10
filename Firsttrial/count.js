/**
 * Created with JetBrains WebStorm.
 * User: manusis
 * Date: 9/5/13
 * Time: 12:01 PM
 * To change this template use File | Settings | File Templates.
 */

var i=0;
function timecount()
{   i= i+1;
    postMessage(i);
    setTimeout("timecount()" ,100 );


}
timecount();
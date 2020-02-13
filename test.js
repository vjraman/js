function factorial(n)
{
    if(n==0) return 1;
    else
        return (n* factorial(n-1));
}
/*
for(let i = 1;i<=100;i++)
{
    if(i % 3 !=0 && i % 5 !=0) console.log(i);
   if(i % 3 == 0) console.log("Fizz");
   if(i % 5  ==0 && i % 3 !=0) console.log("Buzz");
}
*/

function power(base,exponent)
{
    if(exponent==0) return 1;
    return base * power(base, exponent-1);
}

function getOps(n, ops)
{
    if(n==1) {console.log(ops); return;}
    if(n % 3 == 0) { getOps(n / 3,"*3"+ops)};
    if(n - 5 > 0) {getOps(n-5, "+5"+ ops)};

}


getOps(72,"");



function getOpsF_List(target)
{
    function getOpsF(current, target, historyOps)
    {
        if (current == target) console.log(historyOps);
        if (current > target) return;
        else
        {
            getOpsF(current + 5, target, `(${historyOps} + 5)`);
            getOpsF(current * 3, target, `(${historyOps} * 3)`);
        }
    }

    return getOpsF(1,target,"1");
}

console.log("getOpsF");

getOpsF_List(24);
//console.log(factorial(5));

//console.log(0||5);


var funcs = [];
// let's create 3 functions
for (var i = 0; i < 3; i++) {
    // and store them in funcs
    funcs[i] = function() {
        // each should log its value.
      //  console.log("My value: " + i);
    };
    funcs[i]();
    if(i>0) funcs[i-1]();
}
for (var j = 0; j < 3; j++) {
    // and now let's run each one to see
    funcs[j]();
}
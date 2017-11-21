function average(arr){
    var sum = 0;
    for(var i = 0; i < arr.length; i++){
        sum += arr[i];
    }
    
    return Math.round(sum/arr.length);
}

var a = [90,91,92];
console.log(average(a));

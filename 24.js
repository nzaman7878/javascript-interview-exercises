// Implement a private variable using closures

 function createCounter(){
    // Private variable 

    let count = 0;

    // inner Function(closure)

    function increment(){
        count ++;
    console.log("Count : " ,count)
    
    }
    return{
        incrementCounter:function(){
            increment();
        },
        getCount:function(){
            return count;
        }
    }
 }

 const counter = createCounter();

 console.log(counter);
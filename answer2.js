/* Here, I'm testing all the combinations of numbers by nesting FOR loops recursively. 
*I used two variables, level and count, to keep track of how deep we are into the nested loops, 
*which prevents the program from readding every number on the line from the first index, 
*and also how many of the Z integers we have used up. 
*
*When count == Z, we know that we cannot go any deeper until we have tested the rest of the number line. 
*If that fails, the loop will exit and go back into the previous level until the whole number line is checked for Z integers 
*adding up to N.
* We can speed the process up by first sorting the number line (using the same merge-sort algorithm as before) and then breaking from
*the loop if the sum exceeds n.
*
*/

function isSumPossibleZ(a, n, z) {

    // sort function
  function mergeSort(a)
  {
    if (a.length < 2)
      return a;
 
    var middle = parseInt(a.length / 2);
    var left   = a.slice(0, middle);
    var right  = a.slice(middle, a.length);
 
    return merge(mergeSort(left), mergeSort(right));
  }
 
  function merge(left, right)
  {
    var result = [];
 
    while (left.length && right.length) {
      if (left[0] <= right[0]) {
        result.push(left.shift());
      } else {
        result.push(right.shift());
      }
    }
 
    while (left.length)
        result.push(left.shift());
 
    while (right.length)
        result.push(right.shift());
 
    return result;
  }

    
  //recursive loop function
  function LOOP(array, sum, n, z, level, count){
    //testcase 8 was failing because the original answer was just (sum == n). This became a problem when the sum was reached before we had reached the Z count (i.e the first 3 numbers added up to N and Z = 4). The count variable is subtracted by one because the Z count is increased before the loop is called again
    if(sum == n && count - 1 == z){
      return 1;
    }
    else{ 
      for(var i = level; i < array.length; i++){
        // start of the loop, calculating the sum here allows us to go multiple levels in, without problems 
        sum += array[i]; 
        // here we can break if sum exceeds N since the number line was ordered
        
        if(sum > n)
          return 0;
          
        // if we haven't reached the Z count, increase the count and go a level deeper
  	    if(count != z){
      	  level++;
          count++;
      	  var result = LOOP(array, sum, n, z, level, count);
          if(result == 1){
              return 1;
          }
          // here is where we back out of the deeper level
          count--;
          // reset the sum
          sum -= array[i];        
        }
        else{ 
          //if we are in the deepest level, we are looping on the last Z number, which is an easy test
          if(sum == n){
              return 1;
          }
          sum -= array[i];
        }
      }//for
    }//else
  }//LOOP
  if(z > a.length){
      return 0;
  }
  a = mergeSort(a);
  var result = LOOP(a, 0, n, z, 0, 1);
  if(result == 1){
  	return 1;
  }
    
}

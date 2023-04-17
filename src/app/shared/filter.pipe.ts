import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value : any[], filterString: string, propName:string): any[]
  {
    const result:any =[];
    if(!value || filterString==='' || propName ===''){
      return value;
    }
    value.forEach((a:any)=>{
      if(a[propName].trim().toLowerCase().includes(filterString.toLowerCase())){
        result.push(a);
      }
    });
    return result;
  }
    
  }


//transform() method takes three arguments
// value : an array of objects that needs to be filtered.
// filterString : a string that represents the search term that is used to filter the array.(searchKey)
// propName : a string that represents the name of the property on which the filter should be applied.('name')

// The transform() method first checks if any of the input values are missing or empty 
// (!value, filterString==='', propName ==='').
//  If any of the input values are missing or empty, the original value array is returned as is.

//If all the input values are valid, the transform() method loops through each element of the value array using the forEach() method
//it checks if the propName property (converted to lowercase and trimmed) includes the filterString (also converted to lowercase). 
//If it does, the element is added to the result array using the push() method.

//Finally, the transform() method returns the result array, which contains only the elements that match the search term in the specified property
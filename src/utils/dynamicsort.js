export const dynamicSort = (property) => {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }

    return function (a,b) {
        a= {...a,likes:a.likes.toString()}
        b= {...b,likes:b.likes.toString()}
        if(sortOrder == -1){
            return b[property].localeCompare(a[property]);
        }else{
            return a[property].localeCompare(b[property]);
        }        
    }
};
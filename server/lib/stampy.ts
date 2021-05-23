// Timestamp generator:
export const stampy = () => {
    const stamp = Date.now(); 
    let dateNow = new Date(stamp).toISOString();  // turn it to a string date
    return dateNow; 
}
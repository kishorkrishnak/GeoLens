const  generateUniqueId = () => {
    return Date.now() + Math.random().toString(36).substring(2);
}


export default generateUniqueId
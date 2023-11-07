export default{
    mark_list: (mark) => {
        return {
            _id: mark._id,
            title: mark.title,
            imagen : mark.imagen,
            imagen_home : 'http://localhost:3000'+'/api/marks/upload/mark/'+mark.imagen,
            state: mark.state
        }
    }
}
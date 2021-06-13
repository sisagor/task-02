const flash = {
    success(object, title, message){
        object.flashMessage.success({
            title : title,
            message : message,
        })
    },

    error(object, title, message){
        object.flashMessage.error({
            title : title,
            message : message,
        })
    },

    warning(object, title, message){
        object.flashMessage.warning({
            title : title,
            message : message,
        })
    },

    info(object, title, message){
        object.flashMessage.info({
            title : title,
            message : message,
        })
    },
}

export default flash;
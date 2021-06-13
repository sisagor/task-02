const functions = {

    reload(){
       return window.history.go();
    },

    lazyReload (second = 2000){
        setTimeout(function(){
            return window.history.go();
        }, second);
    },

    hideModal(object, id){
        return object.$bvModal.hide(id);
    },

    showModal(object, id){
        return object.$bvModal.show(id);
    },

}

export default functions;
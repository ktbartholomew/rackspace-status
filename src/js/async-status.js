var AsyncStatus = {
    tasks: {
        unresolvedIncidents: {
            done: false
        }
    },
    complete: function (task) {
        if(typeof this.tasks[task] === 'undefined') {
            return;
        }

        this.tasks[task].done = true;
    }
};

module.exports = AsyncStatus;

export default {
    async initSync(todoList) {
        const results = [];
        const tasks = todoList.map((task, index) => {
            return new Promise((resolve) => {
                task((data) => {
                    results[index] = data;
                    resolve();
                })
            })
        })
        await Promise.all(tasks);
        return results;
    },
    debounce: (fn, time) => {
        let timeId = null;
        return function() {
            let args = arguments;
            if(timeId) {
                clearTimeout(timeId);
                timeId = null;
            }
            timeId = setTimeout(() => {
                fn.apply(this, args);
            }, time);
        }
    }
}
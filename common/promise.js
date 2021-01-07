class Promise {
    constructor(exector) {
        this.status = 'pending';
        this.value = undefined;
        this.reason = undefined;
        this.onReslovedCallbacks = [];
        this.onRejcetedCallbacks = []
        let reslove = value => {
            if (this.status == 'pending') {
                this.status = 'resloved';
                this.value = value;
                this.onReslovedCallbacks.forEach(cb => cb())
            }
        }
        let reject = reson => {
            if (this.status == 'pending') {
                this.status = 'rejected';
                this.reson = reson;
                this.onRejcetedCallbacks.forEach(cb => cb())
            }
        }
        try {
            exector(reslove, reject);
        } catch (error) {
            reject(error)
        }
    }
    then(onFulFilled, onRejected) {
        onFulFilled = typeof onFulFilled === 'function' ? onFulFilled : value => value;
        onRejected = typeof onRejected === 'function' ? onRejected : error => { throw error }
        let promise2 = new Promise((reslove, reject) => {
            if (this.status == 'reslove') {
                setTimeout(() => {
                    try {
                        //将上次一then里面的方法传递进下一个Promise的状态
                        const value = onFulFilled(this.value);
                        reslove(value);
                    } catch (error) {
                        reject(error);
                    }
                }, 0)
            } else if (this.status == 'rejected') {
                setTimeout(() => {
                    try {
                        const reason = onRejected(this.reason);
                        reject(reason);
                    } catch (error) {
                        reject(error);
                    }
                }, 0)
            } else if (this.status == 'pending') {
                this.onRejcetedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            //将上次一then里面的方法传递进下一个Promise的状态
                            const value = onFulFilled(this.value);
                            reslove(value);
                        } catch (error) {
                            reject(error);
                        }
                    }, 0)
                })
                this.onReslovedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            const reason = onRejected(this.reason);
                            reject(reason);
                        } catch (error) {
                            reject(error);
                        }
                    }, 0)
                })
            }
        })
        return promise2
    }
    catch(fn) {
        return this.then(null, fn)
    }
    static reslove(val) {
        return new Promise((reslove, reject) => {
            reslove(val)
        })
    }
    static reject(error) {
        return new Promise((reslove, reject) => {
            reject(error)
        })
    }
    static race(promises) {
        return new Promise((reslove, reject) => {
            for (let i = 0; i < promises.length; i++) {
                promises[i].then(value => { reslove(value) }, reason => { reject(reason) });
            }
        })
    }
    //all方法(获取所有的promise，都执行then，把结果放到数组，一起返回)
    static all(promises) {
        const result = [];
        const len = promises.length;
        let index = 0;//记录resolve的promise实例数
        return new Promise((reslove, reject) => {
            for (let i = 0; i < len; i++) {
                promises[i].then(data => {
                    result[i] = data;
                    index++;
                    // 所有的promise都成功了
                    if (index === len) {
                        reslove(result);
                    }
                }, reason => {
                    reject(reason);
                })
            }
        })
    }
}
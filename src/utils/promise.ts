interface handler {
  onFulFilled: Function;
  onRejected: Function;
  reslove: Function;
  reject: Function;
}

const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
  private state = PENDING;

  private result = undefined;

  private handlers: Array<handler> = [];

  private isPromiseLike() {
    return false;
  }

  private changeState(state: string, result: any) {
    if (this.state !== PENDING) return;
    this.state = state;
    this.result = result;
    this.run();
  }

  private runMicroTask(func: Function) {
    setTimeout(func, 0);
  }

  private runOne(callback: unknown, reslove: Function, reject: Function) {
    this.runMicroTask(() => {
      if (typeof callback === 'function') {
        try {
          const data = callback(this.result);
          if (this.isPromiseLike()) {
            data.then(reslove, reject);
          } else {
            reslove(data);
          }
        } catch (error) {
          reject(this.result);
        }
      } else {
        const settled = this.state === FULFILLED ? reslove : reject;
        settled(this.result);
      }
    });
  }

  private run() {
    if (this.state === PENDING) return;
    while (this.handlers.length) {
      const { onFulFilled, onRejected, reslove, reject } = this.handlers.shift() as handler;
      if (this.state === FULFILLED) {
        this.runOne(onFulFilled, reslove, reject);
      } else {
        this.runOne(onRejected, reslove, reject);
      }
    }
  }

  constructor(executor: Function) {
    const reslove = (data: any) => {
      // 改变当前promise状态 pending -> reslove
      this.changeState(FULFILLED, data);
    };
    const reject = (reason: any) => {
      // 改变当前promise状态 pending -> rejected
      this.changeState(REJECTED, reason);
    };
    try {
      executor(reslove, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulFilled: Function, onRejected: Function) {
    return new MyPromise((reslove: Function, reject: Function) => {
      this.handlers.push({
        onFulFilled,
        onRejected,
        reslove,
        reject,
      });
      this.run();
    });
  }
}

export default MyPromise;

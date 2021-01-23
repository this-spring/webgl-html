/*
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2021-01-23 12:16:26
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2021-01-23 14:46:38
*/

function Debug(...arg) {
    console.log(...arg);
}

class GlHtml {
    constructor(option) {
        this.el = document.getElementById(option.el);
        this.ctx = this.el.getContext('2d');
        this.ctx.textBaseline = 'top';
        this.ctx.font = '16px Arial';
        this.data = option.data;
        // bind data
        this.p = this._proxyData();
        this.task = [];
        
        for (let k in this.data) {
            // Debug(' ob ', k, this.p[k]);
            this.p[k] = this.data[k];
        }
    }

    _proxyData() {
      const _self = this;
      const p = new Proxy(this.data, {
          set(obj, key, newV) {
            Debug(' set :', obj, key, newV);
            // if (_self.data[key] === newV) {
            //     Debug(' val not change');
            //     return;
            // }
            const oldV = _self.data[key];
            _self.data[key] = newV;
            _self._darwText(oldV.x, oldV.y, newV.value, newV.x, newV.y);
            return true;
          },
          get(obj, key) {
            Debug(' get:', obj, key);
            return _self[key];
          },
      });
      return p;
    }

    _darwText(ox, oy, text, x, y) {
        Debug(ox, oy, text, x, y);
        this.task.push({
            ox,
            oy,
            text,
            x,
            y
        });
        setTimeout(() => {
            this._doTask();
        }, 0);
    }

    _doTask() {
        for (let i = 0, len = this.task.length; i < len; i += 1) {
            const item = this.task.shift();
            const clearW = this.ctx.measureText(item.text).width;
            this.ctx.clearRect(item.ox, item.oy, clearW, 16);
            this.ctx.fillText(item.text, item.x, item.y);
        }
    }

}

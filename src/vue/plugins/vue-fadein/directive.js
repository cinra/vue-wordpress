import Vue from 'vue'

function throttle (fn, delay) {
  var now, lastExec, timer, context, args;

  var execute = function () {
    fn.apply(context, args);
    lastExec = now;
  };

  return function () {
    context = this;
    args = arguments;

    now = Date.now();

    if (timer) {
        clearTimeout(timer);
        timer = null;
    }

    if (lastExec) {
        var diff = delay - (now - lastExec);
        if (diff < 0) {
            execute();
        } else {
            timer = setTimeout(function () {
                execute();
            }, diff);
        }
    } else {
        execute();
    }
  };
}

function triggerEvent(element, event) {
   if (document.createEvent) {
       var evt = document.createEvent("HTMLEvents");
       evt.initEvent(event, true, true ); // event type, bubbling, cancelable
       return element.dispatchEvent(evt);
   } else {
       // IE
       var evt = document.createEventObject();
       return element.fireEvent("on"+event, evt)
   }
}

export default {
  doCheck: function (e) {
    if((this.scrollEventTarget.getBoundingClientRect().top + this.options.offset) > (window.innerHeight * 0.7)) {
      return;
    }

    this.scrollEventTarget.style.opacity = 1;
    this.scrollEventTarget.style.transform = 'translate3d(0, 0, 0)';
  },
  bind: function (el, bindings, vnode) {
    if(bindings.fadeinBinded) return;
    bindings.fadeinBinded = true;

    const v = bindings.value || {};
    bindings.options = {
      direction: v.direction || 'top',
      distance: v.distance || '60px',
      offset: v.offset || 0,
      duration: v.duration || 800,
      ease: v.ease || 'ease',
    };

    const xPos = bindings.options.direction !== 'top' ? bindings.options.direction === 'right' ? `-${bindings.options.distance}` : bindings.options.distance : 0;
    const yPos = !bindings.options.direction.match(/left|right/) ? bindings.options.distance : 0;

    bindings.scrollEventTarget = el;
    bindings.scrollEventTarget.style.opacity = 0;
    bindings.scrollEventTarget.style.transform = `translate3d(${xPos}, ${yPos}, 0)`;
    bindings.scrollEventTarget.style.transition = `${ bindings.options.duration / 1000 }s 0s ${ bindings.options.ease }`;
    bindings.scrollEventTarget.style.transitionProperty = `opacity, transform`;

    bindings.scrollListener = throttle(bindings.def.doCheck.bind(bindings), 200);
    window.addEventListener('scroll', bindings.scrollListener);

    vnode.context.$nextTick(() => {
      triggerEvent(window, 'scroll');
    })
  },
  update: function (el, bindings) {

  },
  unbind: function (el, bindings) {
    window.removeEventListener('scroll', bindings.scrollListener, false);
  }
}
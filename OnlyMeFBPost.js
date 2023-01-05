javascript: (function r(id = 0, r = 0) {
  /*scrolling inspired by https://github.com/phstc/scroll-it/blob/master/scroll-it.js*/
  function scrolling(){
    var speed=10;
    var maxspeed=10;
    var slowStart=true;
    if(window.scrollIt === undefined){
      window.scrollIt = {
        intervalId: null
      };
    }
    function getScrollMaxSize(){
      return document.body.clientHeight;
    };
    function getScrollCurrentSize(){
      return document.documentElement.scrollTop;
    };
    var scroll = function(){
      window.scrollIt.initialSize = getScrollCurrentSize();
      window.scrollIt.scrolled = getScrollCurrentSize();
      window.scrollIt.scrolled += speed;
      window.scrollTo(0, window.scrollIt.scrolled);
      if(window.scrollIt.scrolled >= getScrollMaxSize()){
        window.scrollIt.scrolled = window.scrollIt.initialSize ;
        if(slowStart){
          speed=speed/2+1;
          maxspeed=speed;
          slowStart=false;
        } else{
          speed=speed/2+1;
          maxspeed=speed;
        }
      } else {
        if(slowStart){
          speed*=2;
        } else {
          speed+=(maxspeed-speed)^4
        }
      }
    };
    var stop = function(){
      window.clearInterval(window.scrollIt.intervalId);
      window.scrollIt.intervalId = null;
    };
    var start = function(){
       speed=10;
    maxspeed=10;
    slowStart=true;
      window.scrollIt.intervalId = window.setInterval(scroll, 1000);
    };
    if(window.scrollIt.intervalId != null){
      stop();
    } else {
      start();
    };
  }
  scrolling()
  function run(id=0,r=0){
    try {
      let temp = id;
      let all = Array.from(
        document.querySelectorAll('div[aria-label="Edit Privacy"]')
      )
        .filter(() => {
          if (temp > 0) {
            temp--;
            return false;
          }
          return true;
        })
        .map((div) => {
          return div.parentNode;
        });
      if (all.length <= id) {
        if (
          document.querySelector('div[aria-label="Edit Privacy"]') == null ||
          r > 3
        ) {
          console.log("Out of acceptance, aborting function");
          setTimeout(()=>run(id,0),10000)
          return;
        }
            timer = setTimeout(function () {
              run(id, r + 1);
            }, 150);
        return;
      }
      id = id + all.length;
      r = 0;
      console.log(all.length + " Elements found, Beginning...");
      /*handleParentDivs */
      function handleParentDivs(all, i = 0) {
        if (i >= all.length) return;
        var x = all[i];
        console.log("next element");
              x.click();
              console.log("Clicked on 1 element");
              var i1, i2, i3;
              i1 = setInterval(function () {
                console.log("i1 running");
                document.querySelectorAll("div[role=radio]").forEach((act) => {
                  if (act.innerText.match(/Only me/)) {
                    act.click();
                    console.log("Selected Only me");
                    clearInterval(i1);
                    i2 = setInterval(function () {
                      console.log("i2 running");
                      var doneButton = document.querySelector(
                        'div[aria-label="Done"]'
                      );
                      var saveButton = document.querySelector(
                        'div[aria-label="Save"]'
                      );
                      if (saveButton != null) {
                        saveButton.click();
                        console.log("Saved");
                        clearInterval(i1);
                        clearInterval(i2);
                        clearTimeout(i3);
                        handleParentDivs(all, i + 1);
                      } else if (doneButton != null) {
                        doneButton.click();
                        console.log("Done (already set to only me)");
                        clearInterval(i1);
                        clearInterval(i2);
                        clearTimeout(i3);
                        handleParentDivs(all, i + 1);
                      }
                    }, 200);
                  }
                });
              }, 200);
              i3 = setTimeout(() => {
                clearInterval(i1);
                clearInterval(i2);
                clearTimeout(i3);
                console.log("Time outed, clearing the interval, continuing...");
                handleParentDivs(all, i + 1);
              }, 2000);
              console.log("1 element done");
      }
      handleParentDivs(all);
      /*handleParentDivs */
      console.log("Continue with " + id);
      run(id);
    } catch (e) {
      console.log(e);
      clearInterval(i1);
      clearInterval(i2);
      return;
    }
  }
  run()
})();

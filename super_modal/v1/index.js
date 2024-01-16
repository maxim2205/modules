

// необходимо обернуть все модальные окна в контейнер и задать в init, init({selector: "selector})
const super_modal = {
    container: null,
    init: options => {
        super_modal.container = options.selector;
        let super_modal_styles = document.createElement("style");
        super_modal_styles.innerHTML = 'body{margin:0}body.super_modal_open{overflow:hidden}body .super_modal{z-index:1000000;position:fixed;top:0;left:0;right:0;bottom:0;visibility:hidden;font-size:16px;box-sizing:border-box;display:flex;align-items:flex-end;justify-content:center;padding:2rem 0 0 0}@media screen and (min-width: 576px){body .super_modal{padding:2em;align-items:center}}body .super_modal .super_modal_overlay{position:absolute;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0);transition:.2s;z-index:1000001;box-sizing:border-box}body .super_modal .super_modal_close{position:absolute;width:2.5em;height:2.5em;z-index:1000003;right:1em;top:1em;background:rgba(0,0,0,.75);cursor:pointer;border-radius:50%;box-sizing:border-box;display:flex;align-items:center;justify-content:center}body .super_modal .super_modal_close.button_hidden{display:none}body .super_modal .super_modal_close svg{width:60%}body .super_modal .super_modal_close svg path{fill-opacity:.85}body .super_modal .super_modal_close:hover{background:rgba(0,0,0,.85)}body .super_modal .super_modal_close:hover svg path{fill-opacity:1}@media screen and (min-width: 576px){body .super_modal .super_modal_close{width:3em;height:3em;right:2em;top:2em}}body .super_modal .super_modal_container{max-height:100%;width:100%;box-sizing:border-box;transform:translateY(100%);transition:.2s;z-index:1000002;overflow:auto}@media screen and (min-width: 576px){body .super_modal .super_modal_container{opacity:0;width:auto;transform:translateY(0)}}body .super_modal .super_modal_container>*{margin-left:auto;margin-right:auto}body .super_modal.open{visibility:visible !important}body .super_modal.open .super_modal_overlay{background:rgba(0,0,0,.85)}body .super_modal.open .super_modal_container{transform:translateY(0)}@media screen and (min-width: 576px){body .super_modal.open .super_modal_container{opacity:1}}';
        document.querySelector("head").append(super_modal_styles);
        let super_modal_main = document.createElement("div");
        super_modal_main.classList.add("super_modal");
        let super_modal_overlay = document.createElement("div");
        super_modal_overlay.addEventListener("click", function () {
            if ( super_modal.overlay_close ) {
                super_modal.close();
            }
        });
        super_modal_overlay.classList.add("super_modal_overlay");
        super_modal_main.append(super_modal_overlay);
        let super_modal_close = document.createElement("div");
        super_modal_close.addEventListener("click", function () {
            super_modal.close();
        });
        super_modal_close.classList.add("super_modal_close");
        super_modal_close.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 10.586L16.2426 6.34338C16.6332 5.95285 17.2663 5.95285 17.6569 6.34338C18.0474 6.7339 18.0474 7.36707 17.6569 7.75759L13.4142 12.0002L17.6569 16.2429C18.0474 16.6334 18.0474 17.2666 17.6569 17.6571C17.2663 18.0476 16.6332 18.0476 16.2426 17.6571L12 13.4144L7.75736 17.6571C7.36683 18.0476 6.73367 18.0476 6.34315 17.6571C5.95262 17.2666 5.95262 16.6334 6.34315 16.2429L10.5858 12.0002L6.34315 7.75759C5.95262 7.36707 5.95262 6.7339 6.34315 6.34338C6.73367 5.95285 7.36684 5.95285 7.75736 6.34338L12 10.586Z" fill="#fff"></path></svg>';
        super_modal_main.append(super_modal_close);
        super_modal_overlay.classList.add("super_modal_overlay");
        super_modal_main.append(super_modal_overlay);
        let super_modal_container = document.createElement("div");
        super_modal_container.classList.add("super_modal_container");
        super_modal_main.append(super_modal_container);
        document.body.append(super_modal_main);
    },
    set_padding: padding =>  {
        // для изменения padding .super_modal
        document.querySelector(".super_modal").style.padding = padding;
    },
    open: options => {
        // selector - js селектор контейнера с модальным окном
        // overlay_close - можно передать false, тогда модальное окно не будет закрываться при клике по overlay
        // button_close - можно передать false, тогда скроется кнопка закрытия модального окна
        super_modal.overlay_close = options["overlay_close"] !== undefined ? options["overlay_close"] : true;
        if ( options["button_close"] === false ) {
            document.querySelector(".super_modal_close").classList.add("button_hidden");
        }
        document.querySelector(".super_modal_container").insertBefore(document.querySelector(options["selector"]), null);
        document.querySelector("body").classList.add("super_modal_open");
        document.querySelector(".super_modal").classList.add("open");
        if ( options.onopen ) {
            setTimeout(options.onopen, 500);
        }
        super_modal.onclose = options.onclose || null;
    },
    close: options =>  {
        document.querySelector(".super_modal").classList.remove("open");
        document.querySelector("body").classList.remove("super_modal_open");
        let content = document.querySelector(".super_modal_container *");
        setTimeout(function () {
            document.querySelector(super_modal.container).insertBefore(content, null);
            super_modal.overlay_close = true;
            document.querySelector(".super_modal_close").classList.remove("button_hidden");
        }, 300);
        if ( super_modal.onclose ) {
            setTimeout(function () {
                try {
                    super_modal.onclose(content);
                } catch (e) { console.error(e)}
                super_modal.onclose = null;
            }, 300);
        }
    }
}

export {super_modal};
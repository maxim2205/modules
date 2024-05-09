import sleep from "./sleep.js";

class Modal {
    container
    overlay_close = true;
    onclose = null;
    constructor(options) {
        this.container = options.container;
        const self = this;

        let super_modal_main = document.createElement("div");
        super_modal_main.classList.add("super_modal");
        let super_modal_overlay = document.createElement("div");
        super_modal_overlay.addEventListener("click", function () {
            if ( self.overlay_close ) {
                self.close();
            }
        });
        super_modal_overlay.classList.add("super_modal_overlay");
        super_modal_main.append(super_modal_overlay);
        let super_modal_close = document.createElement("div");
        super_modal_close.addEventListener("click", function () {
            self.close();
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
    }

    set_padding (padding)  {
        // для изменения padding .super_modal
        document.querySelector(".super_modal").style.padding = padding;
    }

    async open (options) {
        // selector - js селектор контейнера с модальным окном
        // overlay_close - можно передать false, тогда модальное окно не будет закрываться при клике по overlay
        // button_close - можно передать false, тогда скроется кнопка закрытия модального окна
        this.overlay_close = options["overlay_close"] !== undefined ? options["overlay_close"] : true;
        if ( options["button_close"] === false ) {
            document.querySelector(".super_modal_close").classList.add("button_hidden");
        }
        document.querySelector(".super_modal_container").insertBefore(document.querySelector(options["selector"]), null);
        document.querySelector("body").classList.add("super_modal_open");
        document.querySelector(".super_modal").classList.add("open");
        await sleep(300);
        if ( options.onopen ) {
            options.onopen();
        }
        this.onclose = options.onclose || null;
    }

    async close ()  {
        document.querySelector(".super_modal").classList.remove("open");
        document.querySelector("body").classList.remove("super_modal_open");
        let content = document.querySelector(".super_modal_container *");
        await sleep(300);
        document.querySelector(this.container).insertBefore(content, null);
        document.querySelector(".super_modal_close").classList.remove("button_hidden");
        if ( this.onclose ) {
            try {
                this.onclose(content);
            } catch (e) { console.error(e) }
        }
    }
}

export default Modal;
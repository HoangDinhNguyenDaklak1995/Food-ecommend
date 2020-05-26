class UI {
    hidePreLoader() {
        document.querySelector('.preloader').style.display = "none";
    }
    showNAV() {
        document.querySelector('.nav').classList.toggle('nav--show');
    }
    videoControl() {
        let btn = document.querySelector('.video__switch-btn');
        if (!btn.classList.contains('btnSlider')) {
            btn.classList.add('btnSlider');
            document.querySelector('.video__item').pause();
        } else {
            btn.classList.remove('btnSlider');
            document.querySelector('.video__item').play();
        }
    }
    checkEmpty(name, lastname, email) {
        let resuit;
        if (name === '' || lastname === '' || email === '') {
            resuit = false;
        } else {
            resuit = true;
        }
        return resuit;
    }
    showFeedback(text, type) {
        const feedback = document.querySelector('.food-form__feedback');
        if (type == 'success') {
            feedback.classList.add('success');
            feedback.innerText = text;
            this.removeAlert('success');
        } else {
            feedback.classList.add('error');
            feedback.innerText = text;
            this.removeAlert('error');
        }
    }
    removeAlert(type) {
        setTimeout(function () {
            document.querySelector('.food-form__feedback').classList.remove(type);
        }, 3000);
    }
    addCustomer(customer) {
        const image = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        let random = Math.floor(Math.random() * image.length);
        const div = document.createElement('div');
        div.classList.add('person');
        div.innerHTML = `
            <img src="../static/images/Rectangle${random}.jpg" alt="" class="person__thumbnail" />
            <h4 class="person__name">${customer.name}</h4>
            <h4 class="person__last-name">${customer.lastname}</h4> `;
        document.querySelector('.food-card__list').appendChild(div);
    }
    clearFields() {
        document.querySelector('.input-name').value = '';
        document.querySelector('.input-lastname').value = '';
        document.querySelector('.input-email').value = '';
    }
    showModal(event) {
        event.preventDefault();
        if (event.target.parentElement.classList.contains('work-item__icon'));
        let id = event.target.parentElement.dataset.id;
        const modal = document.querySelector('.work-modal');
        const modalItem = document.querySelector('.work-modal__item');
        modal.classList.add('work-modal--show');
        modalItem.style.background = `url(../static/images/Rectangle${id}.jpg)`;
        modalItem.classList.add('work-modal-repeat');
    }
    closeModal() {
        document.querySelector('.work-modal').classList.remove('work-modal--show')
    }
}
eventListener();
function eventListener() {
    const ui = new UI();
    window.addEventListener('load', () => ui.hidePreLoader());
    document.querySelector('.navBtn').addEventListener('click', () => ui.showNAV());
    document.querySelector('.video__switch').addEventListener('click', () => ui.videoControl());
    document.querySelector('.food-form').addEventListener('submit', function (event) {
        event.preventDefault();
        const name = document.querySelector('.input-name').value;
        const lastname = document.querySelector('.input-lastname').value;
        const email = document.querySelector('.input-email').value;
        let value = ui.checkEmpty(name, lastname, email);
        if (value) {
            let customer = new Customer(name, lastname, email);
            ui.addCustomer(customer);
            ui.showFeedback('Customer added to the list', 'success');
            ui.clearFields();
        } else {
            ui.showFeedback('Some form value empty', 'error');
        }
    });
    document.querySelector('.work-modal__close').addEventListener('click', function () {
        ui.closeModal();
    });
    const links = document.querySelectorAll('.work-item__icon');
    links.forEach(function (item) {
        item.addEventListener('click', function () {
            ui.showModal(event);
        })
    })
};
function Customer(name, lastname, email) {
    this.name = name;
    this.lastname = lastname;
    this.email = email;
}


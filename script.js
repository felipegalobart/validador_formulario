let validator = {
    handleSubmit: (event) => {
        event.preventDefault();
        let send = true;

        let inputs = form.querySelectorAll('input');

        for (let i = 0; i < inputs.length; i++) {
            let input = inputs[i];
            let check = validator.checkInput(input);
            if (check !== true) {
                send = false;
                validator.showError(input, check);
            }
        }

        if (send) {
            form.submit();
        }

    },
    checkInput: (input) => {
        let rules = input.getAttribute('data-rules');

        if (rules !== null) {
            rules = rules.split('|');

            for (let k in rules) {
                let rDetails = rules[k].split('=');
                switch (rDetails[0]) {
                    case "required":
                        if (input.value == '') {
                            return "Campo não pode ser vazio";
                        }
                        break;
                    case "min":
                        if (input.value.length < rDetails[1]) {
                            return "Campo deve ter pelo menos " + rDetails[1] + " caracteres";
                        }
                        break;
                    case "email":
                        if (!input.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
                            return "Email inválido";
                        }
                        
                        break;    
                }
            }
        }

        return true;
    },
    showError: (input, error) => {
        input.style.border = '3px solid red';
        input.placeholder = error;
    }
};

let form = document.querySelector('.validator');
form.addEventListener('submit', validator.handleSubmit);

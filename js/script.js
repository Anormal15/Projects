let calendar = document.querySelector('.calendar')

const month_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 ===0)
}

getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28
}

generateCalendar = (month, year) => {

    let calendar_days = calendar.querySelector('.calendar-days')
    let calendar_header_year = calendar.querySelector('#year')

    let days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    calendar_days.innerHTML = ''

    let currDate = new Date()
    if (!month) month = currDate.getMonth()
    if (!year) year = currDate.getFullYear()

    let curr_month = `${month_names[month]}`
    month_picker.innerHTML = curr_month
    calendar_header_year.innerHTML = year

    // get first day of month
    
    let first_day = new Date(year, month, 1)

    for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
        let day = document.createElement('div')
        if (i >= first_day.getDay()) {
            day.classList.add('calendar-day-hover')
            day.innerHTML = i - first_day.getDay() + 1
            day.innerHTML += `<span></span>
                            <span></span>
                            <span></span>
                            <span></span>`
            if (i - first_day.getDay() + 1 === currDate.getDate() && year === currDate.getFullYear() && month === currDate.getMonth()) {
                day.classList.add('curr-date')
            }
        }
        calendar_days.appendChild(day)
    }
}

let month_list = calendar.querySelector('.month-list')

month_names.forEach((e, index) => {
    let month = document.createElement('div')
    month.innerHTML = `<div data-month="${index}">${e}</div>`
    month.querySelector('div').onclick = () => {
        month_list.classList.remove('show')
        curr_month.value = index
        generateCalendar(index, curr_year.value)
    }
    month_list.appendChild(month)
})

let month_picker = calendar.querySelector('#month-picker')

month_picker.onclick = () => {
    month_list.classList.add('show')
}

let currDate = new Date()

let curr_month = {value: currDate.getMonth()}
let curr_year = {value: currDate.getFullYear()}

generateCalendar(curr_month.value, curr_year.value)

document.querySelector('#prev-year').onclick = () => {
    --curr_year.value
    generateCalendar(curr_month.value, curr_year.value)
}

document.querySelector('#next-year').onclick = () => {
    ++curr_year.value
    generateCalendar(curr_month.value, curr_year.value)
}

let dark_mode_toggle = document.querySelector('.dark-mode-switch')

dark_mode_toggle.onclick = () => {
    document.querySelector('body').classList.toggle('light')
    document.querySelector('body').classList.toggle('dark')
}

document.querySelectorAll('.calendar-days div').forEach(day => {
    day.addEventListener('click', function() {
        // Remover a classe 'selected' de todos os dias
        document.querySelectorAll('.calendar-days div').forEach(day => {
            day.classList.remove('selected');
        });

        // Adicionar a classe 'selected' ao dia clicado
        this.classList.add('selected');
    });
});

// Obtendo referência para o modal
let modal = document.getElementById("modal");

// Obtendo referência para o botão de fechar do modal
let closeButton = document.getElementsByClassName("close")[0];

// Adicionando um ouvinte de evento de clique ao botão de fechar do modal
closeButton.onclick = function() {
    modal.style.display = "none";
}

// Adicionando um ouvinte de evento de clique ao redor do modal para fechá-lo
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Selecionando todos os elementos de dia do calendário
let calendarDays = document.querySelectorAll('.calendar-days div');

// Adicionando um ouvinte de evento de clique a cada dia do calendário
calendarDays.forEach(day => {
    day.addEventListener('click', function() {
        // Remover a classe 'selected' de todos os dias
        calendarDays.forEach(day => {
            day.classList.remove('selected');
        });

        // Adicionar a classe 'selected' ao dia clicado
        this.classList.add('selected');

        // Abrir o modal
        modal.style.display = "block";
    });
});

// Fecha o modal ao carregar a página
modal.style.display = "none";

// Selecionando o botão "Adicionar" do modal
let addDescButton = document.getElementById("add-desc");

// Adicionando um ouvinte de evento de clique ao botão "Adicionar"
addDescButton.onclick = function() {
    // Oculta o conteúdo atual do modal
    document.querySelector('.modal-content').style.display = "none";
    // Exibe o novo conteúdo para selecionar ícone e horário
    document.getElementById('icon-time-content').style.display = "block";
};

// Selecionando o botão "Salvar" do modal
let saveEventButton = document.getElementById("save-event");

// Função para adicionar evento à div de eventos
function adicionarEvento(descricao, icone, horario, data) {
    let eventosDiv = document.querySelector('.eventos');
    let novoEvento = document.createElement('button');
    novoEvento.innerHTML = `${icone} - ${descricao} (${horario} - ${data})`;
    eventosDiv.appendChild(novoEvento);
}

// Adicionando um ouvinte de evento de clique ao botão "Salvar"
saveEventButton.onclick = function() {
    // Obtendo a descrição do evento digitada pelo usuário
    let descricaoEvento = document.getElementById("descricao").value;
    // Obtendo o ícone selecionado pelo usuário
    let selectedIcon = document.getElementById("icon-select").value;
    // Obtendo o horário selecionado pelo usuário
    let selectedTime = document.getElementById("time-select").value;
    // Obtendo a data selecionada no calendário
    let selectedDate = document.querySelector('.calendar-days div.selected').innerText;

    // Chamando a função para adicionar o evento à div de eventos
    adicionarEvento(descricaoEvento, selectedIcon, selectedTime, selectedDate);

    // Fechando o modal após salvar
    modal.style.display = "none";
};

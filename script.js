window.addEventListener('load', function () {
    // skriv in användare namn // 
    let usernameInput = document.getElementById('username');
    let confirmUsernameButton = document.querySelector('.confirm-username');
    let playButton = document.querySelector('.play');
    let displayedUsername = document.getElementById('displayedUsername');
    let gameContainer = document.querySelector('.game');

    // att bekräfta namnet //
    confirmUsernameButton.addEventListener('click', function () {
        let username = usernameInput.value.trim();
        if (username !== '') {
            playButton.removeAttribute('disabled');
            displayedUsername.innerText = username;
            gameContainer.removeChild(document.querySelector('.username-container'));
        } else {
            alert('Please enter a valid username.');
            
        }
         });

    // Event listener for the confirmUsernameButton click
    confirmUsernameButton.addEventListener('click', confirmUsername);

    // Event listener for the Enter key in the usernameInput
    usernameInput.addEventListener('keyup', function (event) {
        if (event.key === 'Enter' && !blocked) {
            confirmUsername();
        }
    });

    let countUser = document.querySelector('.count-user');
    let countComp = document.querySelector('.count-comp');
    let userField = document.querySelector('.user-field');
    let compField = document.querySelector('.comp-field');
    let sound = document.querySelector('.sound');
    let res = document.querySelector('.result');
    let fields = document.querySelectorAll('.field');
    let userStep, compStep, countU = 0, countC = 0, blocked = false;
// När dator väljer mina knappar är ur funktion så jag kan inte ändra mitt svar //
    function choiceUser(e) {
        if (blocked) return;
        let target = e.target;
        if (target.classList.contains('field')) {
            userStep = target.dataset.field;
            fields.forEach(item => item.classList.remove('active', 'error'));
            target.classList.add('active');
            choiceComp();
        }
    }

    function choiceComp() {
        blocked = true;
        let rand = Math.floor(Math.random() * 3);
        compField.classList.add('blink');
        let compFields = compField.querySelectorAll('.field');
// det tar 3 sek för datorn att välja en av variant  //
        setTimeout(() => {
            compField.classList.remove('blink');
            compStep = compFields[rand].dataset.field;
            compFields[rand].classList.add('active');
            winner();
        }, 3000);
    }

    function winner() {
        blocked = false;

        let comb = userStep + compStep;
                                             // lika//
        switch (comb) {
            case 'rr': // sten- sten //
            case 'ss':// sax -sax//
            case 'pp': //påse -påse//
                res.innerText = 'Draw!';
                sound.setAttribute('src', 'audio/draw.mp3');
                sound.play();
                break;
                                               // spelare vann//
            case 'rs':
            case 'sp':
            case 'pr':
                res.innerText = 'You won!';
                sound.setAttribute('src', 'audio/win.mp3');
                sound.play();
                countU++;
                countUser.innerText = countU;
                compField.querySelector('[data-field=' + compStep + ']').classList.add('error');
                break;
                                                // datorn vann//
            case 'sr':
            case 'ps':
            case 'rp':
                res.innerText = 'Computer won!';
                sound.setAttribute('src', 'audio/loss.mp3');
                sound.play();
                countC++;
                countComp.innerText = countC;
                userField.querySelector('[data-field=' + userStep + ']').classList.add('error');
                break;
        }

        // Spelare eller dator vinner när det går upp till  3 påängar och spelet startas om //
       
if (countU === 3 || countC === 3) {
    let winnerMessage = (countU === 3 ? 'Du' : 'Datorn') + ' vann! Starta om spelet ? .';
    
    // Alert overlay funktion//
    let alertOverlay = document.createElement('div');
    alertOverlay.classList.add('alert-overlay');

    let alertBox = document.createElement('div');
    alertBox.classList.add('alert-box');

    let alertMessage = document.createElement('p');
    alertMessage.classList.add('alert-message');
    alertMessage.innerText = winnerMessage;

    let alertButton = document.createElement('button');
    alertButton.classList.add('alert-btn');
    alertButton.innerText = 'OK';
    alertButton.addEventListener('click', function () {
        alertOverlay.parentNode.removeChild(alertOverlay);
        // Reset the game
        countU = countC = 0;
        countUser.innerText = '0';
        countComp.innerText = '0';
        playGame();
    });

    alertBox.appendChild(alertMessage);
    alertBox.appendChild(alertButton);
    alertOverlay.appendChild(alertBox);

    document.body.appendChild(alertOverlay);
}

    }
    function playGame() {
        // Reset the game and enable input fields
        blocked = false;
        usernameInput.removeAttribute('disabled');
        confirmUsernameButton.removeAttribute('disabled');
        // ... (rest of the playGame function)
    }

    playButton.addEventListener('click', playGame);
});
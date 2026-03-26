var gameScene = document.querySelector('.game__scene');
var loadingPage = document.querySelector('.loading__page');

var playButton = document.getElementById('play-button');

var isPlaying = false;

// AUDIOS
var backgroundAudio = document.getElementById('background');
var deathAudio = document.getElementById('death');
var gunAudio = document.getElementById('gun');
var walkingAudio = document.getElementById('walking');
var warningAudio = document.getElementById('warning');
var doorAudio = document.getElementById('door');
var shiveringAudio = document.getElementById('shivering');



playButton.addEventListener('click', function() {
    isPlaying = true;
    // Here you can add code to transition to the game scene
    render();

    renderScene(gameObject[0]);
});

function render() {
    if (isPlaying == true) {
        loadingPage.style.display = 'none';
        gameScene.style.display = 'block';
    } else {
        loadingPage.style.display = 'block';
        gameScene.style.display = 'none';
    }
}


function renderScene(scene) {
    var sceneTitle = document.getElementById('title');
    var sceneDescription = document.querySelector('.scene-description');
    var sceneImage = document.getElementById('scene-image');
    var choicesContainer = document.querySelector('.choices');
    sceneTitle.textContent = scene.name;
    sceneDescription.textContent = scene.description;
    sceneImage.src = scene.image;
    choicesContainer.innerHTML = '';

    stopAllAudio();

    if (scene.audio) {
        scene.audio.play();
    }
    scene.choices.forEach(function(choice) {

        var choiceButton = document.createElement('button');
        choiceButton.textContent = choice.text;
        choiceButton.addEventListener('click', function() {
            var nextScene = gameObject.find(function(s) {
                return s.id === choice.nextScene;
            });
            if (nextScene) {
                renderScene(nextScene);
            }
        });
        choicesContainer.appendChild(choiceButton);
    });
}

const allAudio = [
    backgroundAudio,
    deathAudio,
    gunAudio,
    walkingAudio,
    warningAudio,
    doorAudio,
    shiveringAudio
];

function stopAllAudio() {
    allAudio.forEach(function(audio) {
        audio.pause();
        audio.currentTime = 0;
    });
}
const gameObject = [{ // END OF ARRAY
            name: 'The Farmhouse',
            id: "first_scene",
            description: 'You find yourself walking down an eerie road. You see a farmhouse in the distance.',
            image: './assets/first_scene.png',
            audio: backgroundAudio,
            choices: [{
                    text: 'Enter the farmhouse',
                    nextScene: 'house_scene'
                },
                {
                    text: 'Keep walking down the road',
                    nextScene: 'outside_walking'
                }
            ],
        },
        {
            name: 'Inside the Farmhouse',
            id: "house_scene",
            audio: doorAudio,
            description: 'You step inside the farmhouse and find an old yet intact interior. The smell of sulfur fills the air.',
            image: './assets/house_scene.png',
            choices: [{
                    text: 'Go and sleep outside',
                    nextScene: 'blank2'
                },
                {
                    text: 'Shoot the thing!',
                    nextScene: 'blank'
                },
                {
                    text: 'Make your friendly intentions known',
                    nextScene: 'friendly_intentions'
                }
            ]
        },
        {
            name: 'Walking Outside',
            id: "outside_walking",
            audio: walkingAudio,
            description: 'You find yourself walking down the dark road. You find no option but to continue forth. . .',
            image: './assets/walking_scene.png',
            choices: [{
                text: 'Continue walking',
                nextScene: 'pathway_scene'
            }],
        },
        {
            name: 'Dead End',
            id: "pathway_scene",
            audio: deathAudio,
            description: 'You stumble onto a path where you are ambushed by a scarecrow! You die.',
            image: './assets/pathway_scene.png',
            choices: [{
                text: 'Play Again',
                nextScene: 'first_scene'
            }],
        },
        {
            name: 'Friendly Intentions',
            id: "friendly_intentions",
            audio: warningAudio,
            description: 'He approaches you with inepth curiosity. He allows you to stay the night.',
            image: './assets/friend_scene.jpg',
            choices: [{
                text: 'Next',
                nextScene: 'win3'
            }],
        },
        {
            name: '',
            id: "win3",
            description: '...',
            image: './assets/win/win_unique.png',
            choices: [{
                text: 'Play Again',
                nextScene: 'first_scene'
            }]
        },
        {
            name: 'What next?',
            id: "blank",
            description: 'You killed a guardian keeping darker things at bay. You survive albeit others that pass through will not due to your actions...',
            image: './assets/black.png',
            audio: gunAudio,
            choices: [{
                text: 'Next',
                nextScene: 'win2'
            }]
        },
        {
            name: 'What next?',
            id: "blank2",
            description: 'You took the safest option in all this. Although the night was uncomfortable you are atleast alive!',
            image: './assets/black copy.png',
            audio: shiveringAudio,
            choices: [{
                text: 'Next',
                nextScene: 'win1'
            }]
        },
        {
            name: 'A cowards win..',
            id: "win2",
            description: '',
            image: './assets/win/win_selfish.png',
            choices: [{
                text: 'Play Again',
                nextScene: 'first_scene'
            }]
        },
        {
            name: 'Atleast you are alive..',
            id: "win1",
            description: '',
            image: './assets/win/win1.png',
            choices: [{
                text: 'Play Again',
                nextScene: 'first_scene'
            }]
        }
    ] // END OF ARRAY
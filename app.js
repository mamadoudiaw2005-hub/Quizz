class QuizApp {
    constructor() {
        this.mode = null; // 'solo' ou 'group'
        this.selectedTheme = null;
        this.teams = [{ name: "Joueur 1", score: 0 }];
        this.currentTeamIndex = 0;
        
        // Solo Mode Stages
        this.unlockedStages = 1;
        this.currentStageIndex = 1;
        this.totalStages = 5; // e.g. 5 stages in total
        
        this.questionsList = [];
        this.currentQuestionIndex = 0;
        this.timer = null;
        this.timeLeft = 15;

        this.init();
    }

    init() {
        console.log("Culture G App Initialized");
    }

    showSoloStages() {
        this.showScreen('screen-solo-stages');
        const container = document.getElementById('stages-container');
        container.innerHTML = '';
        
        const stageInfo = {
            1: { title: "Python (Bases)", theme: "informatique_python" },
            2: { title: "C (Bases)", theme: "informatique_c" },
            3: { title: "Géographie", theme: "geographie" },
            4: { title: "Français", theme: "francais" },
            5: { title: "Mix Total", theme: "mix" }
        };
        
        for (let i = 1; i <= this.totalStages; i++) {
            const wrapper = document.createElement('div');
            wrapper.className = 'stage-node-wrapper';
            
            const node = document.createElement('div');
            node.className = 'stage-node';
            
            const label = document.createElement('div');
            label.className = 'stage-label';
            label.innerText = `Étape ${i}\n${stageInfo[i] ? stageInfo[i].title : ''}`;
            label.style.whiteSpace = "pre-line";
            
            if (i <= this.unlockedStages) {
                node.innerText = i;
                node.onclick = () => this.startStage(i, stageInfo[i] ? stageInfo[i].theme : 'mix');
            } else {
                node.classList.add('locked');
                node.innerText = '🔒';
            }
            
            wrapper.appendChild(node);
            wrapper.appendChild(label);
            container.appendChild(wrapper);
        }
    }

    startStage(stageNum, theme) {
        this.currentStageIndex = stageNum;
        this.selectedTheme = theme;
        this.teams = [{ name: "Joueur Solo", score: 0 }];
        this.startGame();
    }

    quitGame() {
        clearInterval(this.timer);
        if (this.mode === 'solo') {
            this.showSoloStages();
        } else {
            this.showScreen('screen-home');
        }
    }

    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        
        const screen = document.getElementById(screenId);
        screen.classList.remove('hidden');
        screen.classList.add('active');
    }

    selectMode(mode) {
        this.mode = mode;
        if (mode === 'solo') {
            this.showSoloStages();
        } else {
            this.showScreen('screen-themes');
        }
    }

    selectTheme(theme) {
        this.selectedTheme = theme;
        if (this.mode === 'group') {
            this.showScreen('screen-setup');
        } else {
            this.teams = [{ name: "Joueur Solo", score: 0 }];
            this.startGame();
        }
    }

    startGame() {
        if (this.mode === 'group') {
            const t1 = document.getElementById('team1-name').value || "Équipe 1";
            const t2 = document.getElementById('team2-name').value || "Équipe 2";
            this.teams = [
                { name: t1, score: 0 },
                { name: t2, score: 0 }
            ];
        }

        this.prepareQuestions();
        this.currentQuestionIndex = 0;
        this.currentTeamIndex = 0;
        
        this.showScreen('screen-game');
        this.updateScoreBoard();
        this.loadQuestion();
    }

    prepareQuestions() {
        this.questionsList = [];
        if (this.selectedTheme === 'mix') {
            for (let theme in quizData.themes) {
                this.questionsList = this.questionsList.concat(quizData.themes[theme]);
            }
            // Shuffle
            this.questionsList.sort(() => Math.random() - 0.5);
        } else if (this.selectedTheme === 'informatique') {
            this.questionsList = [...quizData.themes['informatique_python'], ...quizData.themes['informatique_c']];
            this.questionsList.sort(() => Math.random() - 0.5);
        } else {
            this.questionsList = [...quizData.themes[this.selectedTheme]];
        }
        
        // Limit to 20 questions per game max for a good pace
        if (this.questionsList.length > 20) {
            this.questionsList = this.questionsList.slice(0, 20);
        }
    }

    updateScoreBoard() {
        const board = document.getElementById('score-board');
        board.innerHTML = '';
        this.teams.forEach(team => {
            board.innerHTML += `<div class="score-item">${team.name} : <span>${team.score} pts</span></div>`;
        });

        const turnText = document.getElementById('current-player-turn');
        if (this.mode === 'group') {
            turnText.innerText = `Tour de : ${this.teams[this.currentTeamIndex].name}`;
        } else {
            turnText.innerText = "Bonne chance !";
        }
    }

    loadQuestion() {
        clearInterval(this.timer);
        this.timeLeft = 15;
        this.updateTimerBar();

        const questionText = document.getElementById('question-text');
        const answersGrid = document.getElementById('answers-grid');
        const imageContainer = document.getElementById('image-container');
        const questionImage = document.getElementById('question-image');

        answersGrid.innerHTML = '';
        document.getElementById('next-btn').classList.add('hidden');

        const qData = this.questionsList[this.currentQuestionIndex];

        if (!qData) {
            this.endGame();
            return;
        }

        let stageName = this.selectedTheme === 'mix' ? "Mix Total" : this.selectedTheme.charAt(0).toUpperCase() + this.selectedTheme.slice(1);
        document.getElementById('current-stage-badge').innerText = stageName;
        questionText.innerText = qData.question;

        // Image Handling
        if (qData.image && qData.image !== "") {
            questionImage.src = qData.image;
            imageContainer.classList.remove('hidden');
        } else {
            imageContainer.classList.add('hidden');
        }

        // Hint Handling
        const cluesContainer = document.getElementById('clues-container');
        if (qData.hint && qData.hint !== "") {
            cluesContainer.innerText = `💡 Indice : ${qData.hint}`;
            cluesContainer.classList.remove('hidden');
        } else {
            cluesContainer.classList.add('hidden');
        }

        if (qData.type === 'association') {
            answersGrid.classList.add('hidden');
            document.getElementById('association-grid').classList.remove('hidden');
            this.setupAssociation(qData);
        } else {
            document.getElementById('association-grid').classList.add('hidden');
            answersGrid.classList.remove('hidden');
            
            qData.options.forEach((opt, index) => {
                const btn = document.createElement('button');
                btn.className = 'answer-btn';
                btn.innerText = opt;
                btn.onclick = () => this.checkAnswer(index, qData.correct, btn);
                answersGrid.appendChild(btn);
            });
        }

        this.startTimer();
    }

    setupAssociation(qData) {
        const colA = document.getElementById('assoc-col-a');
        const colB = document.getElementById('assoc-col-b');
        colA.innerHTML = '';
        colB.innerHTML = '';

        this.assocSelection = { a: null, b: null };
        this.assocMatchesFound = 0;
        this.assocTotalPairs = qData.pairs.length;

        // Shuffle pairs for rendering
        let itemsA = qData.pairs.map((p, i) => ({ text: p.a, id: i }));
        let itemsB = qData.pairs.map((p, i) => ({ text: p.b, id: i }));

        itemsA.sort(() => Math.random() - 0.5);
        itemsB.sort(() => Math.random() - 0.5);

        itemsA.forEach(item => {
            let div = document.createElement('div');
            div.className = 'assoc-item';
            div.innerText = item.text;
            div.onclick = () => this.handleAssocClick('a', item.id, div);
            colA.appendChild(div);
        });

        itemsB.forEach(item => {
            let div = document.createElement('div');
            div.className = 'assoc-item';
            div.innerText = item.text;
            div.onclick = () => this.handleAssocClick('b', item.id, div);
            colB.appendChild(div);
        });
    }

    handleAssocClick(col, id, element) {
        // Deselect previous in same column
        const colContainer = col === 'a' ? document.getElementById('assoc-col-a') : document.getElementById('assoc-col-b');
        Array.from(colContainer.children).forEach(child => {
            if (!child.classList.contains('matched')) {
                child.classList.remove('selected');
            }
        });

        element.classList.add('selected');
        this.assocSelection[col] = { id, element };

        // Check if both selected
        if (this.assocSelection.a && this.assocSelection.b) {
            const { a, b } = this.assocSelection;
            if (a.id === b.id) {
                // Match
                a.element.classList.remove('selected');
                b.element.classList.remove('selected');
                a.element.classList.add('matched');
                b.element.classList.add('matched');
                this.assocMatchesFound++;
                
                if (this.assocMatchesFound === this.assocTotalPairs) {
                    clearInterval(this.timer);
                    this.teams[this.currentTeamIndex].score += 10;
                    this.updateScoreBoard();
                    setTimeout(() => this.autoNext(), 1000);
                }
            } else {
                // Wrong
                a.element.classList.add('wrong');
                b.element.classList.add('wrong');
                setTimeout(() => {
                    a.element.classList.remove('wrong', 'selected');
                    b.element.classList.remove('wrong', 'selected');
                }, 500);
            }
            this.assocSelection = { a: null, b: null };
        }
    }

    updateTimerBar() {
        const timerBar = document.getElementById('timer-bar');
        if (timerBar) {
            timerBar.style.width = '100%';
            timerBar.style.background = "linear-gradient(90deg, var(--success-color), var(--danger-color))";
        }
    }

    startTimer() {
        const timerBar = document.getElementById('timer-bar');
        this.timer = setInterval(() => {
            this.timeLeft -= 0.1;
            const percentage = (this.timeLeft / 15) * 100;
            timerBar.style.width = `${percentage}%`;

            if (percentage < 30) {
                timerBar.style.background = "var(--danger-color)";
            } else {
                timerBar.style.background = "linear-gradient(90deg, var(--success-color), var(--danger-color))";
            }

            if (this.timeLeft <= 0) {
                clearInterval(this.timer);
                this.timeOut();
            }
        }, 100);
    }

    checkAnswer(selectedIndex, correctIndex, btnElement) {
        clearInterval(this.timer);
        const buttons = document.querySelectorAll('.answer-btn');
        
        buttons.forEach(b => b.onclick = null);

        if (selectedIndex === correctIndex) {
            btnElement.classList.add('correct');
            this.teams[this.currentTeamIndex].score += 10;
            this.updateScoreBoard();
            
            setTimeout(() => this.autoNext(), 500);
        } else {
            btnElement.classList.add('wrong');
            buttons[correctIndex].classList.add('correct');
            
            setTimeout(() => this.autoNext(), 1500);
        }
    }

    timeOut() {
        const buttons = document.querySelectorAll('.answer-btn');
        buttons.forEach(b => b.onclick = null);
        
        const assocItems = document.querySelectorAll('.assoc-item');
        assocItems.forEach(b => b.onclick = null);

        setTimeout(() => this.autoNext(), 1500);
    }

    autoNext() {
        this.currentQuestionIndex++;
        if (this.mode === 'group') {
            this.currentTeamIndex = (this.currentTeamIndex + 1) % this.teams.length;
            this.updateScoreBoard();
        }
        this.loadQuestion();
    }

    endGame() {
        this.showScreen('screen-results');
        const scoresDiv = document.getElementById('final-scores');
        scoresDiv.innerHTML = '';
        
        let maxScore = -1;
        let winner = "";

        this.teams.forEach(team => {
            scoresDiv.innerHTML += `<div>${team.name} : <strong>${team.score} points</strong></div>`;
            if (team.score > maxScore) {
                maxScore = team.score;
                winner = team.name;
            } else if (team.score === maxScore) {
                winner += " et " + team.name;
            }
        });

        const feedbackTitle = document.getElementById('feedback-title');
        const feedbackText = document.getElementById('feedback-text');

        if (this.mode === 'group') {
            feedbackTitle.innerText = "C'est fini !";
            if (winner.includes(" et ")) {
                feedbackText.innerText = `Égalité parfaite entre ${winner} ! Beau match.`;
            } else {
                feedbackText.innerText = `Félicitations à ${winner} pour cette victoire éclatante !`;
            }
        } else {
            feedbackTitle.innerText = "Fin de la partie !";
            const noteSur20 = Math.round((maxScore / (this.questionsList.length * 10)) * 20);
            
            if (noteSur20 >= 16) {
                feedbackText.innerText = `${noteSur20}/20 ! T'es un crack absolu. César serait fier de toi.`;
            } else if (noteSur20 >= 10) {
                feedbackText.innerText = `${noteSur20}/20. Pas mal, mais y'a encore du boulot pour être un maître de la Culture G !`;
            } else {
                feedbackText.innerText = `${noteSur20}/20... Aïe. Va falloir réviser tes classiques, c'est une cata !`;
            }

            // Unlocking next stage logic
            if (noteSur20 >= 10) {
                if (this.currentStageIndex === this.unlockedStages) {
                    this.unlockedStages++;
                    feedbackText.innerText += "\n\n🔓 Nouvelle étape débloquée !";
                }
            } else {
                feedbackText.innerText += "\n\n🔒 Il faut au moins 10/20 pour débloquer l'étape suivante.";
            }
        }
    }

    resetGame() {
        if (this.mode === 'solo') {
            this.showSoloStages();
        } else {
            this.showScreen('screen-home');
        }
    }
}

const app = new QuizApp();


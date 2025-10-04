// window.addEventListener("DOMContentLoaded",()=> {
//     const loader = document.getElementById("loader");
//     loader.style.display = "none";
// });

(() => {
  const PUZZLES = {
    easy: [
      {
        p: "530070000600195000098000060800060003400803001700020006060000280000419005000080079",
        s: "534678912672195348198342567859761423426853791713924856961537284287419635345286179",
      },
      {
        p: "000260701680070090190004500820100040004602900050003028009300074040050036703018000",
        s: "435269781682571493197834562826195347374682915951743628519326874248957136763418259",
      },
      {
        p: "200080300060070084030500209000105408000000000402706000301007040720040060004010003",
        s: "245981376169273584837564219976135428318492657452786931391827645723649861584318793",
      },
    ],
    medium: [
      {
        p: "009000000080605020501078000000000700706040102004000000000720903090301080000000600",
        s: "649213857387695421521478369932186745756949132814257936168724593495361278273598614",
      },
      {
        p: "070060000400000107000002000600109050002000300030508004000700000906000008000080070",
        s: "271865943468937157359142786684179352592624319137528694823756491916413528745281673",
      },
      {
        p: "300200000000107000706030500070009080900020004010800050009040301000702000000008006",
        s: "345286179892157463716934528274369185953421764618875952569642317481712639127598346",
      },
    ],
    hard: [
      {
        p: "000000907000420180000705026100904000050000040000507009920108000034059000507000000",
        s: "612843957795426183483715326178934265259671348346587219924168537834259671567392814",
      },
      {
        p: "030000080070090000200580004000000800000603000009000000900017002000050090040000030",
        s: "439761285876492351215583964367924815152638479689175423593817642721354698948269137",
      },
      {
        p: "000900002050000040000050709007000300600070001008000500809020000020000090300001000",
        s: "471936852953817246286452719517298364642573981198164537869729135724385693335641978",
      },
    ],
    expert: [
      {
        p: "020000000000060090000300007000009000009040200030000040600000003000000500000710000",
        s: "826197354473865291915324867264589137189743256537126948651972483342618579798431622",
      },
      {
        p: "000004200060000000800700000003001000000060000000300700000008004000000030009100000",
        s: "931684257765219843842753619493871526318562974257396781176938452584627139629145368",
      },
      {
        p: "000000000000300500000040009010000040003500600090000020800020000002003000000000000",
        s: "321659784479318562568742139812976345753584691694231827835427916247193856916865473",
      },
    ],
  };

  // --------------------------
  // Estado
  // --------------------------
  const gridEl = document.getElementById("grid");
  const digitsEl = document.getElementById("digits");
  const timeEl = document.getElementById("time");
  const scoreEl = document.getElementById("score");
  const mistakesEl = document.getElementById("mistakes");
  const statusEl = document.getElementById("status");

  const btnNew = document.getElementById("newGame");
  const btnCheck = document.getElementById("check");
  const btnNotes = document.getElementById("notes");
  const btnErase = document.getElementById("erase");
  const btnHint = document.getElementById("hint");
  const btnUndo = document.getElementById("undo");
  const selDifficulty = document.getElementById("difficulty");

  const nombreD = document.getElementById("nombreD");
  const btn_submit = document.getElementById("btn_submit");

  btn_submit.style.display = "none";

  const LS_BEST = "sudoku:best";

  let puzzle = ""; // string 81 chars
  let solution = ""; // string 81 chars
  let values = []; // array[81] de caracteres '0'..'9'
  let given = []; // array[81] booleans
  let notes = Array.from({ length: 81 }, () => new Set());
  let selected = -1;
  let mistakes = 0;
  let scoreBase = 1000;
  let score = scoreBase;
  let startTs = 0;
  let timerId = null;
  let notesMode = false;
  let history = []; // para deshacer: push {idx, prev, next, notesPrev, notesNext}

  // --------------------------
  // Utilitarios
  // --------------------------
  const pad2 = (n) => n.toString().padStart(2, "0");

  function startTimer() {
    startTs = Date.now();
    stopTimer();
    timerId = setInterval(() => {
      const sec = Math.floor((Date.now() - startTs) / 1000);
      timeEl.textContent = `${pad2(Math.floor(sec / 60))}:${pad2(sec % 60)}`;
      // penalización tiempo
      const timePenalty = sec; // −1 por segundo
      const calc = Math.max(0, scoreBase - timePenalty - mistakes * 20);
      score = calc; // pista resta en el acto
      scoreEl.textContent = score;
    }, 1000);
  }

  function stopTimer() {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }
  }

  function idx(r, c) {
    return r * 9 + c;
  }
  function rc(i) {
    return [Math.floor(i / 9), i % 9];
  }

  function sameRow(i, j) {
    return Math.floor(i / 9) === Math.floor(j / 9);
  }
  function sameCol(i, j) {
    return i % 9 === j % 9;
  }
  function sameBox(i, j) {
    const [ri, ci] = rc(i);
    const [rj, cj] = rc(j);
    return (
      Math.floor(ri / 3) === Math.floor(rj / 3) &&
      Math.floor(ci / 3) === Math.floor(cj / 3)
    );
  }

  function renderGrid() {
    gridEl.innerHTML = "";
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        const i = idx(r, c);
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.dataset.index = i;

        // líneas gruesas
        if (r % 3 === 0) cell.classList.add("btop");
        if (c % 3 === 0) cell.classList.add("bleft");
        if (c % 3 === 2) cell.classList.add("bright");
        if (r % 3 === 2) cell.classList.add("bbottom");

        if (given[i]) cell.classList.add("given");

        const val = values[i];
        if (val !== "0") {
          const span = document.createElement("span");
          span.className = "value";
          span.textContent = val;
          cell.appendChild(span);
        } else if (notes[i].size) {
          const wrap = document.createElement("div");
          wrap.className = "notes";
          for (let n = 1; n <= 9; n++) {
            const s = document.createElement("div");
            s.className = "note";
            s.textContent = notes[i].has(n) ? n : "";
            wrap.appendChild(s);
          }
          cell.appendChild(wrap);
        }

        cell.addEventListener("click", () => selectCell(i));
        gridEl.appendChild(cell);
      }
    }
    paintHighlights();
  }

  function paintHighlights() {
    const cells = [...gridEl.children];
    cells.forEach((el) =>
      el.classList.remove("selected", "same", "same-num", "error", "correct")
    );
    if (selected >= 0) {
      const selVal = values[selected];
      cells[selected].classList.add("selected");
      cells.forEach((el, j) => {
        if (
          j !== selected &&
          (sameRow(j, selected) || sameCol(j, selected) || sameBox(j, selected))
        )
          el.classList.add("same");
        if (selVal !== "0") {
          const has = values[j] === selVal;
          if (has && j !== selected) el.classList.add("same-num");
        }
      });
    }
  }

  function selectCell(i) {
    if (given[i]) return;
    selected = i;
    paintHighlights();
  }

  function placeNumber(n) {
    if (selected < 0) return;
    if (given[selected]) return;

    const correct = solution[selected] === String(n);
    const prev = values[selected];
    const prevNotes = new Set([...notes[selected]]);

    if (notesMode) {
      // toggle nota
      if (n >= 1 && n <= 9) {
        if (notes[selected].has(n)) notes[selected].delete(n);
        else notes[selected].add(n);
      }
      history.push({
        idx: selected,
        prev,
        next: prev,
        notesPrev: prevNotes,
        notesNext: new Set([...notes[selected]]),
      });
    } else {
      // colocar valor
      values[selected] = String(n);
      notes[selected].clear();
      history.push({
        idx: selected,
        prev,
        next: String(n),
        notesPrev: prevNotes,
        notesNext: new Set(),
      });

      const cellEl = gridEl.children[selected];
      if (!correct) {
        mistakes++;
        mistakesEl.textContent = mistakes;
        score = Math.max(0, score - 20);
        scoreEl.textContent = score;
        flash(cellEl, "error");
      } else {
        flash(cellEl, "correct");
      }
    }

    renderGrid();
    checkWin();
  }

  function eraseCell() {
    if (selected < 0 || given[selected]) return;
    const prev = values[selected];
    const prevNotes = new Set([...notes[selected]]);
    values[selected] = "0";
    notes[selected].clear();
    history.push({
      idx: selected,
      prev,
      next: "0",
      notesPrev: prevNotes,
      notesNext: new Set(),
    });
    renderGrid();
  }

  function giveHint() {
    // si hay celda seleccionada vacía, usa esa; si no, busca una aleatoria vacía
    const empties = values
      .map((v, i) => (v === "0" && !given[i] ? i : -1))
      .filter((i) => i >= 0);
    if (!empties.length) {
      status("No hay espacios vacíos para pista.", true);
      return;
    }
    const i =
      selected >= 0 && values[selected] === "0"
        ? selected
        : empties[Math.floor(Math.random() * empties.length)];
    selected = i;
    const correct = solution[i];
    const prevNotes = new Set([...notes[i]]);
    const prev = values[i];
    values[i] = correct;
    notes[i].clear();
    history.push({
      idx: i,
      prev,
      next: correct,
      notesPrev: prevNotes,
      notesNext: new Set(),
    });
    score = Math.max(0, score - 50);
    scoreEl.textContent = score;
    renderGrid();
    checkWin();
  }

  function undo() {
    const last = history.pop();
    if (!last) return;
    const { idx, prev, notesPrev } = last;
    values[idx] = prev;
    notes[idx] = new Set([...notesPrev]);
    selected = idx;
    renderGrid();
  }

  function verifyBoard() {
    // marca errores visibles en celdas llenas incorrectas
    [...gridEl.children].forEach((el, i) => {
      if (values[i] !== "0" && values[i] !== solution[i])
        el.classList.add("error");
    });
    status("Celdas incorrectas resaltadas.", true);
  }

  function checkWin() {
    if (values.every((v, i) => v === solution[i])) {
      stopTimer();
      score = Math.max(0, score + 200); // bonus
      scoreEl.textContent = score;
      status(`¡Completado! Puntaje final: ${score}.`, false);
      // guardar mejor puntaje
      const best = Number(localStorage.getItem(LS_BEST) || 0);
      if (score > best) localStorage.setItem(LS_BEST, String(score));
      btn_submit.style.display = "flex";
    }
  }

  function status(msg, warn = false) {
    statusEl.textContent = msg;
    statusEl.style.color = warn ? "#ffb8c2" : varCss("--muted");
  }

  function varCss(name) {
    return (
      getComputedStyle(document.documentElement).getPropertyValue(name) ||
      "#9AA4C6"
    );
  }

  function flash(el, cls) {
    el.classList.add(cls);
    setTimeout(() => el.classList.remove(cls), 450);
  }

  // --------------------------
  // Inicializar tablero
  // --------------------------
  function newGame() {
    const diff = selDifficulty.value;
    const set = PUZZLES[diff];
    const pick = set[Math.floor(Math.random() * set.length)];
    puzzle = pick.p;
    solution = pick.s;
    values = [...puzzle];
    given = values.map((v) => v !== "0");
    notes = Array.from({ length: 81 }, () => new Set());
    selected = -1;
    mistakes = 0;
    history = [];
    mistakesEl.textContent = "0";

    // reiniciar score & tiempo
    scoreBase = 1000;
    score = scoreBase;
    scoreEl.textContent = score;
    timeEl.textContent = "00:00";
    startTimer();
    renderGrid();
    status("¡Nuevo juego!");
  }

  // panel de dígitos
  function buildDigits() {
    digitsEl.innerHTML = "";
    for (let n = 1; n <= 9; n++) {
      const b = document.createElement("button");
      b.textContent = n;
      b.addEventListener("click", () => placeNumber(n));
      digitsEl.appendChild(b);
    }
    // agregar un botón 0/erase también (opcional)
    const eraseBtn = document.createElement("button");
    eraseBtn.textContent = "⌫";
    eraseBtn.title = "Borrar";
    eraseBtn.addEventListener("click", eraseCell);
    digitsEl.appendChild(eraseBtn);
  }

  // --------------------------
  // Eventos globales
  // --------------------------
  document.addEventListener("keydown", (e) => {
    if (e.key >= "1" && e.key <= "9") {
      placeNumber(Number(e.key));
    } else if (e.key === "0" || e.key === "Backspace" || e.key === "Delete") {
      eraseCell();
    } else if (
      ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)
    ) {
      e.preventDefault();
      let i = selected >= 0 ? selected : 40; // centro por defecto
      const [r, c] = rc(i);
      let nr = r,
        nc = c;
      if (e.key === "ArrowUp") nr = Math.max(0, r - 1);
      if (e.key === "ArrowDown") nr = Math.min(8, r + 1);
      if (e.key === "ArrowLeft") nc = Math.max(0, c - 1);
      if (e.key === "ArrowRight") nc = Math.min(8, c + 1);
      selectCell(idx(nr, nc));
    } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
      undo();
    } else if (e.key.toLowerCase() === "n") {
      notesMode = !notesMode;
      btnNotes.classList.toggle("active", notesMode);
    }
  });

  btnNew.addEventListener("click", newGame);
  btnCheck.addEventListener("click", verifyBoard);
  btnNotes.addEventListener("click", () => {
    notesMode = !notesMode;
    btnNotes.classList.toggle("active", notesMode);
  });
  btnErase.addEventListener("click", eraseCell);
  btnHint.addEventListener("click", giveHint);
  btnUndo.addEventListener("click", undo);

  selDifficulty.addEventListener("change", newGame);

  // construir UI inicial
  buildDigits();
  newGame();

  document.getElementById("btn_submit").addEventListener("click", () => {
    handleSendInfo();
  });

  function handleSendInfo() {
    const timeEl_val = timeEl.textContent;
    const scoreEl_val = scoreEl.textContent;
    const mistakesEl_val = mistakesEl.textContent;
    const nombreD_val = nombreD.value;
    const url = "https://script.google.com/macros/s/AKfycbw2H2ftmjekQsOJh3T3i6nFRz1l091sTelIeCpIVDzz1bxiUCsnMPwpkZbxSZE1jXky/exec";

    const fechaCompleta = new Date().toLocaleString("es-CO", {
      timeZone: "America/Bogota",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const [fecha, hora] = fechaCompleta.split(", ");

    const data = {
      tipo: "envio_1",
      valor_1: hora,
      valor_2: fecha,
      valor_3: nombreD_val,
      valor_4: scoreEl_val,
      valor_5: mistakesEl_val,
      valor_6: timeEl_val,
    };

    fetch(url,{
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(data)
    }).then((res) => res.text())
    .then(() => {
        console.log("Enviado con exito ✔️");
    })
  }
})();

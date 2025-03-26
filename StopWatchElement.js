/**
 * カスタムイベントで操作可能なストップウォッチ
 *
 * コンストラクタ
 *   StopWatchElement
 * 要素
 *   <stop-watch>
 *    名称 stop-watch
 *    例)
 *      <stop-watch></stop-watch>
 *      <stop-watch buttons="off"></stop-watch>
 *
 * 属性
 *   buttons  on/off  操作ボタンの表示/非表示
 *
 *   elapsedTimeMS    経過時間(ミリ秒単位)
 *   elapsedTime      経過時間のオブジェクト
 *     elapsedTime.h 経過時間 - 時
 *     elapsedTime.m 経過時間 - 分
 *     elapsedTime.s 経過時間 - 秒
 *     elapsedTime.ms 経過時間 - ミリ秒

 *   elapsedTimeString   経過時間の文字列
 *     書式 "HH:MM:SS.ms"
 *        HH: 経過時間 時 2桁
 *        MM: 経過時間 分 2桁
 *        SS: 経過時間 秒 2桁
 *        ms: 経過時間 1/1000秒 3桁
 *
 * カスタムイベント
 *   "start"  ストップウォッチを開始する
 *   "stop"   ストップウォッチを停止する
 *   "clear"  ストップウォッチをクリアする
 */

class StopWatchElement extends HTMLElement {

  timeElement = null;
  buttonsElement = null;

  startTime = 0;
  elapsedTime = 0;

  timerInterval;  // タイマインターバル時のオブジェクト

  buttonsHidden = false;  // 操作ボタンのhidden
  //--------------------
  static observedAttributes = ["buttons"];

  constructor() {
    super();
  }

  connectedCallback() {
    this._updateRendering();

    // カスタムイベントのリスナー
    this.addEventListener("start", (e) => {
      this.startTimer()
    });
    this.addEventListener("stop", (e) => {
      this.stopTimer()
    });
    this.addEventListener("clear", (e) => {
      this.clearTimer()
    });
  }

  // disconnectedCallback() {
  // }

  // adoptedCallback() {
  // }

  //--------------------
  attributeChangedCallback(name, oldValue, newValue) {
    if (name == 'buttons') {
      this.buttonsHidden = (newValue == 'off');
      if (this.buttonsElement) {
        this.buttonsElement.hidden = (newValue == 'off');
      }
    }
  }

  //--------------------
  // formAssociatedCallback() {
  // }

  //--------------------
  get buttons() {
    return this.buttons;
  }

  set buttons(v) {
    this.setAttribute('buttons', v);
  }

  /**
   * 経過時間をミリ秒で返す
   * @return int  ミリ秒
   */
  get elapsedTimeMS() {
    return this.elapsedTime;
  }

  /**
   * 経過時間をオブジェクトで返す
   * @return object.h  経過時間 - 時
   *         object.m            分
   *         object.s            秒
   *         object.ms           ミリ秒
   */
  get elapsedTimes() {
    return {
      h: this.formatTimeH(this.elapsedTime),
      m: this.formatTimeM(this.elapsedTime),
      s: this.formatTimeS(this.elapsedTime),
      ms: this.formatTimeMS(this.elapsedTime)
    };
  }

  /**
   * 経過時間を文字列でで返す
   *   書式 "HH:MM:SS.ms"
   *     HH: 経過時間 時 2桁
   *     MM: 経過時間 分 2桁
   *     SS: 経過時間 秒 2桁
   *     ms: 経過時間 1/1000秒 3桁
　 */
  get elapsedTimeString() {
    return this.formatTime(this.elapsedTime);
  }

  //--------------------

  _updateRendering() {
    this.attachShadow({mode: 'open'});

    const parentElement = document.createElement("span");

    this.timeElement = document.createElement("span");
    this.timeElement.textContent = this.formatTime(0);

    this.buttonsElement = document.createElement("span");
    {
      const startButtonElement = document.createElement("button");
      startButtonElement.setAttribute('part', 'start-button');
      startButtonElement.innerText = 'start';
      startButtonElement.addEventListener('click', (event) => {
        this.startTimer();
      });

      const stopButtonElement = document.createElement("button");
      stopButtonElement.setAttribute('part', 'stop-button');
      stopButtonElement.innerText = 'stop';
      stopButtonElement.addEventListener('click', (event) => {
        this.stopTimer();
      });

      const clearButtonElement = document.createElement("button");
      clearButtonElement.setAttribute('part', 'clear-button');
      clearButtonElement.innerText = 'clear';
      clearButtonElement.addEventListener('click', (event) => {
        this.clearTimer();
      });


      const rapButtonElement = document.createElement("button");
      rapButtonElement.setAttribute('part', 'rap-button');
      rapButtonElement.innerText = 'rap';
      rapButtonElement.addEventListener('click', (event) => {
        this.rapTimer();
      });

      this.buttonsElement.appendChild(startButtonElement);
      this.buttonsElement.appendChild(stopButtonElement);
      this.buttonsElement.appendChild(clearButtonElement);
    }

    this.buttonsElement.hidden = this.buttonsHidden;

    parentElement.appendChild(this.timeElement);
    parentElement.appendChild(this.buttonsElement);

    this.shadowRoot.replaceChildren(parentElement);
  }

  //--------
  formatTime(ms) {
    const hours   = String(this.formatTimeH(ms)).padStart(2, '0');
    const minutes = String(this.formatTimeM(ms)).padStart(2, '0');
    const seconds = String(this.formatTimeS(ms)).padStart(2, '0');
    const millisecond = String(this.formatTimeMS(ms)).padStart(3, '0');
    return `${hours}:${minutes}:${seconds}.${millisecond}`;
  }

  formatTimeH(ms) {
    return Math.floor(((ms / 1000) / 60) / 60);
  }

  formatTimeM(ms) {
    return Math.floor((ms / 1000) / 60);
  }

  formatTimeS(ms) {
    return Math.floor((ms / 1000) % 60);
  }

  formatTimeMS(ms) {
    return (ms % 1000);
  }

  //--------

  startTimer() {
    if (!this.timerInterval) {
      this.startTime = Date.now() - this.elapsedTime;
      this.timerInterval = setInterval(() => {
        this.elapsedTime = Date.now() - this.startTime;
        this.timeElement.textContent = this.formatTime(this.elapsedTime);
      }, 10);
    }
  }

  stopTimer() {
    clearInterval(this.timerInterval);
    this.timerInterval = null;
  }

  clearTimer() {
    this.stopTimer();
    this.elapsedTime = 0;
    this.timeElement.textContent = this.formatTime(0);

    this.pauseElapsedTimes = [];
  }

}

//customElements.define('stop-watch', StopWatchElement);
customElements.define('stop-watch', StopWatchElement);

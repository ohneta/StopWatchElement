# ストップウオッチ
1/100秒単位のストップウオッチ

## ファイル名
  StopWatchElement.js

```javascript
  <script src="./StopWatchElement.js"></script>
```

## 要素名
  my-stop-watch

```javascript
  <my-stop-watch id="stopwatch"></my-stop-watch>
```

## 属性
* buttons (Read/Write)
ストップウォッチ制御ボタンの表示/非表示

  |値|内容|
  |-|-|
  |on|ボタンを表示|
  |off|ボタンを非表示|


* elapsedTimeMS (Read only)
整数型。経過時間(ミリ秒単位)


* elapsedTime (Read only)
経過時間のオブジェクト

  |値|内容|
  |-|-|
  |elapsedTime.h|経過時間 - 時|
  |elapsedTime.m|経過時間 - 分|
  |elapsedTime.s|経過時間 - 秒|
  |elapsedTime.ms|経過時間 - ミリ秒|


* elapsedTimeString (Read only)
経過時間の文字列


## カスタムイベント

  |イベント|内容|
  |-|-|
  |start|ストップウォッチを開始する|
  |stop|ストップウォッチを停止する|
  |clear|ストップウォッチをクリアする|

## スタイルシート
要素内はshadowDOMのため、ボタンのスタイルシートはpartで指定

  |part|対象|
  |-|-|
  |start-button|スタートボタン|
  |stop-button|ストップボタン|
  |clear-button|クリアボタン|

例
```css
    my-stop-watch::part(start-button) {
      color: white;
      background-color: blue;
    }
    my-stop-watch::part(stop-button) {
      color: red;
      background-color: green;
    }
    my-stop-watch::part(clear-button) {
      color: white;
      background-color: black;
    }
```


## サンプルページ
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <style>
    #my-stop-watch {
      background-color: red;
    }
    #my-stop-watch::part(start-button) {
      color: white;
      background-color: blue;
    }
    #my-stop-watch::part(stop-button) {
      color: red;
      background-color: green;
    }
    #my-stop-watch::part(clear-button) {
      color: white;
      background-color: black;
    }
  </style>
  <script src="./StopWatchElement.js"></script>
</head>
<body>
    <my-stop-watch buttons="on"></my-stop-watch>
</body>
</html>
```

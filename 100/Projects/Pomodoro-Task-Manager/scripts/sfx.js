const sfx = {
   add: new Howl({
      src: 'sounds/test2.mp3' 
   }),
   shortAlarm: new Howl({
      src: [
         'sounds/timers/short/bbc_queens-col_07016031.mp3',
         'sounds/timers/short/07016031.wav'
      ]
   }),
   longAlarm: new Howl({
      src: [
         'sounds/timers/long/bbc_queens-col_07016032.mp3',
         'sounds/timers/long/07016032.wav'
      ]
   }),
   pomodoroAlarm: new Howl({
      src: [
         'sounds/timers/pomodoro/bbc_clocks---c_07022207.mp3',
         'sounds/timers/pomodoro/07022207.wav'
      ]
   })
}
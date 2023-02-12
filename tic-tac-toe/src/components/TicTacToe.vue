<script>
import {ref} from 'vue';

/*
import io from 'socket.io-client';
const socket = io("http://localhost:3000");
*/

export default {
  name: 'TicTacToe',
  components: {

  },
  data() {
    return {
      content: ["","","","","","","","",""],
      turn: true,
      isOver: false,
      winner: null,
    }
  },
  methods: {
    draw(index) {
      if (this.content[index]) {
        return
      }
      if (this.turn)
        this.content[index] = 'x'
      else
        this.content[index] = 'o'
      this.turn = !this.turn
      this.calculateWinner();
      // send event
      socket.emit("draw", index)
    },
    calculateWinner() {
      const conditions = [
        //rows
        [0, 1, 2],[3,4,5],[6,7,8],
        //columns
        [0,3,6],[1,4,7],[2,5,8],
        //diagonals
        [0,4,8],[2,4,6]
      ];
      for (let i = 0; i< conditions.length; i++) {
        if (  this.content[conditions[i][0]]
            && this.content[conditions[i][0]] === this.content[conditions[i][1]]
            && this.content[conditions[i][0]] === this.content[conditions[i][2]]) {
          this.isOver = true;
          this.winner = this.content[conditions[i][0]].toUpperCase();
          return
        }
      }
      //если все ячейки заполнены, но победителя нет 
      if (this.content.join('').length === 9) {
        this.isOver = true;
        this.winner = "no one. Tie.";
      }
    },
    resetBoard() {
      for (let i = 0; i < this.content.length; i++) {
        this.content[i] = "";
      }
      this.winner = 0;
      this.isOver = false
    }
  },
  created() {
      //socket.on("hello", (msg) => {
      //console.log("received" + msg)
      //})
  }
}

const count = ref(0)
</script>

<template>
  <div class="container">
    <div class="play-area">
      <div class="block" @click="draw(0)" id="block_0">{{content[0]}}</div>
      <div class="block" @click="draw(1)" id="block_1">{{content[1]}}</div>
      <div class="block" @click="draw(2)" id="block_2">{{content[2]}}</div>
      <div class="block" @click="draw(3)" id="block_3">{{content[3]}}</div>
      <div class="block" @click="draw(4)" id="block_4">{{content[4]}}</div>
      <div class="block" @click="draw(5)" id="block_5">{{content[5]}}</div>
      <div class="block" @click="draw(6)" id="block_6">{{content[6]}}</div>
      <div class="block" @click="draw(7)" id="block_7">{{content[7]}}</div>
      <div class="block" @click="draw(8)" id="block_8">{{content[8]}}</div>
    </div>

    <div id="winner" v-if="isOver">
      <h2>Game is over</h2>
      <h3>Winner is {{winner}}</h3>
      <button @click="resetBoard"> Reset Game</button>
    </div>

  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}


.play-area {
  background-color: #777;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 5px;
  border-radius: 25px;
  overflow: clip;
}

.block {
  background-color: #CCC;
  width: 100px;
  height: 100px;
  margin: 0;
  box-sizing: border-box;
  font-size: 54px;
}

.block:hover {
  background-color: #dedede;
}

#block_0 {
  border-right: 3px solid black;
  border-bottom: 3px solid black;
}

#block_1 {
  border-right: 3px solid black;
  border-bottom: 3px solid black;
  border-left: 3px solid black;
}

#block_2 {
  border-left: 3px solid black;
  border-bottom: 3px solid black;
}

#block_3 {
  border-top: 3px solid black;
  border-right: 3px solid black;
  border-bottom: 3px solid black;
}

#block_4 {
  border-top: 3px solid black;
  border-right: 3px solid black;
  border-bottom: 3px solid black;
  border-left: 3px solid black;
}

#block_5 {
  border-top: 3px solid black;
  border-left: 3px solid black;
  border-bottom: 3px solid black;
}

#block_6 {
  border-top: 3px solid black;
  border-right: 3px solid black;
}

#block_7 {
  border-right: 3px solid black;
  border-left: 3px solid black;
  border-top: 3px solid black;
}

#block_8 {
  border-left: 3px solid black;
  border-top: 3px solid black;
}
</style>

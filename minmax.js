
var readline = require("readline");
class Position
{
      constructor(brd=[[0,0,0],[0,0,0],[0,0,0]])
      {
          this.totalmoves=9;
          this.board = [];
          this.lastmove=null;

          for(let i=0;i<3;i++)
          {
              let row =[];
              for(let j=0;j<3;j++){
                  row.push(brd[i][j]);
              }
              this.board.push(row);
          }
          this.turn=this.getTurn();
      }

      makeMove(moveStr)
      {
          let turn = this.getTurn();
          let loc = moveStr.split(",");
          this.board[parseInt(loc[0])][parseInt(loc[1])]=turn;
          this.lastmove=moveStr;
          this.turn=-1*turn;
      }

      getTurn() // whose turn is it next?
      {
          if(this.getMoves(1)==this.getMoves(-1)) return 1; else return -1;

      }


      justPlayed()
      {
          return -1*this.turn;
      }

      isWin()
      {
          let b= this.board;
          let a= [b[0][0]+b[0][1]+b[0][2],  b[1][0]+b[1][1]+b[1][2],  b[2][0]+b[2][1]+b[2][2],   b[0][0]+b[1][0]+b[2][0],b[0][1]+b[1][1]+b[2][1], b[0][2]+b[1][2]+b[2][2], b[0][0]+b[1][1]+b[2][2], b[2][0]+b[1][1]+b[0][2]];
          //console.log(a);
          return a.includes(3)|| a.includes(-3);
      }

      isDraw()
      {
          return !this.isWin() && !this.board[0].includes(0) && !this.board[1].includes(0) && !this.board[2].includes(0);
      }

      print()
      {
          for(let i=0;i<3;i++) {
              for (let j = 0; j < 3; j++) {
                  if (this.board[i][j] == 0) process.stdout.write("* ");
                  if (this.board[i][j] == 1) process.stdout.write("X ");
                  if (this.board[i][j] == -1) process.stdout.write("O ");
              }
              console.log("");


          }
          console.log("turn is", this.turn, "  lastmove is ", this.lastmove, " score is ",  negamax(this));
      }

      getMoves(turn)
      {
          let m = 0;

          for (let i = 0; i < 3; i++) {
              for (let j = 0; j < 3; j++)
                  if (this.board[i][j] == turn) m++;
          }
          return m;
      }

      numMovesLeft(turn) {
          let m = this.getMoves(turn);
          if (turn == 1) return 6 - m; else return 5 - m;
      }



      nextPositions()
      {
          let np =[];
          let turn=this.getTurn();
          for(let i=0;i<3;i++)
              for(let j=0;j<3;j++)
              {
                 if(this.board[i][j]==0) {
                     let p = new Position(this.board);
                     p.turn=-1*turn;
                     p.board[i][j] = turn;
                     p.lastmove=i +"," +j;
                     np.push(p);
                 }

              }
          return np;
      }

}


/*********** Setup Initial Position and Tests ****/
//let p = new Position([[1,-1,1],[1,-1,-1],[-1,1,1]]);// drawn position test
//let p = new Position([[1,-1,1],[0,-1,0],[-1,1,1]]); win on last move by X


let p = new Position([[0,0,0],[0,0,0],[0,0,0]]);


console.log("Initial Position");
p.print();
console.log("Is this a win? ", p.isWin());
console.log("Is this a draw?", p.isDraw());

/*console.log("^^^^^^^^ NEXT POSITIONS ^^^^^^^^^^^");

let nextpos = p.nextPositions();
for(let el of nextpos)
    el.print();

console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");

//**** End initial position and tests ****
*/

//process.exit();
//new Position([[1,1,-1],[-1,-1,1],[0,0,0]]);
//p = new Position([[1,-1,0],[1,0,0],[-1,0,0]]);





console.log("###############################");
//let np= p.nextPositions();

//for(let el of np) {
//    el.print();
//    console.log("\n\n");
//}

//console.log(negamax(p));



function negamax(p)
{
   if(p.isWin()) return p.justPlayed()*p.numMovesLeft(p.justPlayed());
   if(p.isDraw()) return 0;

   if(p.justPlayed()==1) { return   Math.min(...(p.nextPositions().map(negamax)))};
   if(p.justPlayed()==-1) { return Math.max(...(p.nextPositions().map(negamax)))};
}

var rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout,
    terminal:false
    }
);

rl.on('line', function(line){
    //***** Let user move *****//
       let loc = line.split(",");
       p.makeMove(line);
       p.print();
       if(p.isWin()) { console.log("It's a win"); rl.close(); process.exit();}
       if(p.isDraw()) { console.log("It's a draw"); rl.close(); process.exit();}
       //*** Make Computer Move ***//
       let mymoves= p.nextPositions();
       let scores = mymoves.map(negamax);
       console.log(scores);
       let minscore = Math.min(...scores);
       let i_min = scores.indexOf(minscore);
       p.makeMove(mymoves[i_min].lastmove);
       console.log("****** Making my move**** score is **", minscore);
       p.print();
       if(p.isWin()) { console.log("It's a win"); rl.close(); process.exit();}
       if(p.isDraw()) { console.log("It's a draw"); rl.close();process.exit();}
})






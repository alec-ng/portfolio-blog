import React from "react";
import './react-tut.css';


function Square(props) {
  return(
    <button className="square"
            onClick={props.onClick}>
          {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square value={this.props.squares[i]}
                    onClick={ () => this.props.onClick(i) } />;
  }

  render() {
  
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    }

    this.initScripts();
  }

  initScripts() {
    let errors = document.getElementById('errors');
    window.addEventListener('mousedown', function(e) {
      document.body.classList.add('mouse-navigation');
      document.body.classList.remove('kbd-navigation');
    });
    window.addEventListener('keydown', function(e) {
      if (e.keyCode === 9) {
        document.body.classList.add('kbd-navigation');
        document.body.classList.remove('mouse-navigation');
      }
    });
    window.addEventListener('click', function(e) {
      if (e.target.tagName === 'A' && e.target.getAttribute('href') === '#') {
        e.preventDefault();
      }
    });
    window.onerror = function(message, source, line, col, error) {
      var text = error ? error.stack || error : message + ' (at ' + source + ':' + line + ':' + col + ')';
      errors.textContent += text + '\n';
      errors.style.display = '';
    };
    console.error = (function(old) {
      return function error() {
        errors.textContent += Array.prototype.slice.call(arguments).join(' ') + '\n';
        errors.style.display = '';
        old.apply(this, arguments);
      }
    })(console.error);
  }
  
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    })
  }

  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (this.calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares:squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }


  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = this.calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? `Go to move # ${move}` : `Go to game start`;
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      )
    })

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`
    }
    

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={ (i)=>this.handleClick(i) }/>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game;

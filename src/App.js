import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import "./styles.scss";

const Card = props => {
  return (
    <div className="wrapper">
      <div className="App" id="quote-box">
        <div id="text">
          <img id="marks" src="public/quotation-marks.svg" alt="img" />
          {props.quote}
          <img id="rev-marks" src="public/quotation-marks.svg" alt="img" />
        </div>
        <div id="author">{props.author}</div>
        <div id="social-wrapper">
          <div id="tweet-icon-wrapper">
            <a href="https://twitter.com/intent/tweet" id="tweet-quote">
              <img src="public/twitter.svg" alt="img" id="twitter-icon" />
            </a>
          </div>
          <button id="new-quote" onClick={props.fetchQuote}>
            New Quote
          </button>
        </div>
      </div>
    </div>
  );
};

export class CardWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      author: "loading",
      quote: "loading"
    };
    // this.getQuote = this.getQuote.bind(this)
    this.changeState = this.changeState.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  fetchData() {
    fetch("https://type.fit/api/quotes")
      .then(response => response.json())
      .then(data => {
        let i = Math.floor(Math.random() * 100);
        this.setState({
          quote: data[i].text,
          author: data[i].author
        });
        document.getElementById("tweet-quote").href =
          'https://twitter.com/intent/tweet?text="' +
          this.state.quote +
          '" - ' +
          this.state.author;
      });
  }

  componentDidMount() {
    this.fetchData();
  }

  changeState() {
    this.fetchData();
  }

  render() {
    let quote = this.state.quote;
    let author = this.state.author;
    let newQuote = this.changeState;

    if (author == null) {
      return (
        <Fragment>
          <Card quote={quote} author={"- Unknown"} fetchQuote={newQuote} />
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <Card quote={quote} author={"- " + author} fetchQuote={newQuote} />
        </Fragment>
      );
    }
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<CardWrapper />, rootElement);

import React, { Component } from 'react'
import { connect } from 'react-redux'

import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-jsx";

const languages = [
    "javascript",
    "java",
    "python",
    "xml",
    "ruby",
    "sass",
    "markdown",
    "mysql",
    "json",
    "html",
    "handlebars",
    "golang",
    "csharp",
    "elixir",
    "typescript",
    "css"
  ];
  
  const themes = [
    "monokai",
    "github",
    "tomorrow",
    "kuroir",
    "twilight",
    "xcode",
    "textmate",
    "solarized_dark",
    "solarized_light",
    "terminal"
  ];
  
  languages.forEach(lang => {
    require(`ace-builds/src-noconflict/mode-${lang}`);
    require(`ace-builds/src-noconflict/snippets/${lang}`);
  });
  
  themes.forEach(theme => require(`ace-builds/src-noconflict/theme-${theme}`));

  /*eslint-disable no-alert, no-console */
  import "ace-builds/src-min-noconflict/ext-searchbox";
  import "ace-builds/src-min-noconflict/ext-language_tools";
  
  var defaultValue = `//Enter some code`

class CodeEditor extends Component {
    onLoad() {
        console.log("Code Editor loaded");

      }
      onChange(newValue) {
        console.log("change", newValue);
        this.setState({
          value: newValue
        });
        // console.log("Output: " + JSON.stringify(this.state.value))
      }
    
      onSelectionChange(newValue, event) {
        console.log("select-change", newValue);
        console.log("select-change-event", event);
      }
    
      onCursorChange(newValue, event) {
        console.log("cursor-change", newValue);
        console.log("cursor-change-event", event);
      }
    
      onValidate(annotations) {
        console.log("onValidate", annotations);
      }

      constructor(props) {
        super(props);
        this.state = {
          value: defaultValue,
          placeholder: "Enter some code...",
          theme: "monokai",
          mode: "javascript",
          enableBasicAutocompletion: false,
          enableLiveAutocompletion: true,
          fontSize: 14,
          showGutter: true,
          showPrintMargin: true,
          highlightActiveLine: true,
          enableSnippets: false,
          showLineNumbers: true
        };
        this.onChange = this.onChange.bind(this);
      }
      
      componentDidMount(){
        const { setCurrentQuestion, questionsObject, currentQuestion } = this.props;
        var q_object = questionsObject[currentQuestion]
        this.setState({value: q_object['QuestionBP'], mode: q_object['Language'].toLowerCase()})
      }

    render() {
        console.log(this.state.mode)
        return (
              <AceEditor
                placeholder={this.state.placeholder}
                mode={this.state.mode}
                theme={this.state.theme}
                name="CodeEditor"
                onLoad={this.onLoad}
                onChange={this.onChange}
                // onSelectionChange={this.onSelectionChange}
                // onCursorChange={this.onCursorChange}
                // onValidate={this.onValidate}
                value={this.state.value}
                fontSize={this.state.fontSize}
                showPrintMargin={this.state.showPrintMargin}
                showGutter={this.state.showGutter}
                highlightActiveLine={this.state.highlightActiveLine}
                setOptions={{
                  useWorker: false,
                  enableBasicAutocompletion: this.state.enableBasicAutocompletion,
                  enableLiveAutocompletion: this.state.enableLiveAutocompletion,
                  enableSnippets: this.state.enableSnippets,
                  showLineNumbers: this.state.showLineNumbers,
                  tabSize: 2
                }}
              />
        );
        
    }
}
const mapStateToProps = (state) => {
  return {
      questionsObject: state.delta.questionsObject,
      currentQuestion: state.delta.currentQuestion,

  };
};

export default connect(mapStateToProps, null)(CodeEditor);


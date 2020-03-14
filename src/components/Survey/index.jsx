import React, { Component } from 'react'
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { setSurveyData } from '../../redux/actions/actions';

class index extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            count: -1,
            answers: {
                0: [-1, 0],
                1: [-1, 0],
                2: [-1, 0],
                3: [-1, 0],
                4: [-1, 0],
                5: [-1, 0],
                6: [-1, 0],
                7: [-1, 0],
                8: [-1, 0],
                9: [-1, 0],
            },
            result: 0 
        }
    }
    
    handleChecked = (event) => {
        const { value, name } = event.target;

        var option = Number(name.split(",")[1]);
        var weight = Number(value);

        this.setState({answers: { ...this.state.answers, [this.state.count]: [option, weight] }});
    }

    handleBack = (event) => {
        this.setState({count: (this.state.count - 1)});
    }

    handleNext = (event) => {
        this.setState({count: (this.state.count + 1)});
    }

    handleSubmit = (event) => {
        var result = 0;

        for (var i = 0; i < 10; i++) {
            result += this.state.answers[i][1];
        };

        this.props.setSurveyData(result);
    }


    render() {
        
        var questions = [
            {
                question: "How often do you eat animal based products?",
                options: [
                    ["Never (vegan)", 0.00],
                    ["Infrequently (vegetarian - eggs/dairy, no meat)", 0.25],
                    ["Occasionally (really like veggies - occasional meat, eggs/dairy)", 0.50],
                    ["Often (balanced meat/veggies - meat a few times a week, eggs/dairy almost daily)", 0.75],
                    ["Very often (meat daily)", 1.00]
                ]
            },
            {
                question: "How much of the food is unprocessed, unpackaged, or grown locally?",
                options: [
                    ["None", 1.00],
                    ["Some", 0.75],
                    ["Most", 0.50],
                    ["All" , 0.00]
                ]
            },
            {
                question: "How many people live in your house?",
                options: [
                    ["Just me", 1.00],
                    ["2-3 people", 0.75],
                    ["4-6 people", 0.50],
                    ["7-9 people" , 0.25],
                    ["10 or more people" , 0.00]
                ]
            },
            {
                question: "How Large is your home?",
                options: [
                    ["Tiny (50 sq ft))", 0.25],
                    ["Medium (<= 1396 sq ft)", 0.50],
                    ["Large (<= 4984 sq ft)", 0.75],
                    ["Huge (4984 sq ft<)", 1.00]
                ]
            },
            {
                question: "Do you have electricity?",
                options: [
                    ["No", 0.00],
                    ["Yes", 1.00]
                ]
            },
            {
                question: "How energy efficient is your house?",
                options: [
                    ["Very inefficient (poor insulation, few LED lamps, heating/cooling systems used often)", 1.00],
                    ["Below average (inefficient lighting, standard appliances)", 0.75],
                    ["Average (modern appliances, climate controls)", 0.50],
                    ["Above average (well insulated, efficient lighting and appliances, careful use)" , 0.25],
                    ["Efficiency-centered design (passive heating/cooling, advanced temperature control and ventilation, low electricity use)" , 0.10]
                ]
            },
            {
                question: "How much of your home’s electricity comes from renewable resources?",
                options: [
                    ["All", 0.10],
                    ["More than half", 0.25],
                    ["About half", 0.50],
                    ["Less than half", 0.75],
                    ["None", 1.00]
                ]
            },
            {
                question: "Compared to your neighbours how much trash do you generate?",
                options: [
                    ["Way Less", 0.10],
                    ["Less", 0.25],
                    ["About the same", 0.50],
                    ["More", 0.75],
                    ["Way more", 1.00]
                ]
            },
            {
                question: "How do you typically travel?",
                options: [
                    ["Walk or bike", 0.00],
                    ["Public transportation", 0.25],
                    ["Carpool, and ride shares", 0.50],
                    ["Drive yourself, or taxi", 1.00]
                ]
            },
            {
                question: "How often do you fly in a year?",
                options: [
                    ["Never", 0.00],
                    ["Rarely (1-2 times)", 0.25],
                    ["Often(3-5 times)", 0.50],
                    ["Frequently (6 times <=)", 1.00]
                ]
            }
        ];

        const { answers, count = 0 } = this.state;

        return (
            <div className="survey-container-root">
                {    
                    <div className={"logo" + ((count === -1)? " hidden left" : " left") } onClick={this.handleBack}>
                        <FaChevronLeft/>
                    </div>
                }
                <div className="middle-container">
                    {
                        (count === -1)
                        ?
                        <div className="welcome-text">
                            <h1>Welcome to Greenfoot!</h1>
                            <div className="text">
                                {`Help us estimate your carbon footprint by answering a few questions.\n\n`}
                                {`You will be able to proceed to your profile once you take this survey.`}
                            </div>
                        </div>
                        :
                        (count === 10)
                        ?
                        <div className="result-text">
                            <h1>Thank you for taking this survey!</h1>
                            <div className="result">
                                {`You can still go back and resubmit your answers.\n`}
                                {`\n`}
                                {`When you're finshed with all the questions, hit submit and we'll redirect you to your profile.`}
                                <div className="submit-button" onClick={this.handleSubmit}>
                                    Submit Answers!
                                </div>
                            </div>
                        </div>
                        :
                        <div className="question-root">
                            <div className="question-text">
                                {questions[count].question}
                            </div>
                            {
                                questions[count].options.map((e, i) => {
                                    return(
                                        <div className="option-text" key={i + (i * 10)}>
                                            <input
                                                name={`${count},${i}`}
                                                type="checkbox"
                                                checked={answers[count][0] === i}
                                                value={e[1]}
                                                onChange={this.handleChecked}
                                            />
                                            {e[0]}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    }
                </div>
                {   
                    <div className={"logo" + ((count === 10)? " hidden right" : " right") } onClick={this.handleNext}>
                        <FaChevronRight/>
                    </div>
                }
                
            </div>
        )
    }
}


function mapDispatchToProps(dispatch) {
    return {
      setSurveyData: bindActionCreators(setSurveyData, dispatch),
    };
}

export default connect(null, mapDispatchToProps)(index);
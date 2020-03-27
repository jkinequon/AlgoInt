// Basically the redux master states
// These are globally accessible via the redux store's actions
export default {
  frontEndTest: false,
  signedIn: false,
  currentState: "LogIn",
  currentQuestion: null,
  questionQueue: [],
  completedQuestions: [],
  questionsObject: [],
  username: "default_user",
  uid: "abcd",
  currentMode: 0,
  mockInterviewTime: 60,
  timeFinished: true,
  countdownRef: null
};

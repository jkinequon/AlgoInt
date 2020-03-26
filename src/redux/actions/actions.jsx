import * as types from './actionTypes';

export const setFrontEndTest = () =>{ return { type: types.SET_FRONTEND_TEST } };

export const signIn = () => { return { type: types.SIGN_IN } };

export const signOff = () => { return { type: types.SIGN_OFF } };

export const setCurrentQuestion = (currentQuestion) => { return {currentQuestion, type: types.SET_CURRENT_QUESTION } };

export const setQuestionQueue = (questionObject) => { return {questionObject, type: types.SET_QUESTION_QUEUE } };

export const addCompletedQuestion = (completedQuestions) => { return {completedQuestions, type: types.ADD_COMPLETED_QUESTION } };

export const setCompletedQuestions = (completedQuestions) => { return {completedQuestions, type: types.SET_COMPLETED_QUESTIONS } };

export const setQuestionObject = (questionObject) => { return {questionObject: [questionObject], type: types.SET_QUESTION_OBJECT } };

export const setUsername = (username) => { return {username, type: types.SET_USERNAME } };
export const setUID = (uid) => { return {uid, type: types.SET_UID } };

export const setCurrentMode = (currentMode) => { return {currentMode, type: types.SET_CURRENT_MODE } };

export const setMockInterviewTime = (mockInterviewTime) => { return {mockInterviewTime, type: types.SET_MOCKINTERVIEW_TIME } };

export const setTimeFinished = (timeFinished) => { return {timeFinished, type: types.TIME_FINISHED } };

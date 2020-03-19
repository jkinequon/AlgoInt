import * as types from './actionTypes';

export const signIn = () => { return { type: types.SIGN_IN } };

export const signOff = () => { return { type: types.SIGN_OFF } };

export const setCurrentQuestion = (currentQuestion) => { return {currentQuestion, type: types.SET_CURRENT_QUESTION } };

export const setQuestionQueue = (questionObject) => { return {questionObject, type: types.SET_QUESTION_QUEUE } };

export const setQuestionObject = (questionObject) => { return {questionObject: [questionObject], type: types.SET_QUESTION_OBJECT } };

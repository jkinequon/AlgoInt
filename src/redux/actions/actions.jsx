import * as types from './actionTypes';

export const signIn = () => { return { type: types.SIGN_IN } };

export const signOff = () => { return { type: types.SIGN_OFF } };

export const setSurveyData = (data) => { return { type: types.SURVEY_SUBMIT, data } };


/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
export default (state: any, action: any) => {
  switch (action.type) {
    case 'UPDATE_X':
      return { ...state, x: action.payload };
    case 'UPDATE_Y':
      return { ...state, y: action.payload };
    default:
      return { ...state };
  }
};
      
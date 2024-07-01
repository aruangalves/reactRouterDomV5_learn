export const reducer = (state, action) => {
  switch(action.type){
    case 'CHANGE_TITLE': {
      return {...state, title: action.payload +' #'};
    }
    case 'INCREASE_COUNTER':{
      const { counter } = state;
      return {...state, counter: counter + 1};
    }
    case 'INVERT_TITLE': {
      const { title } = state;
      return {...state, title: title.split('').reverse().join('')};
    }

  }

  return {...state};
};

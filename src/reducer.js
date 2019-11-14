export const initialState = {
  currentDataSet: '2010s',
  dataSet: null,

  widget: {
    year: '2010s',
    groom: '',
    bride: '',
    options: ['Caucasian', 'Chinese', 'Eurasian', 'Indian', 'Malay', 'Other'],
    menus: {
      groom: ['Caucasian', 'Chinese', 'Eurasian', 'Indian', 'Malay', 'Other'],
      bride: ['Caucasian', 'Chinese', 'Eurasian', 'Indian', 'Malay', 'Other']

    }
  }
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "SELECT_OPTION":
      { 
        const { key, value } = action.option
        const oppositeKey = (key === 'bride' ? 'groom' : 'bride')
        return {
          ...state,
          widget: {
            ...state.widget,
            ...{ [key]: value},
            menus: {
              [key]: state.widget.options.filter(item => item !== state.widget[oppositeKey]),
              [oppositeKey]: state.widget.options.filter(item => item !== value)
            }
          }
        };
      }
    case "SELECT_DATASET":
      {
        return {
          ...state,
          dataSet: action.dataSet
        }
      }
    default:
      return state;
  }
};

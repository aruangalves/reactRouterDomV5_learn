import props from 'prop-types';

export const IncButton = ({incrementFn}) => {
  //console.log('Btn render');
  //After removing the count2 dependency, this function must render only once, meaning the console message is also displayed only once after initial render
  return <button type='button' onClick={() => incrementFn(5)}>+</button>
}

IncButton.propTypes = {
  incrementFn: props.func,
}


import React, { Component,PropTypes } from 'react';
import { View,Text,StyleSheet } from 'react-native';

const STEP_COUNT = 5;
const STEP_INDICATOR_SIZE = 30;
const SEPARATOR_STROKE_WIDTH = 10;
const STEP_INDICATOR_COLOR_CURRENT = '#ffffff';
const STEP_INDICATOR_COLOR_FINISHED = '#4aae4f';
const STEP_INDICATOR_COLOR_UNFINISHED = '#a4d4a5';
const SEPARATOR_COLOR_FINISHED = '#4aae4f';
const SEPARATOR_COLOR_UNFINISHED = '#a4d4a5';
const STEP_INDICATOR_LABEL_SIZE = 15;
const STEP_INDICATOR_LABEL_COLOR_CURRENT = '#000000';
const STEP_INDICATOR_LABEL_COLOR_FINISHED = '#ffffff';
const STEP_INDICATOR_LABEL_COLOR_UNFINISHED = 'rgba(255,255,255,0.5)';
const CURRENT_STEP_INDICATOR_STROKE_WIDTH = 5;

var customStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize:40,
  separatorStrokeWidth: 8,
  currentStepStrokeWidth: 5,
  separatorFinishedColor: '#4aae4f',
  separatorUnFinishedColor: '#a4d4a5',
  stepIndicatorFinishedColor: '#4aae4f',
  stepIndicatorUnFinishedColor: '#a4d4a5',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 15,
  currentStepIndicatorLabelFontSize: 15,
  stepIndicatorLabelCurrentColor: '#000000',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)'
}

export default class NewStepIndicator extends Component {

  constructor(props) {
    super(props);
    this.state = {
      width:0
    }
    customStyles = Object.assign(customStyles, props.customStyles);
  }

  render() {
    const { labels } = this.props;
    return (
      <View onLayout={(event) => this.setState({width: event.nativeEvent.layout.width})} style={defaultStyle.container}>
        {this.renderStepIndicator()}
        {labels && this.renderStepLabels()}
      </View>
    );
  }

  renderStepIndicator = () => {
    let steps = [];
    const { labels } = this.props;
    for(let position = 0 ; position < STEP_COUNT ; position++) {
      steps.push(
        <View key={position} style={defaultStyle.stepContainer}>
          {this.renderStep(position)}
        </View>)
      }
      return(
        <View style={defaultStyle.stepIndicatorContainer}>
          {steps}
        </View>
      )
    }

    renderStepLabels = () => {
      const { labels } = this.props;
      var labelViews = labels.map((label,index) => {
        return (
          <Text key={index} style={defaultStyle.stepLabel}>
            {label}
          </Text>
        )
      });

      return(
        <View style={defaultStyle.stepLabelsContainer}>
          {labelViews}
        </View>
      )
    }

    renderStep = (position) => {
      const { currentPosition } = this.props;
      let stepStyle;
      let indicatorLabelStyle;
      let leftSeparatorStyle;
      let rightSeparatorStyle;
      const separatorStyle = { height: customStyles.separatorStrokeWidth }
      if(position === currentPosition) {
        stepStyle = {
          backgroundColor:customStyles.stepIndicatorCurrentColor,
          borderWidth:customStyles.currentStepStrokeWidth,
          borderColor:customStyles.stepIndicatorFinishedColor,
          height:customStyles.currentStepIndicatorSize,
          width:customStyles.currentStepIndicatorSize,
          borderRadius:(customStyles.currentStepIndicatorSize) / 2
        };
        indicatorLabelStyle = { fontSize: customStyles.currentStepIndicatorLabelFontSize, color: customStyles.stepIndicatorLabelCurrentColor };
        leftSeparatorStyle = { backgroundColor: customStyles.separatorFinishedColor };
        rightSeparatorStyle = { backgroundColor: customStyles.separatorUnFinishedColor };
      }
      else if(position < currentPosition){
        stepStyle = {
          backgroundColor: customStyles.stepIndicatorFinishedColor,
          height:customStyles.stepIndicatorSize,
          width:customStyles.stepIndicatorSize,
          borderRadius:(customStyles.stepIndicatorSize) / 2
         };
        indicatorLabelStyle = { fontSize: customStyles.stepIndicatorLabelFontSize, color: customStyles.stepIndicatorLabelFinishedColor };;
        leftSeparatorStyle = { backgroundColor: customStyles.separatorFinishedColor };
        rightSeparatorStyle = { backgroundColor: customStyles.separatorFinishedColor };
      }
      else {
        stepStyle = {
          backgroundColor: customStyles.stepIndicatorUnFinishedColor,
          height:customStyles.stepIndicatorSize,
          width:customStyles.stepIndicatorSize,
          borderRadius:(customStyles.stepIndicatorSize) / 2
         };
        indicatorLabelStyle = { fontSize: customStyles.stepIndicatorLabelFontSize, color: customStyles.stepIndicatorLabelUnFinishedColor };
        leftSeparatorStyle = { backgroundColor: customStyles.separatorUnFinishedColor };
        rightSeparatorStyle = { backgroundColor: customStyles.separatorUnFinishedColor };
      }


      return [
        <View key={'left-separator'} style={[separatorStyle,(position !== 0) ? leftSeparatorStyle : {backgroundColor:'transparent'},{width:this.getSeparatorWidth(), marginRight:-1*(STEP_INDICATOR_SIZE/2)}]}/>,
        <View key={'step-indicator'} style={[defaultStyle.step , stepStyle ]}>
          <Text style={indicatorLabelStyle}>{ position + 1 }</Text>
        </View>,
        <View key={'right-separator'} style={[separatorStyle,(position !== STEP_COUNT - 1) ? rightSeparatorStyle : {backgroundColor:'transparent'},{width:this.getSeparatorWidth(), marginLeft:-1*(STEP_INDICATOR_SIZE/2)}]}/>
      ];
    }

    getSeparatorWidth = () => {
      const separatorWidth = (this.state.width/(STEP_COUNT*2));
      return separatorWidth;
    }

    setCurrentPosition = () => {

    }
  }

  const defaultStyle =  StyleSheet.create({
    container: {
      backgroundColor:'transparent'
    },
    stepIndicatorContainer: {
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-around'
    },
    stepLabelsContainer: {
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-around',
      paddingTop: 8
    },
    step: {
      alignItems:'center',
      justifyContent:'center',
      zIndex: 2,
      elevation:3
    },
    stepContainer: {
      flex:1,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center'
    },
    stepLabel: {
      flex:1,
      fontSize:12,
      textAlign:'center',
      alignSelf:'flex-start'
    }
  });

  NewStepIndicator.propTypes = {
    currentPosition: PropTypes.number,
    stepCount: PropTypes.number,
    customStyles: PropTypes.object
  };

  NewStepIndicator.defaultProps = {
    currentPosition: 0,
    stepCount: 5,
    stepIndicatorSize: 30,
    separatorStrokeWidth: 8,
    currentStepStrokeWidth: 5,
    separatorFinishedColor: '#4aae4f',
    separatorUnFinishedColor: '#a4d4a5',
    stepIndicatorFinishedColor: '#4aae4f',
    stepIndicatorUnFinishedColor: '#a4d4a5',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 15,
    stepIndicatorLabelCurrentColor: '#000000',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)'
  }
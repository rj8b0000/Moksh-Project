import { View, Text, Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import * as Progress from 'react-native-progress';

const {width, height} = Dimensions.get('window');
const Loading = () => {
  return (
    <View style={styles.loader}>
      <Progress.CircleSnail thickness={12} size={150}  color={'#1C8D5A'}/>
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({
    loader : {
        height: height,
        width: width,
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        zIndex: 2,
    }
})

// import { StyleSheet, Text, View } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { ProgressBar } from '@react-native-community/progress-bar-android'

// const progressProps = {
//     // styleAttr : "Horizontal",
//     indeterminate : true,
//     color: 'black'
// }
// const Progress = () => {
//     const [progress, setProgress] = useState(0);
//     useEffect(()=>{
//         function updateProgress() {
//             setProgress((currentProgress)=>{
//                 if(currentProgress < 0.8)
//                 {
//                     setTimeout(updateProgress,600)
//                 };
//                 return currentProgress + 0.1;
//             })
//         };
//         updateProgress();
//     },[])
//   return (
//       <View style={styles.progress}>
//         <Text style={styles.progressText}>{Math.round(progress*100)}%</Text>
//         <ProgressBar {...progressProps} progress={progress} style={styles.progress} />
//       </View>
//   )
// }

// export default Progress

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     progress: {
//         // width: '90%',
//         alignItems: 'center',
//         // height: 20,

//     },
//     progressText: {
//         fontSize: 20,
//         textAlign: 'left',
//         color: 'black',
//     }
// })
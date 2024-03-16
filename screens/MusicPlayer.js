import React, {startTransition, useEffect, useRef, useState} from "react";
import { SafeAreaView,StyleSheet, View, Text, Dimensions, TouchableOpacity, Image, FlatList, Animated } from "react-native";
import TrackPlayer,{
    Capability,
    Event,
    RepeatMode,
    State,
    usePlaybackState,
    useProgress,
    useTrackPlayerEvents,
    ADD_TO_QUEUE
} from "react-native-track-player"
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Slider from "@react-native-community/slider";
import { pause, play } from "react-native-track-player/lib/trackPlayer";
import axios from "axios";
import { Color } from "../../GlobalStyles";
// import songs from "../model/data";
const { width, height} = Dimensions.get('window')
     
const MusicPlayer = () => {
   
    const playBackstate = usePlaybackState();
    const progress = useProgress();

    const [trackArtWork, setTrackArtWork] = useState();
    const [trackArtist, setTrackArtist] = useState();
    const [trackTitle, setTrackTitle] = useState();
    const [songs, setSongs] = useState([]);
    const scrollx = useRef(new Animated.Value(0)).current;
    const [songIndex, setSongIndex] = useState(0)
    const [repeatMode, setRepeatMode] = useState('off')


    const songSlider = useRef(null)


    useEffect(()=>{
        fetchSongs();
        // console.log(songs)
        setUpPlayer()
        scrollx.addListener(({ value })=>{
            const index = Math.round(value/width)
            skipTo(index)
            setSongIndex(index)
            console.log('Indx', index)
        });
        return () => {
            scrollx.removeAllListeners()
        }
    },[])

    useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], async event => {
        if(event.type == Event.PlaybackActiveTrackChanged && event.skipToNext != null)
        {
            const track = await TrackPlayer.getTrack(event.skipToNext);
            const {title, artwork, artist} = track;
            setTrackTitle(title);
            setTrackArtWork(artwork);
            setTrackArtist(artist);
        }
    })

      const fetchSongs = async () => {
        try {
          const response = await axios.get('https://bugle.co.in/moksh/public/api/get-mantra');
          const mantras = response.data
          setSongs(mantras)
            // console.log("The mantra url is ",mantras)
        } catch (error) {
          console.error('Error fetching songs:', error);
        }
      };

    const setUpPlayer = async () => {
        await TrackPlayer.setupPlayer();
        await TrackPlayer.updateOptions({
            capabilities: [
                Capability.Play,
                Capability.Pause,
                Capability.SkipToNext,           
                Capability.SkipToPrevious,
                Capability.Stop
            ]
        });
        const prefixAudioUrl = "https://bugle.co.in/moksh/public/public/assets/Audio/mantra_audio/"
        try{
            const response = await axios.get("https://bugle.co.in/moksh/public/api/get-mantra");
            const data = response.data
            const tracks = data.map((track) => ({
                id : track.id,
                url : `${prefixAudioUrl}${track.url}`,
                title: track.title,
                artwork : track.artwork
            }))
            console.log(tracks)
            TrackPlayer.add(tracks)
            // console.log("The music is",data.title)
            // TrackPlayer.add(
            //     data.tracks.map((track, index) => ({
            //       url: `${prefixAudioUrl}${track.url}`, 
            //       // You can add any additional fields that you need here
            //     })),
            //   );
        }
        catch(err)
        {
            console.log("Error in while adding track is ",err)
        }
        
    }
    const onPause = async () => {
        if(State.Playing)
        {
            await pause()
        }
    }
    const togglePlayback = async (playBackstate) =>{
        const currentTrack = await TrackPlayer.getActiveTrack()
        // console.log(currentTrack
        
        if(currentTrack !== null)
        {
            if(State.Ready ||State.Paused)
            {
                await TrackPlayer.play()
                console.log("play called")
            }
            else{
                onPause()
            }
        }
        
    }


    const repeatIcon = () => {
        if(repeatMode == 'off')
        {
            return 'repeat-off'
        }
        if(repeatMode == 'track')
        {
            return 'repeat-once'
        }
        if(repeatMode == 'repeat')
        {
            return 'repeat'
        }
    }

    const changeRepeatMode = async () => {
        if(repeatMode == 'off')
        {
            TrackPlayer.setRepeatMode(RepeatMode.Track);
            setRepeatMode('track');
        }
        if(repeatMode == 'track')
        {
            TrackPlayer.setRepeatMode(RepeatMode.Queue);
            setRepeatMode('repeat');
        }
        if(repeatMode == 'repeat')
        {   
            TrackPlayer.setRepeatMode(RepeatMode.Off);
            setRepeatMode('off');
        }
    }
    const skipTo = async (trackId) => {
        await TrackPlayer.skip(trackId)
    }
   
    const skipToNext = () => {
        songSlider.current.scrollToOffset({
            offset : (songIndex + 1)*width,
        })
    }

    const skipToPrevious = () => {
        songSlider.current.scrollToOffset({
            offset : (songIndex - 1)*width,   
        })
    }
    const renderArtwork = ({ index, item}) => {
        const prefixUrl = 'https://bugle.co.in/moksh/public/public/assets/images/mantra_thumbnail/';
        // const prefixAudioUrl = "https://bugle.co.in/moksh/public/public/assets/Audio/mantra_audio/";
        const fullImageUrl = `${prefixUrl}${item.artwork}`;
        // const fullAudioUrl = `${prefixAudioUrl}${songs.url}`;
        // TrackPlayer.add(fullAudioUrl)
        return(
            <Animated.View style={{width: width, justifyContent: 'center', alignItems: 'center'}}>
                <View style={styles.artworkWrapper}>
                    <Image source={{uri : fullImageUrl}}
                        style={styles.artworkImg}
                    />
                </View>
                <View>                        
                    <Text style={styles.title}>{songs[songIndex].title}</Text>
                </View>
            </Animated.View>
           
        )
    }
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.mainContainer}>
                <View style={{width:width}}>
                <FlatList
                    ref={songSlider}
                    data={songs}
                    renderItem={renderArtwork}
                    keyExtractor={(item) => item.id}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={16}
                    onScroll={Animated.event(
                        [{
                            nativeEvent : {
                                contentOffset: {x : scrollx}
                            }
                        }]
                    )}
                />
                </View>

                
                <View>
                    <Slider
                        style={styles.progressContainer}
                        value={progress.position}
                        minimumValue={0}
                        maximumValue={progress.duration}
                        thumbTintColor="#1DAC92"
                        minimumTrackTintColor="#1DAC92"
                        maximumTrackTintColor="#61A397"
                        onSlidingComplete={async(value)=>{
                            await TrackPlayer.seekTo(value)
                        }}
                    />
                    <View style={styles.progressLabelContainer}>
                        <Text style={styles.ProgressLabelText}>
                            {new Date(progress.position * 1000).toISOString().substring(14,19)}
                            </Text>
                        <Text style={styles.ProgressLabelText}>
                        {new Date((progress.duration - progress.position) * 1000).toISOString().substring(14,19)} 
                        </Text>
                    </View>
                </View>
                <View style={styles.musicControlls}>
                    <TouchableOpacity onPress={skipToPrevious}> 
                        <Ionicons name="play-skip-back-outline" size={35} color={'#1DAC92'}  style={{marginTop: 25}}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{togglePlayback()}}> 
                        <Ionicons
                            name="play-circle-sharp"
                          size={75} color={'#1DAC92'}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{onPause(playBackstate)}}> 
                        <Ionicons
                            name="pause-circle-sharp"
                          size={75} color={'#1DAC92'}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={skipToNext}> 
                        <Ionicons name="play-skip-forward-outline" size={35} color={'#1DAC92'} style={{marginTop: 25}}/>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.bottomContainer}>
                <View style={styles.bottomControls}>
                    <TouchableOpacity onPress={()=>{}}>
                    <Ionicons name="heart-outline" size={30} color={'#777'}/>  
                    </TouchableOpacity>
                    <TouchableOpacity onPress={changeRepeatMode}>
                    <MaterialCommunityIcons name={`${repeatIcon()}`} size={30} color={ repeatMode != 'off' ? '#1DAC92' :'#777'}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{}}>
                    <Ionicons name="share-outline" size={30} color={'#777'}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{}}>
                    <Ionicons name="ellipsis-horizontal" size={30} color={'#777'}/>
                    </TouchableOpacity>
                </View>

            </View>   
        </SafeAreaView>
        
    )
}
export default MusicPlayer;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor : "#ffffe4",
        // backgroundColor : "red"
    },
    mainContainer : {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    artworkWrapper:{
        width: 300,
        height: 340,
        marginBottom: 25,
        shadowColor: '#fff',
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 5
    },
    artworkImg:{
        width: '100%',
        height: '100%',
        borderRadius: 15,
    },
    title:{
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        color: '#000'
    },
    artist:{
        fontSize: 12,
        fontWeight: '600',
        textAlign: 'center',
        color: '#eee'
    },
    progressContainer:{
        width: 350,
        height: 40,
        marginTop: 25,
        flexDirection: 'row'
    },
    progressLabelContainer:{
        width: 340,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    ProgressLabelText:{
        color: '#000'
    },
    musicControlls:{
        flexDirection: 'row',
        width: '60%',
        justifyContent: 'space-between',
        marginTop: 15
    },
    bottomContainer: {
        borderTopColor: '#393E46',
        borderTopWidth: 1,
        width: width,
        alignItems: 'center',
        paddingVertical: 15
    },
    bottomControls: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        width: '80%'
    }
})














































// import React, {startTransition, useEffect, useRef, useState} from "react";
// import { SafeAreaView,StyleSheet, View, Text, Dimensions, TouchableOpacity, Image, FlatList, Animated } from "react-native";
// import TrackPlayer,{
//     Capability,
//     Event,
//     RepeatMode,
//     State,
//     usePlaybackState,
//     useProgress,
//     useTrackPlayerEvents,
// } from "react-native-track-player"
// import Ionicons from "react-native-vector-icons/Ionicons";
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import Slider from "@react-native-community/slider";
// import { pause, play } from "react-native-track-player/lib/trackPlayer";
// // import axios from "axios";
// // import songs from "../model/data";
// const { width, height} = Dimensions.get('window')
     
// const MusicPlayer = () => {
   
//     const playBackstate = usePlaybackState();
//     const progress = useProgress();

//     const [trackArtWork, setTrackArtWork] = useState();
//     const [trackArtist, setTrackArtist] = useState();
//     const [trackTitle, setTrackTitle] = useState();
//     // const [songs, setSongs] = useState([]);
//     const scrollx = useRef(new Animated.Value(0)).current;
//     const [songIndex, setSongIndex] = useState(0)
//     const [repeatMode, setRepeatMode] = useState('off')


//     const songSlider = useRef(null)


//     useEffect(()=>{
//       const URL = "https://bugle.co.in/moksh/public/api/get-mantra";
//   fetch(URL)
//       .then((res) => {
//           return res.json();
//       })
//       .then((data) => {
//           console.log(data)
//           setUpPlayer(data);
//       })
     
//         scrollx.addListener(({ value })=>{
//             const index = Math.round(value/width)
//             skipTo(index)
//             setSongIndex(index)
//             console.log('Indx', index)
//         });
//         return () => {
//             scrollx.removeAllListeners()
//         }
//     },[])

//     useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], async event => {
//         if(event.type == Event.PlaybackActiveTrackChanged && event.skipToNext != null)
//         {
//             const track = await TrackPlayer.getTrack(event.skipToNext);
//             const {title, artwork, artist} = track;
//             setTrackTitle(title);
//             setTrackArtWork(artwork);
//             setTrackArtist(artist);
//         }
//     })

//     //   const fetchSongs = async () => {
//     //     try {
//     //       const response = await axios.get('https://bugle.co.in/moksh/public/api/get-mantra');
//     //       setSongs(response.data)
//     //     // console.log(typeof(response))
//     //     } catch (error) {
//     //       console.error('Error fetching songs:', error);
//     //     }
//     //   };
//     const setUpPlayer = async (data) => {
//         console.log(data)
//         try{
//             await TrackPlayer.setupPlayer();
//         }
//         catch(err)
//         {
//             console.log("Setup player not intied",err)
//         }
//         await TrackPlayer.updateOptions({
//             capabilities: [
//                 Capability.Play,
//                 Capability.Pause,
//                 Capability.SkipToNext,
//                 Capability.SkipToPrevious,
//                 Capability.Stop
//             ]
//         });
//         await TrackPlayer.add(data);
      
//     }
//     const onPause = async () => {
//         if(State.Playing)
//         {
//             await pause()
//         }
//     }
//     const togglePlayback = async (playBackstate) =>{
//         const currentTrack = await TrackPlayer.getActiveTrack()
//         // console.log(currentTrack
        
//         if(currentTrack !== null)
//         {
//             if(State.Ready ||State.Paused)
//             {
//                 await TrackPlayer.play()
//                 console.log("play called")
//             }
//             else{
//                 onPause()
//             }
//         }
        
//     }


//     const repeatIcon = () => {
//         if(repeatMode == 'off')
//         {
//             return 'repeat-off'
//         }
//         if(repeatMode == 'track')
//         {
//             return 'repeat-once'
//         }
//         if(repeatMode == 'repeat')
//         {
//             return 'repeat'
//         }
//     }

//     const changeRepeatMode = async () => {
//         if(repeatMode == 'off')
//         {
//             TrackPlayer.setRepeatMode(RepeatMode.Track);
//             setRepeatMode('track');
//         }
//         if(repeatMode == 'track')
//         {
//             TrackPlayer.setRepeatMode(RepeatMode.Queue);
//             setRepeatMode('repeat');
//         }
//         if(repeatMode == 'repeat')
//         {   
//             TrackPlayer.setRepeatMode(RepeatMode.Off);
//             setRepeatMode('off');
//         }
//     }
//     const skipTo = async (trackId) => {
//         await TrackPlayer.skip(trackId)
//     }
   
//     const skipToNext = () => {
//         songSlider.current.scrollToOffset({
//             offset : (songIndex + 1)*width,
//         })
//     }

//     const skipToPrevious = () => {
//         songSlider.current.scrollToOffset({
//             offset : (songIndex - 1)*width,   
//         })
//     }
//     const renderSongs = ({ index, item}) => {
//         return(
//             <Animated.View style={{width: width, justifyContent: 'center', alignItems: 'center'}}>
//                 <View style={styles.artworkWrapper}>
//                     <Image source={item.artwork}
//                         style={styles.artworkImg}
//                     />
//                 </View>
//             </Animated.View>
           
//         )
//     }
//     return(
//         <SafeAreaView style={styles.container}>
//             <View style={styles.mainContainer}>
//                 <View style={{width:width}}>
//                 <FlatList
//                     ref={songSlider}
//                     data={songs}
//                     renderItem={renderSongs}
//                     keyExtractor={(item) => item.id}
//                     horizontal
//                     pagingEnabled
//                     showsHorizontalScrollIndicator={false}
//                     scrollEventThrottle={16}
//                     onScroll={Animated.event(
//                         [{
//                             nativeEvent : {
//                                 contentOffset: {x : scrollx}
//                             }
//                         }]
//                     )}
//                 />
//                 </View>

//                 <View>                        
//                     <Text style={styles.title}>{songs[songIndex].title}</Text>
//                 </View>
//                 <View>
//                     <Slider
//                         style={styles.progressContainer}
//                         value={progress.position}
//                         minimumValue={0}
//                         maximumValue={progress.duration}
//                         thumbTintColor="#1DAC92"
//                         minimumTrackTintColor="#1DAC92"
//                         maximumTrackTintColor="#fff"
//                         onSlidingComplete={async(value)=>{
//                             await TrackPlayer.seekTo(value)
//                         }}
//                     />
//                     <View style={styles.progressLabelContainer}>
//                         <Text style={styles.ProgressLabelText}>
//                             {new Date(progress.position * 1000).toISOString().substring(14,19)}
//                             </Text>
//                         <Text style={styles.ProgressLabelText}>
//                         {new Date((progress.duration - progress.position) * 1000).toISOString().substring(14,19)} 
//                         </Text>
//                     </View>
//                 </View>
//                 <View style={styles.musicControlls}>
//                     <TouchableOpacity onPress={skipToPrevious}> 
//                         <Ionicons name="play-skip-back-outline" size={35} color={'#1DAC92'}  style={{marginTop: 25}}/>
//                     </TouchableOpacity>
//                     <TouchableOpacity onPress={()=>{togglePlayback()}}> 
//                         <Ionicons
//                             name="play-circle-sharp"
//                           size={75} color={'#1DAC92'}/>
//                     </TouchableOpacity>
//                     <TouchableOpacity onPress={()=>{onPause(playBackstate)}}> 
//                         <Ionicons
//                             name="pause-circle-sharp"
//                           size={75} color={'#1DAC92'}/>
//                     </TouchableOpacity>
//                     <TouchableOpacity onPress={skipToNext}> 
//                         <Ionicons name="play-skip-forward-outline" size={35} color={'#1DAC92'} style={{marginTop: 25}}/>
//                     </TouchableOpacity>
//                 </View>
//             </View>
//             <View style={styles.bottomContainer}>
//                 <View style={styles.bottomControls}>
//                     <TouchableOpacity onPress={()=>{}}>
//                     <Ionicons name="heart-outline" size={30} color={'#777'}/>  
//                     </TouchableOpacity>
//                     <TouchableOpacity onPress={changeRepeatMode}>
//                     <MaterialCommunityIcons name={`${repeatIcon()}`} size={30} color={ repeatMode != 'off' ? '#1DAC92' :'#777'}/>
//                     </TouchableOpacity>
//                     <TouchableOpacity onPress={()=>{}}>
//                     <Ionicons name="share-outline" size={30} color={'#777'}/>
//                     </TouchableOpacity>
//                     <TouchableOpacity onPress={()=>{}}>
//                     <Ionicons name="ellipsis-horizontal" size={30} color={'#777'}/>
//                     </TouchableOpacity>
//                 </View>

//             </View>   
//         </SafeAreaView>
        
//     )
// }
// export default MusicPlayer;

// const styles = StyleSheet.create({
//     container:{
//         flex: 1,
//         backgroundColor : '#222831',
//     },
//     mainContainer : {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center'
//     },
//     artworkWrapper:{
//         width: 300,
//         height: 340,
//         marginBottom: 25,
//         shadowColor: '#fff',
//         shadowOffset: {
//             width: 5,
//             height: 5,
//         },
//         shadowOpacity: 0.5,
//         shadowRadius: 3.84,
//         elevation: 5
//     },
//     artworkImg:{
//         width: '100%',
//         height: '100%',
//         borderRadius: 15,
//     },
//     title:{
//         fontSize: 18,
//         fontWeight: '600',
//         textAlign: 'center',
//         color: '#eee'
//     },
//     artist:{
//         fontSize: 12,
//         fontWeight: '600',
//         textAlign: 'center',
//         color: '#eee'
//     },
//     progressContainer:{
//         width: 350,
//         height: 40,
//         marginTop: 25,
//         flexDirection: 'row'
//     },
//     progressLabelContainer:{
//         width: 340,
//         flexDirection: 'row',
//         justifyContent: 'space-between'
//     },
//     ProgressLabelText:{
//         color: '#fff'
//     },
//     musicControlls:{
//         flexDirection: 'row',
//         width: '60%',
//         justifyContent: 'space-between',
//         marginTop: 15
//     },
//     bottomContainer: {
//         borderTopColor: '#393E46',
//         borderTopWidth: 1,
//         width: width,
//         alignItems: 'center',
//         paddingVertical: 15
//     },
//     bottomControls: {
//         flexDirection: 'row', 
//         justifyContent: 'space-between', 
//         width: '80%'
//     }
// })
// useEffect(() => {
//   getProducts();
// }, [])
// const getProducts = () => {
  
// };
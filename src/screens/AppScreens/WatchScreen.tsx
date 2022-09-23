import React, { useRef, useContext, useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, ImageBackground, Image } from "react-native";

import { Video, ResizeMode, AVPlaybackStatus } from "expo-av";
import { Ionicons } from '@expo/vector-icons';

import AnimatedLottieView from "lottie-react-native";
import { CourseContext } from "../../contexts/CourseContext";


interface CurrentVideoProps {
    uri?: string,
    title?: string,
    thumb?: string
}

export default function WatchScreen({ navigation }) {
    const { currentCourse } = useContext(CourseContext);

    const [ moduleShown, setModuleShown ] = useState(true);

    const modules = [...currentCourse.modules];

    const videoRef = useRef(null);
    const [ currentVideoPlaying, setCurrentVideoPlaying ] = useState<CurrentVideoProps>();    
    const [status, setStatus] = useState<AVPlaybackStatus>();
    const [isLoaded, setIsLoaded] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const [shouldPlay, setShouldPlay] = useState(false)
    const [finished, setFinished] = useState(false)


    function handleStatusUpdate(status: AVPlaybackStatus) {
        if(status.isLoaded) {
            setIsLoading(false);
            console.log("Loaded: ", isLoaded)
        }

        if(status.isLoaded && status.isPlaying) {
            setIsPlaying(status.isPlaying);
            console.log("Playing: ", isPlaying)
        }

        if(status.isLoaded && status.didJustFinish) {
            setIsPlaying(false);
            setShouldPlay(false);
            setFinished(true);
            console.log("Finished: ", isPlaying)
        }
    }

    function handlePlay() {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 2000);
        setTimeout(() => setShouldPlay(true), 2000);
        setTimeout(() => setIsPlaying(true), 1000);
    }

    function handleSetCurrentVideoClass({title, uri, thumb}) {
        setCurrentVideoPlaying({ uri, title, thumb })
        handlePlay();
    }

    useEffect(() => {
        setIsLoading(true)
        setCurrentVideoPlaying({
            uri: modules[0].classes[0].uri,
            title: modules[0].classes[0].title,
            thumb: modules[0].classes[0].thumb,
        })

        setTimeout(() => setIsLoading(false), 1000)
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={navigation.goBack} style={styles.headerGoBack}>
                    <Ionicons name='chevron-back-outline' size={24} color='rgb(250, 250, 250)'/>
                </TouchableOpacity>    
                <Text style={styles.headerText}>{currentCourse.title || "Título"}</Text>  
            </View>
            <View style={styles.videoContainer}>
                {
                    
                    !isPlaying ? (
                        <ImageBackground 
                            source={{uri: currentVideoPlaying?.thumb}} 
                            resizeMode="contain" 
                            style={styles.videoImageBackground}
                        >
                            {(isLoading && !finished) ? (
                                <AnimatedLottieView style={{height: 60, backgroundColor: "transparent", borderColor: "#FFF"}} resizeMode="contain" autoPlay source={require('../../assets/animated/bouncing-balls.json')} />
                            ) : (
                                <TouchableOpacity onPress={handlePlay} style={styles.videoPlayButton}>
                                    <Ionicons name="play-outline" size={50} color="#FFF"/>
                                </TouchableOpacity>
                            )}
                        </ImageBackground>
                    ) : (
                        <Video 
                            source={{uri: currentVideoPlaying?.uri}}
                            posterSource={{uri: currentVideoPlaying?.thumb}}
                            useNativeControls
                            shouldCorrectPitch={true}
                            resizeMode={ResizeMode.CONTAIN}
                            ref={videoRef}
                            style={styles.video}
                            onPlaybackStatusUpdate={handleStatusUpdate}
                            shouldPlay={shouldPlay}
                            usePoster={true}
                        /> 
                    )
                }
            </View>
            <View style={styles.classesDetailContainer}>
                <View style={styles.videoTitleContainer}>
                    <Text style={styles.videoTitle} numberOfLines={1}>
                        {currentVideoPlaying?.title}
                    </Text>

                    <View>

                    </View>
                </View>

                <ScrollView style={{ paddingTop: 10 }}>
                    {
                        modules.map((module, index) => (
                            <View key={index.toString()}>
                                <TouchableOpacity  style={styles.moduleHeaderContainer} onPress={() => setModuleShown(!moduleShown)}>
                                    <>
                                        <Text style={{color: "#FFF", fontSize: 15, fontWeight: "600"}}>Módulo {index + 1}:  Conhecimentos básicos</Text>
                                        <Ionicons name={moduleShown ? "chevron-down-outline" : "chevron-forward-outline"} size={24} color="#FFF"/>
                                    </>
                                </TouchableOpacity>

                                {moduleShown &&
                                    module.classes.map((classe, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            style={styles.classesContainer}
                                            onPress={() => handleSetCurrentVideoClass({uri: classe.uri, title: classe.title, thumb: classe.thumb})}
                                        >
                                            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "flex-start"}}>
                                                <Image source={{uri: classe.thumb}} style={{width: 100, height: 60}}/>
                                                <Text style={{color: "rgb(220, 220, 220)", fontSize: 14, fontWeight: "600", flexWrap: "wrap", flex: 1, marginHorizontal: 10}}>{classe.title}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    ))
                                }
                            </View>
                        ))
                    }
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    header: {
        width: '100%',
        height: 60,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'rgb(40, 40, 40)',
        elevation: 5,
        paddingStart: 15,
        zIndex: 999
    },
    headerText: { 
        fontSize: 16, 
        fontFamily: 'Inter_600SemiBold', 
        color: 'rgb(250, 250, 250)' 
    },
    headerGoBack: {
        borderRadius: 50, 
        width: 40, 
        height: 35,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: -10,
    },
    videoContainer: {
        width: "100%", 
        height: 230,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#555"
    },
    videoImageBackground: {
        width: "100%", 
        height: 230,
        alignItems: "center",
        justifyContent: "center"
    },
    videoPlayButton: {
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
        width: 100,
        height: 100
    },
    video: { 
        width: "100%", 
        height: 240,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#555"
    },
    videoTitleContainer: {
        width: "100%",
        height: 50,
        backgroundColor: "rgb(40, 40, 40)",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingHorizontal: 5,
        elevation: 5,
    },
    videoTitle: {
        fontSize: 16,
        color: "#FFF",
        marginHorizontal: 10,
        fontFamily: "Inter_600SemiBold"
    },
    classesDetailContainer: {
        flex: 1, 
        width: "100%",
        backgroundColor: "rgb(80, 80, 80)",
    },
    moduleHeaderContainer: {
        flexDirection: "row", 
        alignItems: "center", 
        justifyContent: "space-between",
        height: 60,
        elevation: 5,
        backgroundColor: "rgb(90, 90, 90)",
        paddingHorizontal: 10
    },
    classesContainer: {
        flexDirection: "row", 
        alignItems: "center", 
        justifyContent: "center",
        height: 60,
        backgroundColor: "rgb(100, 100, 100)",
        marginBottom: 5
    }
});
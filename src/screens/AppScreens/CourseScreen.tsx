import { useFonts, Inter_600SemiBold, Inter_100Thin, Inter_400Regular } from "@expo-google-fonts/inter";
import React, { useEffect, useState, useContext } from "react";
import { RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";

import CourseItem from "../../components/CourseItem";
import { CourseContext, CourseData } from "../../contexts/CourseContext";


export default function CourseScreen({ navigation }) {
  const { getCourses, setCurrentCourse } = useContext(CourseContext);
  
  const [ fontsLoaded ] = useFonts({
    Inter_600SemiBold, Inter_100Thin, Inter_400Regular
  });

  const [ refreshing, setRefreshing ] = useState(false);
  const [ courses, setCourses ] = useState([]);

  useEffect(() => {
    onRefresh();
  }, [])

  if(!fontsLoaded) return null;

  function handleNavigateWatchScreen(course: CourseData) {
    setCurrentCourse(course);
    navigation.navigate("WatchScreen")
  }

  function onRefresh() {
    setRefreshing(!refreshing);

    getCourses().then(courses => {
      setCourses(courses);
      setTimeout(() => setRefreshing(false), 1000);

    }).catch(error => {
      setTimeout(() => setRefreshing(false), 1000);
    })
  }

  return (
    <View style={[styles.container, {}]}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Cursos disponíveis</Text>      
      </View>

      <ScrollView 
          style={{ height: '100%', width: "100%" }}
          indicatorStyle="white"
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
        >
          {
            courses.map(course => (
              <CourseItem key={course.id} course={course} navigate={course => handleNavigateWatchScreen(course)} />
              )
            )
          }
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#FFF",

  },
  header: {
    width: '100%',
    height: 60,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: 'rgb(240, 240, 240)',
    elevation: 5,
    paddingStart: 15,
    zIndex: 999
  },
  headerText: { 
    fontSize: 18, 
    fontFamily: 'Inter_600SemiBold', 
    color: 'rgba(0, 0, 0, 0.6)' 
  },
  filterScrollViewContainer: {
    width: "100%",
    height: 70,
    marginTop: 10,
    zIndex: 999,
    backgroundColor: "#FFF",
    marginBottom: 10
  },
  filters: {
    height: 40,
    marginTop: 5,
    paddingStart: 20,
    paddingEnd: 20,
    backgroundColor: "rgb(250, 250, 250)",
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderRadius: 30,
    marginHorizontal: 10,
    elevation: 2
  },
});

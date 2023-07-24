
  
  const styles = StyleSheet.create({
    hexagon: {
      width: 100,
      height: 55
    },
    hexagonInner: {
      width: 100,
      height: 55,
      backgroundColor: 'red'
    },
    hexagonAfter: {
      position: 'absolute',
      bottom: -25,
      left: 0,
      width: 0,
      height: 0,
      borderStyle: 'solid',
      borderLeftWidth: 50,
      borderLeftColor: 'transparent',
      borderRightWidth: 50,
      borderRightColor: 'transparent',
      borderTopWidth: 25,
      borderTopColor: 'red'
    },
    hexagonBefore: {
      position: 'absolute',
      top: -25,
      left: 0,
      width: 0,
      height: 0,
      borderStyle: 'solid',
      borderLeftWidth: 50,
      borderLeftColor: 'transparent',
      borderRightWidth: 50,
      borderRightColor: 'transparent',
      borderBottomWidth: 25,
      borderBottomColor: 'red'
  
    }
  });

  return (
    <View style={styles.hexagon}>
    <View style={styles.hexagonInner}>
     <View style={styles.hexagonBefore}>
     </View>
    </View>
    <View style={styles.hexagonAfter}></View>
  </View>
  );
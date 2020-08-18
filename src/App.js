import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const width_proportion = '100%';
const width_button = '20%';
const height_button = '30%';
const array = [
  {
    name: '1',
    id: '1',
    image: 'https://picsum.photos/500?random=1',
    like: 0,
    dislike: 0,
  },
  {
    name: '2',
    id: '2',
    image: 'https://picsum.photos/500?random=2',
    like: 0,
    dislike: 0,
  },
  {
    name: '3',
    id: '3',
    image: 'https://picsum.photos/500?random=3',
    like: 0,
    dislike: 0,
  },
  {
    name: '4',
    id: '4',
    image: 'https://picsum.photos/500?random=4',
    like: 0,
    dislike: 0,
  },
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount = () => {
    this.initData();
  };

  initData = () => {
    this.setState({data: array, testArr: array});
  };
  increaseLikeCount = (data, index) => {
    data[index].like++;
    this.setState({data});
  };
  decreaseLikeCount = (data, index) => {
    let count = data[index].like;
    if (count > 0) {
      data[index].like--;
    }
    this.setState({data});
  };
  likeAll = () => {
    const cpData = [...this.state.data];
    cpData.map((item) => item.like++);
    this.setState({data: cpData});
  };
  dislikeAll = () => {
    const cpData = [...this.state.data];
    cpData.map((item) => (item.like > 0 ? item.like-- : null));
    this.setState({data: cpData});
  };
  resetAll = () => {
    const cpData = [...this.state.data];
    cpData.map((item) => {
      item.like = 0;
      item.dislike = 0;
    });
    this.setState({data: cpData});
  };
  renderItem = ({item, index}) => {
    const cpData = [...this.state.data];
    return (
      <View>
        <Image style={styles.image} source={{uri: item.image}} />
        <View style={styles.descRender}>
          <View style={styles.flexJustify}>
            <TouchableOpacity disabled style={styles.likeStatus}>
              <Text>{item.like} Like</Text>
            </TouchableOpacity>
            <View style={styles.flex} />
          </View>
          <View style={styles.desc}>
            <TouchableOpacity
              style={styles.buttonLike}
              onPress={() => {
                this.increaseLikeCount(cpData, index);
              }}>
              <Text style={styles.textInsideButton}>Like</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonDisLike}
              onPress={() => {
                this.decreaseLikeCount(cpData, index);
              }}>
              <Text style={styles.textInsideButton}>Dislike</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.buttonLike}
            onPress={() => this.likeAll()}>
            <Text style={styles.textInsideButton}>Like All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonReset}
            onPress={() => this.resetAll()}>
            <Text style={styles.textInsideButtonReset}>Reset All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonDisLike}
            onPress={() => this.dislikeAll()}>
            <Text style={styles.textInsideButton}>Dislike All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={this.state.data}
          extraData={this.state}
          keyExtractor={(item) => item.id}
          renderItem={this.renderItem}
          // renderItem={({item}) => <Text>{item.name}</Text>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: '#F8F8FF',
  },
  descRender: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DCDCDC',
    borderTopWidth: 0,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  image: {
    alignSelf: 'center',
    width: width_proportion,
    height: screenWidth / 2,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },
  desc: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 10,
  },
  header: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  indesc: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  flexJustify: {
    flex: 1,
    flexDirection: 'row',
  },
  buttonLike: {
    padding: 10,
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: '#1E90FF',
    borderRadius: 8,
  },
  buttonDisLike: {
    padding: 10,
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: '#DC143C',
    borderRadius: 8,
  },
  buttonReset: {
    padding: 10,
    flex: 1,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#DCDCDC',
    borderRadius: 8,
  },
  likeStatus: {
    padding: 5,
    margin: 10,
    flex: 1,
    borderWidth: 1,
    borderColor: '#DCDCDC',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInsideButton: {
    alignSelf: 'center',
    color: '#FFF',
  },
  textInsideButtonReset: {
    alignSelf: 'center',
  },
});

export default App;

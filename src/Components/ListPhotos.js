//import PoreCompoent for preventing unnecesary updates. 
import React, { PureComponent } from 'react';
//import your components from react-native 
import {  FlatList, ActivityIndicator } from 'react-native';

//import components
import ItemCard from './Photo';

export default class Photos extends PureComponent {
    constructor(props) {
        super(props);
    }
    //Define your state for your component. 
    state = {
        //Assing a array to your itemList state
        itemList: [],
        //Have a loading state where when data retrieve returns data. 
        loading: true
    }
        
    
    //Define your componentDidMount lifecycle hook that will retrieve data.
    //Also have the async keyword to indicate that it is asynchronous. 
    async componentDidMount() {
        //Have a try and catch block for catching errors.
        try {
            //Assign the promise unresolved first then get the data using the json method. 
            const apiCall = await fetch('https://dashboard.qonteo.com/REST/listPhotos?user_id=' + this.props._id);
            const item = await apiCall.json();
            this.setState({itemList: item.results, loading: false});
        } catch(err) {
            console.log("Error fetching data-----------", err);
        }
    }
    render() {

        //Destruct itemList and Loading from state.
        const { itemList, loading } = this.state;
        //Destruct navigation from props 
        //If laoding to false, return a FlatList which will have data, rednerItem, and keyExtractor props used.
        //Data contains the data being  mapped over.
        //RenderItem a callback return UI for each item.
        //keyExtractor used for giving a unique identifier for each item.
        if(!loading) {
            return <FlatList 
                        data={itemList}
                        renderItem={(data) => <ItemCard {...data.item} navigation={this.props.navigation} />}
                        keyExtractor={(item) => item.id} 
                        style={{width: '100%'}}
                   />                                        
        } else {
            return <ActivityIndicator />
        }
    }
}

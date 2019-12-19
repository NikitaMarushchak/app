import React from 'react';
import logo from './logo.svg';
import './App.css';

interface AppState {
    data:any;

}

export default class App extends React.Component<any, AppState> {
    // fetch("object.json").then(value => {
    //    console.log(value);
    // });

    constructor(props: any) {
        super(props);
        this.state = {
            data: {}
        };
        fetch("object.json").then((value: Response) => {
            value.json().then(data => {
                this.setState({data: data});
            });
        });
    }

    render(): React.ReactNode {
        return (
            <div>{JSON.stringify(this.state.data)}</div>
        );
    }
}


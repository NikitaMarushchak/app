import React from 'react';
import logo from './logo.svg';
import './App.css';
import '../node_modules/bulma/css/bulma.css';

import {isTemplateElement} from "@babel/types";

interface AppState { //создаем ТИП
    data1:any;
    filteredData:any[];

}

export default class App extends React.Component<any, AppState> { //создаем корневую компоненту
    // fetch("object.json").then(value => {
    //    console.log(value);
    // });


    constructor(props: any) { //функция которая делает что-то, создаем пустой state
        super(props);
        this.state = {
            data1: {data: {list:[]}},
            filteredData: []
        };
        // fetch("object.json").then((value: Response) => { //создаем запрос
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const url = "https://xn--80az8a.xn--d1aqf.xn--p1ai/%D1%81%D0%B5%D1%80%D0%B2%D0%B8%D1%81%D1%8B/api/kn/object?offset=0&limit=100&sortField=devId.devShortCleanNm&sortType=asc";

        fetch(proxyurl + url).then((value: Response) => { //создаем запрос
            value.json().then(data => {
                this.setState({
                    data1: data,
                    filteredData: data.data.list
                });
            });
        });
    }

    onInputFilterChange(newValue: string) { //реагируем на изменение
        // alert(newValue);
        let newData = this.state.data1.data.list.filter((item: any) => {
            if (item.objCommercNm) {
                return item.objCommercNm.indexOf(newValue) != -1;
            }
            return false;
        });
        
        this.setState({ //изменяем state react компоненты
            ...this.state, // ...нужны чтобы получить старые поля объекта (деструктуризация obecj destraction)
            filteredData: newData
        });
    }

    render(): React.ReactNode {
        return (
            <div>
                <input className="input" onChange={event => this.onInputFilterChange(event.target.value)}/>
                <div >{this.state.filteredData.map((item: any) => {
                    return (<div className="box"><p>{item.objCommercNm}</p></div>)
                })}</div>
            </div>
        );
    }
}


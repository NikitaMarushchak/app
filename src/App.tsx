import React from 'react';
import logo from './logo.svg';
import './App.css';
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
        fetch("object.json").then((value: Response) => { //создаем запрос
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
                <input onChange={event => this.onInputFilterChange(event.target.value)}/>
                <div>{this.state.filteredData.map((item: any) => {
                    return (<p>{item.objCommercNm}</p>)
                })}</div>
            </div>
        );
    }
}


import React, { Component } from 'react';
import './Calculator.css';
import { btns,BTN_ACTIONS } from './btnConfig';
export default class Calculator extends Component {
    state={
        number:'',
        result:''
    }
    renderBtn = ()=>{
        return btns.map((item,index) => {
            return (
                <button
                    key={index}
                    className={item.class}
                    onClick={()=>{this.counters(item)}}
                >
                    {item.display}
                </button>
            )
        })
    }
    counters = (value)=>{
        if(value.action === BTN_ACTIONS.ADD){
            const oper = value.display !== 'x' ? value.display : '*'; 
            this.setState({
                number:this.state.number + oper,
            })
        }
        if(value.action === BTN_ACTIONS.DELETE){
            this.setState({
                number:'',
                result:'',
            })
        }
        if(value.action === BTN_ACTIONS.CE){
            if(this.state.result.trim().length >0){
                this.setState({
                    number:'',
                    result:'',
                })
            }else{

                this.setState({
                    number:this.state.number.slice(0,-1),
                })
            }
        }
        if(value.action === BTN_ACTIONS.CALC){
            if(this.state.number.trim().length > 0){
                try {
                    
                    let res = eval(this.state.number);
                    this.setState({
                        result:res.toString(),
                    })
                } catch {
                    setTimeout(()=>{
                        
                        this.setState({result: 'syntax error'});
                        
                    },200)
                } finally{
                    console.log('clac complete');
                }
            }
           
            
        }
    }
    render() {
        return (
            <div className="calculator">
                <span className="auth">Calculator</span>
                <div className="calculator__result">
                    <div  className="calculator__result__exp">{this.state.number}</div>
                    <div className="calculator__result__exp">{this.state.result}</div>
                </div>
                <div  className="calculator__btns">
               
                    {
                        this.renderBtn()
                    }
                </div>
            </div>
        )
    }
}

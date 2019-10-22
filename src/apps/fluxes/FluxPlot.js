import React, {Component} from 'react';
import {
    ScatterChart, 
    Scatter, 
    XAxis, 
    YAxis, 
    Tooltip, 
    Label
  } from 'recharts';

import { RenderNoShape, Formatter, Ticks} from './PlotUtils.js'

import '../App.css';

class FluxPlot extends Component{

    constructor(props) {
        super(props);

        this.state = { width: window.innerWidth, height: window.innerHeight };
        
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
      }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    render(){
        const groupName = this.props.data.length.toString();
        var lineWidth = 2.0;
        if(this.props.data.length > 500){
          lineWidth = 4.0;
        }
        else if(this.props.data.length > 300){
          lineWidth = 3.0;
        }

        return (
            <div>
                <ScatterChart
                    width={0.5*this.state.width}
                    height={0.5*this.state.height}
                    data={this.props.data}
                    margin={{
                        top: 40, right: 0, left: 0, bottom: 40,
                    }}
                >
                    <XAxis 
                        type="number" 
                        dataKey="x" 
                        scale="log" 
                        domain={['dataMin', 'dataMax']}  
                        tick={{fontSize: "14",  stroke: '#fff', strokeWidth: 0.4}} 
                        tickCount={20}
                        ticks={Ticks}
                        tickLine={false}
                        tickFormatter={Formatter}
                        allowDecimals={true}
                        padding={{ top: 20, bottom: 40 }} 
                    >
                    <Label value="Energy (eV)" offset={-20} position="insideBottom" stroke="#fff"/>
                    </XAxis>
                    <YAxis 
                        hide={true}
                        type="number" 
                        dataKey="y" 
                        scale="log" 
                        domain={[dataMin => (dataMin*0.9), 'dataMax']} 
                        tick={{fontSize: "18", stroke: '#fff', strokeWidth: 1}} 
                        allowDataOverflow
                    />
                    <Tooltip />
                    <Scatter 
                        name={groupName} 
                        data={this.props.data} 
                        fill="#c3d0f3" 
                        strokeWidth={lineWidth} 
                        line 
                        shape={<RenderNoShape />}/>
                </ScatterChart>
            </div>
        );
    }
}

export { FluxPlot };
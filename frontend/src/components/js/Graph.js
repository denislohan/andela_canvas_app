import React from 'react' 
import ReactScoreIndicator from 'react-score-indicator'

class Graph extends React.Component{

    render=()=>{
        const {value,max,title,colors} = this.props

        return (
            <div>
                <h3>{title}</h3>
                <ReactScoreIndicator 
                    stepsColors ={colors}
                    width = '70' 
                    value={value}
                    maxValue={max} />
            </div>
        )
                
    }
}

export default Graph


import React, { Component } from 'react'
import { Challenge } from '../components'
export default class Challenges extends Component {



    render() {
        
        const listOfChallenges = [
            {
                "name": "Reusable Bottles",
                "description": "Instead of purchasing bottled water or requesting a disposable cup of water, carry a reusable water bottle and refill from drinking fountains, taps or other sources of clean water. Disposable plastic water bottles take up to 2.5 million tons of carbon a year to produce. Plastic water bottles frequently end up in landfills and take hundreds of years to breakdown or into the ocean harming marine life. Bizarrely, plastic water bottles take more water to produce than the amount of drinking water they contain!",
                "points": 10
            },
    
            {
                "name": "Meatless and dairyfree once a week",
                "description": "Skip eating meat and dairy one day a week; abstaining for one day a week can reduce carbon emissions by 8 pounds! After one year of eating meat free once a week can result in a reduction of 416 pounds of carbon. Meat and dairy production requires more water and land than produce. It takes approximately 40 times more water to produce a kilogram of meat than vegetables. Currently, animal argiculture is responsible for 70 percent of the world's freshwater use.",
                "points": 1
            },
    
            {
                "name": "Going Vegan for one month",
                "description": "Eating less animal products can reduce carbon emissions, water use and land use. Other diets can have lower impacts on the environment than a meat and dairy heavy diet however veganism can reduce individual food related carbon emissions by 70 percent!",
                "points": 30
            }
        ]
    
        return (
            <div className="challenges-page-root">
                <div className="challenges-description">
                    <h1>Challenges</h1>
                    <div className="description-text">
                        {`Challenges are a fun way for users to compete towards a goal that reduces their carbon footprints.\n`}
                        {`\nTake a look at the complete list of challenges listed below!`}
                    </div>
                </div>
                {
                    listOfChallenges.map((e, i) => {
                        return(<Challenge 
                                name={e.name}
                                description={e.description}
                                points={e.points}
                                key={i}/>)
                    }) 
                }
            </div>
        )
    }
}

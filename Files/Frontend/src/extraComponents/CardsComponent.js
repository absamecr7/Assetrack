import React from 'react'
import { Card } from 'semantic-ui-react'

// const allItems = [
// 	{
// 		key: 1,
// 		header: 'Project Report - April',
// 		description: 'Leverage agile frameworks to provide a robust synopsis for high level overviews.',
// 		meta: 'ROI: 30%'
// 	},
// 	{
// 		key: 2,
// 		header: 'Project Report - May',
// 		description: 'Bring to the table win-win survival strategies to ensure proactive domination.',
// 		meta: 'ROI: 34%'
// 	},
// 	{
// 		key: 3,
// 		header: 'Project Report - June',
// 		description: 'Capitalise on low hanging fruit to identify a ballpark value added activity to beta test.',
// 		meta: 'ROI: 27%'
// 	}
// ];

class CardsComponent extends React.Component {

    state = {
        items: []
    }

    componentDidMount = async () => {

        this.setState({
            items: this.props.items
        });
              
    }

    render() {
        console.log("======================", this.props.items);
        console.log("items: ", this.state.items);

        return (
                <Card.Group className="ui animated fadeInLeft raised w-100 m-auto " items={this.state.items} itemsPerRow={3} />
        );
    }

}

export default CardsComponent;

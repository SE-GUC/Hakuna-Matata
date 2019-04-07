import React from 'react';
import  Card  from '../../../../node_modules/react-cardstack/dist/Card.js';
import  CardStack  from '../../../../node_modules/react-cardstack/dist/CardStack.js';

const axios = require('axios')



class PartnerComp extends React.Component {
    constructor(props){
        super(props);
        this.state={
            partners: [1,2],
            
        }
    }
    componentDidMount() {
        axios
          .get("https://hakuna-mtata.herokuapp.com/partner/")
          .then(response => {
    
            // create an array of contacts only with relevant data
            const newPartners = response.data.map(c => {
              return {
                id: c._id,
                name: c.name,
                information: c.information,
                fieldOfWork: c.field_of_work
              };
            });
    
            // create a new "State" object without mutating 
            // the original State object. 
            const newState = Object.assign({}, this.state, {
                partners: newPartners
            });
    
            // store the new state object in the component's state
            this.setState(newState);
            console.log(this.state.partners)


          
          })
          .catch(error => console.log(error));
      }
      getColorCode(i){
          if(i%2===0){
              return "#D50000"
          }
          else{
            return "#000000"
          }
      }
    render(){
        return(<div>
            <CardStack
                height={900}
                width={400}
                background="#f8f8f8"
                hoverOffset={25}>

                 
    
                {this.state.partners.map((person, i) =>
                    <Card
                        key={i}
                        background={this.getColorCode(i)}>
                        
                        <TeamMemberCard {...person} />
                    </Card>
                )}
    
            </CardStack>
        </div>)
    }
	
}



const DetailsRow = ({  title, summary }) => {
	const renderSummary = () => {
		if (summary)	return (
			<p style={{ fontWeight: 300, lineHeight: 1.45 }}>
				{summary}
			</p>
		);
		return null;
	};

	return (
		<div style={styles.detailsRow.row}>
		
			<div style={{ width: '80%' }}>
				<h2 style={styles.detailsRow.title}>
					{title}
				</h2>
				{renderSummary()}
			</div>
		</div>
	);
};

const TeamMemberCard = (props) => (
	<div style={{ position: 'absolute', top: 0 }} onClick={props.onClick}>
		<header style={styles.cardHeader} className='card-header-details'>
			
			<div>
				<h1 style={styles.headerName}>{props.name}</h1>
				<h3 style={styles.headerTitle} className='icon ion-ios-arrow-down'>{props.title}</h3>
			</div>
		</header>

		<div style={{color: '#fff'}}>
			<DetailsRow
			
				title={props.information}
			/>

			<DetailsRow
				
				title={props.fieldOfWork}
			/>

			
		</div>
  </div>
);

const styles = {
	cardHeader: {
		display: 'flex',
		height: '125px',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: '10px 20px',
		color: '#fff',
	},
	headerName: {
		margin: 0,
		fontWeight: 500,
		fontSize: '25px',
		textAlign: 'right'
	},
	headerTitle: {
		margin: '4px 0 0',
		fontWeight: 300,
		fontSize: '17px',
		opacity: 0.8,
		textAlign: 'right'
	},
	detailsRow: {
		row: {
			width: '100%',
			padding: '0 20px',
			display: 'flex',
			alignItems: 'center',
			margin: '25px 0',
		},
		icon: {
			display: 'block',
			width: '25px',
			height: '30px',
			margin: '0 20px 0 0',
			borderBottom: '1px solid rgba(255, 255, 255, 0.8)',
			textAlign: 'center',
			fontSize: '22px',
		},
		title: {
			fontWeight: 500,
			fontSize: '20px',
			margin: 0,
			fontStyle: 'italic',
		},
	},
};

export default PartnerComp;
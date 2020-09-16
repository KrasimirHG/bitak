import React, { Component } from "react";
import ItemModal from "./ItemModal";
import axios from "axios";

class ShoppingList extends Component {
	state = {
		stoka: [],
	};
	componentDidMount() {
		axios.get("http://localhost:5000/api/items").then((res) => {
			this.setState({ stoka: res.data });
		});
	}

	render() {
		const products = this.state.stoka;
		console.log(products);
		return (
			<div>
				<ItemModal />
				{products.map((prod) => (
					<div>
						<h2>{prod.name}</h2>
						<p>{prod.description}</p>
						<img
							src={prod.filename[0]}
							alt={prod.filename[0]}
							width="300"
							height="200"
						/>
					</div>
				))}
			</div>
		);
	}
}

export default ShoppingList;

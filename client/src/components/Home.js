import React from 'react'
import AppNav from "./AppNav";
import ShoppingList from "./ShoppingList";
import Box from "@material-ui/core/Box";

function Home() {
  return (
    <Box>
      <AppNav />
      <ShoppingList />
    </Box>
  )
}

export default Home;
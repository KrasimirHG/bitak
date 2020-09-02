import React from "react";
import AppNav from "./components/AppNav";
import ShoppingList from "./components/ShoppingList";
import Box from "@material-ui/core/Box";

function App() {
  return (
    <Box>
      <AppNav />
      <ShoppingList />
    </Box>
  );
}

export default App;
